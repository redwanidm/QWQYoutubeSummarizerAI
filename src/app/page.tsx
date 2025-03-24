"use client"

import React, { useState } from 'react';
import { Code, Coffee, Loader2, Music, School, Sparkles, Utensils, Youtube, Gift,
         Copy, CheckCheck, Clock, MessageSquareQuote, FileText, ListChecks, Quote,Layers ,YoutubeIcon, Search, BookOpen, BarChart, Gamepad2, Microscope, Map, Tv, Newspaper, Lightbulb, GraduationCap} from 'lucide-react';



import Header from './components/header';
// VideoSummaryResult Component
const VideoSummaryResult = ({
  className,
  videoTitle = "",
  videoDuration = "",
  videoThumbnail = "",
  summary = "",
  keyPoints = [],
  quotes = [],
  isVisible
}) => {

  const [activeTab, setActiveTab] = useState("summary")

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    // Simple alert instead of toast
    alert(`${type} copied to clipboard`);
  };

  if (!isVisible) return null;

  return (



    <div 
      className={`w-full max-w-4xl mx-auto mt-4 transition-all duration-500 ${className || ''}`}
    >
      <div className="card bg-base-100 shadow-xl">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Video info */}
          <div className="w-full md:w-1/3 p-4 flex flex-col">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
              <img 
                src={videoThumbnail || "https://via.placeholder.com/640x360?text=Video+Thumbnail"} 
                alt={videoTitle}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {videoDuration}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-1 line-clamp-2">{videoTitle}</h3>
            
            <div className="mt-auto pt-4">
              <button 
                className="btn btn-outline btn-sm w-full"
                onClick={() => copyToClipboard(summary, "Summary")}
              >
                <Copy className="h-3 w-3 mr-2" />
                Copy Summary
              </button>
            </div>
          </div>
          
          {/* Divider */}
          <div className="divider divider-horizontal hidden md:flex"></div>
          
          <div className="w-full md:w-2/3 p-4">
      {/* Tab buttons */}
 
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex justify-around">
        <a 
          role="tab" 
          className={`tab ${activeTab === 'summary' ? 'tab-active' : ''}`} 
          onClick={() => setActiveTab('summary')}
        >
          <FileText className='h-4 w-4 mr-2'/>
          Summary
        </a>
        <a 
          role="tab" 
          className={`tab ${activeTab === 'keypoints' ? 'tab-active' : ''}`} 
          onClick={() => setActiveTab('keypoints')}
        >
         <ListChecks className='h-4 w-4 mr-2'/>  Key Points
        </a>
        <a 
          role="tab" 
          className={`tab ${activeTab === 'quotes' ? 'tab-active' : ''}`} 
          onClick={() => setActiveTab('quotes')}
        >
         <Quote className='h-4 w-4 mr-2'/>  Quotes
        </a>
      </div>

      {/* Tab content container */}
      <div className="relative h-64"> {/* Fixed height container for animations */}
        {/* Summary Tab */}
        <div 
          className={`absolute w-full transition-all duration-300 ease-in-out transform ${
            activeTab === 'summary' 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-8 pointer-events-none'
          }`}
        >
          <div className="card bg-base-200">
            <div className="card-body p-4">
              <div className="mb-2 flex items-center">
                <h3 className="text-md font-medium">📝 Summary Overview</h3>
              </div>
              <p className="text-sm leading-relaxed">{summary}</p>
            </div>
          </div>
        </div>
        
        {/* Key Points Tab */}
        <div 
          className={`absolute w-full transition-all duration-300 ease-in-out transform ${
            activeTab === 'keypoints' 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-8 pointer-events-none'
          }`}
        >
          <div className="card bg-base-200">
            <div className="card-body p-4">
              <div className="mb-2 flex items-center">
                <h3 className="text-md font-medium">🔑 Main Takeaways</h3>
              </div>
              <ul className="space-y-2">
                {keyPoints && keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCheck className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <p className="text-sm">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Quotes Tab */}
        <div 
          className={`absolute w-full transition-all duration-300 ease-in-out transform ${
            activeTab === 'quotes' 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-8 pointer-events-none'
          }`}
        >
          <div className="card bg-base-200">
            <div className="card-body p-4">
              <div className="mb-2 flex items-center">
                <h3 className="text-md font-medium">💬 Notable Quotes</h3>
              </div>
              <ul className="space-y-3">
                {quotes && quotes.map((quote, index) => (
                  <li key={index} className="bg-base-100 p-3 rounded-md">
                    <div className="flex items-start gap-2">
                      <MessageSquareQuote className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm italic">"{quote}"</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summaryResult, setSummaryResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSummaryResult(null);

    // Simulate API call
    setTimeout(() => {
      setSummaryResult({
        summary: "This is a placeholder summary of the YouTube video. In a real application, this would be the AI-generated summary of the video content based on the URL provided and the selected video type.",
        videoTitle: "How to Build Amazing Web Applications with React and DaisyUI",
        videoDuration: "12:34",
        videoThumbnail: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/09/legend-of-zelda-link-reincarnation.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5o",
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

  const videoTypes = [
    { value: "tech", label: "Tech", icon: <Code className="h-4 w-4" /> },
    { value: "cooking", label: "Cooking", icon: <Utensils className="h-4 w-4" /> },
    { value: "studying", label: "Studying", icon: <BookOpen className="h-4 w-4" /> },
    { value: "math", label: "Math", icon: <School className="h-4 w-4" /> },
    { value: "music", label: "Music", icon: <Music className="h-4 w-4" /> },
    { value: "lifestyle", label: "Lifestyle", icon: <Coffee className="h-4 w-4" /> },
  ];

  return (
    <main className="min-h-screen bg-base-200 pb-20">
          <Header/>

      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <div className="mx-auto mb-4 ">
         
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
                <div className="flex flex-col  sm:flex-row sm:items-end">
                  <div className="relative flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <label htmlFor="youtube-url" className="label">
                        <span className="label-text">YouTube Video URL</span>
                      </label>
                    </div>
                    <div className="relative">
                      <div className="input-group">
                        <span className="flex items-center pl-3">
                        </span>
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

                  <div className="sm:w-48 md:w-72">
                    <div className=" hidden sm:block">
                    <button
                  type="submit"
                  className="btn btn-primary w-full py-3 text-base rounded-l-none font-medium"
                  disabled={isLoading}
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
            isVisible={!!summaryResult}
            videoTitle={summaryResult.videoTitle}
            videoDuration={summaryResult.videoDuration}
            videoThumbnail={summaryResult.videoThumbnail}
            summary={summaryResult.summary}
            keyPoints={summaryResult.keyPoints}
            quotes={summaryResult.quotes}
          />
        )}

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 badge badge-primary badge-lg p-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-medium">AI-Powered</h3>
            <p className="text-sm text-base-content/70">Advanced AI models extract the key points from any video</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 badge badge-secondary badge-lg p-4">
              <Youtube className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Any YouTube Video</h3>
            <p className="text-sm text-base-content/70">Works with any public YouTube video in any language</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 badge badge-accent badge-lg p-4">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Customizable</h3>
            <p className="text-sm text-base-content/70">Select the video type to get more relevant summaries</p>
          </div>
        </div>
      </div>
    </main>
  );
}