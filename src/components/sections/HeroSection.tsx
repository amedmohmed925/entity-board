'use client';

import type { CSSProperties } from 'react';
import { Typewriter } from '@/components/ui/Typewriter';

export function HeroSection() {
  return (
    <section
      id="home"
      dir="rtl"
      className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-[#060B14] pt-16"
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
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        {/* Grid pattern restored specifically for Hero only */}
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
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
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                الجيل القادم من ذكاء الأعمال
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-gray-900 dark:text-white mb-6 min-h-[180px] md:min-h-[144px] flex flex-wrap items-center">
              <span className="text-gray-900 dark:text-white ml-3">حول بياناتك إلى</span>
              <Typewriter 
                texts={[
                  '[قرارات ذكية]{bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent} بلمحة بصر',
                  '[نجاح مستمر]{bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent} بكل سهولة',
                  '[تقارير فورية]{bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent} في ثوانٍ'
                ]}
                className="pb-1"
              />
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg">
              كيان بورد يساعدك على فهم أداء عملك بعمق من خلال تحليلات فورية، وتوقعات ذكية مدعومة
              بالذكاء الاصطناعي، ولوحات تحكم قابلة للتخصيص بالكامل.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#start"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-bold text-white rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1"
              >
                ابدأ تجربتك المجانية
                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-bold rounded-2xl border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white bg-white/50 dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
              >
                <span className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                شاهد العرض التجريبي
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-200 dark:border-white/10">
              <div className="text-center">
                <div className="text-2xl font-black text-gray-900 dark:text-white">+5000</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">شركة نشطة</div>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-black text-gray-900 dark:text-white">98%</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">رضا العملاء</div>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-black text-gray-900 dark:text-white">3x</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">سرعة القرار</div>
              </div>
            </div>
          </div>
          {/* Dashboard Preview Visual */}
          <div className="order-1 lg:order-2 relative animate-float">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-20" />
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden aspect-[4/3]">
              {/* Mock Dashboard UI */}
              <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="w-32 h-2 bg-gray-200 dark:bg-white/10 rounded-full" />
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5" />
                  ))}
                </div>
                <div className="h-40 rounded-2xl bg-blue-500/5 border border-blue-500/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-end p-4 gap-2">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-500/20 rounded-t-lg" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
