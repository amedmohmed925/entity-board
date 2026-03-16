'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DemoSection } from '@/components/sections/DemoSection';
import { CTASection } from '@/components/sections/CTASection';
import { useState, useEffect, type CSSProperties } from 'react';

export default function DemoPage() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'شاهد كيان بورد في العمل الآن';

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
      
      {/* Hero Section for Demo */}
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
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_10%,rgba(168,85,247,0.1),transparent_50%)]" />
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
                'radial-gradient(240px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.24), rgba(168,85,247,0.18) 40%, rgba(6,182,212,0.08) 58%, transparent 76%)',
            }}
          />
          
          {/* Constant Floating Elements */}
          <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-[pulse_12s_infinite]" />
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-[bounce_15s_infinite_alternate]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-bold mb-8 transition-all hover:bg-purple-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            تجربة تفاعلية حية
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight min-h-[120px]">
            <span className="text-gray-900 dark:text-white">تجربة</span> {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {displayText}
            </span>
            <span className="inline-block w-1 h-10 md:h-14 bg-blue-600 dark:bg-purple-600 ml-2 animate-[blink_1s_infinite] align-middle" />
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            استكشف كيف يمكن لكيان بورد أن يحول طريقة إدارتك لبياناتك من خلال عرض توضيحي مباشر للمميزات الأساسية.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Demo Section - No external glow as requested */}
      <div className="px-4">
        <DemoSection />
      </div>

      {/* Features Spotlight during Demo */}
      <section className="py-24" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-16">لماذا يختار المحترفون ديمو كيان بورد؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "بيانات حقيقية", desc: "شاهد كيف تظهر الأرقام والرسوم البيانية في الوقت الفعلي." },
                    { title: "واجهة مرنة", desc: "جرب سهولة التنقل بين الأدوات واللوحات المختلفة." },
                    { title: "تكامل كامل", desc: "تعرف على كيفية ربط مصادر بياناتك المختلفة في مكان واحد." }
                ].map((feature, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 hover:border-purple-500/50 transition-all group overflow-hidden relative">
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-purple-500/5 rounded-full group-hover:scale-[3] transition-transform duration-700" />
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{feature.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 relative z-10">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
