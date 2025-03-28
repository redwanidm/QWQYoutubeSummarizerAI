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
  sectionTitle:string; 
}


interface RawTranscriptEntry {
  text: string;
  start: number;
  duration: number;
}

type SummaryResult = {
  summary: string;
  videoTitle: string;
  videoDuration: string;
  videoThumbnail: string;
  keyPoints: string[];
  quotes: string[];
  videoLink:string;
  transcriptSections:TranscriptSection[]
};

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summaryResult, setSummaryResult] = useState<SummaryResult | null>(null);
  const [videoData, setVideoData] = useState<{
    title: string;
    thumbnail: string;
    duration: string;
  } | null>(null);


  const [language, setLanguage] = useState<Language>('english');

  const extractVideoId = (url: string) => {
    const match = 
      url.match(/[?&]v=([^&]+)/) || 
      url.match(/youtu\.be\/([^?&]+)(\?si=[^&]+)?/) ||
      url.match(/youtu\.be\/([^?&]+)/);
    return match ? match[1] : null;
  };

  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const API_BASE_URL = process.env.NEXT_PUBLIC_NGROK_URL;

  function formatTimestamp(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  const parseSummaryText = (summaryText: string): SummaryResult | null => {
    try {
      // Remove everything before the first '{' and after the last '}'
      const jsonStartIndex = summaryText.indexOf('{');
      const jsonEndIndex = summaryText.lastIndexOf('}') + 1;
      
      if (jsonStartIndex === -1 || jsonEndIndex === -1) {
        throw new Error('Could not find valid JSON');
      }
  
      const cleanedText = summaryText.slice(jsonStartIndex, jsonEndIndex).trim();
      // Parse the cleaned JSON
      return JSON.parse(cleanedText);
    } catch (error) {
      console.error('Error parsing summary:', error);
      return null;
    }
  };

  function convertYoutubeDuration(duration : string) {
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
    const pad = (num:number) => num.toString().padStart(2, '0');
    
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

  // New useEffect to handle URL changes
  useEffect(() => {
    const extractVideoId = (url: string) => {
      const match = 
        url.match(/[?&]v=([^&]+)/) || 
        url.match(/youtu\.be\/([^?]+)/);
      return match ? match[1] : null;
    };

    const fetchVideoInfo = async () => {
      const videoId = extractVideoId(youtubeUrl);
      // console.log("VIDEO ID",videoId)
      if (!videoId) {
        // Optionally clear previous video data if URL is invalid
        setVideoData(null);
        return;
      }
      
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
      
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const video = data.items[0];
          setVideoData({
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high.url,
            duration: video.contentDetails.duration,
        
          });
        } else {
          setVideoData(null);
        }
      } catch (error) {
        console.error("Error fetching video info:", error);
        setVideoData(null);
      }
    };

    // Only fetch if URL is not empty
    if (youtubeUrl.trim()) {
      fetchVideoInfo();
    }
  }, [youtubeUrl]); // Dependency array ensures this runs when URL changes

  async function getTranscriptText(videoId: string) {
    try {
      // console.log(`Attempting to fetch transcript for video ID: ${videoId}`);
      
        // Replace with current URL
      const fullUrl = `${API_BASE_URL}/transcript/?video_id=${videoId}`;
  
      // console.log('Full Request URL:', fullUrl);
  
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420",
          'Origin': 'http://localhost:3000',  // Match your frontend origin
        },
      });
  
      // console.log('Response Status:', response.status);
      // console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
  
      // Log raw text before parsing
      const responseText = await response.text();
      // console.log('Raw Response Text:', responseText);
  
      try {
        const data = JSON.parse(responseText);
        
        if (!data || !data.transcript) {
          console.error('Invalid response structure:', data);
          throw new Error('No transcript in response');
        }
  
        // console.log("Transcript fetched successfully:", data.transcript.slice(0, 200) + '...');
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

  async function GeminiSummarize(youtubeUrl: string,language:string): Promise<SummaryResult | null> {
    const videoId = extractVideoId(youtubeUrl);

    if (!videoId) {
      console.error('Invalid video ID');
      return null;
    }

    try {
      const transcriptData = await getTranscriptText(videoId);

      if (transcriptData) {
        // Process raw transcript to include formatted timestamps
        // const processedTranscript = transcriptData.rawTranscript.map((entry: RawTranscriptEntry) => ({
        //   ...entry,
        //   formattedStart: formatTimestamp(entry.start),
        //   formattedEnd: formatTimestamp(entry.start + entry.duration)
        // }));
        // console.log('Processed transcript:', processedTranscript[0]);
      }
      
      if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured');
      }

      if (!transcriptData) {
        return({
        videoLink: youtubeUrl,
        summary: "ERROR: The api is disabled ask the developper to enable it",
        videoTitle: videoData?.title || "Video Title",
        videoDuration: videoData?.duration ? convertYoutubeDuration(videoData.duration) : "00:00",
        videoThumbnail: videoData?.thumbnail || "",
        keyPoints:  [""],
        quotes:  [""],
        transcriptSections : []
      })
      }
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${GEMINI_API_KEY}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze the following video transcript and provide a structured summary:

Video Transcript: ${transcriptData.transcript}

Raw Transcript Data: ${JSON.stringify(transcriptData.rawTranscript.map((entry: RawTranscriptEntry) => ({
  text: entry.text,
  startTime: formatTimestamp(entry.start),
  endTime: formatTimestamp(entry.start + entry.duration)
})))}
Language you must use: ${language} 

Instructions:
1. Summary: Develop a concise, 3-4 sentence overview that captures the video's core narrative, central argument, or key message. Prioritize depth over brevity, ensuring the summary provides meaningful context and synthesizes the most critical insights.
Key Points: Directly extract the most significant, concrete information and takeaways from the video. Focus on:
    - Specific facts, findings, or discoveries
    - Actionable insights
    - Direct statements of knowledge or conclusion
    - Avoid meta-language like "the video highlights" or "the content discusses"
    - Provide clear, declarative statements that stand alone as valuable information
3. Quotes: Select 3 most representative quotes that not only encapsulate the video's core message but also demonstrate linguistic significance, emotional resonance, or intellectual depth. Prioritize quotes that reveal underlying themes or provocative perspectives.

4. Transcript Sections: Strategically segment the transcript to reveal the video's narrative arc, logical progression, or argumentative structure. Aim to:
    - Capture semantic and thematic transitions
    - Highlight critical conceptual shifts
    - Provide meaningful context for each section
    - Ensure comprehensive coverage of the entire video duration
    - stay within 5-15 logical sections 

Required Output Format (MUST follow exactly):
{
  "summary": "Concise video overview",
  "keyPoints": [
    "Key point 1",
    "Key point 2",
    "Key point 3"
  ],
  "quotes": [
    "Memorable quote 1",
    "Memorable quote 2"
  ],
  "transcriptSections": [
    {
      "startTime": "MM:SS",
      "endTime": "MM:SS",
      "summary": "Brief explanation of this section's content 4-5 sentences",
      "sectionTitle" : "1 sentence that represents what happened in this section"
    }
  ]
}

IMPORTANT: 
- Respond ONLY with the JSON object. No additional text or explanations.
- do not translate the quotes keep them in their native language
- Each transcriptSection MUST cover a continuous portion of the video
- The sections together MUST cover the ENTIRE video duration
- Format timestamps as MM:SS and for videos duration more than an hour use HH:MM:SS
- For longer videos, combine related content into larger sections to stay within the 5-15 section limit
- Prioritize intellectual rigor, thematic coherence, and nuanced analysis in all components
- Demonstrate critical thinking by identifying subtle connections and underlying themes
- Maintain objectivity while capturing the video's essence and intellectual depth`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2088
          }
        })
      }); 
    
  
      if (!response.ok) {
        throw new Error(`Gemini API request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      const summaryText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsedSummary = parseSummaryText(summaryText);
      
 
      return {
        videoLink: youtubeUrl,
        summary: parsedSummary?.summary || "",
        videoTitle: videoData?.title || "Video Title",
        videoDuration: videoData?.duration ? convertYoutubeDuration(videoData.duration) : "00:00",
        videoThumbnail: videoData?.thumbnail || "",
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
    
    // Validate that we have video data before proceeding
    if (!videoData) {
      alert("Please enter a valid YouTube URL");
      return;
    }
    setSummaryResult(null);
    setIsLoading(true);
    
    try {
      const summary = await GeminiSummarize(youtubeUrl,language);
      setSummaryResult(summary);
    } catch (error) {
      console.error('Summarization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <Layout>
      <header className="mb-12 text-center"  
      >
        <div className="mx-auto mb-4">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full animate-fade-in">
            <p className='mt-1'>Smart Video Summaries </p>
          </div>
        </div>
        <h1 className={`mb-2 text-3xl font-bold  ${mateSc.className} antialiased`}>YouTube Summarizer</h1>
        <p className="mx-auto max-w-md text-base-content/70">Get concise summaries of any YouTube video in seconds</p>
      </header>

      <div className="card mx-auto mb-10 bg-base-100 ">
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
                    disabled={isLoading || !videoData}
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

      <Informations/>
    </Layout>
  );
}
