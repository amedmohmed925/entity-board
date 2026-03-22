'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthContext';
import { authApi } from '@/api/auth';
import { useToast } from '@/components/ui/Toast';
import { motion } from 'framer-motion';

export default function VerifyEmailPage() {
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { registrationEmail, login } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    setMounted(true);
    if (!registrationEmail && mounted) {
      // router.push('/register'); // Redirect if no email in context
    }
  }, [registrationEmail, mounted, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationEmail) {
      showToast('خطأ في البيانات. يرجى إعادة التسجيل', 'error');
      return;
    }
    setIsLoading(true);

    try {
      const response = await authApi.verifyEmail({ email: registrationEmail, code });
      const { user, token } = response.data;
      login(user, token);
      showToast('تم تفعيل الحساب بنجاح', 'success');
      router.push('/onboarding');
    } catch (error: any) {
      showToast(error.response?.data?.message || 'كود التفعيل غير صحيح', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!registrationEmail) return;
    setIsResending(true);
    try {
      await authApi.resendOtp(registrationEmail);
      showToast('تم إعادة إرسال كود التفعيل', 'success');
    } catch (error: any) {
      showToast('فشل إعادة إرسال الكود', 'error');
    } finally {
      setIsResending(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-white dark:bg-[#060B14] transition-colors duration-500">
      {/* Sidebar Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-50 dark:bg-[#0F172A] border-r border-gray-200 dark:border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent opacity-50" />
        <div className="relative z-10 flex flex-col items-center justify-center p-16 w-full text-right" dir="rtl">
          <div className="w-full max-w-lg">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              خطوة واحدة تفصلك عن <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-blue-600">عالم البيانات الذكي</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              لقد أرسلنا كود التفعيل إلى بريدك الإلكتروني: <br />
              <span className="font-black text-purple-600 dark:text-purple-400">{registrationEmail || '...'}</span>
            </p>
            
            <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 dark:text-white">الأمان أولاً</h4>
                    <p className="text-sm text-gray-500">نحن نحمي بياناتك بأعلى المعايير</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-[#060B14]">
        <div className="w-full max-w-md">
          <div className="text-center lg:text-right mb-10" dir="rtl">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3">تفعيل الحساب</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">أدخل الكود المكون من 6 أرقام للمتابعة</p>
          </div>

          <form className="space-y-6" dir="rtl" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                maxLength={6}
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="w-full px-6 py-5 text-center text-3xl font-black tracking-[1em] rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 text-gray-900 dark:text-white focus:ring-4 focus:ring-purple-600/20 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-700"
                placeholder="000000"
              />
              <div className="flex justify-between items-center px-2">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-sm font-black text-purple-600 dark:text-purple-400 hover:underline disabled:opacity-50"
                >
                  {isResending ? 'جاري الإرسال...' : 'إعادة إرسال الكود؟'}
                </button>
                <span className="text-sm text-gray-500">لم يصلك الكود؟</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || code.length < 6}
              className="w-full py-4 rounded-2xl bg-gradient-to-l from-purple-600 to-blue-600 text-white font-black text-lg transition-all transform hover:-translate-y-1 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              تفعيل الحساب الآن
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 dark:text-gray-400 font-bold">
            تريد استخدام بريد آخر؟{' '}
            <button onClick={() => router.push('/register')} className="text-purple-600 dark:text-purple-400 font-black hover:underline">العودة للتسجيل</button>
          </p>
        </div>
      </div>
    </div>
  );
}
