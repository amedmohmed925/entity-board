'use client';

import { ViewerSidebar } from '@/components/layout/ViewerSidebar';
import { ViewerTopbar } from '@/components/layout/ViewerTopbar';

export default function ViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050A19] transition-colors duration-300">
      <ViewerTopbar />
      <div className="flex pt-[72px] lg:pt-[88px] max-w-[1440px] mx-auto">
        <ViewerSidebar />
        <main className="flex-1 w-full p-4 md:p-6 lg:p-8" dir="rtl">
          {children}
        </main>
      </div>
    </div>
  );
}
