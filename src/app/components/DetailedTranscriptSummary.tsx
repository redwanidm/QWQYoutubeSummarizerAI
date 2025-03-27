import React,  from 'react';
import { MessageSquareText, Clock } from 'lucide-react';
import { mateSc } from '@/app/ui/fonts';

type DetailedSummaryProps = {
  transcript: { text: string; start: number; duration: number }[];
  videoLink: string;
  detailedSummary?: string;
};

const DetailedTranscriptSummary: React.FC<DetailedSummaryProps> = ({ 
  transcript, 
  videoLink, 
  detailedSummary 
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center mb-4">
            <MessageSquareText className="h-6 w-6 mr-2 text-primary" />
            <h2 className={`card-title ${mateSc.className} antialiased`}>Detailed Transcript Summary</h2>
          </div>
          
          {detailedSummary ? (
            <div className="prose max-w-none">
              <p>{detailedSummary}</p>
            </div>
          ) : (
            <div className="alert alert-warning">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>Detailed summary generation failed. Please try again.</span>
            </div>
          )}
          
          <div className="card-actions justify-end mt-4">
            <a 
              href={videoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline btn-primary btn-sm"
            >
              <Clock className="h-4 w-4 mr-2" />
              Watch Full Video
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedTranscriptSummary;