'use client';

export default function ViewerDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">نظرة عامة للمشاهد</h1>
        <p className="text-slate-500 dark:text-slate-400">مرحباً بك، يمكنك استعراض التقارير واللوحات المتاحة لك أدناه.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي المبيعات', value: '45,230$', change: '+12%', color: 'blue' },
          { label: 'المستخدمين النشطين', value: '1,240', change: '+5%', color: 'purple' },
          { label: 'الطلبات الجديدة', value: '189', change: '-2%', color: 'emerald' },
          { label: 'معدل التحويل', value: '3.2%', change: '+0.5%', color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#0A1126] p-6 rounded-3xl border border-slate-200 dark:border-[#1A2A4A] shadow-sm">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</p>
            <p className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
              {stat.change} مقارنة بالشهر السابق
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0A1126] p-8 rounded-3xl border border-slate-200 dark:border-[#1A2A4A] shadow-sm">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">آخر التقارير المشتركة</h2>
            <button className="text-sm font-bold text-blue-500 hover:text-blue-600">عرض الكل</button>
        </div>
        <div className="space-y-4">
            {[1, 2, 3].map((r) => (
                <div key={r} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition border border-transparent hover:border-slate-100 dark:hover:border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m3.236-4.588a3 3 0 004.528 4.528M8 7a3 3 0 110-6 3 3 0 010 6z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm">تقرير أداء المبيعات الربع سنوي - {r}</p>
                            <p className="text-[10px] text-slate-500">تمت المشاركة بواسطة: أدمن النظام • منذ 2 ساعة</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition">
                        عرض التقرير
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
