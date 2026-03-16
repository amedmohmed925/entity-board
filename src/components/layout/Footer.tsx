'use client';

import { BrandLogoIcon } from '@/components/ui/BrandLogoIcon';

const footerLinks = {
  product: {
    title: 'المنتج',
    links: [
      { label: 'المميزات', href: '#features' },
      { label: 'الأسعار', href: '#pricing' },
      { label: 'النموذج التجريبي', href: '#demo' },
      { label: 'API', href: '#api' },
      { label: 'التغييرات', href: '#changelog' },
    ],
  },
  company: {
    title: 'الشركة',
    links: [
      { label: 'عن الشركة', href: '#about' },
      { label: 'المدونة', href: '#blog' },
      { label: 'الوظائف', href: '#careers' },
      { label: 'الصحافة', href: '#press' },
      { label: 'الشركاء', href: '#partners' },
    ],
  },
  support: {
    title: 'الدعم',
    links: [
      { label: 'الوثائق', href: '#docs' },
      { label: 'مركز المساعدة', href: '#help' },
      { label: 'سياسة الخصوصية', href: '#privacy' },
      { label: 'شروط الاستخدام', href: '#terms' },
      { label: 'تواصل معنا', href: '/contact' },
    ],
  },
};

const socialLinks = [
  { label: 'X', icon: '𝕏', href: '#' },
  { label: 'LinkedIn', icon: 'in', href: '#' },
  { label: 'Instagram', icon: '📸', href: '#' },
  { label: 'YouTube', icon: '▶', href: '#' },
];

export function Footer() {
  return (
    <footer dir="rtl" className="bg-gray-50 dark:bg-[#030711] border-t border-gray-200 dark:border-[#1E2D4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <BrandLogoIcon className="h-9 w-9" />
              <span className="text-xl font-black text-gray-900 dark:text-white">كيان بورد</span>
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-xs">
              الجيل القادم من ذكاء الأعمال. حوّل بياناتك إلى قرارات ذكية بلمحة بصر.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-gray-200 dark:bg-white/5 hover:bg-blue-500/20 dark:hover:bg-blue-500/20 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-[#1E2D4A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            جميع الحقوق محفوظة © ٢٠٢٦ كيان بورد
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-500 dark:text-gray-500">جميع الأنظمة تعمل بشكل طبيعي</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
