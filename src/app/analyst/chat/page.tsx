'use client';

import { useState, useEffect, useRef } from 'react';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  hasChart?: boolean;
};

const initialMessages: Message[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: 'أهلاً بك يا أحمد! كيف يمكنني مساعدتك في استكشاف بياناتك اليوم؟ يمكنك طلب ملخصات، مقارنات، أو بناء رسوم بيانية تفاعلية.',
    time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
  }
];

export default function ChatWithDataPage() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputText.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const isSalesQuery = userMsg.text.includes('مبيعات') || userMsg.text.includes('أداء') || userMsg.text.includes('نمو');
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: isSalesQuery 
            ? 'بناءً على البيانات المتاحة، شهد الربع الأخير نمواً بنسبة **14.2%** مقارنة بنفس الفترة من العام الماضي. إليك التفاصيل حسب الفئات:'
            : 'بناءً على طلبك، قمت بتحليل البيانات المشفرة المتعلقة باستفسارك. المؤشرات الحالية إيجابية وتشير إلى استقرار عام. هل ترغب في تصدير هذا الملخص أو إنشاء تقرير مفصل؟',
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        hasChart: isSalesQuery
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-[1920px] p-0 md:p-3 xl:p-5 h-[calc(100vh-88px)] bg-slate-50 dark:bg-[#050A19]">
        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col rounded-2xl border border-slate-200 dark:border-[#1A2A4A] overflow-hidden bg-white dark:bg-[#0A1126] h-full shadow-2xl relative">
          
          {/* Top Header of Chat */}
          <header className="h-16 shrink-0 border-b border-slate-200 dark:border-[#1A2A4A] bg-white/95 dark:bg-[#0A1126]/95 backdrop-blur z-20 flex items-center justify-between px-6 shadow-sm dark:shadow-none">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </div>
                <div>
                   <h1 className="text-sm font-bold text-slate-900 dark:text-white">تحليل المبيعات الربع سنوي</h1>
                   <p className="text-xs text-slate-500 dark:text-slate-400">محادثة نشطة</p>
                </div>
             </div>
             
             <div className="flex items-center gap-4">
                <div className="relative group hidden sm:block">
                   <input type="text" placeholder="بحث في السجلات..." className="bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#2A375A] rounded-full py-1.5 px-4 pr-10 text-xs text-slate-900 dark:text-slate-300 w-48 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors shadow-sm dark:shadow-none" />
                   <svg className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute top-1/2 right-3 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z" /></svg>
                </div>
                <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></button>
                <div className="h-6 w-px bg-slate-200 dark:bg-[#1A2A4A]"></div>
                <div className="flex items-center gap-2">
                   <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">أحمد العتيبي</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-500 leading-tight">محلل بيانات</p>
                   </div>
                   <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-[#2A375A]">
                      <img src="/avatars/ahmed.jpg" alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Ahmed&background=1e293b&color=fff' }} />
                   </div>
                </div>
             </div>
          </header>

          {/* Chat Messages List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-32 custom-scrollbar">
             <div className="max-w-4xl mx-auto space-y-8">
                {messages.map((msg, idx) => (
                   <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end mt-4' : 'items-start'} transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                      
                      {/* Message Meta Info */}
                      <div className={`flex items-center gap-2 mb-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                         {msg.sender === 'ai' ? (
                            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-500 shadow-sm">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                         ) : (
                            <div className="w-8 h-8 rounded-xl overflow-hidden border border-slate-200 dark:border-[#2A375A] shadow-sm">
                               <img src="/avatars/ahmed.jpg" alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Ahmed&background=1e293b&color=fff' }} />
                            </div>
                         )}
                         <span className="text-xs font-bold text-slate-900 dark:text-white">{msg.sender === 'ai' ? 'كيان بورد' : 'أنت'}</span>
                         <span className="text-[10px] text-slate-500">{msg.time}</span>
                      </div>

                      {/* Message Bubble */}
                      <div className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                         msg.sender === 'user' 
                            ? 'bg-blue-600 text-white rounded-tr-sm shadow-[0_4px_20px_rgba(37,99,235,0.2)]' 
                            : 'bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#1A2A4A] text-slate-700 dark:text-slate-200 rounded-tl-sm shadow-sm dark:shadow-none'
                      }`}>
                         {/* Render text with basic bolding support */}
                         <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<span class="text-emerald-600 dark:text-emerald-400 font-bold">$1</span>') }} />

                         {/* Embedded Chart inside AI message */}
                         {msg.hasChart && (
                            <div className="mt-4 bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] rounded-xl p-4 shadow-sm dark:shadow-inner">
                               <div className="flex justify-between items-center mb-6">
                                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs">
                                     <svg className="w-4 h-4 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                     مقارنة أداء الفئات (الربع الرابع)
                                  </div>
                                  <button className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-xs font-bold flex items-center gap-1 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded transition-colors">
                                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                     إضافة للمساحة
                                  </button>
                               </div>

                               {/* Bar Chart Recreation */}
                               <div className="space-y-5">
                                  
                                  {/* Row 1 */}
                                  <div>
                                     <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-slate-600 dark:text-slate-300">الأجهزة الإلكترونية</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">+22%</span>
                                     </div>
                                     <div className="h-2 w-full bg-slate-100 dark:bg-[#1A2A4A] rounded-full overflow-hidden flex flex-row-reverse">
                                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '85%' }}></div>
                                     </div>
                                  </div>

                                  {/* Row 2 */}
                                  <div>
                                     <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-slate-600 dark:text-slate-300">الأثاث المكتبي</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">+12%</span>
                                     </div>
                                     <div className="h-2 w-full bg-slate-100 dark:bg-[#1A2A4A] rounded-full overflow-hidden flex flex-row-reverse">
                                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
                                     </div>
                                  </div>

                                  {/* Row 3 */}
                                  <div>
                                     <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-slate-600 dark:text-slate-300">البرمجيات</span>
                                        <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">-5%</span>
                                     </div>
                                     <div className="h-2 w-full bg-slate-100 dark:bg-[#1A2A4A] rounded-full overflow-hidden flex flex-row-reverse relative">
                                        <div className="absolute left-0 h-full bg-slate-500/50 rounded-full" style={{ width: '45%' }}></div>
                                        <div className="h-full bg-slate-400 rounded-full z-10" style={{ width: '40%' }}></div>
                                     </div>
                                  </div>

                                  {/* Legend */}
                                  <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-200 dark:border-[#1A2A4A] pt-4 mt-2">
                                     <span>إجمالي العينات: 1,240</span>
                                     <div className="flex gap-4">
                                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-500"></span> 2022</span>
                                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600"></span> 2023</span>
                                     </div>
                                  </div>

                               </div>

                               {/* AI Insight inside chart box */}
                               <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#1A2A4A] border-dashed text-xs text-blue-600 dark:text-blue-400 border-l-2 pl-3">
                                  نلاحظ أن "الأجهزة الإلكترونية" هي المحرك الأساسي للنمو، بينما شهدت "البرمجيات" تراجعاً طفيفاً قد يتطلب مراجعة استراتيجية التسعير.
                               </div>
                            </div>
                         )}

                         {/* Follow up suggestions */}
                         {msg.hasChart && (
                            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
                               <button className="whitespace-nowrap rounded-full border border-slate-200 dark:border-[#2A375A] bg-white dark:bg-[#0A1126] px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#142247] hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm dark:shadow-none">
                                  هل توجد تفاصيل أكثر عن البرمجيات؟
                               </button>
                               <button className="whitespace-nowrap rounded-full border border-slate-200 dark:border-[#2A375A] bg-white dark:bg-[#0A1126] px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#142247] hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm dark:shadow-none">
                                  قارن بالأشهر الثلاثة السابقة
                               </button>
                            </div>
                         )}

                      </div>
                   </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                   <div className={`flex flex-col items-start transition-all duration-300 opacity-100 translate-y-0`}>
                      <div className="flex items-center gap-2 mb-2">
                         <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-500 shadow-sm">
                            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                         </div>
                         <span className="text-xs font-bold text-slate-900 dark:text-white">كيان بورد</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#1A2A4A] rounded-2xl p-4 rounded-tl-sm shadow-sm dark:shadow-none">
                         <div className="flex gap-1.5 items-center">
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                         </div>
                      </div>
                   </div>
                )}
                <div ref={messagesEndRef} className="h-4" />
             </div>
          </div>

          {/* Bottom Chat Input Fixed Area */}
          <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-white dark:from-[#0A1126] via-white/80 dark:via-[#0A1126]/80 to-transparent z-20">
             <div className="max-w-4xl mx-auto">
                <div className="relative flex items-end bg-white dark:bg-[#0D1632] border border-slate-200 dark:border-[#2A375A] rounded-2xl p-2 transition-all hover:border-blue-400 dark:hover:border-[#3A476A] shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-xl">
                   
                   {/* Send Button */}
                   <button 
                      onClick={handleSendMessage}
                      disabled={!inputText.trim() || isTyping}
                      className="h-12 w-12 shrink-0 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
                      <svg className="w-5 h-5 rotate-180 translate-y-[-1px] translate-x-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                   </button>

                   {/* Text Input */}
                   <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="اسأل أي شيء عن بياناتك..."
                      className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 text-sm md:text-base px-4 py-3 min-h-[48px] max-h-32 resize-none custom-scrollbar"
                      rows={1}
                      onKeyDown={(e) => {
                         if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                         }
                      }}
                   />

                   {/* Attachment / Tools Button */}
                   <button className="h-12 w-12 shrink-0 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                   </button>
                </div>

                {/* Security Footer */}
                <div className="flex justify-center items-center gap-4 mt-3 text-[10px] text-slate-500 font-mono">
                   <span className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      بواسطة GPT-4o
                   </span>
                   <span className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      بياناتك مشفرة وآمنة
                   </span>
                </div>
             </div>
          </div>
        </main>
    </div>
  );
}
