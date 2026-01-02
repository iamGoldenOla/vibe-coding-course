
import React, { useState, useMemo, useEffect } from 'react';
import { MODULES, TOOLKIT, PROMPT_LIBRARY, GLOSSARY, CASE_STUDIES } from './constants';
import { ModuleId, ModuleData, Tool, ViewType } from './types';
import { ProTip } from './components/ProTip';
import { Diagram } from './components/Diagram';

const ToolTable: React.FC<{ tools: Tool[] }> = ({ tools }) => (
  <div className="overflow-x-auto my-8 bg-white rounded-xl border border-slate-200 shadow-sm">
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tool Name</th>
          <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
          <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {tools.map((tool, idx) => (
          <tr key={idx} className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">{tool.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
              <span className="px-2 py-1 bg-slate-100 rounded-full">{tool.category}</span>
            </td>
            <td className="px-6 py-4 text-sm text-slate-600 leading-relaxed">{tool.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Quiz: React.FC<{ module: ModuleData; onComplete: (score: number) => void }> = ({ module, onComplete }) => {
  const [answers, setAnswers] = useState<number[]>(new Array(module.quiz.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const score = answers.reduce((acc, curr, idx) => curr === module.quiz[idx].correctIndex ? acc + 1 : acc, 0);

  const handleSubmit = () => {
    setShowResults(true);
    onComplete(score);
  };

  return (
    <div className="mt-16 bg-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2 flex items-center">
          <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Vibe Check Quiz
        </h3>
        <p className="text-slate-400 mb-10">Test your mastery of {module.title.split(':')[0]}.</p>

        <div className="space-y-10">
          {module.quiz.map((q, qIdx) => (
            <div key={qIdx} className="space-y-4">
              <p className="font-semibold text-lg">{qIdx + 1}. {q.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    disabled={showResults}
                    onClick={() => setAnswers(prev => {
                      const next = [...prev];
                      next[qIdx] = oIdx;
                      return next;
                    })}
                    className={`p-4 text-left rounded-xl border transition-all ${
                      answers[qIdx] === oIdx 
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                        : 'border-slate-700 hover:border-slate-600 hover:bg-white/5'
                    } ${showResults && oIdx === q.correctIndex ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' : ''}
                      ${showResults && answers[qIdx] === oIdx && oIdx !== q.correctIndex ? 'border-rose-500 bg-rose-500/30 text-rose-400' : ''}
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!showResults ? (
          <button
            onClick={handleSubmit}
            disabled={answers.includes(-1)}
            className="mt-12 w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl font-bold transition-all shadow-lg"
          >
            Check My Vibe
          </button>
        ) : (
          <div className="mt-10 p-6 bg-white/5 rounded-xl text-center border border-white/10">
            <p className="text-xl font-light">Result: <span className="font-bold text-blue-400 text-3xl ml-2">{score} / {module.quiz.length}</span></p>
            {score === module.quiz.length ? (
              <p className="text-emerald-400 mt-2 font-bold uppercase tracking-widest text-xs">Vibe Verified! You've mastered this module.</p>
            ) : (
              <button 
                onClick={() => { setAnswers(new Array(module.quiz.length).fill(-1)); setShowResults(false); }}
                className="mt-6 text-sm text-slate-400 hover:text-white underline underline-offset-4"
              >
                Try Again to Unlock Next Module
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>(ModuleId.Intro);
  const [activeView, setActiveView] = useState<ViewType>('curriculum');
  const [vibeXP, setVibeXP] = useState(0);
  const [completedModules, setCompletedModules] = useState<Set<ModuleId>>(new Set());

  // Scroll to top on any view or module change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainArea = document.querySelector('main');
    if (mainArea) mainArea.scrollTop = 0;
  }, [activeModuleId, activeView]);

  const activeModule = useMemo(() => 
    MODULES.find(m => m.id === activeModuleId) || MODULES[0]
  , [activeModuleId]);

  const handleQuizComplete = (score: number) => {
    if (score === activeModule.quiz.length) {
      if (!completedModules.has(activeModuleId)) {
        setVibeXP(prev => prev + 500);
        setCompletedModules(prev => new Set(prev).add(activeModuleId));
      }
    } else {
      setVibeXP(prev => prev + 50); // Small participation XP
    }
  };

  const handleNextModule = () => {
    const idx = MODULES.findIndex(m => m.id === activeModuleId);
    if (idx < MODULES.length - 1) {
      setActiveModuleId(MODULES[idx + 1].id);
      setActiveView('curriculum');
    } else if (completedModules.size === MODULES.length) {
      setActiveView('graduation');
    }
  };

  const handlePrevModule = () => {
    const idx = MODULES.findIndex(m => m.id === activeModuleId);
    if (idx > 0) {
      setActiveModuleId(MODULES[idx - 1].id);
      setActiveView('curriculum');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen z-20">
        <div className="p-8 border-b border-slate-100">
          <button onClick={() => { setActiveModuleId(ModuleId.Intro); setActiveView('curriculum'); }} className="text-xl font-black text-slate-900 tracking-tight flex items-center hover:opacity-80 transition-opacity">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 shrink-0 shadow-md shadow-blue-200">V</span>
            Vibe Academy
          </button>
          <div className="mt-6">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              <span>Vibe XP</span>
              <span>{vibeXP} XP</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min((vibeXP / 3000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-6">
          <div>
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Curriculum</p>
            <nav className="space-y-1">
              {MODULES.map((mod, idx) => (
                <button
                  key={mod.id}
                  onClick={() => { setActiveModuleId(mod.id); setActiveView('curriculum'); }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center group relative ${
                    activeModuleId === mod.id && activeView === 'curriculum'
                      ? 'bg-blue-50 text-blue-700 font-bold' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center mr-3 text-[10px] font-black transition-all ${
                    completedModules.has(mod.id) 
                      ? 'bg-emerald-500 text-white shadow-emerald-100 shadow-md' 
                      : activeModuleId === mod.id && activeView === 'curriculum'
                        ? 'bg-blue-600 text-white shadow-blue-100 shadow-md' 
                        : 'bg-slate-100 text-slate-400'
                  }`}>
                    {completedModules.has(mod.id) ? '✓' : idx + 1}
                  </div>
                  <span className="text-xs font-semibold truncate">{mod.title.split(':')[0]}</span>
                </button>
              ))}
            </nav>
          </div>

          <div>
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Resources</p>
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveView('prompts')}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center transition-all ${activeView === 'prompts' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <span className="mr-3 text-lg">📑</span> Prompt Library
              </button>
              <button 
                onClick={() => setActiveView('glossary')}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center transition-all ${activeView === 'glossary' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <span className="mr-3 text-lg">📖</span> Glossary
              </button>
              <button 
                onClick={() => setActiveView('cases')}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center transition-all ${activeView === 'cases' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <span className="mr-3 text-lg">💡</span> Case Studies
              </button>
            </nav>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black border-2 border-white shadow-sm overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 leading-tight">John Student</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Vibe Creator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scroll">
        <div className="max-w-4xl mx-auto w-full px-6 py-12 md:px-12 md:py-16">
          
          {activeView === 'curriculum' && (
            <div className="animate-in fade-in duration-500">
              <header className="mb-16">
                <div className="flex items-center text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4">
                  <span>Academy curriculum</span>
                  <span className="mx-3 text-slate-300">/</span>
                  <span className="text-slate-500">{activeModule.title.split(':')[0]}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                  {activeModule.title}
                </h2>
                <p className="text-xl text-slate-500 leading-relaxed font-medium">
                  {activeModule.description}
                </p>
              </header>

              <hr className="border-slate-200/60 my-12" />

              <div className="space-y-24">
                {activeModule.lessons.map((lesson, index) => (
                  <section key={index} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-10">
                      <h3 className="text-2xl font-black text-slate-800 flex items-center">
                        <span className="text-blue-600 mr-4 text-sm font-black border-2 border-blue-600 w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                          {index + 1}
                        </span>
                        {lesson.title}
                      </h3>
                    </div>

                    <div className="space-y-12">
                      <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                          The Concept: {lesson.conceptTitle}
                        </h4>
                        <p className="text-slate-700 text-lg md:text-xl italic bg-slate-50 p-6 md:p-8 rounded-xl border-l-4 border-blue-500 mb-8 font-semibold leading-relaxed">
                          "{lesson.conceptAnalogy}"
                        </p>
                        <p className="text-slate-600 text-lg leading-relaxed">{lesson.conceptDescription}</p>
                      </div>

                      {/* Unique Diagrams Per Module */}
                      {activeModuleId === ModuleId.Intro && index === 0 && <Diagram type="intent-flow" />}
                      {activeModuleId === ModuleId.Automation && index === 0 && <Diagram type="api-waiter" />}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lesson.instructions.map((instr, iIdx) => (
                          <div key={iIdx} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm text-slate-700 font-bold hover:border-blue-500 transition-all flex items-start">
                            <span className="text-blue-600 mr-3 shrink-0">➡</span>
                            {instr.replace('➡', '').trim()}
                          </div>
                        ))}
                      </div>

                      <div className="bg-slate-100 p-8 rounded-2xl border-2 border-dashed border-slate-200">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Action Orientation: Visualizing Success</h4>
                        <p className="text-sm text-slate-600 mb-6 font-medium italic">{lesson.visualGuideDescription}</p>
                        <div className="relative group overflow-hidden rounded-xl">
                          <img 
                            src={`https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200&h=675&sig=${activeModule.id}${index}`} 
                            className="rounded-xl border border-slate-200 shadow-sm w-full h-auto transition-transform duration-700 group-hover:scale-105"
                            alt="Interface Reference"
                          />
                          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors pointer-events-none"></div>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              <Quiz module={activeModule} onComplete={handleQuizComplete} />

              {/* Module Transition Navigation */}
              <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col items-center">
                {completedModules.has(activeModuleId) ? (
                   <div className="w-full">
                     <p className="text-center text-emerald-600 font-black uppercase tracking-widest text-[10px] mb-4">Module Achievement Unlocked</p>
                     <button 
                       onClick={handleNextModule}
                       className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center group"
                     >
                       {activeModuleId === ModuleId.FinalProject ? 'Claim My Certificate' : 'Begin Next Module'}
                       <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                     </button>
                   </div>
                ) : (
                  <p className="text-slate-400 text-sm font-bold italic">Pass the Vibe Check to unlock the next module.</p>
                )}
                
                <div className="mt-8 flex gap-4">
                  <button onClick={handlePrevModule} disabled={activeModuleId === ModuleId.Intro} className="text-xs font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors disabled:opacity-0">
                    &larr; Previous Module
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeView === 'prompts' && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Prompt Library</h2>
              <p className="text-slate-500 mb-12 font-medium">Pre-tested prompt templates to accelerate your Vibe Workflow. Copy and modify these to fit your intent.</p>
              <div className="grid grid-cols-1 gap-6">
                {PROMPT_LIBRARY.map((p, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4">
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase px-3 py-1 rounded-full">{p.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-400 mb-6 italic">Scenario: {p.scenario}</p>
                    <div className="bg-slate-900 text-blue-400 p-6 rounded-xl font-mono text-sm leading-relaxed border border-slate-800 relative group/code">
                      <code className="block whitespace-pre-wrap">{p.template}</code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(p.template)}
                        className="absolute bottom-4 right-4 bg-slate-800 p-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center shadow-lg"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                        Copy to Clipboard
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'glossary' && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Academy Glossary</h2>
              <p className="text-slate-500 mb-12 font-medium">Essential terminology for the modern AI Architect. Master these to communicate better with your AI Agents.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GLOSSARY.map((g, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all">
                    <h3 className="font-black text-blue-600 text-lg mb-2">{g.term}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{g.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'cases' && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Case Studies</h2>
              <p className="text-slate-500 mb-12 font-medium">See how professional Vibe Coders manifest successful software products through clear intent.</p>
              <div className="space-y-8">
                {CASE_STUDIES.map((c, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row group transition-all hover:shadow-xl">
                    <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden shrink-0">
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-8 flex-1">
                      <h3 className="text-2xl font-black text-slate-900 mb-2">{c.title}</h3>
                      <p className="text-slate-500 mb-6 font-medium">{c.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <p className="text-[10px] font-black text-blue-600 uppercase mb-1">The Vibe</p>
                          <p className="text-xs text-slate-700 font-bold">{c.vibe}</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                          <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">The Outcome</p>
                          <p className="text-xs text-emerald-900 font-bold">{c.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'graduation' && (
            <div className="animate-in zoom-in duration-1000 flex flex-col items-center justify-center py-20 text-center">
               <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-5xl font-black mb-10 shadow-2xl animate-bounce shadow-blue-500/40">V</div>
               <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">Congratulations, Vibe Architect!</h2>
               <p className="text-xl text-slate-500 max-w-xl mb-12 leading-relaxed font-medium">
                 You have successfully bridged the gap between thought and creation. You are now a certified Vibe Architect.
               </p>
               <div className="bg-white p-12 rounded-[3rem] border-8 border-slate-100 shadow-2xl relative max-w-2xl w-full border-double">
                  <div className="absolute top-0 right-0 p-8">
                    <div className="w-24 h-24 bg-blue-600/10 rounded-full border-2 border-dashed border-blue-600/20 flex items-center justify-center text-blue-600 font-black text-[10px] uppercase tracking-widest animate-spin-slow">Official Academy Seal</div>
                  </div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10">Certificate of Professional Intent</h3>
                  <p className="text-4xl font-black text-slate-900 mb-4 font-serif">John Student</p>
                  <div className="w-20 h-0.5 bg-blue-600 mx-auto mb-6"></div>
                  <p className="text-sm text-slate-500 font-medium mb-12 leading-relaxed">Has successfully demonstrated proficiency in the Vibe Coding Lifecycle, AI-First Architecture, and Multi-Modal Component Assembly.</p>
                  <div className="flex justify-between items-end px-4">
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase text-slate-400">Issued On</p>
                      <p className="text-sm font-black text-slate-900">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black uppercase text-slate-400">Academy Score</p>
                       <p className="text-sm font-black text-blue-600">{vibeXP} XP Mastery</p>
                    </div>
                  </div>
               </div>
               <button 
                onClick={() => { setActiveView('curriculum'); setActiveModuleId(ModuleId.Intro); }}
                className="mt-16 px-10 py-4 bg-slate-900 text-white rounded-xl font-black hover:bg-slate-800 transition-all shadow-xl"
               >
                 Review All Modules
               </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
