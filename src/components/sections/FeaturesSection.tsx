'use client';

const features = [
  {
    icon: '⚡',
    title: 'تحليلات فورية',
    desc: 'احصل على رؤى لحظية من بياناتك مع تحديثات تلقائية في الوقت الفعلي دون تأخير.',
    color: 'blue',
  },
  {
    icon: '🤖',
    title: 'ذكاء اصطناعي متقدم',
    desc: 'توقعات دقيقة ونمذجة مدعومة بأحدث نماذج الذكاء الاصطناعي والتعلم الآلي.',
    color: 'purple',
  },
  {
    icon: '🎨',
    title: 'لوحات قابلة للتخصيص',
    desc: 'صمّم لوحات التحكم الخاصة بك بالسحب والإفلات بدون أي مهارات تقنية.',
    color: 'cyan',
  },
  {
    icon: '📊',
    title: 'تقارير احترافية',
    desc: 'أنشئ وشارك تقارير بصرية جذابة بضغطة زر واحدة مع فريقك.',
    color: 'green',
  },
  {
    icon: '🔗',
    title: 'تكاملات سهلة',
    desc: 'ربط سهل مع أكثر من 100 مصدر بيانات وأداة عمل شائعة في السوق.',
    color: 'orange',
  },
  {
    icon: '🔒',
    title: 'أمان على مستوى المؤسسات',
    desc: 'حماية بياناتك بأعلى معايير التشفير والأمان المعتمدة عالمياً.',
    color: 'red',
  },
];

const colorMap: Record<string, string> = {
  blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 group-hover:border-blue-500/60',
  purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 group-hover:border-purple-500/60',
  cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 group-hover:border-cyan-500/60',
  green: 'from-green-500/20 to-green-600/10 border-green-500/30 group-hover:border-green-500/60',
  orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 group-hover:border-orange-500/60',
  red: 'from-red-500/20 to-red-600/10 border-red-500/30 group-hover:border-red-500/60',
};

const iconBg: Record<string, string> = {
  blue: 'bg-blue-500/20 text-blue-400',
  purple: 'bg-purple-500/20 text-purple-400',
  cyan: 'bg-cyan-500/20 text-cyan-400',
  green: 'bg-green-500/20 text-green-400',
  orange: 'bg-orange-500/20 text-orange-400',
  red: 'bg-red-500/20 text-red-400',
};

export function FeaturesSection() {
  return (
    <section id="features" dir="rtl" className="py-24 bg-gray-50 dark:bg-[#060B14] relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-4">
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">المميزات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            كل ما تحتاجه في{' '}
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              مكان واحد
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            منصة متكاملة تجمع بين الذكاء الاصطناعي وسهولة الاستخدام لتحويل بياناتك إلى قرارات فعّالة
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative p-6 rounded-2xl border bg-gradient-to-br transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                colorMap[feature.color]
              } bg-white dark:bg-transparent dark:bg-gradient-to-br`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${iconBg[feature.color]}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
