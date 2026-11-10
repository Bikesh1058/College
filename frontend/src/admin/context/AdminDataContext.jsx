import { useState, useEffect, useCallback, useMemo } from 'react';
import { apiClient } from '../../services/api';
import { socket } from '../../services/socket';
import { AdminDataContext } from './adminDataContextDef';

export function AdminDataProvider({ children }) {
  const [faculty, setFaculty] = useState([]);
  const [notices, setNotices] = useState([]);
  const [programmes, setProgrammes] = useState([]);
  const [news, setNews] = useState([]);
  const [settings, setSettings] = useState(null);
  const [pages, setPages] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [research, setResearch] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [examinations, setExaminations] = useState([]);
  const [users, setUsers] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [socketConnected, setSocketConnected] = useState(socket.connected);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(''), 4000);
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    try {
      const [
        facRes,
        notRes,
        newsRes,
        progRes,
        settRes,
        pagesRes,
        clubsRes,
        resRes,
        docsRes,
        examsRes,
        usersRes,
        facilRes
      ] = await Promise.all([
        apiClient.get('/faculty').catch(() => ({ data: { data: [] } })),
        apiClient.get('/notices').catch(() => ({ data: { data: [] } })),
        apiClient.get('/content/news').catch(() => ({ data: { data: [] } })),
        apiClient.get('/programmes').catch(() => ({ data: { data: [] } })),
        apiClient.get('/settings').catch(() => ({ data: { data: null } })),
        apiClient.get('/pages').catch(() => ({ data: { data: [] } })),
        apiClient.get('/content/clubs').catch(() => ({ data: { data: [] } })),
        apiClient.get('/content/research').catch(() => ({ data: { data: [] } })),
        apiClient.get('/content/documents').catch(() => ({ data: { data: [] } })),
        apiClient.get('/content/examinations').catch(() => ({ data: { data: [] } })),
        apiClient.get('/content/users').catch(() => ({ data: { data: [] } })),
        apiClient.get('/content/facilities').catch(() => ({ data: { data: [] } }))
      ]);

      setFaculty(facRes.data?.data || []);
      setNotices(notRes.data?.data || []);
      setNews(newsRes.data?.data || []);
      setProgrammes(progRes.data?.data || []);
      setSettings(settRes.data?.data || null);
      setPages(pagesRes.data?.data || []);
      setClubs(clubsRes.data?.data || []);
      setResearch(resRes.data?.data || []);
      setDocuments(docsRes.data?.data || []);
      setExaminations(examsRes.data?.data || []);
      setUsers(usersRes.data?.data || []);
      setFacilities(facilRes.data?.data || []);
      setError(null);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      setError('Unable to load server data. Check network or server status.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      refreshAll();
    }, 0);
    return () => clearTimeout(timer);
  }, [refreshAll]);

  // Listen for real-time WebSocket CMS updates across admin tabs
  useEffect(() => {
    const handleConnect = () => setSocketConnected(true);
    const handleDisconnect = () => setSocketConnected(false);
    const handleLiveUpdate = () => {
      refreshAll();
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('cms:update', handleLiveUpdate);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('cms:update', handleLiveUpdate);
    };
  }, [refreshAll]);

  // Notice operations
  const createNotice = useCallback(async (noticeData) => {
    try {
      const slug = noticeData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await apiClient.post('/notices', { ...noticeData, slug });
      showToast('Notice published live to the public board.');
      await refreshAll();
    } catch (err) {
      if (err.response?.status === 401) {
        showToast('Your session has expired. Please log in again.', 'error');
        localStorage.removeItem('khwopa_token');
        localStorage.removeItem('khwopa_user');
        window.location.href = '/admin/login';
      }
      throw err;
    }
  }, [refreshAll, showToast]);

  const deleteNotice = useCallback(async (id) => {
    await apiClient.delete(`/notices/${id}`);
    showToast('Notice deleted successfully.');
    await refreshAll();
  }, [refreshAll, showToast]);

  // News operations
  const createNews = useCallback(async (newsData) => {
    const slug = newsData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await apiClient.post('/content/news', {
      ...newsData,
      slug,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      image: newsData.image || 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1751512628392_35a0f113-7f94-43bb-9bf6-4a2d56daf8d6.jpg'
    });
    showToast('Story published live to College News.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const deleteNews = useCallback(async (id) => {
    await apiClient.delete(`/content/news/${id}`);
    showToast('Story removed from publication archive.');
    await refreshAll();
  }, [refreshAll, showToast]);

  // Faculty operations
  const createFaculty = useCallback(async (facultyData) => {
    const id = 'fac-' + Date.now();
    await apiClient.post('/faculty', { ...facultyData, id });
    showToast('Teacher profile added to the faculty registry.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const updateFaculty = useCallback(async (id, facultyData) => {
    await apiClient.put(`/faculty/${id}`, facultyData);
    showToast('Teacher profile updated successfully.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const deleteFaculty = useCallback(async (id) => {
    await apiClient.delete(`/faculty/${id}`);
    showToast('Teacher profile removed.');
    await refreshAll();
  }, [refreshAll, showToast]);

  // Settings operations
  const updateSettings = useCallback(async (newSettings) => {
    await apiClient.put('/settings', newSettings);
    setSettings(newSettings);
    showToast('College settings saved successfully.');
  }, [showToast]);

  // Programme / Academic Stream operations
  const createProgramme = useCallback(async (progData) => {
    const slug = progData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await apiClient.post('/programmes', { ...progData, slug, isPublished: true });
    showToast('Academic stream added to curriculum.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const updateProgramme = useCallback(async (id, progData) => {
    await apiClient.put(`/programmes/${id}`, progData);
    showToast('Academic stream updated successfully.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const deleteProgramme = useCallback(async (id) => {
    await apiClient.delete(`/programmes/${id}`);
    showToast('Academic stream removed.');
    await refreshAll();
  }, [refreshAll, showToast]);

  // Club operations
  const createClub = useCallback(async (clubData) => {
    await apiClient.post('/content/clubs', clubData);
    showToast('Student chapter registered.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const updateClub = useCallback(async (id, clubData) => {
    await apiClient.put(`/content/clubs/${id}`, clubData);
    showToast('Student chapter updated successfully.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const deleteClub = useCallback(async (id) => {
    await apiClient.delete(`/content/clubs/${id}`);
    showToast('Student chapter removed.');
    await refreshAll();
  }, [refreshAll, showToast]);

  // Research operations
  const createResearch = useCallback(async (resData) => {
    await apiClient.post('/content/research', resData);
    showToast('Research publication indexed.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const updateResearch = useCallback(async (id, resData) => {
    await apiClient.put(`/content/research/${id}`, resData);
    showToast('Research publication updated.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const deleteResearch = useCallback(async (id) => {
    await apiClient.delete(`/content/research/${id}`);
    showToast('Research publication removed.');
    await refreshAll();
  }, [refreshAll, showToast]);

  // Document / Syllabus operations
  const createDocument = useCallback(async (docData) => {
    await apiClient.post('/content/documents', docData);
    showToast('Downloadable document published to /resources.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const updateDocument = useCallback(async (id, docData) => {
    await apiClient.put(`/content/documents/${id}`, docData);
    showToast('Document details updated.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const deleteDocument = useCallback(async (id) => {
    await apiClient.delete(`/content/documents/${id}`);
    showToast('Downloadable document removed.');
    await refreshAll();
  }, [refreshAll, showToast]);

  // Examination operations
  const createExamination = useCallback(async (examData) => {
    await apiClient.post('/content/examinations', examData);
    showToast('Examination schedule published.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const updateExamination = useCallback(async (id, examData) => {
    await apiClient.put(`/content/examinations/${id}`, examData);
    showToast('Examination schedule updated.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const deleteExamination = useCallback(async (id) => {
    await apiClient.delete(`/content/examinations/${id}`);
    showToast('Examination schedule removed.');
    await refreshAll();
  }, [refreshAll, showToast]);

  // Team User / RBAC operations
  const createUser = useCallback(async (userData) => {
    await apiClient.post('/content/users', userData);
    showToast('Team account provisioned with role access.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const deleteUser = useCallback(async (id) => {
    await apiClient.delete(`/content/users/${id}`);
    showToast('Team account revoked.');
    await refreshAll();
  }, [refreshAll, showToast]);

  // Facility / Media asset operations
  const createFacility = useCallback(async (facData) => {
    await apiClient.post('/content/facilities', facData);
    showToast('Campus media & facility asset added.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const updateFacility = useCallback(async (id, facData) => {
    await apiClient.put(`/content/facilities/${id}`, facData);
    showToast('Media asset updated successfully.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const deleteFacility = useCallback(async (id) => {
    await apiClient.delete(`/content/facilities/${id}`);
    showToast('Media asset removed.');
    await refreshAll();
  }, [refreshAll, showToast]);

  const value = useMemo(() => ({
    faculty,
    notices,
    programmes,
    news,
    settings,
    pages,
    clubs,
    research,
    documents,
    examinations,
    users,
    facilities,
    socketConnected,
    loading,
    error,
    toast,
    setToast,
    showToast,
    refreshAll,
    createNotice,
    deleteNotice,
    createNews,
    deleteNews,
    createFaculty,
    updateFaculty,
    deleteFaculty,
    updateSettings,
    createProgramme,
    updateProgramme,
    deleteProgramme,
    createClub,
    updateClub,
    deleteClub,
    createResearch,
    updateResearch,
    deleteResearch,
    createDocument,
    updateDocument,
    deleteDocument,
    createExamination,
    updateExamination,
    deleteExamination,
    createUser,
    deleteUser,
    createFacility,
    updateFacility,
    deleteFacility
  }), [
    faculty,
    notices,
    programmes,
    news,
    settings,
    pages,
    clubs,
    research,
    documents,
    examinations,
    users,
    facilities,
    socketConnected,
    loading,
    error,
    toast,
    showToast,
    refreshAll,
    createNotice,
    deleteNotice,
    createNews,
    deleteNews,
    createFaculty,
    updateFaculty,
    deleteFaculty,
    updateSettings,
    createProgramme,
    updateProgramme,
    deleteProgramme,
    createClub,
    updateClub,
    deleteClub,
    createResearch,
    updateResearch,
    deleteResearch,
    createDocument,
    updateDocument,
    deleteDocument,
    createExamination,
    updateExamination,
    deleteExamination,
    createUser,
    deleteUser,
    createFacility,
    updateFacility,
    deleteFacility
  ]);

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
}
