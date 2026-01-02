
import React from 'react';

interface DiagramProps {
  type: 'intent-flow' | 'api-waiter' | 'frontend-backend';
}

export const Diagram: React.FC<DiagramProps> = ({ type }) => {
  if (type === 'intent-flow') {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center my-8">
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-6">The Vibe Coding Lifecycle</h4>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2 border-2 border-blue-200">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </div>
            <span className="text-sm font-semibold text-slate-700">Intent (You)</span>
          </div>
          <svg className="w-8 h-8 text-slate-300 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2 border-2 border-purple-200 animate-pulse">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            </div>
            <span className="text-sm font-semibold text-slate-700">AI Agent</span>
          </div>
          <svg className="w-8 h-8 text-slate-300 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 border-2 border-emerald-200">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <span className="text-sm font-semibold text-slate-700">Software</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'api-waiter') {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm my-8">
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-6 text-center">The API Waiter Concept</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="font-bold text-blue-600 mb-2">Customer</div>
            <div className="text-xs text-slate-500 italic">User interface</div>
          </div>
          <div className="text-center relative">
            <div className="font-bold text-purple-600 mb-2">Waiter (API)</div>
            <div className="text-xs text-slate-500 italic">Messenger</div>
            <div className="absolute top-0 -left-1/4 w-full border-t-2 border-dashed border-slate-200 mt-3 hidden md:block"></div>
            <div className="absolute top-0 -right-1/4 w-full border-t-2 border-dashed border-slate-200 mt-3 hidden md:block"></div>
          </div>
          <div className="text-center">
            <div className="font-bold text-emerald-600 mb-2">Kitchen</div>
            <div className="text-xs text-slate-500 italic">Server / Database</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
