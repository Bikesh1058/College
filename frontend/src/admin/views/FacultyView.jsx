import { useState } from 'react';
import { Plus, Search, Trash2, X } from 'lucide-react';
import { useAdminData } from '../context/useAdminData';
import { useAlert } from '../../context/useAlert';
import ImageUploadInput from '../components/ImageUploadInput';

export default function FacultyView() {
  const { faculty, createFaculty, updateFaculty, deleteFaculty, settings } = useAdminData();
  const { alert, confirm } = useAlert();

  const [facultyFilter, setFacultyFilter] = useState('All');
  const [facultySearch, setFacultySearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newFaculty, setNewFaculty] = useState({
    name: '',
    designation: 'Lecturer',
    facultyStream: 'Science',
    subject: 'Physics',
    department: 'Department of Physics',
    qualification: '',
    image: ''
  });

  const filteredFaculty = faculty.filter((f) => {
    const matchesFilter =
      facultyFilter === 'All' ||
      f.facultyStream?.toLowerCase() === facultyFilter.toLowerCase() ||
      (facultyFilter === 'Humanities & Law' && (f.facultyStream?.includes('Humanities') || f.facultyStream?.includes('Law')));

    const matchesSearch =
      f.name?.toLowerCase().includes(facultySearch.toLowerCase()) ||
      f.subject?.toLowerCase().includes(facultySearch.toLowerCase()) ||
      f.department?.toLowerCase().includes(facultySearch.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newFaculty.name || !newFaculty.subject) return;

    setIsSubmitting(true);
    try {
      await createFaculty(newFaculty);
      setNewFaculty({
        name: '',
        designation: 'Lecturer',
        facultyStream: 'Science',
        subject: 'Physics',
        department: 'Department of Physics',
        qualification: '',
        image: ''
      });
      setShowAddModal(false);
    } catch (err) {
      alert({
        title: 'Creation Failed',
        message: err.response?.data?.message || err.message,
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = async (id) => {
    const shouldDelete = await confirm({
      title: 'Remove Faculty Profile',
      message: 'Are you sure you want to remove this faculty record from the institutional directory?',
      type: 'warning',
      confirmText: 'Remove Profile',
      destructive: true
    });

    if (shouldDelete) {
      try {
        await deleteFaculty(id);
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
      {/* View Header */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 sm:p-7 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">
            Teaching Staff & Faculty Directory
          </h3>
          <p className="text-xs text-slate-500 mt-1">Institutional academic directory, department allocations, and teaching staff credentials</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>+ Add New Educator</span>
          </button>
        </div>
      </div>

      {/* Structured Faculty Ledger */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-5 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#EFECE3] -my-1 md:my-0">
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Teaching Staff</span>
            <p className="font-sans text-2xl font-bold text-[#101B2D] mt-1">{faculty.length}</p>
          </div>
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A68238]">Science Stream</span>
            <p className="font-sans text-2xl font-bold text-[#101B2D] mt-1">
              {faculty.filter(f => f.facultyStream === 'Science').length}
            </p>
          </div>
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A68238]">Management Stream</span>
            <p className="font-sans text-2xl font-bold text-[#101B2D] mt-1">
              {faculty.filter(f => f.facultyStream === 'Management').length}
            </p>
          </div>
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A68238]">Humanities & Law</span>
            <p className="font-sans text-2xl font-bold text-[#101B2D] mt-1">
              {faculty.filter(f => f.facultyStream?.includes('Humanities') || f.facultyStream?.includes('Law')).length}
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-[#E3DCCB] bg-white shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={facultySearch}
            onChange={(e) => setFacultySearch(e.target.value)}
            placeholder="Search by teacher name, subject, or department..."
            className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white transition"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['All', 'Science', 'Management', 'Humanities & Law'].map((s) => (
            <button
              key={s}
              onClick={() => setFacultyFilter(s)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                facultyFilter === s
                  ? 'bg-[#101B2D] text-[#C5A15B] font-bold shadow-xs'
                  : 'bg-[#FAF8F5] border border-[#E3DCCB] text-slate-600 hover:bg-white hover:text-[#101B2D]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Educators Table */}
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#EFECE3] text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="py-3 px-3">Educator</th>
              <th className="py-3 px-3">Role / Designation</th>
              <th className="py-3 px-3">Stream</th>
              <th className="py-3 px-3">Subject</th>
              <th className="py-3 px-3">Department</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFECE3]">
            {filteredFaculty.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-400 text-sm">
                  No educators found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredFaculty.map((f) => (
                <tr key={f.id || f._id} className="hover:bg-[#FAF8F5] transition">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      {f.image ? (
                        <img
                          src={f.image}
                          alt={f.name}
                          className="h-9 w-9 rounded-xl object-cover shrink-0 border border-[#C5A15B]/40 shadow-xs"
                        />
                      ) : (
                        <div className="h-9 w-9 rounded-xl bg-[#101B2D] text-[#C5A15B] font-sans font-bold text-xs flex items-center justify-center shrink-0 border border-[#C5A15B]/30 shadow-xs">
                          {f.name ? f.name[0] : 'T'}
                        </div>
                      )}
                      <span className="font-semibold text-[#101B2D]">{f.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-[#A68238] font-medium">{f.designation}</td>
                  <td className="py-3.5 px-3">
                    <span className="rounded-md bg-[#FAF8F5] border border-[#E3DCCB] px-2.5 py-0.5 text-xs font-medium text-slate-700">
                      {f.facultyStream}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-800">{f.subject}</td>
                  <td className="py-3.5 px-3 text-slate-600">{f.department}</td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => setEditingTeacher({ ...f })}
                        className="px-3 py-1.5 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B] hover:bg-white transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(f._id || f.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Remove profile"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Teacher Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-[#C5A15B] bg-white p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3.5">
              <h4 className="font-sans font-bold text-lg text-[#101B2D]">Edit Educator Profile</h4>
              <button
                onClick={() => setEditingTeacher(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-[#FAF8F5]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                try {
                  await updateFaculty(editingTeacher.id || editingTeacher._id, {
                    name: editingTeacher.name,
                    designation: editingTeacher.designation,
                    facultyStream: editingTeacher.facultyStream,
                    subject: editingTeacher.subject,
                    department: editingTeacher.department,
                    qualification: editingTeacher.qualification,
                    image: editingTeacher.image
                  });
                  setEditingTeacher(null);
                } catch (err) {
                  alert({
                    title: 'Update Failed',
                    message: err.response?.data?.message || err.message,
                    type: 'error'
                  });
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-4 text-sm"
            >
              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Full Name & Title</label>
                <input
                  type="text"
                  required
                  value={editingTeacher.name || ''}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Designation</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.designation || ''}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, designation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Faculty Stream</label>
                  <select
                    value={editingTeacher.facultyStream || 'Science'}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, facultyStream: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                  >
                    <option value="Science">Science</option>
                    <option value="Management">Management</option>
                    <option value="Humanities & Law">Humanities & Law</option>
                    <option value="Governance">Governance / Administration</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Subject Taught</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.subject || ''}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Department</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.department || ''}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Academic Qualification</label>
                <input
                  type="text"
                  value={editingTeacher.qualification || ''}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, qualification: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Educator Photo (Upload or URL)</label>
                <ImageUploadInput
                  value={editingTeacher.image || ''}
                  onChange={(val) => setEditingTeacher({ ...editingTeacher, image: val })}
                  placeholder="https://... or click Upload on the left"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#EFECE3]">
                <button
                  type="button"
                  onClick={() => setEditingTeacher(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] disabled:opacity-50 transition shadow-xs"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-[#E3DCCB] bg-white p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3.5">
              <h4 className="font-sans font-bold text-lg text-[#101B2D]">Add New Educator Profile</h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-[#FAF8F5]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Full Name & Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prof. Bikesh Prajapati"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Designation</label>
                  <input
                    type="text"
                    required
                    value={newFaculty.designation}
                    onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Faculty Stream</label>
                  <select
                    value={newFaculty.facultyStream}
                    onChange={(e) => setNewFaculty({ ...newFaculty, facultyStream: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                  >
                    <option value="Science">Science</option>
                    <option value="Management">Management</option>
                    <option value="Humanities & Law">Humanities & Law</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Subject Taught</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Physics / Mathematics"
                    value={newFaculty.subject}
                    onChange={(e) => setNewFaculty({ ...newFaculty, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Department</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Department of Physics"
                    value={newFaculty.department}
                    onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Academic Qualification</label>
                <input
                  type="text"
                  placeholder="e.g. M.Sc. Physics (Tribhuvan University)"
                  value={newFaculty.qualification}
                  onChange={(e) => setNewFaculty({ ...newFaculty, qualification: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Educator Photo (Upload or URL)</label>
                <ImageUploadInput
                  value={newFaculty.image}
                  onChange={(val) => setNewFaculty({ ...newFaculty, image: val })}
                  placeholder="https://... or click Upload on the left"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#EFECE3]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] disabled:opacity-50 transition shadow-xs"
                >
                  <Plus className="h-4 w-4" />
                  <span>{isSubmitting ? 'Saving...' : 'Add Educator Profile'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
