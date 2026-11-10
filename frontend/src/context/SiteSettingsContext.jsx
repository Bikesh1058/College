import { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { SiteSettingsContext } from './settingsContextDef';
import { socket } from '../services/socket';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export function SiteSettingsProvider({ children }) {
  const queryClient = useQueryClient();

  const [settings, setSettings] = useState({
    collegeName: 'Khwopa Secondary School (+2)',
    tagline: 'Dedicated to Country and People',
    phone: '+977-1-6610932, 01-6614336',
    email: 'info@khwopa.edu.np',
    address: 'Dekocha, Bhaktapur, Nepal',
    announcementBanner: { enabled: false, text: '', link: '' }
  });

  const [pagesCache, setPagesCache] = useState({});
  const [socketConnected, setSocketConnected] = useState(socket.connected);
  const [lastLiveEvent, setLastLiveEvent] = useState(null);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/settings`);
      if (res.data?.data) {
        setSettings(res.data.data);
      }
    } catch {
      // Fall back gracefully to defaults
    }
  }, []);

  const getPageData = useCallback(async (slug) => {
    if (pagesCache[slug]) return pagesCache[slug];
    try {
      const res = await axios.get(`${API_BASE}/pages/${slug}`);
      if (res.data?.data) {
        setPagesCache(prev => ({ ...prev, [slug]: res.data.data }));
        return res.data.data;
      }
    } catch {
      // Page not yet in DB or offline
    }
    return null;
  }, [pagesCache]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSettings();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchSettings]);

  // Listen for live WebSocket broadcasts across the public website
  useEffect(() => {
    const handleConnect = () => setSocketConnected(true);
    const handleDisconnect = () => setSocketConnected(false);

    const handleCmsUpdate = (payload) => {
      setLastLiveEvent(payload);
      // Clear cached PageBuilder pages so active pages re-fetch immediately
      setPagesCache({});
      // Re-fetch global settings (announcement banner, contact info, college name)
      fetchSettings();
      // Invalidate all React Query caches (notices, news, faculty, streams, downloads, research, clubs, facilities)
      queryClient.invalidateQueries();
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('cms:update', handleCmsUpdate);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('cms:update', handleCmsUpdate);
    };
  }, [fetchSettings, queryClient]);

  const contextValue = useMemo(() => ({
    ...settings,
    socketConnected,
    lastLiveEvent,
    getPageData,
    refreshSettings: fetchSettings
  }), [settings, socketConnected, lastLiveEvent, getPageData, fetchSettings]);

  return (
    <SiteSettingsContext.Provider value={contextValue}>
      {children}
    </SiteSettingsContext.Provider>
  );
}
