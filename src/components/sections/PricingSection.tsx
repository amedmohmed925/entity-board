'use client';
import { useState } from 'react';

const plans = [
  {
    name: 'المبتدئ',
    priceMonthly: 'مجاناً',
    priceYearly: 'مجاناً',
    period: '',
    desc: 'للأفراد والمشاريع الصغيرة',
    features: ['٣ لوحات تحكم', '١٠٠٠ سجل بيانات', 'تقارير أساسية', 'دعم بالبريد الإلكتروني'],
    cta: 'ابدأ مجاناً',
    popular: false,
    color: 'default',
  },
  {
    name: 'الاحترافي',
    priceMonthly: '١٩٩',
    priceYearly: '١٥٩',
    period: 'ريال/شهر',
    desc: 'للفرق والمشاريع المتوسطة',
    features: [
      'لوحات تحكم غير محدودة',
      'بيانات غير محدودة',
      'ذكاء اصطناعي متقدم',
      'تقارير مخصصة',
      'تكاملات متعددة',
      'دعم أولوية ٢٤/٧',
    ],
    cta: 'ابدأ الآن',
    popular: true,
    color: 'gradient',
  },
  {
    name: 'المؤسسي',
    priceMonthly: '٧٩٩',
    priceYearly: '٦٣٩',
    period: 'ريال/شهر',
    desc: 'للشركات والمؤسسات الكبيرة',
    features: [
      'كل مميزات الاحترافي',
      'مدير حساب مخصص',
      'تدريب وإعداد مخصص',
      'SLA مضمون ٩٩.٩٪',
      'تكاملات API مخصصة',
      'أمان على مستوى المؤسسات',
    ],
    cta: 'تواصل معنا',
    popular: false,
    color: 'default',
  },
];

export function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" dir="rtl" className="py-24 bg-gray-50 dark:bg-[#060B14] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/2 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">الأسعار</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
            خطة تناسب{' '}
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              كل عمل
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">ابدأ مجاناً وطوّر حسب احتياجاتك</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-gray-100 dark:bg-white/5 rounded-xl">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${!yearly ? 'bg-white dark:bg-[#0D1526] text-gray-900 dark:text-white shadow' : 'text-gray-500 dark:text-gray-400'}`}
            >
              شهري
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${yearly ? 'bg-white dark:bg-[#0D1526] text-gray-900 dark:text-white shadow' : 'text-gray-500 dark:text-gray-400'}`}
            >
              سنوي
              <span className="px-1.5 py-0.5 text-xs bg-green-500/20 text-green-500 rounded-full font-bold">وفر ٢٠٪</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-gradient-to-b from-blue-600/10 to-purple-600/10 border-blue-500/50 shadow-2xl shadow-blue-500/10'
                  : 'bg-white dark:bg-[#0D1526] border-gray-200 dark:border-[#1E2D4A] hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                    ⭐ الأكثر شيوعاً
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{plan.desc}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-black ${plan.popular ? 'text-blue-500' : 'text-gray-900 dark:text-white'}`}>
                    {yearly && plan.priceYearly !== 'مجاناً' ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  {plan.period && <span className="text-sm text-gray-500 dark:text-gray-400">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-blue-500/30'
                    : 'border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
