import {Copy, CheckCheck, Clock, MessageSquareQuote, FileText, ListChecks, Quote,Clapperboard} from 'lucide-react';
import Link from 'next/link';
import {useState, useEffect} from 'react'
import { mateSc } from '@/app/ui/fonts';
interface TranscriptSection {
  startTime: string;
  endTime: string;
  summary: string;
  sectionTitle:string;
}
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
  transcriptSections = [],
  videoId = "",
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
  transcriptSections?:TranscriptSection[];
  videoId :string,
}) => {
 
  const [activeTab, setActiveTab] = useState("summary")
  const [iscopied,setIscopied] = useState(false);

  useEffect(() => {
    console.log('Transcript sections:', transcriptSections);
  }, [transcriptSections]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple alert instead of toast
    setIscopied(true);

    setTimeout(() => setIscopied(false), 2000);

  };
  function convertTimeToSeconds(timeString : string) {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
  }
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
            <div className={`absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center  font-[system-ui] antialiased`}>
              <Clock className="h-3 w-3 mr-1" />
              {videoDuration}
            </div>
          </div>
          
          <a className="text-lg font-semibold mb-1 line-clamp-2 hover:underline" target="_blank" href={`${videoLink}`} >{videoTitle}</a>
          
          <div className="mt-auto pt-4"  >
          <div className={`tooltip w-full ${mateSc?.className}`} data-tip={`${iscopied ? "Copied" : "Copy"}`}>
            <button 
              className={`btn btn-outline btn-sm w-full ${mateSc?.className} antialiased`}
              onClick={() => copyToClipboard(summary)}
            >
              <Copy className="h-3 w-3 mr-2" />
              Copy Summary
            </button>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="divider divider-horizontal hidden md:flex"></div>
        
        <div className="w-full md:w-2/3 p-4">
          {/* Tab buttons */}
          <div role="tablist" className={`tabs tabs-boxed mb-4 w-full flex justify-around ${mateSc?.className} antialiased`}>
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


            <a 
              role="tab" 
              className={`tab ${activeTab === 'transcript' ? 'tab-active' : ''}`} 
              onClick={() => setActiveTab('transcript')}
            >
             <Clapperboard className='h-4 w-4 mr-2'/>  Breakdown
            </a>
          </div>

          {/* Tab content container */}
          <div className="relative h-80"> {/* Restored original height */}
            {/* Summary Tab */}
            <div 
              className={`absolute w-full h-full overflow-auto transition-all duration-300 ease-in-out transform ${
                activeTab === 'summary' 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8 pointer-events-none'
              }`}
            >
              <div className="card bg-base-200">
                <div className="card-body p-4 max-h-full overflow-auto">
                  <div className="mb-2 flex items-center">
                    <h3 className="text-md font-medium">📝 Summary Overview</h3>
                  </div>
                  <p className={`${summary.startsWith("ERROR") ? "text-error " : ""}   text-sm leading-relaxed`}>{summary}</p>
                </div>
              </div>
            </div>
            
            {/* Key Points Tab */}
            <div 
              className={`absolute w-full h-full overflow-auto transition-all duration-300 ease-in-out transform ${
                activeTab === 'keypoints' 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8 pointer-events-none'
              }`}
            >
              <div className="card bg-base-200">
                <div className="card-body p-4 max-h-full overflow-auto">
                  <div className="mb-2 flex items-center">
                    <h3 className="text-md font-medium">🔑 Main Takeaways</h3>
                  </div>
                  <ul className="space-y-2">
                    {keyPoints && keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCheck className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <p className={`text-sm mt-1`}>{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Quotes Tab */}
            <div 
              className={`absolute w-full h-full overflow-auto transition-all duration-300 ease-in-out transform ${
                activeTab === 'quotes' 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8 pointer-events-none'
              }`}
            >
              <div className="card bg-base-200">
                <div className="card-body p-4 max-h-full overflow-auto">
                  <div className="mb-2 flex items-center">
                    <h3 className="text-md font-medium">💬 Notable Quotes</h3>
                  </div>
                  <ul className="space-y-3">
                    {quotes && quotes.map((quote, index) => (
                      <li key={index} className="bg-base-100 p-3 rounded-md">
                        <div className="flex items-start gap-2">
                          <MessageSquareQuote className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <p className="text-sm italic mt-1">&quot;{quote}&quot;</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/*Break down tab*/}
            {/* Transcript Tab */}
<div 
  className={`absolute w-full h-full overflow-auto transition-all duration-300 ease-in-out transform ${
    activeTab === 'transcript' 
      ? 'opacity-100 translate-x-0' 
      : 'opacity-0 translate-x-8 pointer-events-none'
  }`}
>
  <div className="card bg-base-200">
    <div className="card-body p-4 max-h-full overflow-auto">
      <div className="mb-2 flex flex-col sm:flex-row sm:items-center justify-between">
        <h3 className="text-md font-medium mb-2 sm:mb-0">🎬 Transcript Breakdown</h3>
        <div className="text-xs text-base-content/70 text-center sm:text-right">
          Click on a section to expand
        </div>
      </div>
      
      {transcriptSections && transcriptSections.length > 0 ? (
        <div className="space-y-3">
          {transcriptSections.map((section, index) => (
            <div key={index} className="collapse collapse-arrow bg-base-100 border border-base-300">
              <input type="checkbox" className="peer" />
              <div className="collapse-title flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                <span className={`badge badge-primary badge-sm flex items-center mr-1 mb-2 sm:mb-0 w-fit px-3 ${mateSc?.className}`}>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <p className='hover:underline whitespace-nowrap'>{section.startTime} - {section.endTime}</p>
</span>
                  <span title={section.sectionTitle} className={`text-sm text-base-content/80 break-words w-full  ${mateSc?.className}`}>
                    {section.sectionTitle}
                  </span>
                </div>
              </div>
              <div className="collapse-content text-sm border-t border-base-300">
                <p className="pt-3 break-words">{section.summary}</p>
                <Link 
                  href={`https://www.youtube.com/watch?v=${videoId}&t=${convertTimeToSeconds(section.startTime)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`btn mt-3 btn-ghost btn-xs text-primary hover:bg-primary/10 flex items-center gap-1 p-4 ${mateSc?.className}`}
                >
                  Watch at {section.startTime}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-neutral-content">
          <p>No transcript sections available for this video.</p>
        </div>
      )}
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