type PublicSkeletonProps = {
  path: string;
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main dir="rtl" className="min-h-screen bg-[#F3F7FF] text-slate-900 dark:bg-[#060B14] dark:text-white">
      {children}
    </main>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">{children}</div>;
}

function TopBarSkeleton() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="sa-skeleton h-10 w-10 rounded-xl" />
        <div className="space-y-2">
          <div className="sa-skeleton h-4 w-28 rounded-md" />
          <div className="sa-skeleton h-3 w-20 rounded-md" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="sa-skeleton h-10 w-24 rounded-xl" />
        <div className="sa-skeleton h-10 w-28 rounded-xl" />
      </div>
    </div>
  );
}

function surfaceClassName(extra = '') {
  return `rounded-3xl border border-slate-200/80 bg-white/90 dark:border-[#1A2A4A] dark:bg-[#0D1632]/90 ${extra}`.trim();
}

function HomeSkeleton() {
  return (
    <Shell>
      <Container>
        <TopBarSkeleton />

        <section className={surfaceClassName('p-6')}>
          <div className="space-y-3">
            <div className="sa-skeleton h-10 w-[26rem] max-w-full rounded-xl" />
            <div className="sa-skeleton h-4 w-[36rem] max-w-full rounded-md" />
            <div className="sa-skeleton h-4 w-[30rem] max-w-full rounded-md" />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="sa-skeleton h-11 w-36 rounded-xl" />
            <div className="sa-skeleton h-11 w-28 rounded-xl" />
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <article key={index} className={surfaceClassName('p-4')}>
              <div className="sa-skeleton h-3 w-24 rounded-md" />
              <div className="sa-skeleton mt-3 h-9 w-28 rounded-lg" />
              <div className="sa-skeleton mt-3 h-3 w-20 rounded-md" />
            </article>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <article className={surfaceClassName('p-5')}>
            <div className="sa-skeleton h-6 w-52 rounded-lg" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="sa-skeleton h-44 rounded-2xl" />
              <div className="sa-skeleton h-44 rounded-2xl" />
            </div>
          </article>
          <article className={surfaceClassName('p-5')}>
            <div className="sa-skeleton h-6 w-44 rounded-lg" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="sa-skeleton h-14 rounded-2xl" />
              ))}
            </div>
          </article>
        </section>
      </Container>
    </Shell>
  );
}

function FeaturesSkeleton() {
  return (
    <Shell>
      <Container>
        <TopBarSkeleton />

        <section className={surfaceClassName('p-6')}>
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <div className="sa-skeleton mx-auto h-8 w-44 rounded-full" />
            <div className="sa-skeleton mx-auto h-12 w-[30rem] max-w-full rounded-xl" />
            <div className="sa-skeleton mx-auto h-4 w-[28rem] max-w-full rounded-md" />
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article key={index} className={surfaceClassName('p-5')}>
              <div className="sa-skeleton h-12 w-12 rounded-2xl" />
              <div className="sa-skeleton mt-4 h-6 w-40 rounded-lg" />
              <div className="sa-skeleton mt-3 h-4 w-full rounded-md" />
              <div className="sa-skeleton mt-2 h-4 w-4/5 rounded-md" />
            </article>
          ))}
        </section>
      </Container>
    </Shell>
  );
}

function DemoSkeleton() {
  return (
    <Shell>
      <Container>
        <TopBarSkeleton />

        <section className={surfaceClassName('p-6')}>
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <div className="sa-skeleton mx-auto h-8 w-44 rounded-full" />
            <div className="sa-skeleton mx-auto h-12 w-[32rem] max-w-full rounded-xl" />
            <div className="sa-skeleton mx-auto h-4 w-[30rem] max-w-full rounded-md" />
          </div>
        </section>

        <section className={`${surfaceClassName('mt-6 p-4')} overflow-hidden`}>
          <div className="sa-skeleton h-[360px] w-full rounded-2xl" />
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <article key={index} className={surfaceClassName('p-5')}>
              <div className="sa-skeleton h-6 w-36 rounded-lg" />
              <div className="sa-skeleton mt-3 h-4 w-full rounded-md" />
              <div className="sa-skeleton mt-2 h-4 w-4/5 rounded-md" />
            </article>
          ))}
        </section>
      </Container>
    </Shell>
  );
}

