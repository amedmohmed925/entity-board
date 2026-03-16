'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/Toast';

const deliveryHistory = [
  {
    id: 1,
    event: 'alert.triggered',
    status: 'OK 200',
    statusColor: 'text-emerald-500',
    dotColor: 'bg-emerald-500',
    path: 'api/v1/notify/',
    time: 'منذ دقيقتين'
  },
  {
    id: 2,
    event: 'report.generated',
    status: 'ERR 500',
    statusColor: 'text-rose-500',
    dotColor: 'bg-rose-500',
    path: 'api/v1/reports/',
    time: 'منذ 15 دقيقة'
  },
  {
    id: 3,
    event: 'data.imported',
    status: 'OK 200',
    statusColor: 'text-emerald-500',
    dotColor: 'bg-emerald-500',
    path: 'api/v1/sync/',
    time: 'منذ ساعة'
  }
];

export default function WebhooksPage() {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const copyPayload = () => {
    const payload = {
      event: "report.generated",
      data: { id: "rep_8x992L", status: "success" }
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    showToast('تم نسخ الحمولة البرمجية بنجاح');
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('تم حفظ إعدادات الويب-هوك بنجاح');
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row gap-6 pb-10"
    >
      
      {/* Left Column: Payload Inspector */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="rounded-[32px] border border-slate-200 bg-[#0A1126] p-6 text-white dark:border-[#1A2A4A]" dir="ltr">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              Payload Inspector
              <span className="text-blue-500">{"<>"}</span>
            </h2>
            <button 
              onClick={copyPayload}
              className="text-xs font-bold bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition active:scale-95"
            >
              Copy JSON
            </button>
          </div>
          
          <div className="font-mono text-[13px] space-y-1 text-left">
            <div className="flex gap-4">
              <span className="text-slate-600">01</span>
              <span>{"{"}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-600">02</span>
              <span className="ml-4">"event": <span className="text-amber-400">"report.generated"</span>,</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-600">03</span>
              <span className="ml-4">"timestamp": <span className="text-emerald-400">1709234500</span>,</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-600">04</span>
              <span className="ml-4">"data": {"{"}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-600">05</span>
              <span className="ml-8">"report_id": <span className="text-amber-400">"rep_8x992L"</span>,</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-600">06</span>
              <span className="ml-8">"status": <span className="text-amber-400">"success"</span></span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-600">07</span>
              <span className="ml-4">{"}"},</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-600">08</span>
              <span className="ml-4">"url": <span className="text-blue-400">"https://s3.kayan.io/r/123.pdf"</span>,</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-600">09</span>
              <span className="ml-4">"request_id": <span className="text-amber-400">"req_f42G7"</span></span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-600">10</span>
              <span>{"}"}</span>
            </div>
          </div>
        </div>

        {/* Delivery Error Alert */}
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 flex items-start gap-3">
          <div className="rounded-full bg-rose-500 p-1.5 text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-rose-600 dark:text-rose-500">خطأ في التسليم (Error 500)</h4>
            <p className="mt-1 text-xs text-rose-700/70 dark:text-rose-400/70 leading-relaxed">
              فشل الخادم الوجهة في الرد خلال الوقت المحدد. تمت المحاولة 5 مرات.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Config & History */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Webhook Config Form */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 dark:border-[#1A2A4A] dark:bg-[#0A1126]">
          <div className="flex items-center justify-between mb-8" dir="rtl">
             <div className="flex items-center gap-3">
               <h1 className="text-2xl font-black text-slate-900 dark:text-white">إعدادات خطافات الويب (Webhooks)</h1>
               <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/20 uppercase tracking-wider">CONNECTED</span>
             </div>
             <button className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition">
               <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
               </svg>
             </button>
          </div>

          <div className="space-y-8 rounded-3xl border border-slate-100 bg-slate-50/50 p-6 dark:border-[#1A2A4A]/50 dark:bg-[#0D1632]/50" dir="rtl">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 rounded-xl bg-blue-600/10 text-blue-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
               </div>
               <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">إضافة خطاف ويب جديد</h3>
                  <p className="text-xs text-slate-500">سيتم إرسال الأحداث بصيغة JSON</p>
               </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Endpoint URL</label>
                <input 
                  type="text" 
                  defaultValue="https://api.yourdomain.com/webhooks/receiver"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-white"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">الأحداث المحددة (Events Selection)</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {['data.imported', 'report.generated', 'alert.triggered'].map((event, i) => (
                     <label key={event} className={`flex items-center justify-between gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${i === 0 ? 'border-blue-600 bg-blue-600/5 ring-1 ring-blue-600' : 'border-slate-200 bg-white dark:border-[#1A2A4A] dark:bg-[#0D1632] hover:border-slate-300'}`}>
                        <div className="text-right">
                           <p className="text-xs font-bold text-slate-900 dark:text-white">{event}</p>
                           <p className="text-[10px] text-slate-500 mt-1">{i === 0 ? 'عند استيراد البيانات' : i === 1 ? 'عند إنشاء التقارير' : 'عند تفعيل التنبيهات'}</p>
                        </div>
                        <input type="checkbox" defaultChecked={i === 0} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                     </label>
                   ))}
                </div>
              </div>

              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full md:w-auto px-10 py-3.5 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    حفظ الإعدادات
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Delivery History Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between" dir="rtl">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
               تاريخ التسليم (Delivery History)
               <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </h2>
            <button className="text-xs font-bold text-blue-500 hover:underline">تحديث السجل</button>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white dark:border-[#1A2A4A] dark:bg-[#0A1126] overflow-hidden">
            <div className="overflow-x-auto text-right" dir="rtl">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-white/5">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">الحدث (EVENT)</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">الحالة (STATUS)</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">المسار (PATH)</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">الوقت (TIME)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#1A2A4A]">
                  {deliveryHistory.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition cursor-pointer">
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300">{item.event}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <span className={`h-2 w-2 rounded-full ${item.dotColor}`} />
                           <span className={`text-xs font-bold ${item.statusColor}`}>{item.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-xs text-slate-500">{item.path}</code>
                      </td>
                      <td className="px-6 py-4 text-left">
                        <div className="flex items-center justify-end gap-3 text-xs text-slate-400">
                           {item.time}
                           <svg className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                           </svg>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
