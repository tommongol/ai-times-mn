'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useNews } from '@/context/NewsContext';
import { NewsArticle, NAV_SECTIONS } from '@/data/news';
import { ArticleEditorModal } from '@/components/admin/ArticleEditorModal';
import { LiveWireEditorModal } from '@/components/admin/LiveWireEditorModal';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Download,
  RotateCcw,
  Star,
  Flame,
  Radio,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Cpu,
  Scale,
  Building2,
  FileText,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    articles,
    liveWire,
    isLoading,
    updateArticle,
    createArticle,
    deleteArticle,
    setMainLead,
    toggleHot,
    updateLiveWire,
    resetToDefault,
    exportArticlesJson,
    exportLiveWireJson,
  } = useNews();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortField, setSortField] = useState<'latest' | 'views' | 'title'>('latest');

  // Modal states
  const [isArticleModalOpen, setIsArticleModalOpen] = useState<boolean>(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isLiveWireModalOpen, setIsLiveWireModalOpen] = useState<boolean>(false);
  const [deleteCandidate, setDeleteCandidate] = useState<NewsArticle | null>(null);

  // Success toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered & Sorted articles
  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let result = articles.filter((art) => {
      const matchCat = selectedCategory === 'all' || art.category === selectedCategory;
      if (!q) return matchCat;

      const matchQ =
        art.title.toLowerCase().includes(q) ||
        (art.subtitle && art.subtitle.toLowerCase().includes(q)) ||
        art.primarySource.toLowerCase().includes(q) ||
        (art.tags && art.tags.some((t) => t.toLowerCase().includes(q))) ||
        art.summary.toLowerCase().includes(q);

      return matchCat && matchQ;
    });

    return result.sort((a, b) => {
      if (sortField === 'views') {
        return b.readCount - a.readCount;
      }
      if (sortField === 'title') {
        return a.title.localeCompare(b.title);
      }
      // default: latest
      return (
        new Date(`${b.publishedAt}T${b.publishedTime}`).getTime() -
        new Date(`${a.publishedAt}T${a.publishedTime}`).getTime()
      );
    });
  }, [articles, searchQuery, selectedCategory, sortField]);

  // Quick statistics
  const stats = useMemo(() => {
    const total = articles.length;
    const techCount = articles.filter((a) => a.category === 'tech').length;
    const policyCount = articles.filter((a) => a.category === 'policy').length;
    const lawCount = articles.filter((a) => a.category === 'law').length;
    const totalViews = articles.reduce((acc, curr) => acc + curr.readCount, 0);
    const mainLead = articles.find((a) => a.isMainLead);

    return { total, techCount, policyCount, lawCount, totalViews, mainLeadTitle: mainLead?.title };
  }, [articles]);

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setIsArticleModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingArticle(null);
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = async (saved: NewsArticle) => {
    if (editingArticle) {
      await updateArticle(saved);
      showToast('Нийтлэлийг амжилттай заслаа!');
    } else {
      await createArticle(saved);
      showToast('Шинэ нийтлэл амжилттай нийтлэгдлээ!');
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteCandidate) {
      await deleteArticle(deleteCandidate.id);
      showToast(`"${deleteCandidate.title.slice(0, 30)}..." устгагдлаа.`);
      setDeleteCandidate(null);
    }
  };

  const handleToggleLead = async (art: NewsArticle) => {
    await setMainLead(art.id);
    showToast(`"${art.title.slice(0, 35)}..." нүүрний гол мэдээ боллоо.`);
  };

  const handleToggleHot = async (art: NewsArticle) => {
    await toggleHot(art.id);
    showToast(`Онцлох төлөвийг шинэчиллээ.`);
  };

  const handleResetConfirm = () => {
    if (confirm('Та бүх өөрчлөлтийг арилгаж анхны нийтлэлүүдийг сэргээхдээ итгэлтэй байна уу?')) {
      resetToDefault();
      showToast('Анхны төлөв рүү амжилттай шилжүүллээ.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black font-sans pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 border-2 border-[#00FF66] shadow-[6px_6px_0px_#000] flex items-center gap-3 font-mono text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Bar */}
      <header className="bg-black text-white border-b-4 border-[#00FF66] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 font-mono text-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>СОНИН РУУ БУЦАХ</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-ping"></span>
                <h1 className="font-mono text-lg font-black uppercase tracking-wider text-white">
                  AIMEDEE CMS // РЕДАКЦЫН УДИРДЛАГА
                </h1>
              </div>
              <p className="font-mono text-[10px] text-neutral-400">
                Хиймэл оюун ухааны мэдээ, нийтлэл, шуурхай сүлжээг бодит цагт засах систем
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsLiveWireModalOpen(true)}
              className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-[#00FF66] hover:border-[#00FF66] font-mono text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-[#00FF66]" />
              <span>ШУУРХАЙ СҮЛЖЭЭ ({liveWire.length})</span>
            </button>

            <button
              onClick={exportArticlesJson}
              className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white hover:border-neutral-500 font-mono text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Бүх нийтлэлийг JSON файл болгон татах"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON ЭКСПОРТ</span>
            </button>

            <button
              onClick={handleResetConfirm}
              className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-500 font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Бүх өөрчлөлтийг цуцалж анхны эх сурвалжид буцаах"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>СЭРГЭЭХ</span>
            </button>

            <button
              onClick={handleCreateNew}
              className="px-4 py-1.5 bg-[#00FF66] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all shadow-[3px_3px_0px_#fff] flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ШИНЭ МЭДЭЭ НЭМЭХ</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#000]">
            <div className="font-mono text-[10px] text-neutral-500 font-bold uppercase">НИЙТ НИЙТЛЭЛ</div>
            <div className="text-2xl font-black mt-1 font-mono">{stats.total}</div>
            <div className="text-[10px] text-emerald-600 font-mono mt-0.5">● Систем бүрэн бэлэн</div>
          </div>

          <div className="bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#000]">
            <div className="font-mono text-[10px] text-neutral-500 font-bold uppercase flex items-center gap-1">
              <Cpu className="w-3 h-3 text-blue-600" />
              AI ТЕХНОЛОГИ
            </div>
            <div className="text-2xl font-black mt-1 font-mono">{stats.techCount}</div>
            <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Чип, загвар, архитектур</div>
          </div>

          <div className="bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#000]">
            <div className="font-mono text-[10px] text-neutral-500 font-bold uppercase flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-purple-600" />
              БОДЛОГО БА СТРАТЕГИ
            </div>
            <div className="text-2xl font-black mt-1 font-mono">{stats.policyCount}</div>
            <div className="text-[10px] text-neutral-500 font-mono mt-0.5">AI Act, геополитик</div>
          </div>

          <div className="bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#000]">
            <div className="font-mono text-[10px] text-neutral-500 font-bold uppercase flex items-center gap-1">
              <Scale className="w-3 h-3 text-amber-600" />
              ХУУЛЬ & ШҮҮХ
            </div>
            <div className="text-2xl font-black mt-1 font-mono">{stats.lawCount}</div>
            <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Зохиогчийн эрх, зарга</div>
          </div>

          <div className="bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#000] col-span-2 sm:col-span-1">
            <div className="font-mono text-[10px] text-neutral-500 font-bold uppercase">НИЙТ УНШИЛТ</div>
            <div className="text-2xl font-black mt-1 font-mono text-[#00AA44]">
              {stats.totalViews.toLocaleString()}
            </div>
            <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Бүх нийтлэлийн үзэлт</div>
          </div>
        </div>

        {/* 3. Filter and Search Bar */}
        <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Гарчиг, эх сурвалж, түлхүүр үг эсвэл агуулгаар хайх..."
                className="w-full pl-9 pr-3 py-2 text-xs font-mono border border-neutral-300 focus:outline-hidden focus:border-black bg-neutral-50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-neutral-400 hover:text-black"
                >
                  ЦЭВЭРЛЭХ
                </button>
              )}
            </div>

            {/* Sort options */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">ЭРЭМБЭ:</span>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as any)}
                className="px-2.5 py-2 text-xs font-mono border border-neutral-300 focus:outline-hidden focus:border-black bg-white"
              >
                <option value="latest">Хамгийн сүүлийн үеийн</option>
                <option value="views">Их уншсанаар</option>
                <option value="title">Цагаан толгойн үсгээр</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-200 text-[11px] font-mono">
            {NAV_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedCategory(sec.id)}
                className={`px-3 py-1 border transition-all cursor-pointer font-bold ${
                  selectedCategory === sec.id
                    ? 'bg-black text-[#00FF66] border-black shadow-[2px_2px_0px_#000]'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                }`}
              >
                {sec.name}
                <span className="ml-1.5 opacity-60 text-[10px]">
                  (
                  {sec.id === 'all'
                    ? articles.length
                    : articles.filter((a) => a.category === sec.id).length}
                  )
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Articles Table */}
        <div className="bg-white border-2 border-black shadow-[6px_6px_0px_#000] overflow-hidden">
          <div className="px-4 py-3 bg-neutral-900 text-white flex items-center justify-between text-xs font-mono">
            <span className="font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00FF66]" />
              НИЙТЛЭЛҮҮДИЙН ЖАГСААЛТ ({filteredArticles.length} / {articles.length})
            </span>
            <span className="text-[11px] text-neutral-400">
              Нэг товшилтоор засах, онцлох, устгах боломжтой
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="p-12 text-center text-neutral-500 font-mono text-xs">
              Хайлтад тохирох нийтлэл олдсонгүй. Хайлтын үгээ өөрчлөх эсвэл шинээр нэмнэ үү.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-100 border-b-2 border-black font-mono font-bold text-neutral-700 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-3 w-12 text-center">#</th>
                    <th className="py-3 px-4">ГАРЧИГ & ЭХ СУРВАЛЖ</th>
                    <th className="py-3 px-3 w-36">АНГИЛАЛ</th>
                    <th className="py-3 px-3 w-28">ОГНОО</th>
                    <th className="py-3 px-3 w-28 text-center">ТӨЛӨВ</th>
                    <th className="py-3 px-3 w-20 text-right">ҮЗЭЛТ</th>
                    <th className="py-3 px-4 w-40 text-center">ҮЙЛДЭЛ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredArticles.map((art, idx) => (
                    <tr
                      key={art.id}
                      className="hover:bg-neutral-50 transition-colors group"
                    >
                      {/* Index */}
                      <td className="py-3 px-3 text-center font-mono text-neutral-400 font-bold">
                        {idx + 1}
                      </td>

                      {/* Title & Source */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-neutral-900 group-hover:text-black line-clamp-1">
                          {art.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 border border-emerald-300">
                            {art.primarySource}
                          </span>
                          {art.subtitle && (
                            <span className="text-[11px] text-neutral-500 line-clamp-1">
                              • {art.subtitle}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 font-mono text-[10px] font-bold uppercase bg-neutral-100 border border-neutral-300 text-neutral-800">
                          {art.categoryName || art.category}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-3 font-mono text-[11px] text-neutral-600">
                        {art.publishedAt}
                        <div className="text-[10px] text-neutral-400">{art.publishedTime}</div>
                      </td>

                      {/* Status Badges */}
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {art.isMainLead && (
                            <span
                              className="px-1.5 py-0.5 bg-black text-[#00FF66] font-mono text-[9px] font-black uppercase"
                              title="Нүүрний тэргүүн нийтлэл"
                            >
                              ГОЛ МЭДЭЭ
                            </span>
                          )}
                          {art.isHot && (
                            <span
                              className="px-1.5 py-0.5 bg-red-600 text-white font-mono text-[9px] font-black uppercase"
                              title="Онцлох нийтлэл"
                            >
                              HOT
                            </span>
                          )}
                          {!art.isMainLead && !art.isHot && (
                            <span className="text-neutral-300 font-mono text-[10px]">—</span>
                          )}
                        </div>
                      </td>

                      {/* Views */}
                      <td className="py-3 px-3 text-right font-mono font-bold text-neutral-700">
                        {art.readCount.toLocaleString()}
                      </td>

                      {/* Action buttons */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {/* Toggle Main Lead */}
                          <button
                            onClick={() => handleToggleLead(art)}
                            className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                              art.isMainLead
                                ? 'text-amber-500 bg-amber-50 border border-amber-300'
                                : 'text-neutral-400 hover:text-amber-500 hover:bg-neutral-100'
                            }`}
                            title={art.isMainLead ? 'Нүүрний гол мэдээгээр тохируулагдсан' : 'Нүүрний гол мэдээ болгох'}
                          >
                            <Star className="w-3.5 h-3.5" fill={art.isMainLead ? 'currentColor' : 'none'} />
                          </button>

                          {/* Toggle Hot */}
                          <button
                            onClick={() => handleToggleHot(art)}
                            className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                              art.isHot
                                ? 'text-red-600 bg-red-50 border border-red-300'
                                : 'text-neutral-400 hover:text-red-600 hover:bg-neutral-100'
                            }`}
                            title={art.isHot ? 'Онцлохоос хасах' : 'Онцлох (Hot) болгох'}
                          >
                            <Flame className="w-3.5 h-3.5" fill={art.isHot ? 'currentColor' : 'none'} />
                          </button>

                          {/* Edit Article */}
                          <button
                            onClick={() => handleEdit(art)}
                            className="px-2.5 py-1 bg-black text-white hover:bg-[#00FF66] hover:text-black font-mono text-[11px] font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer"
                            title="Засах"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>ЗАСАХ</span>
                          </button>

                          {/* Delete Article */}
                          <button
                            onClick={() => setDeleteCandidate(art)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Устгах"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Article Editor Modal */}
      <ArticleEditorModal
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        onSave={handleSaveArticle}
        article={editingArticle}
      />

      {/* Live Wire Editor Modal */}
      <LiveWireEditorModal
        isOpen={isLiveWireModalOpen}
        onClose={() => setIsLiveWireModalOpen(false)}
        items={liveWire}
        onSave={async (items) => {
          await updateLiveWire(items);
          showToast('Шуурхай сүлжээний мэдээллийг шинэчлэлээ!');
        }}
      />

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_#000] p-6 max-w-md w-full space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-mono text-sm font-bold">
              <Trash2 className="w-5 h-5" />
              <span>НИЙТЛЭЛИЙГ УСТГАХ УУ?</span>
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed">
              Та <strong>&quot;{deleteCandidate.title}&quot;</strong> нийтлэлийг системээс устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-1.5 text-xs font-mono font-bold border border-neutral-300 hover:bg-neutral-100 cursor-pointer"
              >
                БОЛИХ
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 bg-red-600 text-white font-mono text-xs font-bold hover:bg-red-700 cursor-pointer"
              >
                ТИЙМ, УСТГАХ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