function PricingSkeleton() {
  return (
    <Shell>
      <Container>
        <TopBarSkeleton />

        <section className={surfaceClassName('p-6')}>
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <div className="sa-skeleton mx-auto h-8 w-48 rounded-full" />
            <div className="sa-skeleton mx-auto h-12 w-[30rem] max-w-full rounded-xl" />
            <div className="sa-skeleton mx-auto h-4 w-[28rem] max-w-full rounded-md" />
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <article key={index} className={surfaceClassName('p-6')}>
              <div className="sa-skeleton h-6 w-28 rounded-lg" />
              <div className="sa-skeleton mt-4 h-10 w-40 rounded-xl" />
              <div className="mt-5 space-y-3">
                {Array.from({ length: 5 }).map((__, rowIndex) => (
                  <div key={rowIndex} className="sa-skeleton h-4 w-full rounded-md" />
                ))}
              </div>
              <div className="sa-skeleton mt-6 h-11 w-full rounded-xl" />
            </article>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <article key={index} className={surfaceClassName('p-5')}>
              <div className="sa-skeleton h-5 w-56 rounded-lg" />
              <div className="sa-skeleton mt-3 h-4 w-full rounded-md" />
              <div className="sa-skeleton mt-2 h-4 w-5/6 rounded-md" />
            </article>
          ))}
        </section>
      </Container>
    </Shell>
  );
}

function AuthSkeleton() {
  return (
    <Shell>
      <div className="mx-auto flex min-h-screen max-w-7xl items-center gap-6 px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
        <div className="hidden w-1/2 rounded-3xl border border-slate-200/80 bg-white/85 p-8 dark:border-[#1A2A4A] dark:bg-[#0D1632]/85 lg:block">
          <div className="space-y-4">
            <div className="sa-skeleton h-6 w-48 rounded-lg" />
            <div className="sa-skeleton h-10 w-80 rounded-xl" />
            <div className="sa-skeleton h-4 w-full rounded-md" />
            <div className="sa-skeleton h-4 w-4/5 rounded-md" />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200/70 bg-slate-100/70 p-5 dark:border-[#1A2A4A] dark:bg-black/10">
            <div className="sa-skeleton h-28 w-full rounded-xl" />
            <div className="sa-skeleton mt-4 h-4 w-40 rounded-md" />
          </div>
        </div>

        <div className="w-full rounded-3xl border border-slate-200/80 bg-white/90 p-6 dark:border-[#1A2A4A] dark:bg-[#0D1632]/85 lg:w-1/2">
          <div className="mb-6 space-y-3">
            <div className="sa-skeleton h-9 w-56 rounded-xl" />
            <div className="sa-skeleton h-4 w-64 rounded-md" />
          </div>

          <div className="space-y-4">
            <div className="sa-skeleton h-12 w-full rounded-2xl" />
            <div className="sa-skeleton h-12 w-full rounded-2xl" />
            <div className="sa-skeleton h-12 w-full rounded-2xl" />
            <div className="sa-skeleton h-12 w-full rounded-2xl" />
            <div className="sa-skeleton h-12 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </Shell>
  );
}

function normalizePath(path: string) {
  if (path.startsWith('/login') || path.startsWith('/register')) {
    return 'auth';
  }

  if (path.startsWith('/features')) {
    return 'features';
  }

  if (path.startsWith('/demo')) {
    return 'demo';
  }

  if (path.startsWith('/pricing')) {
    return 'pricing';
  }

  return 'home';
}

export function PublicRouteSkeletons({ path }: PublicSkeletonProps) {
  const view = normalizePath(path);

  if (view === 'auth') {
    return <AuthSkeleton />;
  }

  if (view === 'features') {
    return <FeaturesSkeleton />;
  }

  if (view === 'demo') {
    return <DemoSkeleton />;
  }

  if (view === 'pricing') {
    return <PricingSkeleton />;
  }

  return <HomeSkeleton />;
}
