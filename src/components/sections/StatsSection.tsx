'use client';

const stats = [
  { value: '+5000', label: 'شركة تثق بنا', icon: '🏢' },
  { value: '98%', label: 'رضا العملاء', icon: '⭐' },
  { value: '3x', label: 'سرعة اتخاذ القرار', icon: '🚀' },
  { value: '+40%', label: 'زيادة في الإنتاجية', icon: '📈' },
];

export function StatsSection() {
  return (
    <section dir="rtl" className="py-16 bg-white dark:bg-[#0A0F1E] border-y border-gray-100 dark:border-[#1E2D4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-black mb-1" style={{ background: 'linear-gradient(135deg,#3B82F6,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
