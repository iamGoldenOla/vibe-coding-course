
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MODULES, TOOLKIT, PROMPT_LIBRARY, GLOSSARY, CASE_STUDIES } from './constants';
import { ModuleId, ModuleData, Tool, ViewType, Lesson } from './types';
import { GoogleGenAI } from "@google/genai";

const InternalVideoPlayer: React.FC<{ url: string }> = ({ url }) => {
  // Ensure we have a valid embed URL. If it's a youtu.be link, convert it.
  const getEmbedUrl = (link: string) => {
    if (link.includes('youtube.com/embed')) return link;
    const idMatch = link.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|user\/\S+|live\/))([^\?&"'>]+)/);
    const videoId = idMatch ? idMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : link;
  };

  return (
    <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-900 my-10 bg-black animate-in zoom-in duration-700">
      <iframe
        className="w-full h-full"
        src={getEmbedUrl(url)}
        title="Vibe Architecture Masterclass"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const VisualManifestor: React.FC<{ prompt: string; alt: string }> = ({ prompt, alt }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          }
        },
      });

      let foundImage = false;
      for (const candidate of response.candidates || []) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            setImageUrl(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
        if (foundImage) break;
      }
      
      if (!foundImage) throw new Error("No image part found in response.");
    } catch (err: any) {
      console.error(err);
      setError("Failed to manifest visual. Check your API key or prompt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Architectural Manifestation</h4>
        {!imageUrl && !loading && (
          <button 
            onClick={generateImage}
            className="text-[10px] font-black bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all shadow-xl flex items-center uppercase tracking-widest"
          >
            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Manifest Visual
          </button>
        )}
      </div>

      <div className="relative aspect-video rounded-3xl bg-slate-200 overflow-hidden shadow-inner flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] animate-pulse">Consulting the Oracle...</p>
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt={alt} className="w-full h-full object-cover animate-in fade-in duration-1000" />
        ) : (
          <div className="text-center p-8">
            <p className="text-sm text-slate-400 font-black uppercase tracking-widest mb-2 opacity-50">Visual is waiting for your intent.</p>
            {error && <p className="text-rose-500 text-[10px] font-black uppercase">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

const Quiz: React.FC<{ module: ModuleData; onComplete: (score: number) => void }> = ({ module, onComplete }) => {
  const [answers, setAnswers] = useState<number[]>(new Array(module.quiz.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const score = answers.reduce((acc, curr, idx) => curr === module.quiz[idx].correctIndex ? acc + 1 : acc, 0);

  const handleSubmit = () => {
    setShowResults(true);
    onComplete(score);
  };

  return (
    <div className="mt-20 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-3xl font-black mb-4 flex items-center font-serif italic tracking-tight">
          <svg className="w-8 h-8 mr-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          System Vibe Audit
        </h3>
        <p className="text-slate-400 mb-12 font-medium max-w-xl">Verify your architectural understanding of {module.title.split(':')[0]} before proceeding to higher systems.</p>

        <div className="space-y-12">
          {module.quiz.map((q, qIdx) => (
            <div key={qIdx} className="space-y-6">
              <p className="font-black text-xl leading-snug">{qIdx + 1}. {q.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    disabled={showResults}
                    onClick={() => setAnswers(prev => {
                      const next = [...prev];
                      next[qIdx] = oIdx;
                      return next;
                    })}
                    className={`p-6 text-left rounded-2xl border-2 transition-all font-bold text-sm ${
                      answers[qIdx] === oIdx 
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                        : 'border-slate-800 hover:border-slate-700 hover:bg-white/5'
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
            className="mt-16 w-full py-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest"
          >
            Submit System Audit
          </button>
        ) : (
          <div className="mt-12 p-8 bg-white/5 rounded-3xl text-center border border-white/10">
            <p className="text-xl font-light uppercase tracking-widest">Status: <span className="font-black text-blue-400 text-4xl ml-2">{score === module.quiz.length ? 'VERIFIED' : 'FAIL'}</span></p>
            {score === module.quiz.length ? (
              <p className="text-emerald-400 mt-4 font-black uppercase tracking-[0.3em] text-[10px]">Architectural Integrity Confirmed.</p>
            ) : (
              <button 
                onClick={() => { setAnswers(new Array(module.quiz.length).fill(-1)); setShowResults(false); }}
                className="mt-8 text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-[0.4em] border border-slate-700 px-6 py-3 rounded-full"
              >
                Retake Audit
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
  const [activeView, setActiveView] = useState<ViewType | 'toolkit'>('curriculum');
  const [vibeXP, setVibeXP] = useState(0);
  const [completedModules, setCompletedModules] = useState<Set<ModuleId>>(new Set());
  const mainRef = useRef<HTMLElement>(null);

  // Robust Scroll-to-Top logic
  useEffect(() => {
    window.scrollTo(0, 0);
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FBFBFA]">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen z-20">
        <div className="p-8 border-b border-slate-100">
          <button onClick={() => { setActiveModuleId(ModuleId.Intro); setActiveView('curriculum'); }} className="flex items-center hover:opacity-80 transition-opacity">
            <span className="bg-slate-900 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 shrink-0 font-black shadow-lg">V</span>
            <span className="text-xl font-black text-slate-900 tracking-tighter">Vibe Academy</span>
          </button>
          <div className="mt-8">
            <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
              <span>System Mastery</span>
              <span>{Math.round((vibeXP/3000)*100)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-slate-900 h-1.5 transition-all duration-1000 ease-out" 
                style={{ width: `${Math.min((vibeXP / 3000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-8">
          <div>
            <p className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">The Track</p>
            <nav className="space-y-1">
              {MODULES.map((mod, idx) => (
                <button
                  key={mod.id}
                  onClick={() => { setActiveModuleId(mod.id); setActiveView('curriculum'); }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center group relative ${
                    activeModuleId === mod.id && activeView === 'curriculum'
                      ? 'bg-slate-100 text-slate-900' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center mr-4 text-[10px] font-black transition-all ${
                    completedModules.has(mod.id) 
                      ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-100' 
                      : activeModuleId === mod.id && activeView === 'curriculum'
                        ? 'bg-slate-900 text-white shadow-2xl' 
                        : 'bg-slate-100 text-slate-400'
                  }`}>
                    {completedModules.has(mod.id) ? '✓' : idx + 1}
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-black truncate ${activeModuleId === mod.id && activeView === 'curriculum' ? 'text-slate-900' : 'text-slate-400'}`}>
                    {mod.title.split(':')[0]}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div>
            <p className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Academy Intel</p>
            <nav className="space-y-1">
              {[
                {id: 'toolkit', label: 'Pro Toolkit (40)', emoji: '🛠️'},
                {id: 'prompts', label: 'Prompt Library', emoji: '📑'},
                {id: 'glossary', label: 'Glossary', emoji: '📖'},
                {id: 'cases', label: 'Case Studies', emoji: '💡'}
              ].map((view) => (
                <button 
                  key={view.id}
                  onClick={() => setActiveView(view.id as any)}
                  className={`w-full text-left p-3 rounded-xl text-[10px] uppercase tracking-[0.2em] font-black flex items-center transition-all ${activeView === view.id ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <span className="mr-3 text-lg opacity-60">{view.emoji}</span> {view.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black border-2 border-white shadow-lg overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 leading-tight uppercase tracking-tight">John Architect</p>
              <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">Vibe Mastery Verified</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main ref={mainRef} className="flex-1 overflow-y-auto custom-scroll selection:bg-blue-100 selection:text-blue-900">
        <div className="max-w-4xl mx-auto w-full px-8 py-16 md:px-16 md:py-24">
          
          {activeView === 'curriculum' && (
            <div className="animate-in fade-in duration-700">
              <header className="mb-24">
                <div className="flex items-center text-[10px] font-black text-blue-600 uppercase tracking-[0.5em] mb-8">
                  <span>Academy Track</span>
                  <span className="mx-5 text-slate-300">/</span>
                  <span className="text-slate-400">{activeModule.title.split(':')[0]}</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-slate-900 mb-10 leading-[0.85] tracking-tighter">
                  {activeModule.title}
                </h2>
                <p className="text-xl text-slate-500 leading-relaxed font-bold max-w-2xl border-l-4 border-slate-100 pl-8">
                  {activeModule.description}
                </p>
              </header>

              <div className="space-y-40">
                {activeModule.lessons.map((lesson, index) => (
                  <section key={index} className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <div className="mb-14 border-b-2 border-slate-100 pb-10">
                      <h3 className="text-4xl font-black text-slate-900 flex items-center tracking-tighter">
                        <span className="bg-slate-900 text-white mr-8 text-lg font-black w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl">
                          {index + 1}
                        </span>
                        {lesson.title}
                      </h3>
                    </div>

                    <div className="space-y-20">
                      <div className="bg-white p-12 md:p-16 rounded-[3rem] border border-slate-200 shadow-sm relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform"></div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-10 relative">The Manifest Logic</h4>
                        <p className="text-3xl md:text-4xl font-serif italic text-slate-900 bg-slate-50/80 p-12 rounded-[2rem] border-l-[8px] border-slate-900 mb-12 leading-tight relative shadow-inner">
                          "{lesson.conceptAnalogy}"
                        </p>
                        <p className="text-xl text-slate-600 leading-relaxed font-bold relative">{lesson.conceptDescription}</p>
                      </div>

                      {lesson.videoUrl && <InternalVideoPlayer url={lesson.videoUrl} />}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {lesson.instructions.map((instr, iIdx) => (
                          <div key={iIdx} className="bg-white border-2 border-slate-100 p-10 rounded-[2.5rem] shadow-sm text-slate-900 font-black hover:border-blue-500 hover:shadow-2xl transition-all flex items-start group">
                            <span className="text-blue-600 mr-6 shrink-0 group-hover:rotate-12 transition-transform text-xl">➡</span>
                            <span className="leading-snug text-lg">{instr.replace('➡', '').trim()}</span>
                          </div>
                        ))}
                      </div>

                      <VisualManifestor prompt={lesson.imagePrompt} alt={lesson.title} />

                      <div className="bg-slate-900 p-12 rounded-[3rem] border border-slate-800 shadow-2xl">
                         <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-8">Architectural Mental Model</h4>
                         <p className="text-lg text-slate-300 font-bold italic leading-relaxed font-serif">"{lesson.visualGuideDescription}"</p>
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              <Quiz module={activeModule} onComplete={handleQuizComplete} />

              <div className="mt-32 pt-20 border-t-2 border-slate-100 flex flex-col items-center">
                {completedModules.has(activeModuleId) ? (
                   <div className="w-full animate-in zoom-in duration-500">
                     <p className="text-center text-emerald-600 font-black uppercase tracking-[0.4em] text-[11px] mb-8">Module Architecture Verified</p>
                     <button 
                       onClick={handleNextModule}
                       className="w-full py-10 bg-slate-900 text-white rounded-[2.5rem] font-black text-3xl hover:bg-blue-600 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.2)] flex items-center justify-center group tracking-tighter"
                     >
                       {activeModuleId === ModuleId.FinalProject ? 'Unlock Graduation' : 'Initiate Higher System'}
                       <svg className="w-10 h-10 ml-6 group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5-5 5M6 7l5 5-5 5"></path></svg>
                     </button>
                   </div>
                ) : (
                  <div className="text-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping mb-6 mx-auto"></div>
                    <p className="text-slate-400 text-sm font-black uppercase tracking-[0.3em]">Pass System Audit to Unlock Next Module</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeView === 'toolkit' && (
            <div className="animate-in fade-in duration-700">
              <h2 className="text-7xl font-black text-slate-900 mb-8 tracking-tighter">Pro Toolkit</h2>
              <p className="text-xl text-slate-500 mb-20 font-bold max-w-2xl">The 40 essential tools for the professional Vibe Architect stack. Every tool here is vetted for high-fidelity manifest.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {TOOLKIT.map((tool, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-600 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <span className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{tool.category}</span>
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 font-black text-xs border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">{idx + 1}</div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{tool.name}</h3>
                    <p className="text-slate-500 font-bold leading-relaxed">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'prompts' && (
            <div className="animate-in fade-in duration-700">
              <h2 className="text-7xl font-black text-slate-900 mb-8 tracking-tighter">Manifesto Library</h2>
              <p className="text-xl text-slate-500 mb-20 font-bold">Standardized high-context intent patterns for reliable system manifestation.</p>
              <div className="grid grid-cols-1 gap-10">
                {PROMPT_LIBRARY.map((p, i) => (
                  <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm relative group">
                    <span className="absolute top-10 right-10 bg-slate-100 text-slate-500 text-[10px] font-black uppercase px-5 py-2 rounded-full tracking-widest">{p.category}</span>
                    <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{p.title}</h3>
                    <p className="text-xs text-slate-400 mb-10 font-black uppercase tracking-[0.3em]">Scenario Context: {p.scenario}</p>
                    <div className="bg-slate-900 text-slate-200 p-10 rounded-[2.5rem] font-mono text-sm leading-relaxed border-4 border-slate-800 relative shadow-2xl">
                      <code className="block whitespace-pre-wrap">{p.template}</code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(p.template)}
                        className="mt-8 w-full py-4 bg-white/10 hover:bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all"
                      >
                        Copy Intent Manifesto
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'glossary' && (
            <div className="animate-in fade-in duration-700">
              <h2 className="text-7xl font-black text-slate-900 mb-8 tracking-tighter">Architecture Lexicon</h2>
              <p className="text-xl text-slate-500 mb-20 font-bold">The precise terminology of the Vibe Coding manifest.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {GLOSSARY.map((g, i) => (
                  <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-slate-900 transition-all group">
                    <h3 className="font-black text-slate-900 text-2xl mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{g.term}</h3>
                    <p className="text-lg text-slate-500 leading-relaxed font-bold italic font-serif">"{g.definition}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'cases' && (
            <div className="animate-in fade-in duration-700">
              <h2 className="text-7xl font-black text-slate-900 mb-8 tracking-tighter">Manifest Records</h2>
              <p className="text-xl text-slate-500 mb-20 font-bold">Verified outcomes of architectural intent in production.</p>
              <div className="space-y-16">
                {CASE_STUDIES.map((c, i) => (
                  <div key={i} className="bg-white rounded-[4rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-2xl">
                    <VisualManifestor prompt={c.imagePrompt} alt={c.title} />
                    <div className="p-16">
                      <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter">{c.title}</h3>
                      <p className="text-xl text-slate-500 mb-12 font-bold">{c.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">The Architectural Vibe</p>
                          <p className="text-lg text-slate-800 font-black leading-snug">{c.vibe}</p>
                        </div>
                        <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100">
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-4">System Outcome</p>
                          <p className="text-lg text-emerald-900 font-black leading-snug">{c.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'graduation' && (
            <div className="animate-in zoom-in duration-1000 flex flex-col items-center justify-center py-24 text-center">
               <div className="w-36 h-36 bg-slate-900 rounded-[3rem] flex items-center justify-center text-white text-7xl font-black mb-14 shadow-[0_30px_60px_rgba(0,0,0,0.3)] animate-pulse">V</div>
               <h2 className="text-7xl font-black text-slate-900 mb-10 tracking-tighter leading-[0.9]">Vision Realized.<br/>Architect Verified.</h2>
               <p className="text-2xl text-slate-500 max-w-2xl mb-24 leading-relaxed font-bold">
                 You have successfully evolved from a syntax-worker to a Vibe Architect. The global manifest is now under your direction.
               </p>
               <div className="bg-white p-20 rounded-[5rem] border-[16px] border-slate-50 shadow-2xl relative max-w-4xl w-full border-double">
                  <div className="absolute top-0 right-0 p-16">
                    <div className="w-28 h-28 bg-slate-900/5 rounded-full border-2 border-dashed border-slate-900/20 flex items-center justify-center text-slate-900 font-black text-[10px] uppercase tracking-[0.5em] text-center px-5 prototype-seal">Mastery Sealed</div>
                  </div>
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em] mb-20">Professional Credential of System Intent</h3>
                  <p className="text-6xl font-black text-slate-900 mb-6 font-serif italic tracking-tighter">John Architect</p>
                  <div className="w-32 h-1.5 bg-slate-900 mx-auto mb-14"></div>
                  <p className="text-xl text-slate-500 font-bold mb-24 leading-relaxed max-w-xl mx-auto">This manifest confirms expert proficiency in Full-Stack Orchestration, Agentic Debugging, and Professional System Manifestation.</p>
                  <div className="flex justify-between items-end px-6 border-t-2 border-slate-50 pt-14">
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Manifest Origin</p>
                      <p className="text-lg font-black text-slate-900">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">System XP Manifested</p>
                       <p className="text-lg font-black text-blue-600 tracking-tighter">{vibeXP} Mastered</p>
                    </div>
                  </div>
               </div>
               <button 
                onClick={() => { setActiveView('curriculum'); setActiveModuleId(ModuleId.Intro); }}
                className="mt-24 px-16 py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-2xl hover:bg-blue-600 transition-all shadow-2xl uppercase tracking-tighter"
               >
                 Review The Track
               </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
