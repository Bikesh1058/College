import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useAdminData } from '../context/useAdminData';
import { useAlert } from '../../context/useAlert';
import ImageUploadInput from '../components/ImageUploadInput';

export default function NoticesView() {
  const { notices, news, createNotice, deleteNotice, createNews, deleteNews } = useAdminData();
  const { alert, confirm } = useAlert();

  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'General',
    content: '',
    attachmentUrl: '',
    isPinned: false
  });

  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'Institutional',
    excerpt: '',
    image: '',
    content: ''
  });

  const [isSubmittingNotice, setIsSubmittingNotice] = useState(false);
  const [isSubmittingNews, setIsSubmittingNews] = useState(false);

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;
    setIsSubmittingNotice(true);
    try {
      await createNotice({
        ...newNotice,
        attachment: newNotice.attachmentUrl
          ? { title: newNotice.title, url: newNotice.attachmentUrl }
          : undefined
      });
      setNewNotice({ title: '', category: 'General', content: '', attachmentUrl: '', isPinned: false });
    } catch (err) {
      alert({
        title: 'Publish Notice Failed',
        message: err.response?.data?.message || err.message,
        type: 'error'
      });
    } finally {
      setIsSubmittingNotice(false);
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.content) return;
    setIsSubmittingNews(true);
    try {
      await createNews(newArticle);
      setNewArticle({ title: '', category: 'Institutional', excerpt: '', image: '', content: '' });
    } catch (err) {
      alert({
        title: 'Publish Story Failed',
        message: err.response?.data?.message || err.message,
        type: 'error'
      });
    } finally {
      setIsSubmittingNews(false);
    }
  };

  const handleDeleteNoticeClick = async (id) => {
    const shouldDelete = await confirm({
      title: 'Remove Official Notice',
      message: 'Are you sure you want to delete this notice? It will be removed from the public website immediately.',
      type: 'warning',
      confirmText: 'Delete Notice',
      destructive: true
    });

    if (shouldDelete) {
      try {
        await deleteNotice(id);
      } catch (err) {
        alert({
          title: 'Deletion Failed',
          message: err.message,
          type: 'error'
        });
      }
    }
  };

  const handleDeleteNewsClick = async (id) => {
    const shouldDelete = await confirm({
      title: 'Delete News Article',
      message: 'Are you sure you want to delete this article from the college news archive?',
      type: 'warning',
      confirmText: 'Delete Article',
      destructive: true
    });

    if (shouldDelete) {
      try {
        await deleteNews(id);
      } catch (err) {
        alert({
          title: 'Deletion Failed',
          message: err.message,
          type: 'error'
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Notice Publisher Card */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 sm:p-7 shadow-xs">
        <div className="border-b border-[#EFECE3] pb-4 mb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A68238] mb-1">
            Official Announcements & Circulars
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Post an Official Notice</h3>
          <p className="text-sm text-slate-600 mt-1">Notices you publish here will appear immediately for students, teachers, and parents on the public website</p>
        </div>

        <form onSubmit={handleNoticeSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Notice Title</label>
              <input
                type="text"
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                required
                placeholder="e.g. Grade 11 Annual Examination Schedule Released"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Audience / Category</label>
              <select
                value={newNotice.category}
                onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B]"
              >
                <option value="General">General Notice</option>
                <option value="Academic">Academic</option>
                <option value="Examination">Examinations & Routines</option>
                <option value="Admission">Admissions</option>
                <option value="Event">Campus Event</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Notice Details & Body</label>
            <textarea
              rows={4}
              value={newNotice.content}
              onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
              required
              placeholder="Write your announcement details here. Mention dates, timings, required documents, or instructions..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed outline-none focus:border-[#C5A15B] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Notice Image / Circular Attachment (Upload or URL)</label>
            <ImageUploadInput
              value={newNotice.attachmentUrl}
              onChange={(val) => setNewNotice({ ...newNotice, attachmentUrl: val })}
              accept="image/*,.pdf"
              placeholder="https://... or click Upload on the left to attach notice image/PDF"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <p className="text-xs text-slate-500">Notice will be timestamped automatically and synchronized across devices.</p>
            <button
              type="submit"
              disabled={isSubmittingNotice}
              className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-md disabled:opacity-50"
            >
              {isSubmittingNotice ? 'Publishing...' : 'Publish Notice Now'}
            </button>
          </div>
        </form>
      </div>

      {/* Published Notices Table */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#101B2D]">Currently Published Notices ({notices.length})</h4>
            <p className="text-sm text-slate-600 mt-0.5">Click any notice to view, or delete outdated announcements</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#EFECE3] text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Published On</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE3]">
              {notices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 text-sm">
                    No notices found. You can write and publish your first notice using the form above!
                  </td>
                </tr>
              ) : (
                notices.map((n) => (
                  <tr key={n._id} className="hover:bg-[#FAF8F5]">
                    <td className="py-3.5 px-4 font-semibold text-[#101B2D] max-w-md truncate">{n.title}</td>
                    <td className="py-3.5 px-4">
                      <span className="rounded-lg bg-[#FAF8F5] border border-[#E3DCCB] px-2.5 py-1 text-xs text-[#A68238] font-bold">
                        {n.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {new Date(n.publishedAt || n.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[#A68238] font-bold text-xs uppercase tracking-wider">
                        Published
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteNoticeClick(n._id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Remove notice"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* News Articles Section */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 sm:p-7 shadow-xs space-y-5">
        <div className="border-b border-[#EFECE3] pb-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A68238] mb-1">
            Editorial & Campus Stories
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">Share a College Story or Achievement</h3>
          <p className="text-sm text-slate-600 mt-1">Articles published here appear in the College News and Highlights section</p>
        </div>

        <form onSubmit={handleNewsSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Headline</label>
              <input
                type="text"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                required
                placeholder="e.g. Khwopa +2 Science Students Win National Robotics Expo"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Topic</label>
              <select
                value={newArticle.category}
                onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
              >
                <option value="Institutional">Campus Milestone</option>
                <option value="Achievement">Student Achievement</option>
                <option value="Research">Research & Science</option>
                <option value="Academic">Academics</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Short Summary</label>
              <input
                type="text"
                value={newArticle.excerpt}
                onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                required
                placeholder="One or two sentences summarizing the story for the homepage highlight..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Cover Image (Upload or URL)</label>
              <ImageUploadInput
                value={newArticle.image}
                onChange={(val) => setNewArticle({ ...newArticle, image: val })}
                placeholder="https://... or click Upload on the left"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Story Body</label>
            <textarea
              rows={3}
              value={newArticle.content}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
              required
              placeholder="Write the full story details..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmittingNews}
            className="px-5 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-md disabled:opacity-50"
          >
            {isSubmittingNews ? 'Publishing...' : 'Publish Story'}
          </button>
        </form>

        {/* Published News Table */}
        <div className="pt-5 border-t border-[#EFECE3]">
          <h4 className="font-serif font-bold text-base sm:text-lg text-[#101B2D] mb-3">Published Articles ({news.length})</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#EFECE3] text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE3]">
                {news.map((item) => (
                  <tr key={item._id} className="hover:bg-[#FAF8F5]">
                    <td className="py-3.5 px-4 font-semibold text-[#101B2D] max-w-md truncate">{item.title}</td>
                    <td className="py-3.5 px-4 text-[#A68238] font-medium">{item.category}</td>
                    <td className="py-3.5 px-4 text-slate-600">{item.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteNewsClick(item._id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Delete article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
