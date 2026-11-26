import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import { 
  Search, 
  Mail, 
  Trash2, 
  Clock, 
  User, 
  Phone, 
  Calendar,
  Send,
  AlertCircle,
  RefreshCw,
  Filter,
  CheckCircle2,
  Inbox
} from 'lucide-react';

export default function ContactInquiriesView() {
  const queryClient = useQueryClient();

  // Search and filter state
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Direct Reply State
  const [replyText, setReplyText] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [replyNotification, setReplyNotification] = useState(null);

  // Internal Notes State
  const [adminNotes, setAdminNotes] = useState('');

  // Fetch messages from MongoDB
  const { data: messagesResponse, isLoading, refetch } = useQuery({
    queryKey: ['admin-contact-messages'],
    queryFn: async () => {
      const res = await api.getContactMessages();
      return res;
    }
  });

  const messages = messagesResponse?.data || [];

  // Update Status mutation
  const statusMutation = useMutation({
    mutationFn: ({ id, status, notes }) => api.updateContactStatus(id, { status, notes }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] });
      if (selectedMessage && selectedMessage._id === data.data?._id) {
        setSelectedMessage(data.data);
      }
    }
  });

  // Delete message mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => api.deleteContactMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] });
      setSelectedMessage(null);
    }
  });

  // Filter messages
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      msg.email?.toLowerCase().includes(search.toLowerCase()) ||
      msg.phone?.includes(search) ||
      msg.message?.toLowerCase().includes(search.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = activeCategory === 'All' || msg.category === activeCategory;
    const matchesStatus = activeStatus === 'All' || msg.status === activeStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg);
    setAdminNotes(msg.notes || '');
    setReplySubject(`Re: ${msg.subject || 'Your Inquiry to Khwopa Secondary School'}`);
    setReplyText(`Dear ${msg.fullName},\n\nThank you for reaching out to Khwopa Secondary School (+2).\n\nIn response to your query regarding "${msg.subject}":\n\n[Please enter details here]\n\nIf you have any further questions, feel free to visit our campus at Dekocha, Bhaktapur, or call us at +977-1-6610932.\n\nWarm regards,\nAdministrative Officer\nKhwopa Higher Secondary School`);
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
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 sm:p-7 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">
            Student & Public Inquiries
          </h3>
          <p className="text-xs text-slate-500 mt-1">Helpdesk communications, public questions, and admissions guidance registry</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#ded7ca] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B] hover:bg-white transition shadow-xs cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#92703b] ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Structured Inquiries Ledger Strip */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#EFECE3] -my-1 md:my-0">
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Recorded</span>
            <p className="font-sans text-2xl font-bold text-[#101B2D] mt-1">{messages.length}</p>
          </div>
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">New / Unread</span>
            <p className="font-sans text-2xl font-bold text-[#101B2D] mt-1">
              {messages.filter(m => m.status === 'New').length}
            </p>
          </div>
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Under Review</span>
            <p className="font-sans text-2xl font-bold text-[#101B2D] mt-1">
              {messages.filter(m => m.status === 'In Review').length}
            </p>
          </div>
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Replied / Resolved</span>
            <p className="font-sans text-2xl font-bold text-[#101B2D] mt-1">
              {messages.filter(m => m.status === 'Replied').length}
            </p>
          </div>
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
                  className={`rounded-xl px-2.5 py-1 text-[11px] font-bold transition ${
                    activeStatus === st
                      ? "bg-[#101B2D] text-[#C5A15B] shadow-xs"
                      : "bg-[#FAF8F5] text-slate-600 hover:bg-[#eae5d8]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-2 pt-1 border-t border-[#eee9df]">
              <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full rounded-xl border border-[#ded7ca] bg-[#FAF8F5] px-3 py-1.5 text-xs text-[#101B2D] outline-none focus:border-[#C5A15B]"
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
                <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {messages.filter(m => m.status === 'New').length} New
                </span>
              )}
            </div>

            <div className="divide-y divide-[#eee9df] max-h-[620px] overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-10 text-center text-slate-400 text-xs">
                  <Mail className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                  <p>No inquiries match your filters.</p>
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
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
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
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#101B2D] mt-0.5">
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
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0b2038] text-[#C5A15B]">
                    <Send className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-base font-bold text-[#101B2D]">
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
                      className="inline-flex items-center gap-2 rounded-xl bg-[#101B2D] px-5 py-2.5 text-xs font-bold text-[#C5A15B] transition hover:bg-[#1B293E] disabled:opacity-50 shadow-xs"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>{isReplying ? 'Dispatching...' : 'Send Official Reply'}</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#ded7ca] bg-[#FAF8F5] p-10 text-center space-y-2">
              <Mail className="h-7 w-7 text-[#A68238]/60 mx-auto" />
              <h4 className="font-sans text-base font-bold text-[#101B2D]">
                No Inquiry Selected
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Select an inquiry from the register on the left to inspect message details, add staff notes, or dispatch an official email reply.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
