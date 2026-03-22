'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/AuthContext';
import { authApi } from '@/api/auth';
import { useToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login: authLogin } = useAuth();
  const { showToast } = useToast();
  const fullText = 'لوحة تحكم ذكية لإدارة أعمالك';
  
  // Credentials map
  const credentials = {
    superadmin: { email: 'superadmin@demo.com', password: 'SuperAdmin@123', redirect: '/super-admin' },
    analyst: { email: 'analyst@demo.com', password: 'Analyst@123', redirect: '/analyst' },
    developer: { email: 'developer@demo.com', password: 'Developer@123', redirect: '/developer' },
    owner: { email: 'owner@demo.com', password: 'Owner@123', redirect: '/owner' },
    viewer: { email: 'viewer@demo.com', password: 'Viewer@123', redirect: '/viewer' }
  };

  useEffect(() => {
    setMounted(true);
    let i = 0;
    let isDeleting = false;
    
    const animate = () => {
      const currentText = fullText.slice(0, i);
      setDisplayText(currentText);

      if (!isDeleting && i < fullText.length) {
        i++;
        setTimeout(animate, 100);
      } else if (isDeleting && i > 0) {
        i--;
        setTimeout(animate, 50);
      } else {
        isDeleting = !isDeleting;
        setTimeout(animate, isDeleting ? 2000 : 500); // Wait before starting to delete or type again
      }
    };

    const initialTimeout = setTimeout(animate, 500);
    return () => clearTimeout(initialTimeout);
  }, []);

  if (!mounted) return null;

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await authApi.login({ email, password });
      
      const { user, token } = response.data;
      
      // Store in auth context
      authLogin(user, token);
      
      showToast('تم تسجيل الدخول بنجاح', 'success');

      // Role-based redirection logic
      let redirectPath = '/owner';

      if (user.role === 'SuperAdmin') {
        redirectPath = '/super-admin';
      } else if (user.role === 'Owner') {
        // If owner has no workspace, send to onboarding
        redirectPath = user.workspaceId ? '/owner' : '/onboarding';
      } else if (user.role === 'Analyst' || user.role === 'Developer') {
        // Consolidation: redirect to owner pages (or their specific one if still separate)
        redirectPath = '/owner';
      } else if (user.role === 'Viewer') {
        redirectPath = '/viewer';
      }
      
      setTimeout(() => {
        router.push(redirectPath);
      }, 500);
      
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'بيانات الدخول غير صحيحة';
      showToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillCredentials = (role: 'superadmin' | 'analyst' | 'developer' | 'owner' | 'viewer') => {
      setEmail(credentials[role].email);
      setPassword(credentials[role].password);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-white dark:bg-[#060B14] transition-colors duration-500">
      {/* Sidebar Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-50 dark:bg-[#0F172A] border-r border-gray-200 dark:border-white/5 transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent dark:from-blue-600/20 dark:via-purple-600/20 opacity-50" />
        <div className="absolute inset-0 dark:hidden" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
        }} />
        <div className="absolute inset-0 hidden dark:block" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
        }} />

        <div className="relative z-10 flex flex-col items-center justify-center p-16 w-full text-right" dir="rtl">
            <div className="w-full max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6">
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500 animate-pulse" />
                    تحليلات لحظية متقدمة
                </div>
                <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-6 leading-[1.2] min-h-[120px]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {displayText}
                    </span>
                    <span className="inline-block w-1 h-10 bg-blue-600 dark:bg-blue-400 ml-1 animate-[blink_1s_infinite]" />
                </h2>
                <style jsx>{`
                  @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                `}</style>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-md">
                    استعرض بياناتك بشكل مرئي وتفاعلي، واتخذ قراراتك بناءً على أرقام دقيقة وحقيقية.
                </p>

                {/* Abstract UI Element */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl transition-colors">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="w-20 h-2 bg-gray-100 dark:bg-white/5 rounded-full" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                    <div className="w-5 h-5 rounded bg-blue-500" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="w-2/3 h-2 bg-gray-100 dark:bg-white/10 rounded" />
                                    <div className="w-1/2 h-2 bg-gray-50 dark:bg-white/5 rounded" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 pt-2">
                                <div className="h-16 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5" />
                                <div className="h-16 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5" />
                                <div className="h-16 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-500/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Floating Decorative Orbs */}
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden bg-white dark:bg-[#060B14]">
        <div className="w-full max-w-xl relative z-10">
          <div className="text-center lg:text-right mb-10" dir="rtl">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">مرحباً بك مجدداً</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">سجل دخولك لتجربة لوحات التحكم المخصصة</p>
          </div>

          <div dir="rtl" className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
                onClick={() => fillCredentials('superadmin')}
                className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-800 dark:text-blue-300 cursor-pointer hover:bg-blue-500/20 transition-colors"
                title="Super Admin"
            >
                <p className="font-black mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    إدارة النظام
                </p>
                <p className="font-semibold text-[9px] opacity-70 truncate">superadmin@demo.com</p>
            </div>
            <div 
                onClick={() => fillCredentials('owner')}
                className="rounded-2xl border border-blue-600/30 bg-blue-600/10 p-4 text-sm text-blue-800 dark:text-blue-300 cursor-pointer hover:bg-blue-600/20 transition-colors"
                title="Owner"
            >
                <p className="font-black mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    صاحب العمل
                </p>
                <p className="font-semibold text-[9px] opacity-70 truncate">owner@demo.com</p>
            </div>
            <div 
                onClick={() => fillCredentials('viewer')}
                className="rounded-2xl border border-slate-500/30 bg-slate-500/10 p-4 text-sm text-slate-800 dark:text-slate-300 cursor-pointer hover:bg-slate-500/20 transition-colors"
                title="Viewer"
            >
                <p className="font-black mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                    المشاهد
                </p>
                <p className="font-semibold text-[9px] opacity-70 truncate">viewer@demo.com</p>
            </div>
          </div>

          <form className="space-y-6" dir="rtl" onSubmit={handleLogin}>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-gray-200 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 text-gray-700 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.9 0 3.63.66 4.97 1.94l3.71-3.71C18.43 1.34 15.42 0 12 0 7.37 0 3.4 2.66 1.39 6.56l4.27 3.32C6.67 7.02 9.1 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.61 12.25c0-.82-.07-1.61-.21-2.38H12v4.51h6.51c-.28 1.48-1.11 2.74-2.37 3.59l3.69 2.87c2.16-1.99 3.78-4.92 3.78-8.59z" />
                <path fill="#FBBC05" d="M5.66 14.72C5.42 14 5.28 13.23 5.28 12.44s.14-1.56.38-2.28L1.39 6.56C.5 8.33 0 10.3 0 12.44s.5 4.11 1.39 5.88l4.27-3.6z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91L16.26 18.2c-1.1.74-2.5 1.18-4.26 1.18-3.28 0-6.07-2.21-7.06-5.18l-4.27 3.32C3.4 21.34 7.37 24 12 24z" />
              </svg>
              متابعة باستخدام جوجل
            </button>

            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest whitespace-nowrap">أو عبر البريد الإلكتروني</span>
              <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mr-1">البريد الإلكتروني</label>
              <input
                type="email"
                className="w-full px-4 py-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mr-1">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">كلمة المرور</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-500">نسيت كلمة المرور؟</a>
              </div>
              <input
                type="password"
                className="w-full px-4 py-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder=""
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>


            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500/70 text-white font-black text-lg shadow-xl shadow-blue-500/20 transition-all transform hover:-translate-y-1 disabled:translate-y-0"
            >
              {isSubmitting ? 'جاري التحويل...' : 'تسجيل الدخول'}
            </button>
          </form>

          <p className="mt-10 text-center text-gray-500 dark:text-gray-400 font-medium font-bold">
            ليس لديك حساب بعد؟{' '}
            <Link href="/register" prefetch className="text-blue-600 dark:text-blue-400 font-black hover:underline underline-offset-4">إنشاء حساب مجاني</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
