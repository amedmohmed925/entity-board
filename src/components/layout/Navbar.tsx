'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { BrandLogoIcon } from '@/components/ui/BrandLogoIcon';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/features', label: 'المميزات' },
  { href: '/demo', label: 'العرض التجريبي' },
  { href: '/pricing', label: 'الأسعار' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      dir="rtl"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-[#060B14]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" prefetch className="flex items-center gap-2 group">
              <BrandLogoIcon className="h-10 w-10 transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                كيان<span className="text-blue-600">بورد</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-blue-600 bg-blue-500/10'
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              href="/login"
              prefetch
              className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
            >
              تسجيل الدخول
            </Link>
            <Link 
              href="/register"
              prefetch
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95"
            >
              ابدأ مجاناً
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
