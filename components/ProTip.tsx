
import React from 'react';

interface ProTipProps {
  children: React.ReactNode;
}

export const ProTip: React.FC<ProTipProps> = ({ children }) => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-bold text-amber-800 uppercase tracking-wide">Pro-Tip</p>
          <div className="mt-1 text-sm text-amber-700 font-medium">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
