'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Typewriter } from '@/components/ui/Typewriter';
import { useToast } from '@/components/ui/Toast';

export default function ContactPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'استفسار عام',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: 'استفسار عام', message: '' });
  };

  const contactInfo = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'البريد الإلكتروني',
      value: 'hello@kayan.com',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'الهاتف',
      value: '+966 50 000 0000',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'الموقع',
      value: 'الرياض، المملكة العربية السعودية',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#060B14]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-600/5 to-transparent dark:from-blue-600/10" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight min-h-[1.5em] flex flex-wrap items-center justify-center gap-x-4">
              <span className="text-slate-900 dark:text-white">تواصل معنا</span>
              <Typewriter 
                texts={['لنجاحك', 'بسهولة', 'دائماً']}
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2"
              />
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              لديك استفسار أو ترغب في بدء رحلتك معنا؟ فريقنا مستعد للإجابة على جميع تساؤلاتك ودعم طموحاتك.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Info Side */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-8">
                {contactInfo.map((info, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 p-8 rounded-[32px] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group hover:border-blue-500/30 transition-all duration-500"
                  >
                    <div className={`p-4 rounded-2xl ${info.bg} ${info.color} group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/5`}>
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{info.label}</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social or Map Placeholder */}
              <div className="p-8 rounded-[40px] bg-blue-600 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-black text-white">تحتاج لمساعدة فورية؟</h3>
                  <p className="text-blue-100 font-medium">فريق الدعم الفني متواجد 24/7 لمساعدتك في حل جميع المشاكل التقنية.</p>
                  <button className="px-8 py-3 bg-white text-blue-600 rounded-2xl font-black text-sm hover:shadow-xl transition-all active:scale-95">
                    تحدث مع خبير الآن
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form Side */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="p-10 rounded-[40px] bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-white/10 shadow-2xl shadow-blue-500/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full" />
                
                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-500 mr-2">الاسم الكامل</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="أدخل اسمك هنا..." 
                        className="w-full h-14 rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-6 font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-500 mr-2">البريد الإلكتروني</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="example@email.com" 
                        dir="ltr"
                        className="w-full h-14 rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-6 font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 outline-none transition-all text-right"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-500 mr-2">الموضوع</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full h-14 rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-6 font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 outline-none transition-all appearance-none"
                    >
                      <option className="dark:bg-[#0A1126] dark:text-white">استفسار عام</option>
                      <option className="dark:bg-[#0A1126] dark:text-white">دعم فني</option>
                      <option className="dark:bg-[#0A1126] dark:text-white">طلب مبيعات</option>
                      <option className="dark:bg-[#0A1126] dark:text-white">شراكة استراتيجية</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-500 mr-2">الرسالة</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="اكتب رسالتك هنا بالتفصيل..." 
                      rows={6}
                      className="w-full rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-6 font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 outline-none transition-all resize-none"
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:translate-y-[-2px] active:translate-y-[1px] transition-all disabled:opacity-70 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        إرسال الرسالة
                        <svg className="h-5 w-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
