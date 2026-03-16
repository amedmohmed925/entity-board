import { Metadata } from 'next';
import { AnalystTopbar } from '@/components/layout/AnalystTopbar';
import { AnalystSidebar } from '@/components/layout/AnalystSidebar';

export const metadata: Metadata = {
  title: 'Analyst Dashboard | لوحة التحكم',
  description: 'لوحة التحكم للمحللين والبيانات المتقدمة',
};

export default function AnalystLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 dark:bg-[#050A19] text-slate-900 dark:text-white selection:bg-blue-500/30 selection:text-blue-200 flex flex-col font-sans transition-colors duration-300 analyst-theme">
      {/* Topbar is already fixed inside its component, but we ensure layout accounts for it */}
      <AnalystTopbar />
      
      {/* Main Layout Container below Topbar */}
      <div className="flex flex-1 pt-[72px] md:pt-[88px]">
        
        {/* Persistent Global Sidebar - Self-managed width, hidden on mobile */}
        <AnalystSidebar />

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-x-hidden">
          {children}
        </div>

      </div>
    </div>
  );
}
