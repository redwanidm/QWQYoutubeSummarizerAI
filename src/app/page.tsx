"use client"

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import VideoSummaryResult from './components/video-summary-result';
import Informations from './components/informations';
import { mateSc } from '@/app/ui/fonts';
import LanguageSelector, { Language } from './components/languageSelector';
import Layout from './pages/layout';

interface TranscriptSection {
  startTime: string;
  endTime: string;
  summary: string;
  sectionTitle: string;
}

type SummaryResult = {
  summary: string;
  videoTitle: string;
  videoDuration: string;
  videoThumbnail: string;
  keyPoints: string[];
  quotes: string[];
  videoLink: string;
  transcriptSections: TranscriptSection[];
};

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summaryResult, setSummaryResult] = useState<SummaryResult | null>(null);

  const [isDisabled, setIsDisabled] = useState(true);
  const [language, setLanguage] = useState<Language>('english');

  const extractVideoId = (url: string) => {
    const match = 
      url.match(/[?&]v=([^&]+)/) || 
      url.match(/youtu\.be\/([^?&]+)(\?si=[^&]+)?/) ||
      url.match(/youtu\.be\/([^?&]+)/);
    return match ? match[1] : null;
  };

  const parseSummaryText = (summaryText: string): SummaryResult | null => {
    try {
      // Remove everything before the first '{' and after the last '}'
      console.log(summaryText)
      const jsonStartIndex = summaryText.indexOf('{');
      const jsonEndIndex = summaryText.lastIndexOf('}') + 1;
      
      if (jsonStartIndex === -1 || jsonEndIndex === -1) {
        throw new Error('Could not find valid JSON');
      }
  
      const cleanedText = summaryText.slice(jsonStartIndex, jsonEndIndex).trim();
      // Parse the cleaned JSON
      console.log(cleanedText)
      return JSON.parse(cleanedText);
    } catch (error) {
      console.error('Error parsing summary:', error);
      return null;
    }
  };

  function convertYoutubeDuration(duration: string) {
    // Regular expression to parse YouTube duration format
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    
    if (!match) {
      throw new Error('Invalid YouTube duration format');
    }
    
    // Extract hours, minutes, seconds (default to 0 if not present)
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    
    // Pad single-digit numbers with leading zero
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    // Construct the time string based on hours
    if (hours === 0) {
      // If no hours, return MM:SS format
      return `${minutes}:${pad(seconds)}`;
    } else if (hours < 10) {
      // If hours is single digit, return H:MM:SS format
      return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    } else {
      // If hours is two digits, return HH:MM:SS format
      return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    }
  }

  useEffect(() => {
    // Just validate the URL format without fetching data
    const videoId = extractVideoId(youtubeUrl);

    if (!videoId) {
      setIsDisabled(true);
      return;
    }
    
    // Enable the button if the URL is valid
    setIsDisabled(false);
    
  }, [youtubeUrl]); // Dependency array ensures this runs when URL changes

  async function getTranscriptText(videoId: string) {
    try {
      const response = await fetch(`/api/transcript?video_id=${videoId}`, {
        method: 'GET',
        headers: {
          'x-api-key': 'redwan35'
        }
      });
  
      const responseText = await response.text();
  
      try {
        const data = JSON.parse(responseText);
        
        if (!data || !data.transcript) {
          console.error('Invalid response structure:', data);
          throw new Error('No transcript in response');
        }
  
        return {
          transcript: data.transcript,
          rawTranscript: data.raw_transcript
        };
  
      } catch (parseError) {
        console.error('JSON Parsing Error:', parseError);
        console.error('Response that failed to parse:', responseText);
        throw parseError;
      }
  
    } catch (error) {
      console.error('Comprehensive Transcript Fetch Error:', error);
      return undefined;
    }
  }

  async function GeminiSummarize(youtubeUrl: string, language: string): Promise<SummaryResult | null> {
    const videoId = extractVideoId(youtubeUrl);

    if (!videoId) {
      console.error('Invalid video ID');
      return null;
    }

    try {
      // Only fetch video info now when actually submitting
      const response = await fetch(`/api/youtube?videoId=${videoId}`, {
        method: 'GET',
        headers: {
          'x-api-key': 'redwan35'
        }
      });
      
      let videoTitle = "Video Title";
      let videoThumbnail = "";
      let videoDuration = "00:00";
      
      if (response.ok) {
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const video = data.items[0];
          videoTitle = video.snippet.title;
          videoThumbnail = video.snippet.thumbnails.high.url;
          videoDuration = convertYoutubeDuration(video.contentDetails.duration);
        }
      }
      
      const transcriptData = await getTranscriptText(videoId);

      if (!transcriptData) {
        return {
          videoLink: youtubeUrl,
          summary: "ERROR: The API is disabled. Ask the developer to enable it.",
          videoTitle: videoTitle,
          videoDuration: videoDuration,
          videoThumbnail: videoThumbnail,
          keyPoints: [""],
          quotes: [""],
          transcriptSections: []
        };
      }
      
      const geminiResponse = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'redwan35'
        },
        body: JSON.stringify({
          transcriptData: transcriptData,
          language: language
        })
      });
  
      if (!geminiResponse.ok) {
        throw new Error(`Gemini API request failed with status: ${geminiResponse.status}`);
      }
  
      const data = await geminiResponse.json();
      const summaryText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsedSummary = parseSummaryText(summaryText);
      
      return {
        videoLink: youtubeUrl,
        summary: parsedSummary?.summary || "",
        videoTitle: videoTitle,
        videoDuration: videoDuration,
        videoThumbnail: videoThumbnail,
        keyPoints: parsedSummary?.keyPoints || [""],
        quotes: parsedSummary?.quotes || [""],
        transcriptSections: parsedSummary?.transcriptSections || []
      };
    } catch (error) {
      console.error('Error in summarization:', error);
      return null;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the URL before proceeding
    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      alert("Please enter a valid YouTube URL");
      return;
    }
    
    setSummaryResult(null);
    setIsLoading(true);
    
    try {
      const summary = await GeminiSummarize(youtubeUrl, language);
      setSummaryResult(summary);
    } catch (error) {
      console.error('Summarization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <header className="mb-12 text-center">
        <div className="mx-auto mb-4">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full animate-fade-in">
            <p className='mt-1'>Smart Video Summaries</p>
          </div>
        </div>
        <h1 className={`mb-2 text-3xl font-bold ${mateSc.className} antialiased`}>YouTube Summarizer</h1>
        <p className="mx-auto max-w-md text-base-content/70">Get concise summaries of any YouTube video in seconds</p>
      </header>

      <div className="card mx-auto mb-10 bg-base-100">
        <div className="bg-gradient-to-r from-primary rounded-2xl to-secondary p-1">
          <div className="card-body bg-base-100 rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end">
                <div className="relative flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="youtube-url" className="label">
                      <span className="label-text">YouTube Video URL</span>
                    </label>
                  </div>

                  <div className="relative">
                    <div className="input-group">
                      <input
                        id="youtube-url"
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        required
                        className="input input-bordered w-full font-sans rounded-r-none"
                      />
                    </div>
                  </div>
                </div>
                
                <LanguageSelector value={language} onValueChange={setLanguage} />

                <div className="sm:w-48 md:w-72 mt-4 sm:mt-0">
                  <button
                    type="submit"
                    className="btn btn-primary w-full py-3 text-base rounded rounded-l-none font-medium"
                    disabled={isLoading || isDisabled}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Summarizing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        Summarize Video
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
      )}

      {summaryResult && (
        <VideoSummaryResult
          videoLink={summaryResult.videoLink}
          isVisible={!!summaryResult}
          videoTitle={summaryResult.videoTitle}
          videoDuration={summaryResult.videoDuration}
          videoThumbnail={summaryResult.videoThumbnail}
          summary={summaryResult.summary}
          keyPoints={summaryResult.keyPoints}
          quotes={summaryResult.quotes}
          transcriptSections={summaryResult.transcriptSections}
          videoId={extractVideoId(summaryResult.videoLink) || ""}
        />
      )}

      <Informations />
    </Layout>
  );
}
