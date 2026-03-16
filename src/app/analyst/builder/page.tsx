'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ElementType = 'bar' | 'line' | 'pie' | 'kpi';

interface DashboardElement {
  id: string;
  type: ElementType;
  title: string;
  colSpan: number;
  rowSpan: number;
  color: string;
  value?: string;
  trend?: string;
  trendColor?: string;
}

const defaultElements: DashboardElement[] = [
  { id: 'el-1', type: 'bar', title: 'نمو المبيعات الشهري', colSpan: 2, rowSpan: 2, color: 'blue' },
  { id: 'el-2', type: 'kpi', title: 'الطلبات النشطة', colSpan: 1, rowSpan: 1, color: 'amber', value: '842', trend: '0%-', trendColor: 'amber' },
  { id: 'el-3', type: 'kpi', title: 'إجمالي الإيرادات', colSpan: 1, rowSpan: 1, color: 'emerald', value: '124,500', trend: '12%', trendColor: 'emerald' },
  { id: 'el-4', type: 'pie', title: 'توزيع الفئات', colSpan: 1, rowSpan: 2, color: 'blue' },
];

export default function DashboardBuilderPage() {
  const [mounted, setMounted] = useState(false);
  const [elements, setElements] = useState<DashboardElement[]>(defaultElements);
  const [activeElementId, setActiveElementId] = useState<string | null>('el-1');

  useEffect(() => {
    setMounted(true);
  }, []);

  const addElement = (type: ElementType) => {
    const newId = `el-${Date.now()}`;
    let newEl: DashboardElement;

    switch (type) {
      case 'bar':
        newEl = { id: newId, type: 'bar', title: 'مخطط أعمدة جديد', colSpan: 2, rowSpan: 2, color: 'blue' };
        break;
      case 'line':
        newEl = { id: newId, type: 'line', title: 'مخطط خطي جديد', colSpan: 2, rowSpan: 2, color: 'emerald' };
        break;
      case 'pie':
        newEl = { id: newId, type: 'pie', title: 'مخطط دائري جديد', colSpan: 1, rowSpan: 2, color: 'blue' };
        break;
      case 'kpi':
        newEl = { id: newId, type: 'kpi', title: 'مؤشر أداء جديد', colSpan: 1, rowSpan: 1, color: 'amber', value: '0', trend: '0%', trendColor: 'slate' };
        break;
    }

    setElements(prev => [...prev, newEl]);
    setActiveElementId(newId);
  };

  const removeElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (activeElementId === id) setActiveElementId(null);
  };

  const updateActiveElement = (updates: Partial<DashboardElement>) => {
    if (!activeElementId) return;
    setElements(prev => prev.map(el => el.id === activeElementId ? { ...el, ...updates } : el));
  };

  const activeElement = elements.find(e => e.id === activeElementId);

  // Layout Helpers
  const getColSpanClass = (span: number) => {
    return span === 2 ? 'col-span-1 md:col-span-2' : 'col-span-1';
  };
  
  const getRowSpanClass = (span: number) => {
    return span === 2 ? 'row-span-2' : 'row-span-1';
  };

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-[1920px] p-0 md:p-3 xl:p-5 h-[calc(100vh-88px)]">
        <main className="flex-1 flex flex-col-reverse xl:flex-row rounded-2xl border border-slate-200 dark:border-[#1A2A4A] overflow-hidden bg-slate-50 dark:bg-[#050A19] h-full shadow-2xl">
          
          {/* Right Panel: Palette */}
          <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-l border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126] flex flex-col shrink-0 z-20 overflow-y-auto">
             <div className="p-4 border-b border-slate-200 dark:border-[#1A2A4A]">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">عناصر اللوحة</h2>
                <div className="grid grid-cols-2 gap-3">
                   <button onClick={() => addElement('bar')} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-[#2A375A] bg-slate-50 dark:bg-[#0D1632] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition group shadow-sm">
                      <svg className="w-5 h-5 group-hover:text-blue-500 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="text-xs font-bold">أعمدة</span>
                   </button>
                   <button onClick={() => addElement('line')} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-[#2A375A] bg-slate-50 dark:bg-[#0D1632] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-emerald-400 dark:hover:border-[#3A476A] hover:bg-emerald-50 dark:hover:bg-white/5 transition group shadow-sm">
                      <svg className="w-5 h-5 group-hover:text-emerald-500 dark:group-hover:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                      <span className="text-xs font-bold">خطي</span>
                   </button>
                   <button onClick={() => addElement('pie')} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-[#2A375A] bg-slate-50 dark:bg-[#0D1632] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-purple-400 dark:hover:border-[#3A476A] hover:bg-purple-50 dark:hover:bg-white/5 transition group shadow-sm">
                      <svg className="w-5 h-5 group-hover:text-purple-500 dark:group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                      <span className="text-xs font-bold">دائري</span>
                   </button>
                   <button onClick={() => addElement('kpi')} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-[#2A375A] bg-slate-50 dark:bg-[#0D1632] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-amber-400 dark:hover:border-[#3A476A] hover:bg-amber-50 dark:hover:bg-white/5 transition group shadow-sm">
                      <span className="font-mono font-bold text-lg leading-tight group-hover:text-amber-500 dark:group-hover:text-amber-400">12</span>
                      <span className="text-xs font-bold">KPI</span>
                   </button>
                </div>
             </div>

             <div className="p-4 flex-1">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">مصادر المتصلة</h2>
                <div className="space-y-2">
                   <button className="w-full flex items-center gap-3 p-3 rounded-xl border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border text-sm font-medium transition cursor-grab shadow-sm">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                      <span className="truncate">قاعدة بيانات المبيعات</span>
                   </button>
                   <button className="w-full flex items-center gap-3 p-3 rounded-xl border-transparent hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition cursor-grab">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <span className="truncate">تقرير الربع الثالث.csv</span>
                   </button>
                </div>
             </div>
          </aside>

          {/* Center Canvas */}
          <section className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#0A1126] relative z-10" onClick={() => setActiveElementId(null)}>
             
             {/* Filter Bar */}
             <div className="h-14 shrink-0 border-b border-slate-200 dark:border-[#1A2A4A] bg-white/90 dark:bg-[#0A1126]/90 backdrop-blur-sm flex items-center px-4 gap-3 overflow-x-auto" onClick={e => e.stopPropagation()}>
                <button className="text-blue-600 dark:text-blue-500 font-bold text-sm hover:text-blue-700 dark:hover:text-blue-400 shrink-0 select-none mr-2">+ إضافة فلتر</button>
                <div className="h-4 w-px bg-slate-200 dark:bg-[#1A2A4A] shrink-0"></div>
                
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#2A375A] rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500/50 transition whitespace-nowrap shadow-sm">
                   <svg className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                   آخر 30 يوم
                   <svg className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
             </div>

             {/* Canvas Grid Background */}
             <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-100/50 dark:bg-[#080D20] relative">
                {/* Dotted Grid Pattern */}
                <div className="absolute inset-0 opacity-10 dark:opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #64748b 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                {/* Dashboard Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[minmax(120px,auto)] relative z-10 w-full max-w-6xl mx-auto">
                   
                   <AnimatePresence>
                     {elements.map((el) => {
                        const isSelected = activeElementId === el.id;

                        return (
                           <motion.div
                              layout
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: -10 }}
                              key={el.id}
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setActiveElementId(el.id);
                              }}
                              className={`${getColSpanClass(el.colSpan)} ${getRowSpanClass(el.rowSpan)} relative rounded-2xl border-2 transition-all cursor-move focus:outline-none flex flex-col ${
                                 isSelected ? 'border-blue-500 bg-white dark:bg-[#0D1632] shadow-[0_0_30px_rgba(59,130,246,0.15)] z-20' : 'border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0D1632] hover:border-slate-300 dark:hover:border-[#2A375A] shadow-md z-10'
                              }`}
                           >
                              {/* Selection overlay UI */}
                              {isSelected && (
                                 <>
                                    <div className="absolute -top-2 -left-2 w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center cursor-nwse-resize shadow-lg border border-slate-50 dark:border-[#0A1126] hover:scale-110 transition-transform">
                                       <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); removeElement(el.id); }} className="absolute -top-3 -right-3 w-7 h-7 bg-rose-500/90 text-white rounded-full flex items-center justify-center hover:bg-rose-500 hover:scale-110 transition-all shadow-lg border-2 border-slate-50 dark:border-[#0A1126]">
                                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                 </>
                              )}

                              {/* Generic Header */}
                              {el.type !== 'kpi' && (
                                 <h3 className={`text-center font-bold text-sm pt-4 ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {el.title}
                                 </h3>
                              )}

                              {/* Chart Specific Renderings */}
                              <div className="flex-1 p-4 flex flex-col justify-end w-full overflow-hidden pointer-events-none">
                                 {el.type === 'bar' && (
                                    <>
                                       <div className="flex-1 flex items-end justify-between px-2 gap-2 pb-2 mt-4">
                                          {[40, 70, 55, 90, 45, 60, 35].map((h, i) => (
                                             <div key={i} className={`w-full rounded-t-sm transition-all duration-500 ${h === 90 && isSelected ? `bg-${el.color}-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]` : 'bg-slate-200 dark:bg-[#1A2A4A]'}`} style={{ height: `${h}%` }}></div>
                                          ))}
                                       </div>
                                       <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono px-2">
                                          <span>ي</span><span>ف</span><span>م</span><span className={isSelected ? 'text-blue-500 dark:text-blue-400 font-bold' : ''}>أ</span><span>م</span><span>ي</span><span>ل</span>
                                       </div>
                                    </>
                                 )}

                                 {el.type === 'line' && (
                                    <div className="relative w-full h-full flex items-center justify-center opacity-80">
                                       <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
                                          <path d="M0,80 C20,80 30,30 50,40 C70,50 80,10 100,20" stroke="currentColor" strokeWidth="3" className="text-emerald-500" strokeLinecap="round" strokeLinejoin="round"/>
                                          <circle cx="50" cy="40" r="4" fill="currentColor" className="text-emerald-500" />
                                          <circle cx="100" cy="20" r="4" fill="currentColor" className="text-emerald-500" />
                                       </svg>
                                    </div>
                                 )}

                                 {el.type === 'pie' && (
                                    <div className="flex-1 flex items-center justify-center relative mt-4">
                                       <div className={`relative w-28 h-28 rounded-full border-8 border-slate-100 dark:border-[#1A2A4A] flex items-center justify-center transition-colors ${isSelected ? 'shadow-[inset_0_0_30px_rgba(37,99,235,0.1)]' : ''}`}>
                                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                                             <circle cx="56" cy="56" r="48" fill="transparent" stroke="currentColor" className="text-blue-500" strokeWidth="8" strokeDasharray="301" strokeDashoffset="75" strokeLinecap="round"></circle>
                                          </svg>
                                          <span className="text-slate-900 dark:text-white font-bold text-lg">75%</span>
                                       </div>
                                    </div>
                                 )}

                                 {el.type === 'kpi' && (
                                    <div className="flex flex-col h-full justify-between pt-2">
                                       <div className="flex justify-between items-start">
                                          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400">{el.title}</h3>
                                          {el.trend && (
                                             <span className={`text-${el.trendColor}-600 dark:text-${el.trendColor}-500 text-[10px] font-bold bg-${el.trendColor}-50 dark:bg-${el.trendColor}-500/10 px-1.5 py-0.5 rounded`}>{el.trend}</span>
                                          )}
                                       </div>
                                       <p className={`text-2xl lg:text-3xl font-black mt-2 font-mono ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>{el.value}</p>
                                       <div className={`h-1 w-1/2 bg-${el.color}-500 rounded-full mt-4`} />
                                    </div>
                                 )}
                              </div>
                           </motion.div>
                        );
                     })}
                   </AnimatePresence>

                   {/* Drop Zone Placeholder */}
                   <div className="col-span-1 md:col-span-2 row-span-1 rounded-2xl border-2 border-dashed border-slate-300 dark:border-[#2A375A] bg-slate-50 dark:bg-[#131B32]/30 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-[#131B32] transition-colors hover:border-blue-400 dark:hover:border-blue-500/50 cursor-pointer min-h-[160px]">
                      <svg className="w-10 h-10 mb-3 text-slate-300 dark:text-[#2A375A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                      <span className="text-sm font-bold">اسحب عنصراً هنا لإضافته</span>
                   </div>

                </div>
             </div>
          </section>

          {/* Left Panel: Properties Editor */}
          <aside className="w-full lg:w-72 border-t lg:border-t-0 lg:border-r border-slate-200 dark:border-[#1A2A4A] bg-slate-50 dark:bg-[#050A19] flex flex-col shrink-0 z-20 overflow-y-auto duration-300 transition-all">
             <div className="h-14 border-b border-slate-200 dark:border-[#1A2A4A] px-4 flex justify-between items-center shrink-0">
                <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">خصائص العنصر</h2>
             </div>
             
             {activeElementId && activeElement ? (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 overflow-y-auto">
                    {/* General Section */}
                    <div className="mb-6">
                       <h3 className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500 font-bold mb-4">عام</h3>
                       <div className="space-y-4">
                          <div>
                             <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1.5 font-medium">عنوان المخطط</label>
                             <input 
                               type="text" 
                               value={activeElement.title}
                               onChange={(e) => updateActiveElement({ title: e.target.value })}
                               className="w-full bg-white dark:bg-[#0D1632] border border-slate-300 dark:border-[#2A375A] rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition-colors shadow-sm" 
                             />
                          </div>
                          <div>
                             <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1.5 font-medium">نوع الرسم البياني</label>
                             <div className="relative">
                                <select 
                                   value={activeElement.type}
                                   onChange={(e) => updateActiveElement({ type: e.target.value as ElementType })}
                                   className="w-full bg-white dark:bg-[#0D1632] border border-slate-300 dark:border-[#2A375A] rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white appearance-none pr-10 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 shadow-sm"
                                >
                                   <option value="bar">مخطط أعمدة (Bar)</option>
                                   <option value="line">مخطط خطي (Line)</option>
                                   <option value="pie">دائري (Pie)</option>
                                   <option value="kpi">مؤشر (KPI)</option>
                                </select>
                                <svg className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                             </div>
                          </div>
                          {activeElement.type === 'kpi' && (
                             <div>
                                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1.5 font-medium">قيمة المؤشر</label>
                                <input 
                                  type="text" 
                                  value={activeElement.value || ''}
                                  onChange={(e) => updateActiveElement({ value: e.target.value })}
                                  className="w-full bg-white dark:bg-[#0D1632] border border-slate-300 dark:border-[#2A375A] rounded-lg px-3 py-2.5 font-mono text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition-colors shadow-sm" 
                                />
                             </div>
                          )}
                       </div>
                    </div>

                    <div className="h-px w-full bg-slate-200 dark:bg-[#1A2A4A] my-6"></div>

                    {/* Data Section */}
                    <div className="mb-6">
                       <h3 className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500 font-bold mb-4">البيانات</h3>
                       <div className="space-y-4">
                          <div>
                             <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1.5 font-medium">المحور السيني (X-Axis)</label>
                             <div className="flex items-center gap-2 bg-white dark:bg-[#0D1632] border border-slate-300 dark:border-[#2A375A] rounded-lg px-3 py-2 group hover:border-blue-400 dark:hover:border-blue-500/50 transition cursor-pointer shadow-sm">
                                <svg className="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <span className="text-sm font-medium text-slate-900 dark:text-white flex-1 truncate">التاريخ (شهري)</span>
                                <button className="text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="h-px w-full bg-slate-200 dark:bg-[#1A2A4A] my-6"></div>

                    {/* Formatting Section */}
                    <div>
                       <h3 className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500 font-bold mb-4">التنسيق</h3>
                       <div className="space-y-4">
                          <div className="flex items-center justify-between">
                             <span className="text-sm text-slate-700 dark:text-slate-300 select-none cursor-pointer">الامتداد الأفقي واسع</span>
                             <button 
                               onClick={() => updateActiveElement({ colSpan: activeElement.colSpan === 2 ? 1 : 2 })}
                               className={`w-9 h-5 rounded-full relative flex items-center transition-colors ${activeElement.colSpan === 2 ? 'bg-blue-500 dark:bg-blue-600 pr-1' : 'bg-slate-300 dark:bg-[#1A2A4A] pl-1'}`}>
                                <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform shadow-sm ${activeElement.colSpan === 2 ? 'translate-x-[2px]' : '-translate-x-[2px]'}`} />
                             </button>
                          </div>
                          
                          <div className="pt-2">
                             <label className="block text-xs text-slate-600 dark:text-slate-400 mb-2 font-medium">لون السلسلة الأساسي</label>
                             <div className="flex items-center justify-end gap-2">
                                {['blue', 'emerald', 'amber', 'rose', 'purple'].map(color => (
                                   <button 
                                     key={color}
                                     onClick={() => updateActiveElement({ color })}
                                     className={`w-6 h-6 rounded-md bg-${color}-500 border-2 transition-all ${activeElement.color === color ? 'border-slate-800 dark:border-white shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.2)] scale-110' : 'border-transparent hover:border-slate-400 dark:hover:border-white/50'}`}
                                   />
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>
                 </motion.div>
             ) : (
                <div className="p-8 flex flex-col items-center justify-center text-center text-slate-500 h-full opacity-50 select-none">
                   <svg className="w-12 h-12 mb-4 animate-pulse opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                   <p className="text-sm font-bold w-36">حدد عنصراً من اللوحة لتعديل خصائصه</p>
                </div>
             )}
          </aside>
        </main>
    </div>
  );
}
