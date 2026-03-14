export default function SuperAdminLoading() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#F3F7FF] text-slate-900 dark:bg-[#050A19] dark:text-white">
      <div className="mx-auto max-w-[1440px] p-3 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <aside className="w-full shrink-0 rounded-3xl border border-slate-200/80 bg-white/90 p-4 dark:border-[#1A2A4A] dark:bg-[#0A1126] lg:w-72">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="sa-skeleton h-9 w-9 rounded-xl" />
                <div className="space-y-2">
                  <div className="sa-skeleton h-3 w-20 rounded-md" />
                  <div className="sa-skeleton h-2.5 w-16 rounded-md" />
                </div>
              </div>
              <div className="sa-skeleton h-8 w-8 rounded-lg" />
            </div>

            <div className="space-y-2">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="sa-skeleton h-11 rounded-xl" />
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-100/70 p-4 dark:border-[#1A2A4A] dark:bg-[#0D1632]">
              <div className="sa-skeleton h-3 w-20 rounded-md" />
              <div className="mt-3 flex items-center gap-3">
                <div className="sa-skeleton h-11 w-11 rounded-full" />
                <div className="w-full space-y-2">
                  <div className="sa-skeleton h-3 w-28 rounded-md" />
                  <div className="sa-skeleton h-2.5 w-20 rounded-md" />
                </div>
              </div>
            </div>
          </aside>

          <section className="min-w-0 flex-1 rounded-3xl border border-slate-200/80 bg-white/90 p-4 dark:border-[#1A2A4A] dark:bg-[#080F23] md:p-6">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <div className="sa-skeleton h-9 w-64 rounded-xl md:w-80" />
                <div className="sa-skeleton h-4 w-[22rem] max-w-full rounded-lg" />
              </div>

              <div className="flex items-center gap-2">
                <div className="sa-skeleton h-10 w-36 rounded-xl" />
                <div className="sa-skeleton h-10 w-24 rounded-xl" />
              </div>
            </div>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <article key={index} className="rounded-2xl border border-slate-200/80 bg-slate-100/70 p-4 dark:border-[#1A2A4A] dark:bg-[#0D1632]">
                  <div className="sa-skeleton h-3 w-28 rounded-md" />
                  <div className="sa-skeleton mt-3 h-9 w-24 rounded-lg" />
                  <div className="sa-skeleton mt-3 h-3 w-20 rounded-md" />
                </article>
              ))}
            </section>

            <section className="mt-5 grid grid-cols-1 gap-4 2xl:grid-cols-[minmax(0,1fr)_300px]">
              <article className="min-w-0 rounded-2xl border border-slate-200/80 bg-slate-100/70 p-4 dark:border-[#1A2A4A] dark:bg-[#0D1632]">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="sa-skeleton h-10 w-full max-w-lg rounded-xl" />
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="sa-skeleton h-9 w-28 rounded-lg" />
                    <div className="sa-skeleton h-9 w-28 rounded-lg" />
                    <div className="sa-skeleton h-9 w-24 rounded-lg" />
                  </div>
                </div>

                <div className="sa-skeleton mb-3 h-3 w-28 rounded-md" />

                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 p-4 dark:border-[#1A2A4A] dark:bg-[#0A132C]">
                  <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="grid grid-cols-7 gap-3">
                        <div className="sa-skeleton col-span-2 h-8 rounded-lg" />
                        <div className="sa-skeleton h-8 rounded-lg" />
                        <div className="sa-skeleton h-8 rounded-lg" />
                        <div className="sa-skeleton h-8 rounded-lg" />
                        <div className="sa-skeleton h-8 rounded-lg" />
                        <div className="sa-skeleton h-8 rounded-lg" />
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <aside className="space-y-4">
                <article className="rounded-2xl border border-slate-200/80 bg-slate-100/70 p-4 dark:border-[#1A2A4A] dark:bg-[#0D1632]">
                  <div className="sa-skeleton mb-3 h-6 w-32 rounded-lg" />
                  <div className="grid grid-cols-2 gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="sa-skeleton h-9 rounded-lg" />
                    ))}
                  </div>
                </article>

                <article className="rounded-2xl border border-slate-200/80 bg-slate-100/70 p-4 dark:border-[#1A2A4A] dark:bg-[#0D1632]">
                  <div className="sa-skeleton mb-3 h-6 w-40 rounded-lg" />
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="rounded-lg border border-slate-200/80 bg-white/85 p-3 dark:border-[#1A2A4A] dark:bg-[#0A132C]">
                        <div className="sa-skeleton h-3.5 w-3/4 rounded-md" />
                        <div className="sa-skeleton mt-2 h-3 w-1/2 rounded-md" />
                      </div>
                    ))}
                  </div>
                </article>
              </aside>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
