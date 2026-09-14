'use client';

import React, { useState, useEffect } from 'react';
import { LiveWireItem } from '@/data/news';
import { X, Plus, Trash2, Save, Radio, Clock } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: LiveWireItem[];
  onSave: (items: LiveWireItem[]) => Promise<void>;
}

export const LiveWireEditorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  items,
  onSave,
}) => {
  const [list, setList] = useState<LiveWireItem[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    setList([...items]);
  }, [items, isOpen]);

  if (!isOpen) return null;

  const handleItemChange = (index: number, field: keyof LiveWireItem, value: string) => {
    const next = [...list];
    next[index] = { ...next[index], [field]: value };
    setList(next);
  };

  const handleAdd = () => {
    const now = new Date().toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit', hour12: false });
    setList([
      {
        time: now,
        source: 'AI Times Korea',
        title: 'Шинэ шуурхай мэдээний гарчиг...',
      },
      ...list,
    ]);
  };

  const handleDelete = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(list);
      setIsSaving(false);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Шуурхай мэдээ хадгалахад алдаа гарлаа');
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border-2 border-black shadow-[12px_12px_0px_#000] my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-black text-white border-b-2 border-black">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#00FF66] animate-pulse" />
            <h2 className="font-mono text-sm uppercase tracking-wider font-bold">
              ШУУРХАЙ СҮЛЖЭЭНИЙ МЭДЭЭ УДИРДАХ // LIVE WIRE DISPATCH
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form list */}
        <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <p className="text-xs text-neutral-600 font-mono">
              Нүүр хуудасны гүйдэг шуурхай зурвас дээр харагдах нийт {list.length} мэдээ:
            </p>
            <button
              type="button"
              onClick={handleAdd}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-[#00FF66] border border-black font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              ШИНЭ ЗУРВАС НЭМЭХ
            </button>
          </div>

          <div className="space-y-3">
            {list.map((item, idx) => (
              <div
                key={idx}
                className="p-3 border border-neutral-300 bg-neutral-50 flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="font-mono text-xs text-neutral-400 font-bold">#{idx + 1}</span>
                  <div className="relative w-24">
                    <input
                      type="text"
                      required
                      value={item.time}
                      onChange={(e) => handleItemChange(idx, 'time', e.target.value)}
                      placeholder="12:00"
                      className="w-full px-2 py-1.5 text-xs font-mono font-bold bg-white border border-neutral-400 focus:outline-hidden focus:border-black"
                    />
                  </div>
                </div>

                <div className="w-full sm:w-40">
                  <input
                    type="text"
                    required
                    value={item.source}
                    onChange={(e) => handleItemChange(idx, 'source', e.target.value)}
                    placeholder="AI Times Korea"
                    className="w-full px-2 py-1.5 text-xs font-semibold bg-white border border-neutral-400 focus:outline-hidden focus:border-black"
                  />
                </div>

                <div className="flex-1 w-full">
                  <input
                    type="text"
                    required
                    value={item.title}
                    onChange={(e) => handleItemChange(idx, 'title', e.target.value)}
                    placeholder="Шуурхай мэдээний текстийг оруулна уу..."
                    className="w-full px-2 py-1.5 text-xs bg-white border border-neutral-400 focus:outline-hidden focus:border-black"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="p-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer self-end sm:self-center"
                  title="Устгах"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

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
