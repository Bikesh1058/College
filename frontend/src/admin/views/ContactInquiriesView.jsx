import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import { 
  Mail, 
  Search, 
  Trash2, 
  RefreshCw, 
  Send, 
  Clock, 
  Filter, 
  Phone, 
  User, 
  Calendar,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export default function ContactInquiriesView() {
  const queryClient = useQueryClient();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Reply Modal State
  const [replyText, setReplyText] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [replyNotification, setReplyNotification] = useState(null);

  // Status notes update
  const [adminNotes, setAdminNotes] = useState('');

  // Fetch inquiries from backend
  const { data: response, isLoading, refetch } = useQuery({
    queryKey: ['admin-contact-messages'],
    queryFn: () => api.getContactMessages({ limit: 100 }),
    refetchInterval: 30000 // auto-refresh every 30 seconds
  });

  const messages = useMemo(() => response?.data || [], [response?.data]);

  // Mutations
  const statusMutation = useMutation({
    mutationFn: ({ id, status, notes }) => api.updateContactStatus(id, { status, notes }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] });
      if (selectedMessage && selectedMessage._id === res.data._id) {
        setSelectedMessage(res.data);
      }
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.deleteContactMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] });
      setSelectedMessage(null);
    }
  });

  // Filter messages
  const filteredMessages = useMemo(() => {
    return messages.filter(m => {
      const matchCat = activeCategory === 'All' || m.category === activeCategory;
      const matchStat = activeStatus === 'All' || m.status === activeStatus;
      const q = search.trim().toLowerCase();
      const matchSearch = !q || 
        `${m.fullName} ${m.email} ${m.phone} ${m.subject} ${m.message}`.toLowerCase().includes(q);
      return matchCat && matchStat && matchSearch;
    });
  }, [messages, activeCategory, activeStatus, search]);

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg);
    setAdminNotes(msg.notes || '');
    setReplySubject(`Re: ${msg.subject} - Khwopa Secondary School`);
    setReplyText(`Dear ${msg.fullName},\n\nThank you for reaching out to Khwopa Secondary School.\n\nRegarding your inquiry, \n\nBest regards,\nAdmissions & Inquiry Desk\nKhwopa Secondary School, Dekocha, Bhaktapur`);
    setReplyNotification(null);
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!selectedMessage || !replyText.trim()) return;

    setIsReplying(true);
    setReplyNotification(null);
    try {
      const res = await api.replyContactMessage(selectedMessage._id, {
        replyText,
        subject: replySubject
      });

      setReplyNotification({
        type: 'success',
        text: 'Official reply email dispatched successfully to ' + selectedMessage.email
      });

      queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] });
      if (res?.data) {
        setSelectedMessage(res.data);
      }
    } catch (err) {
      setReplyNotification({
        type: 'error',
        text: err.response?.data?.message || err.message || 'Failed to dispatch email reply'
      });
    } finally {
      setIsReplying(false);
    }
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedMessage) return;
    statusMutation.mutate({
      id: selectedMessage._id,
      status: newStatus,
      notes: adminNotes
    });
  };

  const handleSaveNotes = () => {
    if (!selectedMessage) return;
    statusMutation.mutate({
      id: selectedMessage._id,
      status: selectedMessage.status,
      notes: adminNotes
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message record?')) {
      deleteMutation.mutate(id);
    }
  };

  const categories = ['All', 'Admissions', 'Academic Stream', 'Examinations', 'Fee & Scholarships', 'General', 'Administration', 'Campus Tour', 'Feedback'];
  const statuses = ['All', 'New', 'In Review', 'Replied', 'Archived'];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">
            Student & Public Inquiries
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#ded7ca] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B] transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#92703b] ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <span className="rounded-full bg-[#101B2D] px-3.5 py-1.5 text-xs font-bold text-[#C5A15B]">
            {messages.length} Total Messages
          </span>
        </div>
      </div>

      {/* Main Grid: Messages List on Left (5 Cols), Detail & Reply on Right (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Filters + Inquiries List */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Search & Filter Header */}
          <div className="rounded-2xl border border-[#ded7ca] bg-white p-4 space-y-3 shadow-xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, phone or text..."
                className="w-full rounded-xl border border-[#ded7ca] bg-[#FAF8F5] pl-10 pr-4 py-2.5 text-xs text-[#101B2D] outline-none transition focus:border-[#C5A15B] focus:bg-white"
              />
            </div>

            {/* Filter by Status Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {statuses.map(st => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setActiveStatus(st)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                    activeStatus === st
                      ? "bg-[#101B2D] text-[#C5A15B]"
                      : "bg-[#FAF8F5] text-slate-600 hover:bg-[#eae5d8]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-2 pt-1 border-t border-[#eee9df]">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full rounded-lg border border-[#ded7ca] bg-[#FAF8F5] px-3 py-1.5 text-xs text-[#101B2D] outline-none"
              >
                {categories.map(c => (
                  <option key={c} value={c}>Category: {c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* List of Messages */}
          <div className="rounded-2xl border border-[#ded7ca] bg-white overflow-hidden shadow-xs">
            <div className="p-3 bg-[#FAF8F5] border-b border-[#eee9df] flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Showing {filteredMessages.length} inquiries</span>
              {messages.filter(m => m.status === 'New').length > 0 && (
                <span className="inline-flex items-center gap-1.5 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                  {messages.filter(m => m.status === 'New').length} New
                </span>
              )}
            </div>

            <div className="divide-y divide-[#eee9df] max-h-[620px] overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-10 text-center text-slate-400 text-xs">
                  <Mail className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                  <p>No contact inquiries match your filters.</p>
                </div>
              ) : (
                filteredMessages.map(msg => (
                  <div
                    key={msg._id}
                    onClick={() => handleOpenMessage(msg)}
                    className={`p-4 cursor-pointer transition text-left ${
                      selectedMessage?._id === msg._id
                        ? "bg-[#C5A15B]/15 border-l-4 border-l-[#C5A15B]"
                        : "hover:bg-[#FAF8F5]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        msg.status === 'New' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        msg.status === 'Replied' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        msg.status === 'In Review' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {msg.status}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="font-bold text-[#101B2D] text-sm mt-1.5 truncate">
                      {msg.fullName}
                    </h4>
                    <p className="text-xs font-semibold text-[#92703b] truncate">
                      {msg.subject || 'General Inquiry'}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {msg.message}
                    </p>
                    
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-slate-100">
                      <span className="truncate">{msg.email}</span>
                      <span className="font-mono text-slate-500">{msg.phone}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Inquiry Details & Direct Admin Reply Form */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="rounded-2xl border border-[#ded7ca] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
              
              {/* Header with Status Selector & Delete */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eee9df] pb-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#92703b]">
                    Inquiry Reference: {selectedMessage._id.slice(-6)}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] mt-0.5">
                    {selectedMessage.subject}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#92703b]" />
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </span>
                    <span>·</span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 font-semibold text-[#101B2D]">
                      {selectedMessage.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="rounded-xl border border-[#ded7ca] bg-[#FAF8F5] px-3 py-1.5 text-xs font-bold text-[#101B2D] outline-none transition focus:border-[#C5A15B]"
                  >
                    <option value="New">Status: New</option>
                    <option value="In Review">Status: In Review</option>
                    <option value="Replied">Status: Replied</option>
                    <option value="Archived">Status: Archived</option>
                  </select>

                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    title="Delete message record"
                    className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-700 hover:bg-rose-100 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Sender Information Card */}
              <div className="rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <User className="h-4 w-4 text-[#92703b] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Sender Name</span>
                    <strong className="text-[#101B2D] text-sm">{selectedMessage.fullName}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 text-[#92703b] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</span>
                    <a href={`mailto:${selectedMessage.email}`} className="text-[#92703b] hover:underline font-semibold break-all">
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 text-[#92703b] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Contact Number</span>
                    <a href={`tel:${selectedMessage.phone}`} className="text-[#101B2D] hover:underline font-mono font-bold">
                      {selectedMessage.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#92703b]">
                  Student / Visitor Inquiry Message:
                </label>
                <div className="mt-2 rounded-xl border border-[#eee9df] bg-white p-5 text-xs sm:text-sm text-[#2d3748] leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Internal Administration Notes */}
              <div className="rounded-xl border border-[#ded7ca] bg-[#fcfbf8] p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#101B2D]">
                    Internal Staff Notes:
                  </label>
                  <button
                    onClick={handleSaveNotes}
                    className="text-xs font-bold text-[#92703b] hover:underline"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record internal notes, e.g. 'Called student on 11/12, interested in Computer group...'"
                  className="w-full rounded-lg border border-[#ded7ca] bg-white p-2.5 text-xs text-[#101B2D] outline-none focus:border-[#C5A15B]"
                />
              </div>

              {/* Official Email Reply Desk */}
              <div className="rounded-2xl border border-[#b99754]/40 bg-gradient-to-b from-[#fbf9f4] to-white p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0b2038] text-[#dfbd77]">
                    <Send className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#101B2D]">
                      Direct Email Response Desk
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Dispatches an official Khwopa College branded reply directly to {selectedMessage.email}
                    </p>
                  </div>
                </div>

                {replyNotification && (
                  <div className={`rounded-xl p-3 text-xs flex items-center gap-2 ${
                    replyNotification.type === 'success'
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-50 text-rose-900 border border-rose-300'
                  }`}>
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{replyNotification.text}</span>
                  </div>
                )}

                <form onSubmit={handleSendReply} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Email Subject:
                    </label>
                    <input
                      type="text"
                      value={replySubject}
                      onChange={(e) => setReplySubject(e.target.value)}
                      className="w-full rounded-xl border border-[#ded7ca] bg-white px-3.5 py-2 text-xs text-[#101B2D] outline-none focus:border-[#C5A15B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Reply Message:
                    </label>
                    <textarea
                      rows={5}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full rounded-xl border border-[#ded7ca] bg-white p-3.5 text-xs text-[#101B2D] outline-none font-sans focus:border-[#C5A15B]"
                      placeholder="Compose your official response here..."
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[11px] text-slate-400">
                      Status will be automatically set to <strong className="text-emerald-700">Replied</strong> upon dispatch.
                    </p>
                    <button
                      type="submit"
                      disabled={isReplying}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0b2038] px-5 py-2.5 text-xs font-bold text-[#dfbd77] hover:bg-[#1a3858] transition disabled:opacity-50"
                    >
                      {isReplying ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          <span>Sending Gmail...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Dispatch Email Reply</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#ded7ca] bg-white p-16 text-center shadow-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF8F5] text-slate-400">
                <MessageSquare className="h-7 w-7 text-[#92703b]" />
              </div>
              <h4 className="mt-4 font-serif text-lg font-bold text-[#101B2D]">
                Select an Inquiry from the Roster
              </h4>
              <p className="mt-1.5 max-w-sm mx-auto text-xs text-slate-500 leading-relaxed">
                Click on any student inquiry on the left to inspect detailed submission notes, review phone and email coordinates, or send an official email response.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

