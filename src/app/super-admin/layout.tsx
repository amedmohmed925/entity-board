import { SuperAdminTopbar } from '@/components/layout/SuperAdminTopbar';
import { SuperAdminRouteWarmup } from '@/components/layout/SuperAdminRouteWarmup';

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="super-admin-theme min-h-screen bg-[#F3F7FF] transition-colors duration-300 dark:bg-[#050A19]">
      <SuperAdminRouteWarmup />
      <SuperAdminTopbar />
      <div className="pt-[78px] md:pt-[86px]">{children}</div>
    </div>
  );
}
