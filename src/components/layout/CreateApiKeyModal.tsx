'use client';

import { useState } from 'react';

type CreateApiKeyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateApiKeyModal({ isOpen, onClose }: CreateApiKeyModalProps) {
  const [scope, setScope] = useState<'read' | 'write'>('write');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl transition-all dark:border-[#1A2A4A] dark:bg-[#0A1126]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-[#1A2A4A]">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">إنشاء مفتاح API جديد</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">
          {/* Key Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">اسم المفتاح</label>
            <input 
              type="text" 
              placeholder="مثال: تطبيق الجوال"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-white dark:focus:border-blue-500"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">اسم فريد يساعدك على التعرف على الغرض من هذا المفتاح لاحقاً.</p>
          </div>

          {/* Scopes */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">نطاق الصلاحيات (Scopes)</label>
            
            <div className="grid gap-3">
              {/* Read Only */}
              <button 
                onClick={() => setScope('read')}
                className={`flex items-start gap-4 rounded-2xl border p-4 text-right transition ${
                  scope === 'read' 
                    ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500' 
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:hover:border-[#2A3A5A]'
                }`}
              >
                <div className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                  scope === 'read' ? 'border-blue-500 bg-blue-500' : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {scope === 'read' && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">قراءة فقط (Read-only)</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">يسمح فقط بالاستعلام عن البيانات دون القدرة على التعديل أو الحذف.</p>
                </div>
              </button>

              {/* Read/Write */}
              <button 
                onClick={() => setScope('write')}
                className={`flex items-start gap-4 rounded-2xl border p-4 text-right transition ${
                  scope === 'write' 
                    ? 'border-blue-600 bg-blue-600/5 ring-1 ring-blue-600' 
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:hover:border-[#2A3A5A]'
                }`}
              >
                <div className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                  scope === 'write' ? 'border-blue-600 bg-blue-600' : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {scope === 'write' && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">قراءة وكتابة (Read/Write)</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">يسمح بالتحكم الكامل في الموارد (إنشاء، تعديل، حذف، وقراءة).</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-4 bg-slate-50 p-6 dark:bg-[#0D1632]/50">
          <div className="flex gap-3">
             <button 
               className="flex-1 rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
               onClick={onClose}
             >
               توليد المفتاح
             </button>
             <button 
               className="flex-1 rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-white dark:hover:bg-white/5 active:scale-[0.98]"
               onClick={onClose}
             >
               إلغاء
             </button>
          </div>
          
          <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 p-3 border border-amber-500/20">
             <svg className="h-4 w-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
             <p className="text-[10px] text-amber-600 dark:text-amber-500 font-medium">سيظهر المفتاح السري مرة واحدة فقط بعد الضغط على "توليد".</p>
          </div>
        </div>
      </div>
    </div>
  );
}
