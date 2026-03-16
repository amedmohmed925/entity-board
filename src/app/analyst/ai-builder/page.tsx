'use client';

import { useState, useEffect } from 'react';

export default function AIBuliderPage() {
  const [mounted, setMounted] = useState(false);
  const [generationStep, setGenerationStep] = useState<'idle' | 'generating' | 'complete'>('idle');
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerate = (text: string) => {
    if(!text.trim()) return;
    setPrompt(text);
    setGenerationStep('generating');
    setTimeout(() => {
      setGenerationStep('complete');
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-[1440px] p-3 md:p-5 min-h-[calc(100vh-88px)] bg-slate-50 dark:bg-[#050A19]">
        <main className="flex-1 flex flex-col pt-8 lg:pt-16 pb-20 items-center">
          
          <div className="w-full max-w-4xl px-4">
             {/* Main Hero Header */}
             <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
                   ما الذي تريد <span className="text-blue-600 dark:text-blue-500 relative inline-block">تحليله<span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500/30 blur-sm rounded-full"></span></span> اليوم؟
                </h1>

                {/* Search / Prompt Bar */}
                <div className="relative group max-w-3xl mx-auto">
                   <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <div className="relative flex items-center bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] rounded-2xl p-2 transition-all hover:border-blue-400 dark:hover:border-[#2A375A] shadow-lg dark:shadow-none">
                      <button 
                         onClick={() => handleGenerate(prompt)}
                         disabled={generationStep === 'generating'}
                         className="h-12 px-6 ml-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-wait">
                         {generationStep === 'generating' ? 'جاري' : 'تحليل'}
                         <svg className={`w-4 h-4 ml-1 ${generationStep === 'generating' ? 'animate-spin' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {generationStep === 'generating' 
                               ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                               : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            }
                         </svg>
                      </button>
                      <input 
                         type="text" 
                         value={prompt}
                         onChange={(e) => setPrompt(e.target.value)}
                         onKeyDown={(e) => { if(e.key === 'Enter') handleGenerate(prompt); }}
                         placeholder="اسأل الذكاء الاصطناعي عن بياناتك، مثلاً: قارن مبيعات الربع الحالي بالماضي..." 
                         className="w-full bg-transparent border-none text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 text-sm md:text-base px-4 h-12"
                      />
                      <div className="hidden md:flex items-center gap-2 pl-4 pr-2 text-blue-600 dark:text-blue-500">
                         <span className="font-mono font-bold tracking-wider text-lg opacity-80 select-none">RK</span>
                         <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                   </div>
                </div>

                {/* Suggestion Chips */}
                <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-3xl mx-auto">
                   <button onClick={() => handleGenerate("أداء الحملات التسويقية الأخيرة")} className="flex items-center gap-2 bg-white dark:bg-[#0D1632] hover:bg-slate-50 dark:hover:bg-[#142247] border border-slate-200 dark:border-[#1A2A4A] text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full text-xs transition-colors shadow-sm dark:shadow-none hover:text-blue-600 dark:hover:text-blue-400 focus:ring-2 focus:ring-blue-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                      أداء الحملات التسويقية الأخيرة
                   </button>
                   <button onClick={() => handleGenerate("ملخص الأداء المالي للعام")} className="flex items-center gap-2 bg-white dark:bg-[#0D1632] hover:bg-slate-50 dark:hover:bg-[#142247] border border-slate-200 dark:border-[#1A2A4A] text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full text-xs transition-colors shadow-sm dark:shadow-none hover:text-blue-600 dark:hover:text-blue-400 focus:ring-2 focus:ring-blue-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      ملخص الأداء المالي للعام
                   </button>
                   <button onClick={() => handleGenerate("تحليل سلوك العملاء الجدد")} className="flex items-center gap-2 bg-white dark:bg-[#0D1632] hover:bg-slate-50 dark:hover:bg-[#142247] border border-slate-200 dark:border-[#1A2A4A] text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full text-xs transition-colors shadow-sm dark:shadow-none hover:text-blue-600 dark:hover:text-blue-400 focus:ring-2 focus:ring-blue-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      تحليل سلوك العملاء الجدد
                   </button>
                   <button onClick={() => handleGenerate("توقع مبيعات الشهر القادم")} className="flex items-center gap-2 bg-white dark:bg-[#0D1632] hover:bg-slate-50 dark:hover:bg-[#142247] border border-slate-200 dark:border-[#1A2A4A] text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full text-xs transition-colors shadow-sm dark:shadow-none hover:text-blue-600 dark:hover:text-blue-400 focus:ring-2 focus:ring-blue-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      توقع مبيعات الشهر القادم
                   </button>
                </div>
             </div>

             {/* Generation Status & Skeleton Grid */}
             <div className={`transition-all duration-1000 ${generationStep !== 'idle' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                
                <div className="flex justify-between items-end mb-6 border-b border-slate-200 dark:border-[#1A2A4A] pb-4">
                   <div className="flex items-center gap-4 text-xs font-medium">
                      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#1A2A4A]/50 px-2 py-1 rounded">
                         <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500"></span> عملاء
                      </span>
                      <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded">
                         <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-500"></span> مبيعات
                      </span>
                   </div>
                   
                   <div className={`flex items-center gap-2 font-bold ${generationStep === 'complete' ? 'text-emerald-600 dark:text-emerald-500' : 'text-blue-600 dark:text-blue-500'}`}>
                      <span className="text-sm">{generationStep === 'complete' ? 'اكتمل إنشاء التقرير' : 'جاري إنشاء التقارير الذكية...'}</span>
                      {generationStep === 'generating' ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      )}
                   </div>
                </div>

                {/* Skeletons Layout matching design */}
                <div className="flex flex-col gap-6 w-full">
                   
                   {/* Top Row: 3 Skeletons */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Left: Circle Chart */}
                      <div className={`rounded-3xl border border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126]/50 shadow-sm dark:shadow-none p-6 flex flex-col h-64 transition-all duration-500 ${generationStep === 'generating' ? 'animate-pulse' : ''}`}>
                         <div className="flex justify-between items-center mb-8">
                            <h3 className="text-sm border-b border-transparent font-bold text-slate-800 dark:text-white">توزيع المبيعات المكتشف</h3>
                            <div className="w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-[#1A2A4A] dark:hover:bg-[#2A375A] transition-colors rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 cursor-pointer">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
                            </div>
                         </div>
                         <div className="flex-1 flex justify-center items-center">
                            {generationStep === 'generating' ? (
                                <div className="w-28 h-28 rounded-full border-8 border-slate-100 dark:border-[#1A2A4A] relative">
                                    <div className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-500/10 blur-xl"></div>
                                </div>
                            ) : (
                                <div className="w-28 h-28 rounded-full flex items-center justify-center relative shadow-lg" style={{background: 'conic-gradient(#3b82f6 0% 45%, #10b981 45% 70%, #f59e0b 70% 100%)'}}>
                                    <div className="w-16 h-16 bg-white dark:bg-[#0A1126] rounded-full shadow-inner flex flex-col items-center justify-center">
                                        <span className="text-[10px] text-slate-500">الإجمالي</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">42K</span>
                                    </div>
                                </div>
                            )}
                         </div>
                         <div className="flex justify-center gap-4 mt-6">
                            {generationStep === 'generating' ? (
                                <>
                                    <div className="w-12 h-2 bg-slate-200 dark:bg-[#1A2A4A] rounded-full"></div>
                                    <div className="w-12 h-2 bg-slate-200 dark:bg-[#1A2A4A] rounded-full"></div>
                                </>
                            ) : (
                                <>
                                    <span className="flex items-center gap-1 text-[10px] text-slate-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div>إلكترونيات</span>
                                    <span className="flex items-center gap-1 text-[10px] text-slate-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>برمجيات</span>
                                </>
                            )}
                         </div>
                      </div>

                      {/* Middle: Bar Chart */}
                      <div className={`rounded-3xl border border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126]/50 shadow-sm dark:shadow-none p-6 flex flex-col h-64 transition-all duration-500 ${generationStep === 'generating' ? 'animate-pulse' : ''}`}>
                         <div className="flex justify-between items-center mb-8">
                            <h3 className="text-sm border-b border-transparent font-bold text-slate-800 dark:text-white">نمو الإيرادات المتوقع</h3>
                            <div className="w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-[#1A2A4A] dark:hover:bg-[#2A375A] transition-colors rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 cursor-pointer">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
                            </div>
                         </div>
                         <div className="flex-1 flex items-end justify-between gap-3 px-2">
                            {generationStep === 'generating' ? (
                                <>
                                    <div className="w-full bg-slate-200 dark:bg-[#1A2A4A] rounded-t-sm h-[40%]"></div>
                                    <div className="w-full bg-slate-200 dark:bg-[#1A2A4A] rounded-t-sm h-[20%]"></div>
                                    <div className="w-full bg-slate-200 dark:bg-[#1A2A4A] rounded-t-sm h-[60%]"></div>
                                    <div className="w-full bg-slate-200 dark:bg-[#1A2A4A] rounded-t-sm h-[30%]"></div>
                                    <div className="w-full bg-slate-200 dark:bg-[#1A2A4A] rounded-t-sm h-[50%]"></div>
                                    <div className="w-full bg-slate-200 dark:bg-[#1A2A4A] rounded-t-sm h-[80%]"></div>
                                </>
                            ) : (
                                <>
                                    <div className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-sm h-[40%] hover:brightness-110 transition-all cursor-pointer relative group"><div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$12k</div></div>
                                    <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-t-sm h-[20%] hover:brightness-110 transition-all cursor-pointer relative group"><div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$8k</div></div>
                                    <div className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-sm h-[60%] hover:brightness-110 transition-all cursor-pointer relative group"><div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$18k</div></div>
                                    <div className="w-full bg-emerald-400 dark:bg-emerald-500 rounded-t-sm h-[30%] hover:brightness-110 transition-all cursor-pointer relative group"><div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$10k</div></div>
                                    <div className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-sm h-[50%] hover:brightness-110 transition-all cursor-pointer relative group"><div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$15k</div></div>
                                    <div className="w-full bg-emerald-500 dark:bg-emerald-600 rounded-t-sm h-[80%] hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] relative group"><div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$24k</div></div>
                                </>
                            )}
                         </div>
                         <div className="w-full h-px bg-slate-200 dark:bg-[#1A2A4A] mt-6 mx-auto"></div>
                      </div>

                      {/* Right: Area Chart */}
                      <div className={`rounded-3xl border border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126]/50 shadow-sm dark:shadow-none p-6 flex flex-col h-64 transition-all duration-500 ${generationStep === 'generating' ? 'animate-pulse' : ''}`}>
                         <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm border-b border-transparent font-bold text-slate-800 dark:text-white">اتجاهات تفاعل العملاء</h3>
                            <div className="w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-[#1A2A4A] dark:hover:bg-[#2A375A] transition-colors rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 cursor-pointer">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
                            </div>
                         </div>
                         <div className="flex-1 bg-slate-50 dark:bg-[#1A2A4A]/30 rounded-xl mb-4 relative overflow-hidden flex items-end">
                            {generationStep === 'generating' ? (
                                <svg className="absolute bottom-0 w-full h-[80%] text-slate-200 dark:text-[#1A2A4A] preserve-aspect-ratio-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                   <path d="M0 100 C 20 0, 50 100, 100 0 L 100 100 Z" fill="currentColor" opacity="0.5" />
                                </svg>
                            ) : (
                                <svg className="absolute bottom-0 w-full h-[80%] text-blue-500" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M0 100 L 0 60 Q 25 20, 50 50 T 100 30 L 100 100 Z" fill="currentColor" opacity="0.2" />
                                    <path d="M0 60 Q 25 20, 50 50 T 100 30" fill="none" stroke="currentColor" strokeWidth="3" />
                                </svg>
                            )}
                         </div>
                         <div className="flex text-[10px] text-slate-400 justify-between px-2">
                             <span>يناير</span><span>فبراير</span><span>مارس</span><span>أبريل</span>
                         </div>
                      </div>

                   </div>

                   {/* Bottom Full Width Chart Skeleton */}
                   <div className={`rounded-3xl border border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126]/50 shadow-sm dark:shadow-none p-6 flex flex-col h-72 mb-8 transition-all duration-500 ${generationStep === 'generating' ? 'animate-pulse' : ''}`}>
                      <div className="flex justify-between items-center mb-6">
                         <div className="flex gap-2 text-sm">
                           <button className="px-3 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500 rounded-lg font-bold">المقارنة السنوية</button>
                           <button className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-[#1A2A4A] rounded-lg transition-colors">توقعات الذكاء الاصطناعي</button>
                         </div>
                         <h3 className="text-sm font-bold text-slate-900 dark:text-white">تفصيل الأداء والمبيعات مقارنة بالعام السابق</h3>
                      </div>
                      <div className="flex-1 bg-slate-50 dark:bg-[#1A2A4A]/20 rounded-xl flex flex-col justify-end border border-slate-100 dark:border-[#1A2A4A]/50 relative overflow-hidden group p-4">
                         {/* Grid lines */}
                         <div className="absolute inset-x-0 inset-y-4 flex flex-col justify-between opacity-10 pointer-events-none">
                            <div className="w-full h-px bg-slate-400 dark:bg-white"></div><div className="w-full h-px bg-slate-400 dark:bg-white"></div><div className="w-full h-px bg-slate-400 dark:bg-white"></div><div className="w-full h-px bg-slate-400 dark:bg-white"></div>
                         </div>
                         
                         {generationStep === 'complete' && (
                             <div className="relative w-full h-full flex items-end pb-2">
                                {/* Simulated Line 1 */}
                                <svg className="absolute inset-0 w-full h-full text-blue-500" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M0 80 Q 20 70, 40 50 T 80 40 L 100 20" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="40" cy="50" r="1.5" fill="currentColor" />
                                    <circle cx="80" cy="40" r="1.5" fill="currentColor" />
                                </svg>
                                {/* Simulated Line 2 */}
                                <svg className="absolute inset-0 w-full h-full text-emerald-400" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M0 90 Q 30 80, 50 60 T 90 20 L 100 10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                                </svg>
                                
                                <div className="absolute bottom-0 inset-x-0 w-full flex justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700/50">
                                    <span>الربع الأول</span>
                                    <span>الربع الثاني</span>
                                    <span>الربع الثالث</span>
                                    <span>الربع الرابع</span>
                                </div>
                             </div>
                         )}

                         {generationStep === 'generating' && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                <svg className="w-12 h-12 text-slate-300 dark:text-[#2A375A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                             </div>
                         )}
                      </div>
                   </div>

                </div>

             </div>
          </div>
        </main>
    </div>
  );
}
