'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/Toast';

export default function ApiDocsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('curl');
  const [isExecuting, setIsExecuting] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const executeRequest = () => {
    setIsExecuting(true);
    setResponse(null);
    setTimeout(() => {
      setIsExecuting(false);
      setResponse({
        status: "success",
        data: {
          id: "coll_92xL110",
          name: "قائمة العملاء المميزين",
          created_at: 1709234500,
          entries_count: 54
        }
      });
      showToast('تم تنفيذ الطلب بنجاح');
    }, 2000);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast('تم نسخ الكود البرمجي بنجاح');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row gap-8 pb-10" 
      dir="rtl"
    >
      
      {/* Right Column: Documentation Content */}
      <div className="flex-1 space-y-10">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1A2A4A] pb-8">
           <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <h1 className="text-4xl font-black text-slate-900 dark:text-white">التوثيق التفاعلي للـ API</h1>
                 <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full border border-blue-500/20">v2.0 Beta</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">استخدم واجهة البرمجة لدمج بياناتك وتحليلاتك في تطبيقاتك الخاصة.</p>
           </div>
           <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-[#1A2A4A] text-sm font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition">الدعم الفني</button>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#0D1632] p-1.5 rounded-2xl border border-slate-200 dark:border-[#1A2A4A]">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">أ م</div>
                  <div className="text-right ml-2">
                      <p className="text-[10px] font-bold dark:text-white leading-none">أحمد محمد</p>
                      <p className="text-[9px] text-emerald-500 leading-none mt-1">نشط الآن</p>
                  </div>
              </div>
           </div>
        </div>

        {/* Endpoint Documentation */}
        <div className="space-y-8">
           <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-md">GET</span>
              <code className="text-lg font-bold text-slate-700 dark:text-slate-300">v2/data/collections/{"{id}"}/</code>
           </div>

           <div className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">جلب تفاصيل المجموعة</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                 يُستخدم هذا المسار لاسترداد كافة البيانات المتعلقة بمجموعة معينة باستخدام المعرف الخاص بها. يتضمن ذلك البيانات الوصفية، عدد السجلات، وتاريخ آخر تحديث. تأكد من إرسال مفتاح الـ API في الترويسة.
              </p>
           </div>

           {/* Parameters Table */}
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 rounded-xl bg-blue-600/10 text-blue-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                 </div>
                 <h3 className="text-xl font-bold dark:text-white">المعاملات (Parameters)</h3>
              </div>

              <div className="rounded-[32px] border border-slate-200 dark:border-[#1A2A4A] overflow-hidden">
                 <table className="w-full text-right">
                    <thead>
                       <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-[#1A2A4A]">
                          <th className="px-8 py-5 text-sm font-bold text-slate-500">الاسم</th>
                          <th className="px-8 py-5 text-sm font-bold text-slate-500">النوع</th>
                          <th className="px-8 py-5 text-sm font-bold text-slate-500">الوصف</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-[#1A2A4A]">
                       <tr>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-2">
                                <span className="text-rose-500">*</span>
                                <code className="text-sm font-bold text-indigo-500">id</code>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-sm text-slate-500">string</td>
                          <td className="px-8 py-6 text-sm text-slate-500">المعرف الفريد للمجموعة المراد جلبها.</td>
                       </tr>
                       <tr>
                          <td className="px-8 py-6">
                             <code className="text-sm font-bold text-blue-500 ml-3">include_stats</code>
                          </td>
                          <td className="px-8 py-6 text-sm text-slate-500">boolean</td>
                          <td className="px-8 py-6 text-sm text-slate-500">تضمين إحصائيات الاستخدام في الاستجابة.</td>
                       </tr>
                       <tr>
                          <td className="px-8 py-6">
                             <code className="text-sm font-bold text-emerald-500 ml-3">version</code>
                          </td>
                          <td className="px-8 py-6 text-sm text-slate-500">integer</td>
                          <td className="px-8 py-6 text-sm text-slate-500">رقم نسخة البيانات المطلوبة (افتراضي 1).</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Security Alert */}
           <div className="rounded-3xl bg-blue-500/5 border border-blue-500/20 p-6 flex items-start gap-4">
              <div className="p-2 rounded-xl bg-blue-500 text-white">
                 <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                 </svg>
              </div>
              <div className="space-y-1">
                 <h4 className="text-sm font-black text-blue-600 dark:text-blue-400">التوثيق الصلاحيات</h4>
                 <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    يتطلب هذا الطلب ترويسة <code className="px-2 py-0.5 bg-blue-500/10 rounded font-bold">Authorization: Bearer YOUR_API_KEY</code>. يمكنك الحصول على المفتاح من إعدادات الحساب.
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* Left Column: Interactive Playground */}
      <div className="w-full lg:w-[450px] space-y-6">
        
        {/* Code Snippets */}
        <div className="rounded-[32px] bg-[#0A1126] border border-slate-800 overflow-hidden text-white shadow-2xl">
           <div className="flex items-center justify-between border-b border-white/5 pr-4" dir="ltr">
              <div className="flex">
                 {['CURL', 'NODE.JS', 'PYTHON'].map((tab) => (
                   <button 
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`px-8 py-4 text-[10px] font-black tracking-widest transition-all ${activeTab === tab.toLowerCase() ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                   >
                      {tab}
                   </button>
                 ))}
              </div>
              <button 
                onClick={() => copyCode(activeTab === 'curl' ? 'curl -X GET "https://api.kayan.com/v2/data/collections/col_992" -H "Authorization: Bearer YOUR_API_KEY"' : activeTab === 'node.js' ? "const fetch = require('node-fetch'); fetch('https://api.kayan.com/v2/collections/col_992', { headers: { 'Authorization': 'Bearer YOUR_API_KEY' } });" : "import requests; response = requests.get('https://api.kayan.com/v2/collections/col_992', headers={'Authorization': 'Bearer YOUR_API_KEY'})")}
                className="p-2 text-slate-500 hover:text-white transition active:scale-90"
                title="Copy Code"
              >
                 <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                 </svg>
              </button>
           </div>
           
           <div className="p-8 font-mono text-[11px] min-h-[160px] relative group" dir="ltr">
              {activeTab === 'curl' && (
                <pre className="whitespace-pre-wrap leading-relaxed">
                  <span className="text-slate-500">curl -X GET</span> <span className="text-blue-400">"https://api.kayan.com/v2/data/collections/col_992"</span> \<br/>
                  <span className="text-slate-500">-H</span> <span className="text-amber-400">"Authorization: Bearer <span className="text-emerald-500">YOUR_API_KEY</span>"</span> \<br/>
                  <span className="text-slate-500">-H</span> <span className="text-amber-400">"Accept: application/json"</span>
                </pre>
              )}
              {activeTab === 'node.js' && (
                <pre className="whitespace-pre-wrap leading-relaxed text-blue-300">
                  const fetch = require('node-fetch');<br/><br/>
                  fetch('https://api.kayan.com/v2/collections/col_992', {'{'} <br/>
                  &nbsp;&nbsp;headers: {'{'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;'Authorization': 'Bearer YOUR_API_KEY'<br/>
                  &nbsp;&nbsp;{'}'}<br/>
                  {'}'});
                </pre>
              )}
              {activeTab === 'python' && (
                <pre className="whitespace-pre-wrap leading-relaxed text-emerald-400">
                  import requests<br/><br/>
                  response = requests.get(<br/>
                  &nbsp;&nbsp;'https://api.kayan.com/v2/collections/col_992',<br/>
                  &nbsp;&nbsp;headers={'{'} 'Authorization': 'Bearer YOUR_API_KEY' {'}'}<br/>
                  )<br/>
                  print(response.json())
                </pre>
              )}
           </div>
        </div>

        {/* Input Form */}
        <div className="p-8 rounded-[32px] border border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126] space-y-6">
           <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
              جرب الطلب
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
           </h3>
           
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-500 mr-1">المعرف (ID)</label>
                 <input type="text" defaultValue="col_992" className="w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm font-bold dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-white" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-500 mr-1">إحصائيات</label>
                 <input type="text" defaultValue="true" className="w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm font-bold dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-white" />
              </div>

              <button 
                onClick={executeRequest}
                disabled={isExecuting}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                  {isExecuting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري التنفيذ...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      تنفيذ الطلب (Execute)
                    </>
                  )}
              </button>
           </div>
        </div>

        {/* Response Section */}
        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-500">الاستجابة المحاكية</h3>
              <span className={`text-[10px] font-black ${response ? 'text-emerald-500' : 'text-slate-400'}`}>
                {response ? 'OK 200' : 'دردشة ساكنة'}
              </span>
           </div>
           
           <div 
             className={`p-8 rounded-[32px] bg-[#0A1126] border border-slate-800 text-slate-300 font-mono text-[11px] relative overflow-hidden transition-all duration-500 ${response ? 'ring-2 ring-emerald-500/30 shadow-xl shadow-emerald-500/10' : ''}`} 
             dir="ltr"
           >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-3xl rounded-full" />
              <pre className="whitespace-pre-wrap leading-6 text-left">
                  {response ? JSON.stringify(response, null, 2) : `// Click 'Execute' to see simulated response \n{\n  "status": "idle",\n  "data": null\n}`}
              </pre>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
