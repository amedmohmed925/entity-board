"use client";

import { useEffect, useState } from 'react';
import { SuperAdminSidebar } from '@/components/layout/SuperAdminSidebar';

type NotificationLog = {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  type: 'system' | 'billing' | 'alert' | 'user';
};

const initialNotifications: NotificationLog[] = [
  {
    id: '1',
    title: 'تجاوز حد الاستهلاك لأحد النماذج',
    description: 'نموذج AM تجاوز الحد اليومي بنسبة 8% في آخر 90 دقيقة.',
    time: 'منذ 5 دقائق',
    isRead: false,
    type: 'alert'
  },
  {
    id: '2',
    title: 'تحديث النظام مكتمل',
    description: 'تم ترقية بيئة الإنتاج إلى الإصدار v2.4.0 بنجاح.',
    time: 'منذ ساعة',
    isRead: false,
    type: 'system'
  },
  {
    id: '3',
    title: 'دفعة جديدة - باقة المؤسسات',
    description: 'العميل "شركة نيوتك للذكاء" قام بتسديد فاتورة شهر مارس بمبلغ $2,450.00.',
    time: 'منذ 3 ساعات',
    isRead: false,
    type: 'billing'
  },
  {
    id: '4',
    title: 'تسجيل دخول من جهاز جديد',
    description: 'تم تسجيل دخول جديد من متصفح Chrome في جدة، السعودية.',
    time: 'منذ يوم',
    isRead: true,
    type: 'user'
  },
  {
    id: '5',
    title: 'انقطاع مؤقت في خدمة Stripe',
    description: 'تم رصد توقف مؤقت لمدة دقيقتين في استدعاء واجهة برمجة تطبيقات Stripe.',
    time: 'منذ يومين',
    isRead: true,
    type: 'alert'
  }
];

function NotificationIcon({ type }: { type: NotificationLog['type'] }) {
  if (type === 'system') {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  } else if (type === 'billing') {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  } else if (type === 'alert') {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  }

  // user type default icon
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

export default function SuperAdminNotificationsPage() {
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    setMounted(true);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <main dir="rtl" className="min-h-screen bg-[#050A19] text-white">
      <div className="mx-auto max-w-[1440px] p-3 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          <SuperAdminSidebar />

          <section className="flex-1 rounded-3xl border border-[#1A2A4A] bg-[#080F23] p-4 md:p-6 overflow-hidden relative">
            {/* Atmospheric Background glow */}
            <div className="absolute top-[20%] lg:top-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />

            <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10 transition-all duration-700 opacity-100 translate-y-0">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white">إدارة الإشعارات</h1>
                <p className="mt-1 text-sm text-slate-400">تابع تحديثات الحسابات، وتنبيهات الأمان، والبيانات المالية في مكان واحد.</p>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300 transition hover:bg-blue-500/20"
                >
                  تحديد الكل كمقروء
                </button>
              )}
            </header>

            <section className={`rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 relative z-10 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="mb-4 flex items-center justify-between border-b border-[#1A2A4A] pb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-black text-white">الكل</h2>
                  {unreadCount > 0 && (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-xs font-black text-white">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                    <svg className="mb-3 h-12 w-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <p>لا توجد إشعارات حالياً.</p>
                  </div>
                ) : (
                  notifications.map((notif, index) => (
                    <div
                      key={notif.id}
                      className={`group relative flex items-start gap-4 rounded-xl border p-4 transition-all duration-500 ease-out hover:bg-[#121E42] ${
                        !notif.isRead 
                            ? 'border-blue-500/30 bg-[#0A132C]' 
                            : 'border-[#15203B] bg-[#080F23]'
                      } ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className={`mt-1 flex shrink-0 items-center justify-center rounded-full p-2.5 ${
                        notif.type === 'alert' ? 'bg-rose-500/10 text-rose-400' :
                        notif.type === 'billing' ? 'bg-emerald-500/10 text-emerald-400' :
                        notif.type === 'system' ? 'bg-cyan-500/10 text-cyan-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}>
                        <NotificationIcon type={notif.type} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h3 className={`font-bold truncate ${!notif.isRead ? 'text-white' : 'text-slate-300'}`}>
                            {notif.title}
                          </h3>
                          <span className="text-xs text-slate-500 shrink-0">{notif.time}</span>
                        </div>
                        <p className={`mt-1 text-sm ${!notif.isRead ? 'text-slate-300' : 'text-slate-500'}`}>
                          {notif.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute left-4 top-4 bg-[#121E42] sm:static sm:bg-transparent pl-2 sm:pl-0">
                        {!notif.isRead && (
                          <button 
                            onClick={() => markAsRead(notif.id)}
                            className="rounded-md bg-white/5 p-1.5 text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400 transition" 
                            title="تحديد كمقروء"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        )}
                        <button 
                          onClick={() => deleteNotification(notif.id)}
                          className="rounded-md bg-white/5 p-1.5 text-slate-300 hover:bg-rose-500/20 hover:text-rose-400 transition" 
                          title="حذف"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

          </section>
        </div>
      </div>
    </main>
  );
}
