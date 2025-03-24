"use client"

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

import VideoSummaryResult from './components/video-summary-result';
import Informations from './components/informations';
import Layout from './pages/layout';

type SummaryResult = {
  summary: string;
  videoTitle: string;
  videoDuration: string;
  videoThumbnail: string;
  keyPoints: string[];
  quotes: string[];
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
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  function convertYoutubeDuration(duration) {
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
    const pad = (num) => num.toString().padStart(2, '0');
    
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
      const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/(.+)/);
      return match ? match[1] : null;
    };

    const fetchVideoInfo = async () => {
      const videoId = extractVideoId(youtubeUrl);
      if (!videoId) {
        // Optionally clear previous video data if URL is invalid
        setVideoData(null);
        return;
      }
      
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`;
      
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that we have video data before proceeding
    if (!videoData) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    setIsLoading(true);
    setSummaryResult(null);

    // Simulated summary generation
    setTimeout(() => {
      setSummaryResult({
        videoLink: youtubeUrl,
        summary: "This is a placeholder summary of the YouTube video. In a real application, this would be the AI-generated summary of the video content based on the URL provided and the selected video type.",
        videoTitle: videoData.title,
        videoDuration: convertYoutubeDuration(videoData.duration),
        videoThumbnail: videoData.thumbnail,
        keyPoints: [
          "DaisyUI simplifies Tailwind CSS by providing pre-built components",
          "React and DaisyUI together create a powerful combination for web development",
          "You can customize DaisyUI themes to match your brand",
          "Component-based architecture improves code reusability",
          "The tabs component makes organizing content easier"
        ],
        quotes: [
          "DaisyUI is like having a design system built right into Tailwind CSS",
          "The best way to learn is by building actual projects",
          "Component libraries save developers countless hours of styling work"
        ]
      });
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Layout>
      <header className="mb-12 text-center">
        <div className="mx-auto mb-4">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full animate-fade-in">
            Smart Video Summaries
          </div>
        </div>
        <h1 className="mb-2 text-3xl font-bold">YouTube Summarizer</h1>
        <p className="mx-auto max-w-md text-base-content/70">Get concise summaries of any YouTube video in seconds</p>
      </header>

      <div className="card mx-auto mb-10 bg-base-100 shadow-xl">
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
                        className="input input-bordered w-full font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:w-48 md:w-72 mt-4 sm:mt-0">
                  <button
                    type="submit"
                    className="btn btn-primary w-full py-3 text-base rounded font-medium"
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
        />
      )}

      <Informations/>
    </Layout>
  );
}