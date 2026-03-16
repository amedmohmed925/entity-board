'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Counter } from '@/components/ui/Counter';

export default function TeamManagementPage() {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'إجمالي الأعضاء', value: 24, trend: '+12%', icon: 'groups', color: 'blue' },
    { label: 'دعوات معلقة', value: 5, trend: 'لم يتغير', icon: 'mail', color: 'amber' },
    { label: 'المشاريع النشطة', value: 12, trend: '+3', icon: 'work', color: 'purple' },
    { label: 'معدل الإنجاز', value: 89, trend: '+5%', icon: 'bolt', color: 'emerald', suffix: '%' },
  ];

  const members = [
    {
      name: 'أحمد منصور',
      email: 'ahmed@kayanboard.com',
      role: 'مطور واجهات',
      status: 'نشط',
      joinedDate: '12 أكتوبر 2023',
      avatar: 'أ',
      roleColor: 'blue'
    },
    {
      name: 'سارة خالد',
      email: 'sara.k@kayanboard.com',
      role: 'محلل بيانات',
      status: 'نشط',
      joinedDate: '05 نوفمبر 2023',
      avatar: 'س',
      roleColor: 'purple'
    },
    {
      name: 'عمر الفاروق',
      email: 'omar.f@kayanboard.com',
      role: 'مطور خلفيات',
      status: 'غير متصل',
      joinedDate: '20 ديسمبر 2023',
      avatar: 'ع',
      roleColor: 'cyan'
    },
    {
      name: 'ليلى محمود',
      email: 'laila@kayanboard.com',
      role: 'مدير مشروع',
      status: 'نشط',
      joinedDate: '15 يناير 2024',
      avatar: 'ل',
      roleColor: 'amber'
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">إدارة الفريق</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">إدارة أعضاء فريقك وأذونات الوصول الخاصة بهم في مكان واحد.</p>
        </div>
        <button 
          onClick={() => showToast('سيتم فتح نافذة دعوة عضو جديد قريباً')}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          دعوة عضو جديد
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-[32px] bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-white/10 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend.includes('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                {stat.trend}
              </span>
              <div className={`p-2 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-500`}>
                <span className="material-icons-outlined text-xl">{stat.icon}</span>
                {/* Fallback svg if material icons are not loaded */}
                <svg className="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                 <Counter value={stat.value as number} suffix={('suffix' in stat ? stat.suffix : '') as string} />
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters & Table Section */}
      <div className="bg-white dark:bg-[#0A1126] rounded-[40px] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input 
              type="text"
              placeholder="البحث عن اسم، بريد إلكتروني، أو دور..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-12 font-bold text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-all"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
             <button className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2 whitespace-nowrap hover:bg-slate-100 dark:hover:bg-white/10 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                مطور
             </button>
             <button className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2 whitespace-nowrap hover:bg-slate-100 dark:hover:bg-white/10 transition">
                محلل
             </button>
             <button className="px-5 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2 whitespace-nowrap">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                آخر 30 يوم
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right" dir="rtl">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5">
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">العضو</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">الدور</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">الحالة</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">تاريخ الانضمام</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {members.map((member, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-lg overflow-hidden border-4 border-white dark:border-[#0A1126] shadow-lg">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white mb-0.5">{member.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black bg-${member.roleColor}-500/10 text-${member.roleColor}-500 border border-${member.roleColor}-500/20`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${member.status === 'نشط' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                       <span className={`text-xs font-bold ${member.status === 'نشط' ? 'text-emerald-500' : 'text-slate-500'}`}>{member.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-600 dark:text-slate-400 font-mono">
                    {member.joinedDate}
                  </td>
                  <td className="px-8 py-5 text-left">
                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white transition" title="تعديل">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                           </svg>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition" title="حذف">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                           </svg>
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 bg-slate-50/50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
           <p className="text-xs font-bold text-slate-500">عرض 1-4 من أصل 24 عضو</p>
           <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-xl text-xs font-black text-slate-400 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white transition">السابق</button>
              <div className="flex gap-1">
                 <button className="w-8 h-8 rounded-lg text-xs font-black bg-blue-600 text-white shadow-lg shadow-blue-500/20">1</button>
                 <button className="w-8 h-8 rounded-lg text-xs font-black text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 transition">2</button>
                 <button className="w-8 h-8 rounded-lg text-xs font-black text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 transition">3</button>
              </div>
              <button className="px-4 py-2 rounded-xl text-xs font-black text-slate-400 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white transition">التالي</button>
           </div>
        </div>
      </div>
    </div>
  );
}
