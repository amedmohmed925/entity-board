'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

const dashboards = [
  {
    id: 1,
    title: 'تقرير المبيعات السنوي',
    category: 'المبيعات',
    author: 'أحمد الزهراني',
    updatedAt: 'قبل ساعتين',
    categoryColor: 'blue',
    icon: 'trending_up'
  },
  {
    id: 2,
    title: 'أداء الحملات الإعلانية',
    category: 'التسويق',
    author: 'سارة خالد',
    updatedAt: 'أمس، 4:15 م',
    categoryColor: 'purple',
    icon: 'campaign'
  },
  {
    id: 3,
    title: 'مؤشرات المخزون والفروع',
    category: 'المخزون',
    author: 'فهد العتيبي',
    updatedAt: 'منذ 3 أيام',
    categoryColor: 'amber',
    icon: 'inventory'
  },
  {
    id: 4,
    title: 'تحليل التدفقات النقدية',
    category: 'الخدمات اللوجستية',
    author: 'مريم صالح',
    updatedAt: 'منذ ساعة',
    categoryColor: 'emerald',
    icon: 'payments'
  },
  {
    id: 5,
    title: 'ملخص أداء الموظفين',
    category: 'الكل',
    author: 'علي الحربي',
    updatedAt: 'الأسبوع الماضي',
    categoryColor: 'blue',
    icon: 'people'
  },
  {
    id: 6,
    title: 'تحليل تجربة المستخدم',
    category: 'التسويق',
    author: 'هند الناصر',
    updatedAt: 'قبل 4 ساعات',
    categoryColor: 'purple',
    icon: 'psychology'
  }
];

export default function DashboardLibraryPage() {
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('الكل');

  const categories = ['الكل', 'المبيعات', 'التسوق', 'المخزون', 'الخدمات اللوجستية'];

  const filteredDashboards = activeCategory === 'الكل' 
    ? dashboards 
    : dashboards.filter(d => d.category === activeCategory);

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">دليل لوحات القيادة</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">عرض شامل لبيانات أعمالك من كافة الأقسام. <span className="text-blue-600 dark:text-blue-500 font-bold">(للعرض فقط)</span></p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-end gap-3">
         {categories.map((cat, i) => (
           <button
             key={i}
             onClick={() => setActiveCategory(cat)}
             className={`px-8 py-2.5 rounded-full text-sm font-black transition-all ${
               activeCategory === cat 
                 ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 ring-4 ring-blue-500/10' 
                 : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10'
             }`}
           >
             {cat}
           </button>
         ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         {filteredDashboards.map((board, i) => (
           <motion.div
             key={board.id}
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="group relative bg-white dark:bg-[#0A1126] rounded-[40px] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
           >
              {/* Preview Image Placeholder */}
              <div className="aspect-[4/3] bg-slate-100 dark:bg-white/5 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                 
                 {/* Abstract UI Mockup inside preview */}
                 <div className="absolute inset-0 p-6 flex flex-col gap-3">
                    <div className="w-1/2 h-4 bg-slate-200 dark:bg-white/10 rounded-full" />
                    <div className="flex gap-2">
                       <div className="w-1/3 h-20 bg-slate-200 dark:bg-white/10 rounded-2xl" />
                       <div className="w-2/3 h-20 bg-slate-100 dark:bg-white/5 rounded-2xl" />
                    </div>
                    <div className="w-full h-32 bg-slate-200 dark:bg-white/10 rounded-3xl mt-2" />
                 </div>

                 {/* View Overlay */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 scale-90 group-hover:scale-100">
                    <button 
                      onClick={() => showToast('هذه اللوحة متاحة للعرض فقط حسب أوزونات حسابك.')}
                      className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-sm shadow-2xl flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                       </svg>
                       معاينة اللوحة
                    </button>
                 </div>
              </div>

              {/* Content */}
              <div className="p-8 text-right">
                 <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-blue-600 transition-colors">{board.title}</h3>
                 
                 <div className="space-y-4">
                    <div className="flex items-center justify-end gap-3 text-slate-500">
                       <span className="text-xs font-bold">{board.author}</span>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">أنشئ بواسطة</span>
                       <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                       </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 text-slate-500">
                       <span className="text-xs font-bold">{board.updatedAt}</span>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">آخر تحديث</span>
                       <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                       </div>
                    </div>
                 </div>

                 <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <button 
                      onClick={() => showToast('هذه اللوحة متاحة للعرض فقط.')}
                      className="text-blue-600 font-black text-xs flex items-center gap-2 hover:underline"
                    >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                       </svg>
                       عرض اللوحة
                    </button>
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black bg-${board.categoryColor}-500/10 text-${board.categoryColor}-600 dark:text-${board.categoryColor}-400 border border-${board.categoryColor}-500/20`}>
                       {board.category}
                    </span>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
}
