import React from 'react';
import { Globe } from 'lucide-react';
import {mateSc} from '../ui/fonts'
export type Language = 'english' | 'arabic' | 'french';
interface LanguageSelectorProps {
  value: Language;
  onValueChange: (value: Language) => void;
}

const LANGUAGES = [
  { value: 'english', label: 'English', nativeName: 'English' },
  { value: 'arabic', label: 'Arabic', nativeName: 'العربية' },
  { value: 'french', label: 'French', nativeName: 'Français' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onValueChange }) => {
  return (
    <div className="dropdown dropdown-hover  mt-4 w-full sm:w-[150px]">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-ghost  border-base-300/70 border-1 sm:rounded-none w-full flex justify-start items-center normal-case"
      >
        <Globe className="h-4 w-4 mr-2" />
      {LANGUAGES.find(lang => lang.value === value)?.label || 'Language'}
      </div>
      <ul 
        tabIndex={0} 
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
      >
        {LANGUAGES.map((lang) => (
          <li key={lang.value}>
            <a 
              onClick={() => onValueChange(lang.value as Language)}
              className="flex justify-between items-center"
            >
              <span className={`${mateSc.className}`} >{lang.label}</span>
              <span className="text-xs opacity-50">{lang.nativeName}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;