'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/Toast';

const apiLogs = [
  {
    id: 'req_9821xs_721q',
    time: '2023-10-27 14:22:15',
    method: 'GET',
    methodColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    endpoint: 'api/v1/analytics/overview/',
    ip: '192.168.1.45',
    status: 'OK 200'
  },
  {
    id: 'req_7721ab_990x',
    time: '2023-10-27 14:21:40',
    method: 'POST',
    methodColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    endpoint: 'api/v1/auth/token/refresh/',
    ip: '192.168.1.12',
    status: 'OK 200'
  },
  {
    id: 'req_1102cc_551w',
    time: '2023-10-27 14:18:55',
    method: 'PUT',
    methodColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    endpoint: 'api/v1/users/profile/update/',
    ip: '192.168.1.88',
    status: 'ERR 500'
  }
];

export default function ApiLogsPage() {
  const { showToast } = useToast();
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [method, setMethod] = useState('الكل');
  const [status, setStatus] = useState('جميع الحالات');

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    showToast(message);
  };

  const filteredLogs = apiLogs.filter(log => {
    const matchesSearch = log.endpoint.toLowerCase().includes(search.toLowerCase());
    const matchesMethod = method === 'الكل' || log.method === method;
    const matchesStatus = status === 'جميع الحالات' || log.status === status;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex gap-6 pb-10" 
      dir="rtl"
    >
      
      {/* Main Content: Table & Filters */}
      <div className={`flex-1 flex flex-col gap-6 transition-all duration-300 ${selectedLog ? 'ml-[450px]' : ''}`}>
        
        {/* Header & Filters */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 dark:border-[#1A2A4A] dark:bg-[#0A1126]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
             <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                   <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                   </svg>
                </div>
                <div>
                   <h1 className="text-2xl font-black text-slate-900 dark:text-white">سجلات النشاط والأخطاء (API Logs)</h1>
                   <div className="flex items-center gap-2 mt-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs text-emerald-500 font-bold">مباشر: متصل</span>
                   </div>
                </div>
             </div>
             <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                تصفية النتائج
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-slate-500 mr-1">البحث عن Endpoint</label>
               <div className="relative">
                  <input 
                    type="text" 
                    placeholder="مثال: api/v1/users/" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-white" 
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-slate-500 mr-1">الأسلوب (Method)</label>
               <select 
                 value={method}
                 onChange={(e) => setMethod(e.target.value)}
                 className="w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-white appearance-none"
               >
                  <option>الكل</option>
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-slate-500 mr-1">الحالة (Status)</label>
               <select 
                 value={status}
                 onChange={(e) => setStatus(e.target.value)}
                 className="w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-white appearance-none"
               >
                  <option>جميع الحالات</option>
                  <option>OK 200</option>
                  <option>Created 201</option>
                  <option>Error 500</option>
                  <option>Not Found 404</option>
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-slate-500 mr-1">نطاق التاريخ</label>
               <input type="date" className="w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-white" />
            </div>
          </div>
        </div>

        {/* Table Sections */}
        <div className="rounded-[32px] border border-slate-200 bg-white dark:border-[#1A2A4A] dark:bg-[#0A1126] overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-right">
                 <thead>
                    <tr className="bg-slate-50/50 dark:bg-white/5">
                       <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">التوقيت</th>
                       <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">الأسلوب</th>
                       <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">ENDPOINT</th>
                       <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">إجراءات</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-[#1A2A4A]">
                    {filteredLogs.map((log) => (
                       <tr 
                          key={log.id} 
                          onClick={() => setSelectedLog(log)}
                          className={`group transition hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer ${selectedLog?.id === log.id ? 'bg-blue-50/50 dark:bg-blue-600/5' : ''}`}
                       >
                          <td className="px-6 py-5">
                             <p className="text-xs font-bold text-slate-900 dark:text-white">{log.time.split(' ')[0]}</p>
                             <p className="text-[10px] text-slate-500">{log.time.split(' ')[1]}</p>
                          </td>
                          <td className="px-6 py-5">
                             <span className={`px-3 py-1 rounded-lg text-[10px] font-black border ${log.methodColor}`}>
                                {log.method}
                             </span>
                          </td>
                          <td className="px-6 py-5">
                             <code className="text-xs font-semibold text-slate-600 dark:text-slate-400">{log.endpoint}</code>
                          </td>
                          <td className="px-6 py-5">
                             <button className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:text-blue-500 transition">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="border-t border-slate-100 dark:border-[#1A2A4A] p-6 flex items-center justify-between">
              <div className="flex gap-2">
                 <button className="px-4 py-2 rounded-xl border border-slate-100 text-xs font-bold text-slate-400 hover:bg-slate-50 dark:border-[#1A2A4A] dark:hover:bg-white/5 disabled:opacity-50" disabled>السابق</button>
                 <button className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white/10 text-xs font-bold text-white">1</button>
                 <button className="px-4 py-2 rounded-xl border border-slate-100 text-xs font-bold text-slate-400 hover:bg-slate-50 dark:border-[#1A2A4A] dark:hover:bg-white/5">التالي</button>
              </div>
              <p className="text-xs font-bold text-slate-500">صفحة 1 من 50 <span className="mx-2 text-slate-300">|</span> عرض 10 من أصل 1,245 طلباً</p>
           </div>
        </div>
      </div>

      {/* Details Sidebar overlay */}
      {selectedLog && (
        <div className="fixed inset-y-0 left-0 w-[450px] bg-white dark:bg-[#0A1126] border-r border-slate-200 dark:border-[#1A2A4A] shadow-2xl z-[100] transform transition-transform duration-300 animate-in slide-in-from-left overflow-y-auto">
           <div className="sticky top-0 bg-white/80 dark:bg-[#0A1126]/80 backdrop-blur-md border-b border-slate-100 dark:border-[#1A2A4A] p-6 flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">تفاصيل الطلب</h2>
              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => handleCopy(JSON.stringify(selectedLog, null, 2), 'تم نسخ تفاصيل الطلب بنجاح')}
                   className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400"
                   title="Copy JSON"
                 >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                 </button>
                 <button 
                   onClick={() => setSelectedLog(null)}
                   className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400"
                 >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </button>
              </div>
           </div>

           <div className="p-6 space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                 <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider">المعلومات الأساسية</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D1632] space-y-1">
                       <p className="text-[10px] text-slate-500">عنوان الـ IP</p>
                       <p className="text-xs font-bold dark:text-white">{selectedLog.ip}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D1632] space-y-1">
                       <p className="text-[10px] text-slate-500">المعرف الفريد (Request ID)</p>
                       <p className="text-xs font-bold dark:text-white">{selectedLog.id}</p>
                    </div>
                 </div>
              </div>

              {/* Headers */}
              <div className="space-y-4">
                 <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider">الرؤوس (HEADERS)</h3>
                 <div className="p-5 rounded-2xl bg-[#0F172A] text-slate-300 font-mono text-[11px] space-y-2 text-left" dir="ltr">
                    <p><span className="text-slate-500">Content-Type:</span> application/json</p>
                    <p><span className="text-slate-500">Authorization:</span> <span className="text-emerald-500">Bearer ****************</span></p>
                    <p><span className="text-slate-500">User-Agent:</span> Mozilla/5.0 (Windows NT 10.0)</p>
                    <p><span className="text-slate-500">Accept-Language:</span> ar,en-US;q=0.9</p>
                 </div>
              </div>

              {/* Payload */}
              <div className="space-y-4">
                 <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider">الحمولة (PAYLOAD)</h3>
                 <div className="p-5 rounded-2xl bg-[#0F172A] text-slate-300 font-mono text-[11px] text-left" dir="ltr">
                    <pre className="whitespace-pre-wrap">
{`{
  "user_id": 10293,
  "action": "refresh_token",
  "source": "mobile_app"
}`}
                    </pre>
                 </div>
              </div>

              {/* Stack Trace (Mock for error cases) */}
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider">تتبع الخطأ (STACK TRACE)</h3>
                    <span className="px-2 py-0.5 rounded bg-rose-500 text-[10px] text-white font-bold">RuntimeException</span>
                 </div>
                 <div className="p-5 rounded-2xl bg-[#1a0505] border border-rose-950 text-rose-300/80 font-mono text-[10px] leading-6 text-left" dir="ltr">
                    <p>\Controllers\AuthController.refresh(AuthController.php:45)</p>
                    <p>\Illuminate\Routing\Controller.callAction(Controller.php:54)</p>
                    <p>at Illuminate\Routing\Route.runController(Route.php:199)</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </motion.div>
  );
}
