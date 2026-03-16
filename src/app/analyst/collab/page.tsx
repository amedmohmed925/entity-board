'use client';

import { useState, useEffect } from 'react';

interface AccessMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarBg: string;
}

export default function CollaborationPage() {
  const [mounted, setMounted] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('محرر');
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the modal
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [accessList, setAccessList] = useState<AccessMember[]>([
    { id: '1', name: 'فيصل العتيبي', email: 'faisal@kayan.sa', role: 'محرر', avatarBg: 'cbd5e1' }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mx-auto max-w-[1920px] p-0 md:p-3 xl:p-5 h-[calc(100vh-88px)] bg-slate-50 dark:bg-[#050A19]">
        {/* Main Content Area - Mocking a dashboard with a modal overlay */}
        <main className="flex-1 rounded-2xl border border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126] min-h-[calc(100vh-120px)] shadow-sm dark:shadow-2xl relative flex flex-col p-6 md:p-8 overflow-y-auto">
          
          {/* Top Section: Current Projects */}
          <div className="mb-10">
             <div className="flex justify-between items-center mb-6">
                <button className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-sm font-bold transition-colors">
                   عرض الكل
                </button>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                   المشاريع الحالية
                   <svg className="w-5 h-5 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m-14 0V9a2 2 0 00-2-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Project Card 1 */}
                <div className="bg-slate-50 dark:bg-[#091024] border border-slate-200 dark:border-[#1A2A4A] rounded-2xl p-6 group hover:border-blue-400 dark:hover:border-[#2A375A] transition-colors relative shadow-sm dark:shadow-none">
                   <div className="absolute top-6 left-6 text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md text-xs font-bold border border-emerald-200 dark:border-emerald-500/20">
                      نشط
                   </div>
                   <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-500 mb-6 border border-blue-200 dark:border-blue-500/20 ml-auto">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 text-right">لوحة مبيعات الرياض</h3>
                   <p className="text-xs text-slate-600 dark:text-slate-400 text-right mb-6 leading-relaxed">تحليل المبيعات الربع سنوية لمنطقة الرياض الكبرى مع توقعات النمو.</p>
                   
                   <div className="flex justify-between items-center text-xs text-slate-500 pt-4 border-t border-slate-200 dark:border-[#1A2A4A]">
                      <div className="flex items-center -space-x-2 space-x-reverse">
                         <div className="w-6 h-6 rounded-full border border-white dark:border-[#0A1126] overflow-hidden bg-slate-800 z-30">
                            <img src="https://ui-avatars.com/api/?name=Ahmed&background=1e293b&color=fff" alt="User" />
                         </div>
                         <div className="w-6 h-6 rounded-full border border-white dark:border-[#0A1126] overflow-hidden bg-slate-800 z-20">
                            <img src="https://ui-avatars.com/api/?name=Sara&background=334155&color=fff" alt="User" />
                         </div>
                         <div className="w-6 h-6 rounded-full border border-white dark:border-[#0A1126] bg-slate-800 dark:bg-[#1A2A4A] flex items-center justify-center text-[10px] text-white z-10">
                            +3
                         </div>
                      </div>
                      <span>آخر تحديث: ساعتين</span>
                   </div>
                </div>

                {/* Project Card 2 */}
                <div className="bg-slate-50 dark:bg-[#091024] border border-slate-200 dark:border-[#1A2A4A] rounded-2xl p-6 relative group hover:border-blue-400 dark:hover:border-[#2A375A] transition-colors shadow-sm dark:shadow-none">
                   <div className="absolute top-6 left-6 text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-md text-xs font-bold border border-amber-200 dark:border-amber-500/20">
                      قيد المراجعة
                   </div>
                   <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-500 mb-6 border border-orange-200 dark:border-orange-500/20 ml-auto">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 text-right">تحليل بيانات جدة</h3>
                   <p className="text-xs text-slate-600 dark:text-slate-400 text-right mb-6 leading-relaxed">تنظيف ومعالجة البيانات الواردة من فرع جدة للموسم الحالي.</p>
                   
                   <div className="flex justify-between items-center text-xs text-slate-500 pt-4 border-t border-slate-200 dark:border-[#1A2A4A]">
                      <div className="flex items-center -space-x-2 space-x-reverse">
                         <div className="w-6 h-6 rounded-full border border-white dark:border-[#0A1126] overflow-hidden bg-slate-800 z-30">
                            <img src="https://ui-avatars.com/api/?name=Faisal&background=0f172a&color=fff" alt="User" />
                         </div>
                         <div className="w-6 h-6 rounded-full border border-white dark:border-[#0A1126] bg-slate-800 dark:bg-[#1A2A4A] flex items-center justify-center text-[10px] text-white z-10">
                            +1
                         </div>
                      </div>
                      <span>آخر تحديث: يوم واحد</span>
                   </div>
                </div>

                {/* Project Card 3 */}
                <div className="bg-slate-50 dark:bg-[#091024] border border-slate-200 dark:border-[#1A2A4A] rounded-2xl p-6 relative group hover:border-blue-400 dark:hover:border-[#2A375A] transition-colors shadow-sm dark:shadow-none">
                   <div className="absolute top-6 left-6 text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-md text-xs font-bold border border-blue-200 dark:border-blue-500/20">
                      مكتمل
                   </div>
                   <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-500 mb-6 border border-indigo-200 dark:border-indigo-500/20 ml-auto">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 text-right">مؤشرات الأداء الربع سنوية</h3>
                   <p className="text-xs text-slate-600 dark:text-slate-400 text-right mb-6 leading-relaxed">التقرير النهائي لمؤشرات الأداء الرئيسية للربع الرابع من العام الماضي.</p>
                   
                   <div className="flex justify-between items-center text-xs text-slate-500 pt-4 border-t border-slate-200 dark:border-[#1A2A4A]">
                      <div className="flex items-center -space-x-2 space-x-reverse">
                         <div className="w-6 h-6 rounded-full border border-white dark:border-[#0A1126] overflow-hidden bg-slate-800 z-30">
                            <img src="https://ui-avatars.com/api/?name=Maha&background=fbbf24&color=fff" alt="User" />
                         </div>
                      </div>
                      <span>آخر تحديث: أسبوع</span>
                   </div>
                </div>

             </div>
          </div>

          {/* Bottom Section: Access Management & Team Activity */}
          <div className="flex flex-col lg:flex-row gap-8">
             
             {/* Left/Main Column: Access Management */}
             <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                   <button onClick={() => setIsModalOpen(true)} className="bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-600/20 border border-blue-200 dark:border-blue-500/20 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-sm dark:shadow-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                      دعوة عضو جديد
                   </button>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      إدارة الوصول
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                   </h2>
                </div>

                <div className="bg-slate-50 dark:bg-[#091024] border border-slate-200 dark:border-[#1A2A4A] rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
                   <table className="w-full text-right">
                      <thead className="bg-slate-100 dark:bg-[#0D1632] border-b border-slate-200 dark:border-[#1A2A4A]">
                         <tr>
                            <th className="py-4 px-6 text-sm font-bold text-slate-600 dark:text-slate-400">العضو</th>
                            <th className="py-4 px-6 text-sm font-bold text-slate-600 dark:text-slate-400">الدور</th>
                            <th className="py-4 px-6 text-sm font-bold text-slate-600 dark:text-slate-400">مستوى الوصول</th>
                            <th className="py-4 px-6 text-sm font-bold text-slate-600 dark:text-slate-400">الحالة</th>
                            <th className="py-4 px-6 text-sm font-bold text-slate-600 dark:text-slate-400">الإجراءات</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-[#1A2A4A]">
                         
                         {/* Row 1 */}
                         <tr className="hover:bg-slate-100 dark:hover:bg-[#0D1632]/50 transition-colors">
                            <td className="py-4 px-6">
                               <div className="flex items-center gap-3 justify-end">
                                  <div className="text-right">
                                     <p className="text-sm font-bold text-slate-900 dark:text-white">خالد بن فيصل</p>
                                     <p className="text-xs text-slate-500 font-mono">khalid@kayan.sa</p>
                                  </div>
                                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-[#2A375A]">
                                     <img src="https://ui-avatars.com/api/?name=Khalid&background=0f172a&color=fff" alt="" />
                                  </div>
                               </div>
                            </td>
                            <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">محلل بيانات</td>
                            <td className="py-4 px-6">
                               <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded text-xs">تعديل كامل</span>
                            </td>
                            <td className="py-4 px-6">
                               <div className="flex items-center justify-end gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                  <span>متصل</span>
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                               </div>
                            </td>
                            <td className="py-4 px-6">
                               <button className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                               </button>
                            </td>
                         </tr>

                         {/* Row 2 */}
                         <tr className="hover:bg-slate-100 dark:hover:bg-[#0D1632]/50 transition-colors">
                            <td className="py-4 px-6">
                               <div className="flex items-center gap-3 justify-end">
                                  <div className="text-right">
                                     <p className="text-sm font-bold text-slate-900 dark:text-white">سارة ناصر</p>
                                     <p className="text-xs text-slate-500 font-mono">sara_n@kayan.sa</p>
                                  </div>
                                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-[#2A375A]">
                                     <img src="https://ui-avatars.com/api/?name=Sara&background=334155&color=fff" alt="" />
                                  </div>
                               </div>
                            </td>
                            <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">مدير منتج</td>
                            <td className="py-4 px-6">
                               <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded text-xs">عرض فقط</span>
                            </td>
                            <td className="py-4 px-6">
                               <div className="flex items-center justify-end gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                  <span>منذ يوم</span>
                                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"></div>
                               </div>
                            </td>
                            <td className="py-4 px-6">
                               <button className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                               </button>
                            </td>
                         </tr>

                         {/* Row 3 */}
                         <tr className="hover:bg-slate-100 dark:hover:bg-[#0D1632]/50 transition-colors">
                            <td className="py-4 px-6">
                               <div className="flex items-center gap-3 justify-end">
                                  <div className="text-right">
                                     <p className="text-sm font-bold text-slate-900 dark:text-white">عبدالله القحطاني</p>
                                     <p className="text-xs text-slate-500 font-mono">a.qahtani@kayan.sa</p>
                                  </div>
                                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-[#2A375A]">
                                     <img src="https://ui-avatars.com/api/?name=Abdullah&background=1e293b&color=fff" alt="" />
                                  </div>
                               </div>
                            </td>
                            <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">مطور نظم</td>
                            <td className="py-4 px-6">
                               <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded text-xs text-center inline-block">مسؤول<br/>النظام</span>
                            </td>
                            <td className="py-4 px-6">
                               <div className="flex items-center justify-end gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                  <span>متصل الآن</span>
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                               </div>
                            </td>
                            <td className="py-4 px-6">
                               <button className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                               </button>
                            </td>
                         </tr>
                         
                      </tbody>
                   </table>
                   <div className="p-4 text-center border-t border-[#1A2A4A] bg-[#0A1126]">
                      <span className="text-xs text-slate-500">عرض ٣ من أصل ١٢ عضواً في فريق التحليل</span>
                   </div>
                </div>
             </div>

             {/* Right Column: Team Activity Feed */}
             <div className="w-full lg:w-[400px] shrink-0">
                <div className="flex justify-between items-center mb-6">
                   <button className="p-1 text-slate-400 hover:text-white transition-colors bg-[#0D1632] rounded border border-[#1A2A4A]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                   </button>
                   <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      نشاط الفريق
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                   </h2>
                </div>

                <div className="bg-[#091024] border border-[#1A2A4A] rounded-2xl flex flex-col h-[600px]">
                   <div className="flex-1 overflow-y-auto p-6 space-y-8">
                      
                      {/* Activity 1 - Comment */}
                      <div className="relative">
                         {/* Connection Line */}
                         <div className="absolute top-10 right-5 bottom-[-40px] w-px bg-slate-200 dark:bg-[#1A2A4A]"></div>
                         
                         <div className="flex gap-4 flex-row-reverse text-right">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-[#1A2A4A] bg-slate-800 shrink-0 z-10 relative shadow-sm dark:shadow-none">
                               <img src="https://ui-avatars.com/api/?name=Khalid&background=0f172a&color=fff" alt="" />
                            </div>
                            <div className="flex-1">
                               <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
                                  <span className="font-bold text-slate-900 dark:text-white">خالد</span> أضاف تعليقاً على <a href="#" className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">لوحة مبيعات الرياض</a>
                               </p>
                               <div className="bg-white dark:bg-[#142247]/50 border border-slate-200 dark:border-[#2A375A] rounded-xl p-4 mb-2 shadow-sm dark:shadow-none">
                                  <p className="text-sm text-slate-700 dark:text-slate-300 italic">"أعتقد أننا بحاجة لتحديث بيانات شهر ديسمبر لتكون أكثر دقة."</p>
                               </div>
                               <span className="text-[10px] text-slate-500">منذ ١٥ دقيقة</span>
                            </div>
                         </div>
                      </div>

                      {/* Activity 2 - Joined */}
                      <div className="relative">
                         {/* Connection Line */}
                         <div className="absolute top-10 right-5 bottom-[-40px] w-px bg-slate-200 dark:bg-[#1A2A4A]"></div>
                         
                         <div className="flex gap-4 flex-row-reverse text-right">
                            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#1A2A4A] bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-500 shrink-0 z-10 relative transform translate-x-[2px] shadow-sm dark:shadow-none">
                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                            </div>
                            <div className="flex-1 pt-2">
                               <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                                  <span className="font-bold text-slate-900 dark:text-white">سارة</span> انضمت إلى فريق <a href="#" className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">تحليل بيانات جدة</a>
                               </p>
                               <span className="text-[10px] text-slate-500">منذ ساعة</span>
                            </div>
                         </div>
                      </div>

                      {/* Activity 3 - Mention */}
                      <div className="relative">
                         <div className="flex gap-4 flex-row-reverse text-right">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-[#1A2A4A] bg-slate-800 shrink-0 z-10 relative shadow-sm dark:shadow-none">
                               <img src="https://ui-avatars.com/api/?name=Ahmed&background=1e293b&color=fff" alt="" />
                            </div>
                            <div className="flex-1 pt-2">
                               <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                                  أشار إليك <span className="font-bold text-slate-900 dark:text-white">محمد</span> في <a href="#" className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">تقرير الأداء</a>
                               </p>
                               <span className="text-[10px] text-slate-500">منذ ٣ ساعات</span>
                            </div>
                         </div>
                      </div>

                   </div>
                   
                   <div className="p-4 border-t border-slate-200 dark:border-[#1A2A4A]">
                      <button className="w-full bg-white dark:bg-[#0D1632] hover:bg-slate-50 dark:hover:bg-[#1A2A4A] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-[#1A2A4A] shadow-sm dark:shadow-none py-3 rounded-xl text-sm font-bold">
                         بدء نقاش جديد
                      </button>
                   </div>
                </div>
             </div>

          </div>
          
          {/* Modal Overlay / Backdrop */}
          {isModalOpen && (
             <div className="fixed inset-0 top-[72px] md:top-[88px] bg-slate-900/50 dark:bg-[#050A19]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
             
             {/* The Share Modal */}
             <div className={`w-full max-w-xl bg-white dark:bg-[#091024] border border-slate-200 dark:border-[#1A2A4A] rounded-2xl shadow-xl dark:shadow-2xl transition-all duration-500 overflow-hidden ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                
                {/* Modal Header */}
                 <div className="p-6 pb-4 flex justify-between items-start border-b border-slate-200 dark:border-[#1A2A4A] relative">
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors p-1 absolute top-4 left-4">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="text-center w-full">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-wide">مشاركة "مشروع الهوية البصرية"</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">دعوة أعضاء الفريق وتعديل صلاحيات الوصول</p>
                   </div>
                </div>

                {/* Toast Notification */}
                <div className={`absolute top-20 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition-all duration-300 z-50 ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                   {toastMessage}
                </div>

                <div className="p-6">
                   {/* Invite Section */}
                   <div className="mb-8">
                      <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 text-right">دعوة بالبريد الإلكتروني</label>
                      <div className="flex items-center gap-3">
                         <button 
                            onClick={handleInvite}
                            disabled={isSending || !inviteEmail.trim()}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm dark:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-colors shrink-0 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isSending ? (
                                <>جاري الإرسال <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></>
                            ) : 'إرسال'}
                         </button>
                         <div className="relative shrink-0">
                            <select 
                               className="appearance-none bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#2A375A] text-slate-900 dark:text-slate-300 text-sm py-2.5 pl-4 pr-10 rounded-lg focus:outline-none hover:border-blue-400 dark:hover:border-[#3A476A] cursor-pointer shadow-sm dark:shadow-none"
                               value={inviteRole}
                               onChange={(e) => setInviteRole(e.target.value)}
                            >
                               <option>محرر</option>
                               <option>مشاهد</option>
                            </select>
                            <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                         </div>
                         <input 
                            type="email" 
                            placeholder="أدخل البريد الإلكتروني..." 
                            className="w-full bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#2A375A] rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors shadow-sm dark:shadow-none"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                         />
                      </div>
                   </div>

                   <div className="h-px w-full bg-slate-200 dark:bg-[#1A2A4A] mb-6"></div>

                   {/* Access List */}
                   <div className="mb-8">
                      <h3 className="block text-sm font-bold text-slate-900 dark:text-white mb-4 text-right">من لديه حق الوصول</h3>
                      <div className="space-y-4">
                         
                         {/* Owner */}
                         <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">مالك المشروع</span>
                            <div className="flex items-center gap-3">
                               <div className="text-right">
                                  <p className="text-sm font-bold text-slate-900 dark:text-white">محمد إبراهيم <span className="text-slate-500 dark:text-slate-400 font-normal">(أنت)</span></p>
                                  <p className="text-xs text-slate-500 font-mono">mohamed@kayan.sa</p>
                               </div>
                               <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                                  م
                               </div>
                            </div>
                         </div>

                         {/* Given Access Users */}
                         {accessList.map(member => (
                            <div key={member.id} className="flex items-center justify-between animate-fade-in-up">
                               <div className="relative group">
                                  <button className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-500 font-medium hover:text-blue-700 dark:hover:text-blue-400">
                                     {member.role}
                                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                  </button>
                               </div>
                               <div className="flex items-center gap-3">
                                  <div className="text-right">
                                     <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[120px]">{member.name}</p>
                                     <p className="text-xs text-slate-500 font-mono truncate max-w-[120px]" dir="ltr">{member.email}</p>
                                  </div>
                                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-[#2A375A]">
                                     <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${member.avatarBg}&color=fff`} alt={member.name} className="w-full h-full object-cover" />
                                  </div>
                               </div>
                            </div>
                         ))}

                      </div>
                   </div>

                   <div className="h-px w-full bg-slate-200 dark:bg-[#1A2A4A] mb-6"></div>

                   {/* Link Sharing */}
                   <div className="flex items-center justify-between bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#2A375A] rounded-xl p-4 shadow-sm dark:shadow-none">
                      <button onClick={handleCopyLink} className="bg-blue-50 dark:bg-blue-600/10 hover:bg-blue-100 dark:hover:bg-blue-600/20 text-blue-600 dark:text-blue-500 border border-blue-200 dark:border-blue-500/20 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                         نسخ الرابط
                      </button>
                      <div className="flex items-center gap-4">
                         <div className="text-right">
                            <p className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">مشاركة الرابط</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">أي شخص لديه الرابط يمكنه العرض</p>
                         </div>
                         <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-[#1A2A4A] flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                         </div>
                      </div>
                   </div>

                </div>

                 {/* Modal Footer */}
                 <div className="bg-slate-100 dark:bg-[#0A1126] border-t border-slate-200 dark:border-[#1A2A4A] px-6 py-4 flex items-center justify-between text-xs">
                    <a href="#" className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">إعدادات الأمان المتقدمة</a>
                    <span className="text-slate-500 dark:text-slate-400">المشروع متاح لجميع أعضاء فريق "كيان ديزاين"</span>
                 </div>
 
              </div>
           </div>
          )}
        </main>
    </div>
  );
}
