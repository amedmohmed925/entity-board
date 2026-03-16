'use client';

import { OwnerSidebar } from '@/components/layout/OwnerSidebar';
import { OwnerTopbar } from '@/components/layout/OwnerTopbar';
import { ToastProvider } from '@/components/ui/Toast';

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050A19] transition-colors duration-300">
      <OwnerTopbar />
      <div className="flex pt-[72px] lg:pt-[88px] max-w-[1440px] mx-auto">
        <OwnerSidebar />
        <main className="flex-1 w-full p-4 md:p-6 lg:p-8" dir="rtl">
          {children}
        </main>
      </div>
    </div>
  );
}
