import {Copy, CheckCheck, Clock, MessageSquareQuote, FileText, ListChecks, Quote} from 'lucide-react';

import {useState} from 'react'

const VideoSummaryResult = ({
  className ,
  videoTitle = "",
  videoDuration = "",
  videoThumbnail = "",
  summary = "",
  keyPoints = [],
  quotes = [],
  videoLink = "",
  isVisible,
}: {
  className?: string;
  videoTitle?: string;
  videoDuration?: string;
  videoThumbnail?: string;
  summary?: string;
  keyPoints?: string[];
  quotes?: string[];
  isVisible: boolean;
  videoLink:string;
}) => {

  const [activeTab, setActiveTab] = useState("summary")

  const copyToClipboard = (text: string, type: string) => {
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
            
            <a className="text-lg font-semibold mb-1 line-clamp-2" target="_blank" href={`${videoLink}`} >{videoTitle}</a>
            
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
                      <p className="text-sm italic">&quot;{quote}&quot;</p>
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

export default VideoSummaryResult;