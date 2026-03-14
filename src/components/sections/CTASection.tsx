'use client';

export function CTASection() {
  return (
    <section dir="rtl" className="py-24 relative overflow-hidden bg-white dark:bg-[#060B14]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-cyan-600/10" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl p-10 sm:p-14 border border-blue-500/20 dark:border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 relative overflow-hidden">
          {/* BG glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative">
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
              جاهز لتحويل{' '}
              <span style={{ background: 'linear-gradient(135deg,#3B82F6,#7C3AED,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                بياناتك؟
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              انضم لأكثر من <strong className="text-blue-500">٥٠٠٠</strong> شركة تستخدم كيان بورد لاتخاذ قرارات أذكى وأسرع
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#start"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 text-lg"
              >
                ابدأ مجاناً الآن
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-2xl border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white bg-white/50 dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-200 text-lg backdrop-blur-sm"
              >
                تحدث مع خبير
              </a>
            </div>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
              ✓ لا حاجة لبطاقة ائتمان &nbsp;·&nbsp; ✓ ٣٠ يوم تجريبي مجاني &nbsp;·&nbsp; ✓ إلغاء في أي وقت
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
