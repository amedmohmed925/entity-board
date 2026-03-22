'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthContext';
import { workspaceApi } from '@/api/workspace';
import { useToast } from '@/components/ui/Toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingPage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1); // 1: Welcome, 2: Workspace Info
  const [formData, setFormData] = useState({ name: '', teamSize: '1-10' });
  const [isLoading, setIsLoading] = useState(false);
  const { user, token } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    setMounted(true);
    if (mounted && !token) {
      // router.push('/login');
    }
  }, [token, mounted, router]);

  const handleSubmit = async () => {
    if (!formData.name) {
      showToast('يرجى إدخال اسم الشركة', 'error');
      return;
    }
    setIsLoading(true);

    try {
      await workspaceApi.createWorkspace(formData);
      showToast('تم إنشاء مساحة العمل بنجاح!', 'success');
      router.push('/owner/dashboard');
    } catch (error: any) {
      showToast(error.response?.data?.message || 'فشل إنشاء مساحة العمل', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#060B14] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-2xl relative z-10">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600" />
              
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg transform rotate-12 rotate-[-12deg] transition-transform hover:rotate-0 duration-500">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
              </div>

              <h1 className="text-4xl font-black text-white mb-4 tracking-tight">أهلاً بك، {user?.name || 'صديقنا الجديد'}!</h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed font-bold">
                نسعد بانضمامك لكيان بورد. لنبدأ معاً في إعداد مساحة العمل الخاصة بك لبدء تحليل بياناتك بذكاء.
              </p>

              <button
                onClick={() => setStep(2)}
                className="group relative px-12 py-5 bg-white text-black font-black text-xl rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <span className="flex items-center gap-3">
                  هيا بنا نبدأ
                  <svg className="w-6 h-6 transform rotate-180 group-hover:translate-x-[-4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 text-right shadow-2xl overflow-hidden"
              dir="rtl"
            >
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-purple-600 via-blue-600 to-purple-600" />

              <h2 className="text-3xl font-black text-white mb-2">إعداد مساحة العمل</h2>
              <p className="text-gray-400 mb-10 font-bold">أخبرنا قليلاً عن شركتك وفريقك</p>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-300 mr-2 uppercase tracking-widest">اسم الشركة أو المؤسسة</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-xl font-bold focus:ring-4 focus:ring-purple-600/20 outline-none transition-all placeholder:text-gray-600"
                    placeholder="مثال: شركة القمة للبرمجيات"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-300 mr-2 uppercase tracking-widest">حجم فريق العمل</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['1-10', '11-50', '51-200', '200+'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setFormData({ ...formData, teamSize: size })}
                        className={`py-4 rounded-xl font-black text-sm transition-all ${
                          formData.teamSize === size
                            ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg'
                            : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
                        }`}
                      >
                        {size === '200+' ? '+200 موظف' : `${size} موظفين`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-grow py-5 bg-gradient-to-l from-purple-600 to-blue-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-purple-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isLoading && (
                      <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    إنشاء مساحة العمل الحين
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all"
                  >
                    رجوع
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
