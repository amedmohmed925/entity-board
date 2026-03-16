'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #3B82F6, #7C3AED)'
          : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      }}
      aria-label="تبديل المظهر"
    >
      <span
        className={`absolute right-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center text-[10px] ${
          isDark ? '-translate-x-[24px]' : 'translate-x-0'
        }`}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
