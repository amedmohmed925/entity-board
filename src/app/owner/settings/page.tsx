'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function CompanySettingsPage() {
  const { showToast } = useToast();
  const [accentColor, setAccentColor] = useState('#1121d4');
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  const colors = [
    { name: 'Default Blue', hex: '#1121d4' },
    { name: 'Soft Purple', hex: '#8B5CF6' },
    { name: 'Amber Glow', hex: '#F59E0B' },
    { name: 'Rose Petal', hex: '#F43F5E' },
    { name: 'Emerald', hex: '#10B981' },
  ];

  const handleSave = () => {
    showToast('تم حفظ التغييرات بنجاح');
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">إعدادات الشركة والهوية البصرية</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">إدارة هوية مؤسستك وتفضيلات الأمان والسمات الخاصة بك.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 active:scale-95"
        >
          حفظ التغييرات
        </button>
      </div>

      <div className="space-y-8 max-w-5xl">
        
        {/* Basic Information */}
        <section className="bg-white dark:bg-[#0A1126] rounded-[40px] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100 dark:border-white/5">
            <span className="text-blue-500">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">المعلومات الأساسية</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 block mr-1">اسم الشركة</label>
                <input 
                  type="text" 
                  defaultValue="شركة كيان للحلول التقنية"
                  className="w-full h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-6 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500 transition"
                />
             </div>
             <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 block mr-1">البريد الإلكتروني الرسمي</label>
                <input 
                  type="email" 
                  defaultValue="contact@kayan.sa"
                  className="w-full h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-6 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500 transition text-left"
                />
             </div>
             <div className="md:col-span-2 space-y-3">
                <label className="text-sm font-bold text-slate-500 block mr-1">رقم الهاتف</label>
                <div className="flex gap-4">
                   <div className="w-32 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-6 flex items-center justify-between group cursor-pointer">
                      <span className="font-bold text-slate-700 dark:text-slate-300">KSA</span>
                      <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                   </div>
                   <input 
                    type="tel" 
                    defaultValue="+966 50 123 4567"
                    className="flex-1 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-6 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500 transition text-left"
                  />
                </div>
             </div>
          </div>
        </section>

        {/* Visual Identity (White-labeling) */}
        <section className="bg-white dark:bg-[#0A1126] rounded-[40px] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100 dark:border-white/5">
            <span className="text-blue-500">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
               </svg>
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">الهوية البصرية (White-labeling)</h2>
          </div>

          <div className="space-y-12">
             <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 block mr-1">شعار الشركة</label>
                <div className="flex items-center gap-8">
                   <div className="w-32 h-32 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center bg-slate-50 dark:bg-white/5 group hover:border-blue-500 transition cursor-pointer">
                      <svg className="w-8 h-8 text-slate-300 group-hover:text-blue-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4-4m4 4v12" />
                      </svg>
                      <span className="text-[10px] font-black mt-2 text-slate-400 group-hover:text-blue-500">رفع</span>
                   </div>
                   <div className="flex-1 space-y-2">
                       <p className="text-sm font-bold text-slate-900 dark:text-white">رفع شعار جديد</p>
                       <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm">يدعم تنسيقات PNG, SVG بحجم لا يتجاوز 2 ميجابايت. يُفضل استخدام خلفية شفافة.</p>
                       <div className="flex gap-4 pt-2">
                          <button className="text-xs font-black text-blue-600 hover:underline">اختيار ملف</button>
                          <span className="text-slate-200">|</span>
                          <button className="text-xs font-black text-rose-500 hover:underline">حذف الحالي</button>
                       </div>
                   </div>
                </div>
             </div>

             <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-white/5">
                <label className="text-sm font-bold text-slate-500 block mr-1">اللون الأساسي للنظام</label>
                <div className="flex flex-wrap items-center gap-6">
                   <div className="flex items-center gap-3">
                      {colors.map((color, i) => (
                        <button 
                          key={i}
                          onClick={() => setAccentColor(color.hex)}
                          className={`w-10 h-10 rounded-full border-4 transition-transform hover:scale-110 ${accentColor === color.hex ? 'border-blue-600 dark:border-white scale-110' : 'border-transparent'}`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                      <button className={`w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center border-4 border-transparent transition-transform hover:scale-110 ${accentColor === '#2563EB' ? 'border-white' : ''}`}>
                         <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                         </svg>
                      </button>
                   </div>
                   <div className="h-10 px-4 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center gap-3">
                      <div className="w-4 h-4 rounded-md shadow-sm" style={{ backgroundColor: accentColor }} />
                      <span className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400">{accentColor}</span>
                      <button className="text-xs font-black text-blue-600 ml-2 hover:underline">تخصيص لون آخر</button>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Security Settings */}
        <section className="bg-white dark:bg-[#0A1126] rounded-[40px] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100 dark:border-white/5">
            <span className="text-blue-500">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
               </svg>
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">إعدادات الأمان</h2>
          </div>

          <div className="space-y-10">
             <div className="flex items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                   <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">المصادقة الثنائية (2FA) الإلزامية</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">عند تفعيل هذا الخيار، سيُطلب من جميع أعضاء الفريق استخدام وسيلة تحقق إضافية (مثل تطبيق الهاتف) لتسجيل الدخول.</p>
                </div>
                <button 
                  onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                  className={`relative w-16 h-9 rounded-full transition-colors duration-300 flex items-center p-1 ${is2FAEnabled ? 'bg-blue-600' : 'bg-slate-200 dark:bg-white/10'}`}
                >
                   <motion.div 
                     animate={{ x: is2FAEnabled ? (document?.dir === 'rtl' ? -28 : 28) : 0 }}
                     className="w-7 h-7 bg-white rounded-full shadow-lg"
                   />
                </button>
             </div>

             {is2FAEnabled && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4"
               >
                  <span className="text-amber-600 mt-1">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                     </svg>
                  </span>
                  <p className="text-amber-800 dark:text-amber-400 text-sm font-bold leading-relaxed">
                     <span className="block mb-1 underline decoration-amber-500/50">تنبيه هام:</span>
                     سيتم تسجيل خروج جميع الأعضاء الذين لم يفعلوا المصادقة الثنائية بعد عند حفظ هذا الإعداد، وسيتعين عليهم تفعيلها في المرة القادمة التي يسجلون فيها الدخول.
                  </p>
               </motion.div>
             )}
          </div>
        </section>
      </div>
    </div>
  );
}
