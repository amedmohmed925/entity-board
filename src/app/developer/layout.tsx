import { DeveloperTopbar } from '@/components/layout/DeveloperTopbar';
import { DeveloperSidebar } from '@/components/layout/DeveloperSidebar';

export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="developer-theme min-h-screen bg-[#F3F7FF] transition-colors duration-300 dark:bg-[#050A19]">
      <DeveloperTopbar />
      <div className="flex pt-[72px] lg:pt-[88px]">
        <DeveloperSidebar />
        <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-[1440px]">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}
