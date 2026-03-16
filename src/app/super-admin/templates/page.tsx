"use client";

import { useState } from 'react';
import { SuperAdminSidebar } from '@/components/layout/SuperAdminSidebar';

type TemplateCategory = {
  id: string;
  label: string;
};

type TemplateElement = {
  id: string;
  type: string;
  label: string;
  icon: string;
  content?: string; // For text
};

export type TemplateCard = {
  id: string;
  name: string;
  description: string;
  tag: 'تحليل' | 'تخطيط' | 'تقرير';
  accent: string;
  elements: TemplateElement[];
};

const categories: TemplateCategory[] = [
  { id: 'all', label: 'الكل' },
  { id: 'reports', label: 'تقارير' },
  { id: 'planning', label: 'تخطيط' },
  { id: 'analysis', label: 'تحليل' },
];

const initialTemplates: TemplateCard[] = [
  {
    id: 'annual-analysis',
    name: 'تحليل البيانات السنوي',
    description: 'آخر تعديل: أحمد سعد - قبل 3 أيام',
    tag: 'تحليل',
    accent: 'from-cyan-400/40 via-blue-400/20 to-slate-100/70',
    elements: [
       { id: '1', type: 'text', label: 'عنوان نصي', icon: 'Tr', content: 'تقرير تحليل الأداء السنوي' },
       { id: '2', type: 'chart', label: 'رسم بياني', icon: '▮▮' },
    ]
  },
  {
    id: 'engineering-plan',
    name: 'خطة المشاريع الهندسية',
    description: 'آخر تعديل: ريما أنس - قبل يومين',
    tag: 'تخطيط',
    accent: 'from-emerald-400/40 via-teal-300/25 to-slate-100/70',
    elements: []
  },
  {
    id: 'quarterly-finance',
    name: 'التقرير المالي الفصلي',
    description: 'آخر تعديل: خالد فهد - اليوم',
    tag: 'تقرير',
    accent: 'from-amber-300/40 via-orange-300/20 to-slate-100/70',
    elements: []
  },
];

const availableElements = [
  { id: 'text', label: 'عنوان نصي', icon: 'Tr' },
  { id: 'chart', label: 'رسم بياني', icon: '▮▮' },
  { id: 'table', label: 'جدول بيانات', icon: '▦' },
  { id: 'media', label: 'صورة / وسائط', icon: '◫' },
  { id: 'time', label: 'نطاق زمني', icon: '◷' },
];

const getGradientByTag = (tag: string) => {
  switch (tag) {
    case 'تحليل': return 'from-cyan-400/40 via-blue-400/20 to-slate-100/70';
    case 'تخطيط': return 'from-emerald-400/40 via-teal-300/25 to-slate-100/70';
    case 'تقرير': return 'from-amber-300/40 via-orange-300/20 to-slate-100/70';
    default: return 'from-blue-600/40 via-indigo-500/20 to-slate-100/70';
  }
};

