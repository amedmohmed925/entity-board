'use client';
import { useState, useEffect } from 'react';

const tabs = [
  { id: 'analytics', label: 'التحليلات', icon: '' },
  { id: 'ai', label: 'الذكاء الاصطناعي', icon: '' },
  { id: 'reports', label: 'التقارير', icon: '' },
];

const AnimatedNumber = ({ value, duration = 2000 }: { value: string; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const target = parseInt(value.replace(/[^0-9]/g, ''));
  const isDecimal = value.includes('.');
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    let start = 0;
    const end = target;
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    const timer = setInterval(() => {
      current += increment;
      setDisplayValue(current);
      if (current === end) clearInterval(timer);
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {isDecimal ? (displayValue / 10).toFixed(1) : displayValue.toLocaleString('ar-EG')}
      {suffix}
    </span>
  );
};

export function DemoSection() {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <section id="demo" dir="rtl" className="py-24 bg-white dark:bg-[#060B14] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/5 dark:bg-cyan-600/10 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-4">
            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">النموذج التجريبي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
            شاهد{' '}
            <span style={{ background: 'linear-gradient(135deg,#06B6D4,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              كيان بورد
            </span>{' '}
            في العمل
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            استكشف إمكانيات المنصة من خلال عروض تفاعلية مباشرة
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Demo Window */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-gray-200 dark:border-[#1E2D4A] shadow-2xl bg-white dark:bg-[#0D1526] transition-all duration-500">
          {/* Window bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-[#0A0F1E] border-b border-gray-200 dark:border-[#1E2D4A]">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-100 dark:bg-[#1E2D4A] rounded-lg px-3 py-1 text-[10px] text-gray-400 text-center font-mono tracking-wider">
                ENTITY-BOARD.APP/DEMO/{activeTab.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Content based on tab */}
          <div className="p-8 min-h-[400px]">
            {activeTab === 'analytics' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-600 rounded-full" />
                    لوحة التحليلات الذكية
                  </h3>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { l: 'الزوار النشطون', v: '24531', c: '+12%', col: 'blue', icon: '' },
                    { l: 'المبيعات اليومية', v: '3421', c: '+8%', col: 'green', icon: '' },
                    { l: 'الإيرادات الشهرية', v: '89', c: '+23%', col: 'purple', icon: '', suffix: 'K' },
                    { l: 'معدل التحويل', v: '3.2', c: '+2%', col: 'cyan', icon: '' },
                  ].map((s, idx) => (
                    <div key={s.l} className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0A0F1E] border border-gray-100 dark:border-[#1E2D4A] hover:border-blue-500/30 transition-colors group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{s.l}</span>
                        <span className="grayscale group-hover:grayscale-0 transition-all">{s.icon}</span>
                      </div>
                      <div className={`text-2xl font-black ${s.col === 'blue' ? 'text-blue-500' : s.col === 'green' ? 'text-green-500' : s.col === 'purple' ? 'text-purple-500' : 'text-cyan-500'}`}>
                        <AnimatedNumber value={s.v + (s.suffix || '')} duration={2000 + (idx * 200)} />
                      </div>
                      <div className="text-xs font-medium text-green-400 flex items-center gap-1 mt-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
                        {s.c}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-6 bg-gray-50 dark:bg-[#0A0F1E] border border-gray-100 dark:border-[#1E2D4A] relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">مخطط الأداء المباشر</div>
                        <div className="text-xs text-gray-500">تحديث تلقائي كل  ثوانٍ</div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-[10px] text-gray-400">النمو</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-purple-500" />
                            <span className="text-[10px] text-gray-400">التفاعل</span>
                        </div>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 h-40">
                    {[40, 65, 45, 85, 55, 95, 75, 90, 60, 100, 80, 110, 70, 95, 65, 85].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 rounded-t-lg relative group/bar transition-all duration-500 ease-out" 
                        style={{ 
                            height: i % 2 === 0 ? `${h}%` : `${h-15}%`, 
                            background: `linear-gradient(to top, ${i % 2 === 0 ? '#3B82F6' : '#A855F7'}, ${i % 2 === 0 ? '#60A5FA' : '#C084FC'})`,
                            animation: `grow 1.5s ease-out forwards ${i * 0.05}s, pulse-subtle 4s infinite ${i * 0.1}s`
                        }}
                      >
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {h}% نمو
                         </div>
                      </div>
                    ))}
                  </div>
                  {/* Grid Lines */}
                  <div className="absolute inset-x-6 bottom-6 top-16 flex flex-col justify-between pointer-events-none opacity-20">
                     {[1,2,3,4].map(l => <div key={l} className="w-full h-px bg-gray-300 dark:bg-white/10" />)}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="flex flex-col items-center justify-center h-full py-12 animate-in slide-in-from-bottom duration-500">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
                    <span className="text-3xl"></span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">مساعد الذكاء الاصطناعي قيد التنفيذ</h3>
                <p className="text-gray-500 text-center max-w-sm">يقوم النظام الآن بتحليل أنماط البيانات لتقديم توصيات ذكية لنمو عملك.</p>
                <div className="mt-8 flex gap-2">
                    {[1,2,3].map(i => <div key={i} className={`w-2 h-2 rounded-full bg-blue-500 animate-bounce`} style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900 dark:text-white">أحدث التقارير</h3>
                    <button className="text-xs text-blue-500 font-bold hover:underline">تحميل الكل CSV</button>
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-[#0A0F1E] border border-gray-100 dark:border-[#1E2D4A] hover:bg-white dark:hover:bg-[#1E2D4A] transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">تقرير الأداء المالي - مارس {i}</div>
                        <div className="text-[10px] text-gray-500 font-mono">ID: RE-2024-00{i}  . ميجابايت</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-tighter">جاهز</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grow {
          from { height: 0; opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.85; transform: scaleY(0.98); }
        }
      `}</style>
    </section>
  );
}
