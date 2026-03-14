'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PublicRouteSkeletons } from '@/components/layout/PublicRouteSkeletons';

const warmupRoutes = ['/', '/features', '/demo', '/pricing', '/login', '/register'] as const;

function PublicTransitionOverlay({ targetPath }: { targetPath: string }) {
  return (
    <div className="fixed inset-0 z-[85] bg-slate-100/85 dark:bg-[#050A19]/92 backdrop-blur-[1px]">
      <PublicRouteSkeletons path={targetPath} />
    </div>
  );
}

export function PublicRouteTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetPath, setTargetPath] = useState('');
  const clearRef = useRef<number | null>(null);

  useEffect(() => {
    if (clearRef.current) {
      window.clearTimeout(clearRef.current);
      clearRef.current = null;
    }

    setIsNavigating(false);
    setTargetPath('');
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith('/super-admin')) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;

      if (!anchor) {
        return;
      }

      if (anchor.target && anchor.target !== '_self') {
        return;
      }

      if (anchor.hasAttribute('download')) {
        return;
      }

      let targetUrl: URL;
      try {
        targetUrl = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (targetUrl.origin !== window.location.origin) {
        return;
      }

      if (targetUrl.hash && targetUrl.pathname === window.location.pathname) {
        return;
      }

      const nextPath = targetUrl.pathname;
      if (nextPath === window.location.pathname) {
        return;
      }

      setTargetPath(nextPath);
      setIsNavigating(true);

      if (clearRef.current) {
        window.clearTimeout(clearRef.current);
      }

      clearRef.current = window.setTimeout(() => {
        setIsNavigating(false);
      }, 12000);
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      if (clearRef.current) {
        window.clearTimeout(clearRef.current);
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' || pathname.startsWith('/super-admin')) {
      return;
    }

    let isCanceled = false;

    const warmupRoutesInDev = async () => {
      for (const route of warmupRoutes) {
        if (isCanceled) {
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
      void warmupRoutesInDev();
    }, 450);

    return () => {
      isCanceled = true;
      window.clearTimeout(timerId);
    };
  }, [pathname, router]);

  if (!isNavigating || pathname.startsWith('/super-admin')) {
    return null;
  }

  const nextPath = targetPath || pathname;
  return <PublicTransitionOverlay targetPath={nextPath} />;
}