export default function SuperAdminTemplatesPage() {
  const [templates, setTemplates] = useState<TemplateCard[]>(initialTemplates);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // null means showing list, empty object represents new template, existing object represents editing
  const [editingTemplate, setEditingTemplate] = useState<Partial<TemplateCard> | null>(null);
  
  const [previewTemplate, setPreviewTemplate] = useState<TemplateCard | null>(null);

  const filteredTemplates = templates.filter(t => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'reports' && t.tag === 'تقرير') return true;
    if (activeCategory === 'planning' && t.tag === 'تخطيط') return true;
    if (activeCategory === 'analysis' && t.tag === 'تحليل') return true;
    return false;
  });

  const handleCreateNew = () => {
    setEditingTemplate({
      name: '',
      description: 'مسودة جديدة',
      tag: 'تقرير',
      elements: [],
    });
  };

  const handleEdit = (template: TemplateCard) => {
    setEditingTemplate({ ...template });
  };

  const handleDelete = (id: string) => {
    if(confirm('هل أنت متأكد من حذف هذا القالب؟')) {
       setTemplates(templates.filter(t => t.id !== id));
    }
  };

  const handleDuplicate = (template: TemplateCard) => {
    const newTemplate = {
      ...template,
      id: `copy-${Date.now()}`,
      name: `${template.name} (نسخة)`
    };
    setTemplates([...templates, newTemplate]);
  };

  const handleAddElement = (elementDef: typeof availableElements[0]) => {
    if (!editingTemplate) return;
    
    const newElement: TemplateElement = {
      id: `elem-${Date.now()}`,
      type: elementDef.id,
      label: elementDef.label,
      icon: elementDef.icon,
      content: elementDef.id === 'text' ? 'نص تجريبي' : undefined
    };

    setEditingTemplate({
      ...editingTemplate,
      elements: [...(editingTemplate.elements || []), newElement]
    });
  };

  const handleRemoveElement = (elementId: string) => {
    if (!editingTemplate || !editingTemplate.elements) return;
    setEditingTemplate({
      ...editingTemplate,
      elements: editingTemplate.elements.filter(e => e.id !== elementId)
    });
  };

  const handleSave = () => {
    if (!editingTemplate || !editingTemplate.name) {
      alert('يرجى إدخال اسم القالب');
      return;
    }

    const isNew = !editingTemplate.id;
    const templateToSave: TemplateCard = {
      id: editingTemplate.id || `tpl-${Date.now()}`,
      name: editingTemplate.name,
      description: isNew ? 'تم إنشاؤه للتو' : `آخر تعديل: الآن`,
      tag: editingTemplate.tag as any || 'تقرير',
      accent: editingTemplate.accent || getGradientByTag(editingTemplate.tag || 'تقرير'),
      elements: editingTemplate.elements || [],
    };

    if (isNew) {
      setTemplates([...templates, templateToSave]);
    } else {
      setTemplates(templates.map(t => t.id === templateToSave.id ? templateToSave : t));
    }

    setEditingTemplate(null);
  };

  const handleCloseEditor = () => {
      setEditingTemplate(null);
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#050A19] text-white">
      <div className="mx-auto max-w-[1440px] p-3 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          <SuperAdminSidebar />

          <section className="flex-1 rounded-3xl border border-[#1A2A4A] bg-[#080F23] p-4 md:p-6 overflow-hidden">
            <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-black text-white">مكتبة القوالب العالمية</h1>
                <p className="mt-1 text-sm text-slate-400">قم بإدارة وتخصيص قوالب النظام الموحدة لمشاريعك</p>
              </div>

              {!editingTemplate && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCreateNew}
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
                  >
                    <span className="text-base leading-none">+</span>
                    إنشاء قالب جديد
                  </button>
                </div>
              )}
            </header>

            {/* List View */}
            {!editingTemplate && (
              <>
                <section className="mb-5 flex flex-wrap items-center gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      type="button"
                      className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                        activeCategory === category.id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'border border-[#1A2A4A] bg-[#0D1632] text-slate-300 hover:bg-[#132042]'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </section>

                <section className="grid grid-cols-1 gap-4 xl:grid-cols-4 md:grid-cols-2">
                  <article 
                    onClick={handleCreateNew}
                    className="cursor-pointer rounded-2xl border border-dashed border-[#2C406E] bg-[#0B1430] p-4 transition hover:border-blue-500/50 hover:bg-[#0c1838]">
                    <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-[#2C406E] bg-[#0A132C] text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-blue-300">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
                        </svg>
                      </div>
                      <p className="text-lg font-bold text-white">قالب جديد</p>
                      <p className="mt-1 text-xs text-slate-500">ابدأ من صفحة فارغة</p>
                    </div>
                  </article>

                  {filteredTemplates.map((template) => (
                    <article key={template.id} className="rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-3 transition hover:border-blue-500/40">
                      <div className={`relative h-44 overflow-hidden rounded-xl bg-gradient-to-br ${template.accent}`}>
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_0_22%,rgba(15,23,42,0.11)_22%_24%,transparent_24%_42%,rgba(15,23,42,0.11)_42%_44%,transparent_44%_62%,rgba(15,23,42,0.11)_62%_64%,transparent_64%)]" />
                        <button 
                         onClick={() => setPreviewTemplate(template as TemplateCard)}
                         className="absolute left-3 top-3 rounded-md bg-[#0B1430]/85 px-2 py-1 text-[10px] font-bold text-slate-200 hover:bg-black transition">معاينة</button>
                      </div>

                      <div className="mt-3 flex items-start justify-between gap-2">
                        <div>
                          <p className="text-lg font-black text-white">{template.name}</p>
                          <p className="mt-1 text-xs text-slate-400">{template.description}</p>
                        </div>
                        <span className="rounded-md bg-[#122041] px-2 py-1 text-[10px] font-bold text-slate-300">{template.tag}</span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-500">
                          <button onClick={() => handleDelete(template.id)} type="button" className="rounded-md bg-[#0A132C] p-1.5 transition hover:bg-red-500/20 hover:text-red-400" aria-label="حذف">
                             <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                          <button onClick={() => handleDuplicate(template)} type="button" className="rounded-md bg-[#0A132C] p-1.5 transition hover:bg-[#17274A]" aria-label="نسخ">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8a2 2 0 012 2v8M6 17h8a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                        <button onClick={() => handleEdit(template)} type="button" className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-blue-500">
                          تعديل
                        </button>
                      </div>
                    </article>
                  ))}
                </section>
              </>
            )}

            {/* Editor View */}
            {editingTemplate && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-4 flex items-center justify-between border-b border-[#1A2A4A] pb-4">
                  <div className="flex gap-4">
                      <div className="flex flex-col gap-1">
                          <label className="text-xs text-slate-400">اسم القالب</label>
                          <input 
                            value={editingTemplate.name || ''} 
                            onChange={e => setEditingTemplate({...editingTemplate, name: e.target.value})}
                            className="bg-[#0A132C] border border-[#1A2A4A] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
                            placeholder="اسم القالب..."
                          />
                      </div>
                      <div className="flex flex-col gap-1">
                          <label className="text-xs text-slate-400">النوع</label>
                          <select 
                            value={editingTemplate.tag || 'تقرير'}
                            onChange={e => setEditingTemplate({...editingTemplate, tag: e.target.value as any})}
                            className="bg-[#0A132C] border border-[#1A2A4A] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          >
                             <option value="تقرير">تقرير</option>
                             <option value="تخطيط">تخطيط</option>
                             <option value="تحليل">تحليل</option>
                          </select>
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleCloseEditor} type="button" className="rounded-lg bg-[#0D1632] border border-[#1A2A4A] px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-[#15264A]">
                      إلغاء
                    </button>
                    <button onClick={handleSave} type="button" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-500">
                      حفظ القالب
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">
                  
                  {/* Canvas Area */}
                  <article className="min-h-[500px] rounded-2xl border border-dashed border-[#2C406E] bg-[#0B1430] p-6 relative">
                    {(!editingTemplate.elements || editingTemplate.elements.length === 0) ? (
                        <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 text-blue-300">
                                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4V4zm4 4h8v8H8V8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-white">منطقة التصميم فارغة</h3>
                            <p className="mt-2 text-sm text-slate-400">انقر على العناصر من القائمة الجانبية لإضافتها هنا</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {editingTemplate.elements.map((el, index) => (
                                <div key={el.id} className="group relative rounded-xl border border-[#1A2A4A] bg-[#0D1632] p-4 pr-12 transition-all hover:border-blue-500/50">
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 flex flex-col items-center gap-1">
                                        <span className="text-xs bg-[#1A2A4A] rounded px-1">{index + 1}</span>
                                        <span>{el.icon}</span>
                                    </div>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-blue-400 mb-2">{el.label}</p>
                                            
                                            {/* Render Dummy Match for Element Type */}
                                            {el.type === 'text' && (
                                                <input 
                                                  disabled
                                                  defaultValue={el.content} 
                                                  className="w-full bg-transparent border-b border-dashed border-[#2C406E] text-white text-lg pb-1 focus:outline-none" 
                                                  placeholder="أدخل النص هنا..." 
                                                />
                                            )}
                                            {el.type === 'chart' && (
                                                <div className="h-32 w-full rounded-lg border border-[#1A2A4A] bg-[#0A132C] flex items-end justify-center gap-2 p-2">
                                                    <div className="w-8 bg-blue-600/50 rounded-t-sm h-[40%]"></div>
                                                    <div className="w-8 bg-emerald-500/50 rounded-t-sm h-[70%]"></div>
                                                    <div className="w-8 bg-amber-400/50 rounded-t-sm h-[50%]"></div>
                                                    <div className="w-8 bg-purple-500/50 rounded-t-sm h-[90%]"></div>
                                                    <div className="w-8 bg-pink-500/50 rounded-t-sm h-[60%]"></div>
                                                </div>
                                            )}
                                            {el.type === 'table' && (
                                                <div className="w-full rounded-lg border border-[#1A2A4A] bg-[#0A132C] overflow-hidden text-sm">
                                                    <div className="grid grid-cols-3 bg-[#122041] p-2 text-slate-300 font-bold border-b border-[#1A2A4A]">
                                                        <div>العنصر</div><div>القيمة</div><div>الحالة</div>
                                                    </div>
                                                    <div className="grid grid-cols-3 p-2 text-slate-400 border-b border-[#1A2A4A]/50">
                                                        <div>بيانات 1</div><div>100</div><div>نشط</div>
                                                    </div>
                                                    <div className="grid grid-cols-3 p-2 text-slate-400">
                                                        <div>بيانات 2</div><div>250</div><div>مكتمل</div>
                                                    </div>
                                                </div>
                                            )}
                                            {el.type === 'media' && (
                                                <div className="h-32 w-full rounded-lg border border-dashed border-[#2C406E] bg-[#0A132C] flex items-center justify-center text-slate-500">
                                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                </div>
                                            )}
                                            {el.type === 'time' && (
                                                <div className="flex gap-4">
                                                    <div className="flex-1 rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-3 py-2 text-sm text-slate-400">من: 01/01/2024</div>
                                                    <div className="flex-1 rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-3 py-2 text-sm text-slate-400">إلى: 31/12/2024</div>
                                                </div>
                                            )}

                                        </div>
                                        <button onClick={() => handleRemoveElement(el.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 transition ml-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                  </article>

                  {/* Sidebar Elements */}
                  <article className="rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 flex flex-col h-fit sticky top-4">
                    <h3 className="mb-4 text-lg font-black text-white">العناصر المتاحة</h3>
                    <div className="space-y-2">
                      {availableElements.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleAddElement(item)}
                          type="button"
                          className="flex w-full items-center justify-between rounded-xl border border-[#1A2A4A] bg-[#0A132C] px-3 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-blue-400 hover:bg-[#122041]"
                        >
                          <span>{item.label}</span>
                          <span className="rounded-md bg-[#14264B] px-2 py-1 text-xs text-blue-300">{item.icon}</span>
                        </button>
                      ))}
                    </div>
                  </article>
                </div>
              </section>
            )}

          </section>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <div className="bg-[#080F23] border border-[#1A2A4A] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl">
                  <div className="sticky top-0 bg-[#080F23]/95 backdrop-blur z-10 p-5 border-b border-[#1A2A4A] flex justify-between items-center">
                      <div>
                          <h2 className="text-2xl font-bold text-white mb-1">معاينة: {previewTemplate.name}</h2>
                          <div className="flex gap-2">
                              <span className="text-xs text-slate-400 bg-[#0D1632] px-2 py-1 rounded">{previewTemplate.tag}</span>
                          </div>
                      </div>
                      <button onClick={() => setPreviewTemplate(null)} className="p-2 bg-[#0D1632] rounded-lg text-slate-400 hover:text-white transition">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                  </div>
                  <div className="p-6">
                      {(!previewTemplate.elements || previewTemplate.elements.length === 0) ? (
                           <div className="text-center text-slate-500 py-12">لا توجد عناصر في هذا القالب</div>
                      ) : (
                          <div className="space-y-6">
                              {previewTemplate.elements.map((el) => (
                                  <div key={el.id} className="bg-[#0A132C] rounded-xl p-6 border border-[#1A2A4A]/50">
                                      <h4 className="text-sm font-bold text-blue-400 mb-4">{el.label}</h4>
                                      {el.type === 'text' && <div className="text-2xl font-bold text-white">{el.content}</div>}
                                      {el.type === 'chart' && (
                                            <div className="h-48 w-full rounded-lg border border-[#1A2A4A] bg-[#0c1630] flex items-end justify-center gap-4 p-4">
                                                <div className="w-12 bg-blue-600/70 rounded-t-sm h-[40%]"></div>
                                                <div className="w-12 bg-emerald-500/70 rounded-t-sm h-[70%]"></div>
                                                <div className="w-12 bg-amber-400/70 rounded-t-sm h-[50%]"></div>
                                                <div className="w-12 bg-purple-500/70 rounded-t-sm h-[90%]"></div>
                                                <div className="w-12 bg-pink-500/70 rounded-t-sm h-[60%]"></div>
                                            </div>
                                      )}
                                      {el.type === 'table' && (
                                            <div className="w-full rounded-lg border border-[#1A2A4A] bg-[#0c1630] overflow-hidden text-sm">
                                                <div className="grid grid-cols-4 bg-[#122041] p-3 text-slate-300 font-bold border-b border-[#1A2A4A]">
                                                    <div>المعرف</div><div>العنصر</div><div>القيمة</div><div>الحالة</div>
                                                </div>
                                                <div className="grid grid-cols-4 p-3 text-slate-400 border-b border-[#1A2A4A]/50">
                                                    <div>#1001</div><div>بيانات المشروع الأول</div><div>$10,000</div><div className="text-emerald-400">مكتمل</div>
                                                </div>
                                                <div className="grid grid-cols-4 p-3 text-slate-400 border-b border-[#1A2A4A]/50">
                                                    <div>#1002</div><div>بيانات المشروع الثاني</div><div>$15,250</div><div className="text-blue-400">قيد التنفيذ</div>
                                                </div>
                                                 <div className="grid grid-cols-4 p-3 text-slate-400">
                                                    <div>#1003</div><div>بيانات المشروع الثالث</div><div>$5,000</div><div className="text-amber-400">معلق</div>
                                                </div>
                                            </div>
                                        )}
                                        {el.type === 'media' && (
                                            <div className="h-48 w-full rounded-lg border border-[#1A2A4A] bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                                                <div className="w-full h-full bg-[#0A132C]/60 flex items-center justify-center">
                                                    <span className="bg-black/50 px-4 py-2 rounded text-white font-bold backdrop-blur">مساحة وسائط مرئية</span>
                                                </div>
                                            </div>
                                        )}
                                        {el.type === 'time' && (
                                            <div className="flex gap-4">
                                                <div className="flex-1 rounded-lg border border-[#1A2A4A] bg-[#0c1630] px-4 py-3">
                                                    <span className="block text-xs text-slate-500 mb-1">تاريخ البدء</span>
                                                    <span className="text-lg text-white font-bold">01 يناير 2024</span>
                                                </div>
                                                <div className="flex-1 rounded-lg border border-[#1A2A4A] bg-[#0c1630] px-4 py-3">
                                                    <span className="block text-xs text-slate-500 mb-1">تاريخ الانتهاء</span>
                                                    <span className="text-lg text-white font-bold">31 ديسمبر 2024</span>
                                                </div>
                                            </div>
                                        )}
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}

    </main>
  );
}

