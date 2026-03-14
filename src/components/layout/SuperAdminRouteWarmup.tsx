'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const superAdminRoutes = [
  '/super-admin',
  '/super-admin/users-teams',
  '/super-admin/plans',
  '/super-admin/templates',
  '/super-admin/ai',
  '/super-admin/reports',
  '/super-admin/integrations',
] as const;

export function SuperAdminRouteWarmup() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    let canceled = false;

    const warmup = async () => {
      for (const route of superAdminRoutes) {
        if (canceled) {
          return;
        }

        try {
          router.prefetch(route);
        } catch {
          // Ignore prefetch warmup failures in development.
        }

        try {
          await fetch(route, { credentials: 'same-origin' });
        } catch {
          // Ignore route warmup failures in development.
        }
      }
    };

    const timerId = window.setTimeout(() => {
      void warmup();
    }, 450);

    return () => {
      canceled = true;
      window.clearTimeout(timerId);
    };
  }, [router]);

  return null;
}
