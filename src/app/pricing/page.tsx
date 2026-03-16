'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PricingSection } from '@/components/sections/PricingSection';
import { CTASection } from '@/components/sections/CTASection';
import { useState, useEffect, type CSSProperties } from 'react';

export default function PricingPage() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'اختر الخطة المناسبة لنمو أعمالك';

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
      
      {/* Hero Section for Pricing */}
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
          
          {/* Constant Floating Elements */}
          <div className="absolute top-20 right-[10%] w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-[pulse_10s_infinite]" />
          <div className="absolute bottom-10 left-[10%] w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] animate-[pulse_10s_infinite_2s]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold mb-8">
             خطط أسعار شفافة وبسيطة
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight min-h-[140px] md:min-h-[144px]">
            <span className="text-gray-900 dark:text-white">خطة ذكية</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {displayText}
            </span>
            <span className="inline-block w-1 h-10 md:h-14 bg-blue-600 dark:bg-purple-600 ml-2 animate-[blink_1s_infinite] align-middle" />
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            استثمر في مستقبل عملك مع باقات مرنة مصممة لتناسب الشركات الناشئة والمؤسسات الكبيرة على حد سواء.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Main Pricing Section */}
      <div className="relative z-10">
        <PricingSection />
      </div>

      {/* Comparisons / FAQ with basic animation */}
      <section className="py-24 bg-gray-50/50 dark:bg-white/[0.02]" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">أسئلة متكررة حول الأسعار</h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                    { q: "هل يمكنني تغيير خطتي لاحقاً؟", a: "نعم، يمكنك الترقية أو تقليل خطتك في أي وقت من خلال لوحة التحكم." },
                    { q: "هل توجد رسوم خفية؟", a: "بكل تأكيد لا. ما تراه هو ما تدفعه، والأسعار تشمل كافة التحديثات القادمة." },
                    { q: "ما هي طرق الدفع المتاحة؟", a: "نقبل جميع البطاقات الائتمانية الرئيسية، التحويلات البنكية، وخدمات الدفع الإلكتروني." },
                    { q: "هل تقدمون خصماً للدفع السنوي؟", a: "نعم! نوفر خصم 20% عند اختيار الدفع السنوي بدلاً من الشهري." }
                ].map((item, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#0D1526] border border-gray-200 dark:border-white/10 hover:border-blue-500/50 transition-all group">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">{item.q}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.a}</p>
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
