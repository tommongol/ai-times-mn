'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ARTICLES as DEFAULT_ARTICLES, LIVE_WIRE as DEFAULT_LIVE_WIRE, NewsArticle, LiveWireItem } from '@/data/news';

interface NewsContextType {
  articles: NewsArticle[];
  liveWire: LiveWireItem[];
  isLoading: boolean;
  updateArticle: (article: NewsArticle) => Promise<boolean>;
  createArticle: (article: Omit<NewsArticle, 'id' | 'slug'> & { id?: string; slug?: string }) => Promise<NewsArticle>;
  deleteArticle: (id: string) => Promise<boolean>;
  setMainLead: (id: string) => Promise<boolean>;
  toggleHot: (id: string) => Promise<boolean>;
  updateLiveWire: (items: LiveWireItem[]) => Promise<boolean>;
  resetToDefault: () => void;
  exportArticlesJson: () => void;
  exportLiveWireJson: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

const STORAGE_ARTICLES_KEY = 'aimedee_articles_custom_v1';
const STORAGE_LIVEWIRE_KEY = 'aimedee_livewire_custom_v1';

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<NewsArticle[]>(DEFAULT_ARTICLES);
  const [liveWire, setLiveWire] = useState<LiveWireItem[]>(DEFAULT_LIVE_WIRE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load from local storage or API on mount
  useEffect(() => {
    try {
      const cachedArticles = localStorage.getItem(STORAGE_ARTICLES_KEY);
      const cachedLiveWire = localStorage.getItem(STORAGE_LIVEWIRE_KEY);

      if (cachedArticles) {
        setArticles(JSON.parse(cachedArticles));
      }
      if (cachedLiveWire) {
        setLiveWire(JSON.parse(cachedLiveWire));
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    } finally {
      setIsLoading(false);
    }

    // Try fetching from API in background
    fetch('/api/articles')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          // If no local custom override, or user hasn't modified locally, adopt server
          if (!localStorage.getItem(STORAGE_ARTICLES_KEY)) {
            setArticles(data);
          }
        }
      })
      .catch(() => {
        // Ignore background fetch failure
      });

    fetch('/api/live-wire')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          if (!localStorage.getItem(STORAGE_LIVEWIRE_KEY)) {
            setLiveWire(data);
          }
        }
      })
      .catch(() => {
        // Ignore background fetch failure
      });
  }, []);

  // Save to localStorage & send to API
  const persistArticles = useCallback(async (newArticles: NewsArticle[]) => {
    setArticles(newArticles);
    try {
      localStorage.setItem(STORAGE_ARTICLES_KEY, JSON.stringify(newArticles));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    try {
      await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticles),
      });
    } catch (e) {
      console.warn('API save failed (serverless fallback active):', e);
    }
  }, []);

  const persistLiveWire = useCallback(async (newItems: LiveWireItem[]) => {
    setLiveWire(newItems);
    try {
      localStorage.setItem(STORAGE_LIVEWIRE_KEY, JSON.stringify(newItems));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    try {
      await fetch('/api/live-wire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItems),
      });
    } catch (e) {
      console.warn('API save failed:', e);
    }
  }, []);

  const updateArticle = useCallback(
    async (updated: NewsArticle): Promise<boolean> => {
      const next = articles.map((a) => (a.id === updated.id ? updated : a));
      await persistArticles(next);
      return true;
    },
    [articles, persistArticles]
  );

  const createArticle = useCallback(
    async (
      input: Omit<NewsArticle, 'id' | 'slug'> & { id?: string; slug?: string }
    ): Promise<NewsArticle> => {
      const id = input.id || `art_${Date.now()}`;
      const slug =
        input.slug ||
        input.title
          .toLowerCase()
          .replace(/[^\w\sа-яөүё-]/gi, '')
          .replace(/\s+/g, '-')
          .slice(0, 60) + `-${Date.now().toString().slice(-4)}`;

      const newArt: NewsArticle = {
        ...input,
        id,
        slug,
        readCount: input.readCount || Math.floor(Math.random() * 500) + 120,
        publishedAt: input.publishedAt || new Date().toISOString().split('T')[0],
        publishedTime:
          input.publishedTime ||
          new Date().toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit', hour12: false }),
        tags: input.tags || ['AI', 'Шинэ'],
        sources: input.sources || [{ name: input.primarySource, url: input.primarySourceUrl }],
      };

      const next = [newArt, ...articles];
      await persistArticles(next);
      return newArt;
    },
    [articles, persistArticles]
  );

  const deleteArticle = useCallback(
    async (id: string): Promise<boolean> => {
      const next = articles.filter((a) => a.id !== id);
      await persistArticles(next);
      return true;
    },
    [articles, persistArticles]
  );

  const setMainLead = useCallback(
    async (id: string): Promise<boolean> => {
      const next = articles.map((a) => ({
        ...a,
        isMainLead: a.id === id,
      }));
      await persistArticles(next);
      return true;
    },
    [articles, persistArticles]
  );

  const toggleHot = useCallback(
    async (id: string): Promise<boolean> => {
      const next = articles.map((a) => (a.id === id ? { ...a, isHot: !a.isHot } : a));
      await persistArticles(next);
      return true;
    },
    [articles, persistArticles]
  );

  const updateLiveWire = useCallback(
    async (items: LiveWireItem[]): Promise<boolean> => {
      await persistLiveWire(items);
      return true;
    },
    [persistLiveWire]
  );

  const resetToDefault = useCallback(() => {
    localStorage.removeItem(STORAGE_ARTICLES_KEY);
    localStorage.removeItem(STORAGE_LIVEWIRE_KEY);
    setArticles(DEFAULT_ARTICLES);
    setLiveWire(DEFAULT_LIVE_WIRE);
    // Also trigger server reset if possible
    fetch('/api/articles?reset=true', { method: 'DELETE' }).catch(() => {});
  }, []);

  const exportArticlesJson = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(articles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `articles_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [articles]);

  const exportLiveWireJson = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(liveWire, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `live_wire_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [liveWire]);

  return (
    <NewsContext.Provider
      value={{
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
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
