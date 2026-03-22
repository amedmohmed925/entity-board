'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthContext';
import { authApi } from '@/api/auth';
import { useToast } from '@/components/ui/Toast';

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { setRegistrationEmail } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const fullText = 'ابدأ رحلتك في تحويل البيانات إلى قرارات';

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
        setTimeout(animate, isDeleting ? 2000 : 500);
      }
    };

    const initialTimeout = setTimeout(animate, 500);
    return () => clearTimeout(initialTimeout);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authApi.register(formData);
      setRegistrationEmail(formData.email);
      showToast('تم إنشاء الحساب بنجاح. يرجى تفعيل البريد الإلكتروني', 'success');
      router.push('/verify-email');
    } catch (error: any) {
      showToast(error.response?.data?.message || 'فشل إنشاء الحساب. يرجى المحاولة مرة أخرى', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-white dark:bg-[#060B14] transition-colors duration-500">
      {/* Sidebar Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-50 dark:bg-[#0F172A] border-r border-gray-200 dark:border-white/5 transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent dark:from-purple-600/20 dark:via-blue-600/20 opacity-50" />
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-bold mb-6">
                    <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-500 animate-pulse" />
                    انضم إلى مجتمعنا المتنامي
                </div>
                <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-6 leading-[1.2] min-h-[120px]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-blue-600 dark:from-purple-400 to-blue-400">
                        {displayText}
                    </span>
                    <span className="inline-block w-1 h-10 bg-purple-600 dark:bg-purple-400 ml-1 animate-[blink_1s_infinite]" />
                </h2>
                <style jsx>{`
                  @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                `}</style>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-md">
                    سجل حسابك الآن واحصل على وصول كامل لجميع الأدوات التحليلية المتقدمة التي توفرها كيان بورد.
                </p>

                {/* Growth Metric UI */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl transition-colors">
                        <div className="flex items-end justify-between gap-2 h-32">
                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                <div key={i} className="flex-1 bg-gradient-to-t from-purple-600/20 to-purple-500/60 rounded-t-lg transition-all duration-500 group-hover:opacity-100 opacity-60" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-purple-600 dark:text-purple-400 font-black text-xl">+12.5%</div>
                            <div className="text-gray-500 text-sm">معدل النمو الشهري</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Decorative Orbs */}
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Register Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-white dark:bg-[#060B14]">
        <div className="w-full max-w-lg relative z-10">
          <div className="text-center lg:text-right mb-8" dir="rtl">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3">إنشاء حساب جديد</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">ابدأ تجربتك المجانية اليوم (لا تتطلب بطاقة ائتمان)</p>
          </div>

          <form className="space-y-5" dir="rtl" onSubmit={handleSubmit}>
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
              بدء الاستخدام مع جوجل 
            </button>

            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest text-center whitespace-nowrap">أو عبر النموذج</span>
              <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
            </div>

            <div className="space-y-5">
                <div className="space-y-2">
                   <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mr-1">الاسم بالكامل</label>
                   <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 outline-none transition-all"
                    placeholder="مثل: أحمد محمد"
                   />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mr-1">البريد الإلكتروني للعمل</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 outline-none transition-all"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mr-1">كلمة المرور</label>
                    <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 outline-none transition-all"
                        placeholder="أدخل كلمة مرور قوية"
                    />
                </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-l from-purple-600 to-blue-600 text-white font-black text-lg transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              ابدأ الآن مجاناً
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 dark:text-gray-400 font-medium font-bold">
            هل لديك حساب بالفعل؟{' '}
            <Link href="/login" prefetch className="text-purple-600 dark:text-purple-400 font-black hover:underline underline-offset-4">تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
