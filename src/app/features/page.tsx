'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { CTASection } from '@/components/sections/CTASection';
import { useState, useEffect, type CSSProperties } from 'react';

export default function FeaturesPage() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'لنمو أعمالك الرقمية';

  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    
    const animate = () => {
      const currentText = fullText.slice(0, i);
      setDisplayText(currentText);

      if (!isDeleting && i < fullText.length) {
        i++;
        setTimeout(animate, 150);
      } else if (isDeleting && i > 0) {
        i--;
        setTimeout(animate, 100);
      } else {
        isDeleting = !isDeleting;
        setTimeout(animate, isDeleting ? 2000 : 500);
      }
    };

    const timer = setTimeout(animate, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#060B14]">
      <Navbar />
      
      {/* Hero Section for Features */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        dir="rtl"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
          e.currentTarget.style.setProperty('--mouse-opacity', '1');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.setProperty('--mouse-opacity', '0');
        }}
        style={
          {
            '--mouse-x': '50%',
            '--mouse-y': '50%',
            '--mouse-opacity': '0',
          } as CSSProperties
        }
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_10%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div
            className="absolute inset-0 opacity-[0.08] dark:opacity-[0.07]"
            style={{
              backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-300"
            style={{
              opacity: 'var(--mouse-opacity, 0)',
              background:
                'radial-gradient(240px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.28), rgba(124,58,237,0.16) 40%, rgba(6,182,212,0.08) 58%, transparent 76%)',
            }}
          />
          
          {/* Constant Floating Elements Animation */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-[bounce_10s_infinite_alternate]" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-[pulse_8s_infinite]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold mb-8 transition-transform hover:scale-105 duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            استكشف إمكانيات كيان بورد
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight min-h-[160px] md:min-h-[144px]">
            <span className="text-gray-900 dark:text-white">مميزات مصممة</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {displayText}
            </span>
            <span className="inline-block w-1 h-10 md:h-14 bg-blue-600 dark:bg-purple-600 ml-2 animate-[blink_1s_infinite] align-middle" />
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            نحن نقدم لك مجموعة متكاملة من الأدوات التي تساعدك على فهم بياناتك، إدارة فريقك، وتحقيق أهدافك بكفاءة عالية.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Main Features Section */}
      <FeaturesSection />

      {/* Additional Deep Dive Features */}
      <section className="py-24 bg-gray-50/50 dark:bg-white/[0.02] overflow-hidden" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative group">
                {/* Continuous Glow Animation */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 animate-[pulse_4s_infinite] transition-opacity" />
                
                <div className="relative rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl bg-white dark:bg-[#1E293B] aspect-video flex items-center justify-center transform group-hover:scale-[1.01] transition-transform duration-500">
                    <div className="w-full h-full p-8 flex flex-col gap-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse [animation-delay:0.2s]" />
                                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse [animation-delay:0.4s]" />
                            </div>
                            <div className="w-32 h-3 bg-gray-200 dark:bg-white/10 rounded-full" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 h-full">
                            <div className="col-span-2 space-y-4">
                                <div className="h-1/2 bg-blue-500/10 rounded-2xl border border-blue-500/20 p-4 relative overflow-hidden">
                                    <div className="flex items-end gap-1 h-full">
                                        {[40, 70, 45, 90, 65, 80, 55, 60, 40].map((h, i) => (
                                            <div key={i} className="flex-1 bg-blue-500/40 rounded-t-sm animate-[grow_2s_infinite_alternate]" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 h-[calc(50%-1rem)]">
                                    <div className="bg-purple-500/10 rounded-2xl border border-purple-500/20 animate-pulse" />
                                    <div className="bg-cyan-500/10 rounded-2xl border border-cyan-500/20 animate-pulse [animation-delay:1s]" />
                                </div>
                            </div>
                            <div className="bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-4 space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="space-y-2 animate-[slide-in_1s_forwards]" style={{ animationDelay: `${i * 0.2}s` }}>
                                        <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full" />
                                        <div className="w-2/3 h-2 bg-gray-100 dark:bg-white/5 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="order-1 md:order-2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                تحليلات متقدمة <br />
                <span className="text-blue-600">بلمسة واحدة</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  { title: "تقارير ذكية", desc: "أنشئ تقارير مفصلة في ثوانٍ معدودة باستخدام الذكاء الاصطناعي." },
                  { title: "تنبؤات مستقبلية", desc: "توقع الخطوات القادمة لأعمالك بناءً على أنماط البيانات السابقة." },
                  { title: "تخصيص كامل", desc: "صمم لوحة التحكم الخاصة بك لتناسب احتياجاتك الفريدة تماماً." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group cursor-default">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white dark:bg-[#1E2D4A] flex items-center justify-center border border-gray-200 dark:border-white/10 shadow-sm group-hover:border-blue-500 transition-colors duration-300">
                      <svg className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes grow {
          from { height: 20%; }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <CTASection />
      <Footer />
    </main>
  );
}
