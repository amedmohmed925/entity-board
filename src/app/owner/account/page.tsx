'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function AccountSettingsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: 'person' },
    { id: 'notifications', label: 'التنبيهات', icon: 'notifications' },
    { id: 'sessions', label: 'الجلسات والأمان', icon: 'security' },
  ];

  const handleSave = () => {
    showToast('تم تحديث إعدادات حسابك بنجاح');
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">إعدادات الحساب</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">إدارة معلوماتك الشخصية، تفضيلات التواصل، وأمان الدخول.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 active:scale-95"
        >
          حفظ التغييرات
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl">
         
         {/* Navigation Sidebar */}
         <div className="lg:col-span-4 flex flex-col gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white dark:bg-[#0A1126] text-blue-600 shadow-xl shadow-blue-500/5 border border-slate-200 dark:border-white/10' 
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                 <span className="material-icons-outlined text-xl opacity-70">{tab.icon}</span>
                 {tab.label}
              </button>
            ))}
         </div>

         {/* Tab Content */}
         <div className="lg:col-span-8 bg-white dark:bg-[#0A1126] rounded-[40px] border border-slate-200 dark:border-white/10 p-8 lg:p-12 shadow-sm min-h-[500px]">
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                 <div className="flex items-center gap-8 mb-10 pb-10 border-b border-slate-100 dark:border-white/5">
                    <div className="w-24 h-24 rounded-[32px] bg-blue-600 text-white font-black text-3xl flex items-center justify-center border-8 border-slate-50 dark:border-white/5 shadow-2xl relative group cursor-pointer overflow-hidden">
                       أ
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                       </div>
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900 dark:text-white">أحمد المدير</h3>
                       <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">صاحب العمل والتأسيس</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 mr-1">الاسم الأول</label>
                       <input type="text" defaultValue="أحمد" className="w-full h-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-4 font-bold text-sm outline-none focus:border-blue-500 transition" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 mr-1">الاسم الأخير</label>
                       <input type="text" defaultValue="المنصور" className="w-full h-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-4 font-bold text-sm outline-none focus:border-blue-500 transition" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-xs font-bold text-slate-400 mr-1">عنوان البريد الإلكتروني</label>
                       <input type="email" defaultValue="owner@demo.com" readOnly className="w-full h-12 rounded-xl bg-slate-100 dark:bg-white/[0.02] border border-slate-100 dark:border-white/10 px-4 font-bold text-sm outline-none text-slate-400 cursor-not-allowed" />
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                 <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">تفضيلات الإشعارات</h3>
                 <div className="space-y-6">
                    {[
                      { title: 'إشعارات البريد الإلكتروني', desc: 'استلام مخلص يومي للأداء المالي والتحليلات.', check: true },
                      { title: 'تقارير الأداء الأسبوعية', desc: 'تحليل معمق يصلك كل يوم أحد لبداية أسبوع قوية.', check: false },
                      { title: 'تنبيهات الأمان والدخول', desc: 'إشعارك فوراً عند تسجيل دخول من متصفح أو موقع جديد.', check: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-6 p-4 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02]">
                         <div className="text-right">
                            <p className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</p>
                            <p className="text-xs text-slate-500 font-medium mt-1">{item.desc}</p>
                         </div>
                         <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${item.check ? 'bg-blue-600' : 'bg-slate-300 dark:bg-white/10'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${item.check ? (document?.dir === 'rtl' ? 'right-7' : 'left-7') : (document?.dir === 'rtl' ? 'right-1' : 'left-1')}`} />
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

            {activeTab === 'sessions' && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                 <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">الجلسات النشطة</h3>
                 <div className="space-y-6">
                    {[
                      { device: 'Chromium on Windows', location: 'الرياض، السعودية', status: 'نشط الآن', current: true },
                      { device: 'Safari on iPhone 15', location: 'جدة، السعودية', status: 'منذ 3 ساعات', current: false },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-6 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/5 flex items-center justify-center">
                               <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                               </svg>
                            </div>
                            <div className="text-right">
                               <p className="font-bold text-slate-900 dark:text-white text-sm">{session.device}</p>
                               <p className="text-[10px] text-slate-500 font-bold">{session.location} • <span className={session.current ? 'text-emerald-500' : ''}>{session.status}</span></p>
                            </div>
                         </div>
                         {!session.current && <button className="text-[10px] font-black text-rose-500 hover:underline">إنهاء الجلسة</button>}
                      </div>
                    ))}
                 </div>
                 
                 <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                    <button className="px-6 py-3 rounded-xl bg-rose-500/10 text-rose-600 font-black text-xs hover:bg-rose-500/20 transition">تغيير كلمة المرور</button>
                 </div>
              </motion.div>
            )}
         </div>

      </div>
    </div>
  );
}
