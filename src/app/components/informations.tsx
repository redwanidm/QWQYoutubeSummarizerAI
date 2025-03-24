import React from 'react';

import {Sparkles,Youtube,Code} from 'lucide-react';

class Informations extends React.Component {
    state = {};
    render() { 
        return (  <div className="mt-16 grid gap-8 sm:grid-cols-3">
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
          </div> );
    }
}
 
export default Informations;