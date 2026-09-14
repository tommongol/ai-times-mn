'use client';

import React, { useState, useEffect } from 'react';
import { NewsArticle, NAV_SECTIONS } from '@/data/news';
import { X, Save, Image as ImageIcon, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: NewsArticle) => Promise<void>;
  article: NewsArticle | null; // If null, create mode
}

export const ArticleEditorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  article,
}) => {
  const [formData, setFormData] = useState<Partial<NewsArticle>>({
    title: '',
    subtitle: '',
    category: 'tech',
    categoryName: 'AI ТЕХНОЛОГИ',
    primarySource: 'AI Times Korea',
    primarySourceUrl: 'https://www.aitimes.com',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    imageCaption: '',
    summary: '',
    content: '',
    tags: ['AI', 'Технологи'],
    isMainLead: false,
    isHot: false,
    readCount: 150,
  });

  const [tagsInput, setTagsInput] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (article) {
      setFormData(article);
      setTagsInput(article.tags ? article.tags.join(', ') : '');
    } else {
      setFormData({
        id: `art_${Date.now()}`,
        slug: `art-${Date.now().toString().slice(-6)}`,
        title: '',
        subtitle: '',
        category: 'tech',
        categoryName: 'AI ТЕХНОЛОГИ',
        primarySource: 'AI Times Korea',
        primarySourceUrl: 'https://www.aitimes.com',
        coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        imageCaption: '',
        summary: '',
        content: '',
        tags: ['AI', 'Шинэ'],
        isMainLead: false,
        isHot: false,
        readCount: 120,
        readTime: '4 мин',
        publishedAt: new Date().toISOString().split('T')[0],
        publishedTime: new Date().toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit', hour12: false }),
        sources: [{ name: 'AI Times Korea', url: 'https://www.aitimes.com' }],
      });
      setTagsInput('AI, Шинэ');
    }
    setSavedSuccess(false);
  }, [article, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (catId: string) => {
    const found = NAV_SECTIONS.find((s) => s.id === catId);
    setFormData((prev) => ({
      ...prev,
      category: catId as any,
      categoryName: found ? found.name : 'AI МЭДЭЭ',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      alert('Гарчиг заавал оруулна уу!');
      return;
    }

    setIsSaving(true);
    try {
      const splitTags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const completeArticle: NewsArticle = {
        id: formData.id || `art_${Date.now()}`,
        slug:
          formData.slug ||
          (formData.title || 'article')
            .toLowerCase()
            .replace(/[^\w\sа-яөүё-]/gi, '')
            .replace(/\s+/g, '-')
            .slice(0, 60) + `-${Date.now().toString().slice(-4)}`,
        title: formData.title || '',
        subtitle: formData.subtitle || '',
        category: (formData.category || 'tech') as any,
        categoryName: formData.categoryName || 'AI ТЕХНОЛОГИ',
        primarySource: formData.primarySource || 'AI Times Korea',
        primarySourceUrl: formData.primarySourceUrl || 'https://www.aitimes.com',
        coverImage:
          formData.coverImage ||
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        imageCaption: formData.imageCaption || '',
        summary: formData.summary || '',
        content: formData.content || '',
        tags: splitTags.length > 0 ? splitTags : ['AI'],
        isMainLead: !!formData.isMainLead,
        isHot: !!formData.isHot,
        readCount: Number(formData.readCount) || 100,
        readTime: formData.readTime || '4 мин',
        publishedAt: formData.publishedAt || new Date().toISOString().split('T')[0],
        publishedTime:
          formData.publishedTime ||
          new Date().toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit', hour12: false }),
        sources: formData.sources && formData.sources.length > 0
          ? formData.sources
          : [{ name: formData.primarySource || 'AI Times Korea', url: formData.primarySourceUrl || 'https://www.aitimes.com' }],
      };

      await onSave(completeArticle);
      setSavedSuccess(true);
      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 600);
    } catch (err) {
      console.error(err);
      alert('Хадгалахад алдаа гарлаа!');
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border-2 border-black shadow-[12px_12px_0px_#000] my-8 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-black text-white border-b-2 border-black">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-pulse"></span>
            <h2 className="font-mono text-sm uppercase tracking-wider font-bold">
              {article ? 'РЕДАКЦИЙН ЗАСВАРЛАГЧ // EDIT ARTICLE' : 'ШИНЭ МЭДЭЭ ҮҮСГЭХ // NEW ARTICLE'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-black flex-1">
          {savedSuccess && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-500 text-emerald-800 text-xs font-mono font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Нийтлэлийг амжилттай хадгаллаа!
            </div>
          )}

          {/* Section 1: Title & Subtitle */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                ГАРЧИГ (TITLE) *
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Мэдээний тодорхой, сэтгүүл зүйн чанартай гарчиг..."
                className="w-full px-3 py-2.5 text-sm font-semibold border-2 border-black focus:outline-hidden focus:ring-2 focus:ring-[#00FF66] bg-neutral-50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                ДЭД ГАРЧИГ (SUBTITLE)
              </label>
              <input
                type="text"
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Тодруулга, гол түлхүүр санаа..."
                className="w-full px-3 py-2 text-xs border border-neutral-400 focus:outline-hidden focus:border-black bg-neutral-50"
              />
            </div>
          </div>

          {/* Section 2: Category, Source & URL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                АНГИЛАЛ (CATEGORY)
              </label>
              <select
                value={formData.category || 'tech'}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono border-2 border-black focus:outline-hidden bg-white"
              >
                {NAV_SECTIONS.filter((s) => s.id !== 'all').map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                АНХДАГЧ ЭХ СУРВАЛЖ (PRIMARY SOURCE)
              </label>
              <input
                type="text"
                value={formData.primarySource || ''}
                onChange={(e) => setFormData({ ...formData, primarySource: e.target.value })}
                placeholder="AI Times Korea, WIRED гэх мэт"
                className="w-full px-3 py-2 text-xs border border-neutral-400 focus:outline-hidden focus:border-black bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                ЭХ СУРВАЛЖИЙН ЛИНК (URL)
              </label>
              <input
                type="url"
                value={formData.primarySourceUrl || ''}
                onChange={(e) => setFormData({ ...formData, primarySourceUrl: e.target.value })}
                placeholder="https://www.aitimes.com/..."
                className="w-full px-3 py-2 text-xs font-mono border border-neutral-400 focus:outline-hidden focus:border-black bg-white"
              />
            </div>
          </div>

          {/* Section 3: Cover Image & Caption */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-neutral-500" />
                  КОВЕР ЗУРГИЙН ХОЛБООС (IMAGE URL)
                </label>
                <input
                  type="url"
                  value={formData.coverImage || ''}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs font-mono border border-neutral-400 focus:outline-hidden focus:border-black bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  ЗУРГИЙН ТАЙЛБАР (IMAGE CAPTION)
                </label>
                <input
                  type="text"
                  value={formData.imageCaption || ''}
                  onChange={(e) => setFormData({ ...formData, imageCaption: e.target.value })}
                  placeholder="Зургийн эх сурвалж эсвэл дүрслэлийн тайлбар"
                  className="w-full px-3 py-2 text-xs border border-neutral-400 focus:outline-hidden focus:border-black bg-white"
                />
              </div>
            </div>

            {formData.coverImage && (
              <div className="relative w-full h-32 bg-neutral-100 border border-neutral-300 overflow-hidden flex items-center justify-center">
                <img
                  src={formData.coverImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as any).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <span className="absolute bottom-1 right-2 bg-black/75 text-white font-mono text-[9px] px-1.5 py-0.5">
                  PREVIEW
                </span>
              </div>
            )}
          </div>

          {/* Section 4: Summary */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
              ТОВЧ АГУУЛГА (SUMMARY / LEAD) *
            </label>
            <textarea
              rows={3}
              required
              value={formData.summary || ''}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Мэдээний үндсэн гол мэдээлэл 2-3 өгүүлбэрээр..."
              className="w-full px-3 py-2 text-xs leading-relaxed border border-neutral-400 focus:outline-hidden focus:border-black bg-neutral-50"
            />
          </div>

          {/* Section 5: Full Content */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
              ДЭЛГЭРЭНГҮЙ ЭХ БИЧВЭР (FULL CONTENT)
            </label>
            <textarea
              rows={8}
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Нийтлэлийн бүрэн эх бичвэр, дэд гарчиг, дэлгэрэнгүй баримт тоо..."
              className="w-full px-3 py-2 text-xs leading-relaxed font-sans border-2 border-black focus:outline-hidden bg-white"
            />
          </div>

          {/* Section 6: Tags & Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-neutral-200">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                ТҮЛХҮҮР ҮГС (TAGS - таслалаар тусгаарлах)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="AI, Судалгаа, LLM, Чип"
                className="w-full px-3 py-2 text-xs border border-neutral-400 focus:outline-hidden focus:border-black bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                УНШСАН ТОО (READ COUNT)
              </label>
              <input
                type="number"
                value={formData.readCount || 100}
                onChange={(e) => setFormData({ ...formData, readCount: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs font-mono border border-neutral-400 focus:outline-hidden focus:border-black bg-white"
              />
            </div>

            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!!formData.isMainLead}
                  onChange={(e) => setFormData({ ...formData, isMainLead: e.target.checked })}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-xs font-mono font-bold">НҮҮРНИЙ ГОЛ МЭДЭЭ</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!!formData.isHot}
                  onChange={(e) => setFormData({ ...formData, isHot: e.target.checked })}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-xs font-mono font-bold text-red-600">ОНЦЛОХ (HOT)</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-black">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono uppercase font-bold border border-neutral-400 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              ЦУЦЛАХ
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-black text-[#00FF66] border-2 border-black font-mono text-xs uppercase font-black hover:bg-[#00FF66] hover:text-black hover:border-black transition-all shadow-[4px_4px_0px_#000] flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'ХАДГАЛЖ БАЙНА...' : 'ХАДГАЛАХ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
