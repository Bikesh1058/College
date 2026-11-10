import { useState, useMemo } from 'react';
import { Search, Plus, Trash2, X } from 'lucide-react';
import { useAdminData } from '../context/useAdminData';
import { useAlert } from '../../context/useAlert';
import ImageUploadInput from '../components/ImageUploadInput';

export default function FacultyView() {
  const { faculty, createFaculty, updateFaculty, deleteFaculty, settings, updateSettings } = useAdminData();
  const { alert, confirm } = useAlert();

  const [facultyFilter, setFacultyFilter] = useState('All');
  const [facultySearch, setFacultySearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editingBadge, setEditingBadge] = useState(false);
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

  const filteredFaculty = useMemo(() => {
    return faculty.filter((f) => {
      const matchesStream = facultyFilter === 'All' || f.facultyStream === facultyFilter;
      const matchesSearch =
        !facultySearch ||
        `${f.name} ${f.subject} ${f.department} ${f.designation}`
          .toLowerCase()
          .includes(facultySearch.toLowerCase());
      return matchesStream && matchesSearch;
    });
  }, [faculty, facultyFilter, facultySearch]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newFaculty.name || !newFaculty.subject) return;
    setIsSubmitting(true);
    try {
      await createFaculty(newFaculty);
      setShowAddModal(false);
      setNewFaculty({
        name: '',
        designation: 'Lecturer',
        facultyStream: 'Science',
        subject: 'Physics',
        department: 'Department of Physics',
        qualification: '',
        image: ''
      });
    } catch (err) {
      alert({
        title: 'Profile Registration Error',
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
      message: 'Are you sure you want to delete this teacher profile from the faculty registry? This change will be reflected on the public website.',
      type: 'warning',
      confirmText: 'Delete Educator',
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
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A68238] mb-1">
            Faculty & Staff Registry
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">
            Teaching Staff & Faculty Directory ({settings?.moduleBadges?.faculty || faculty.length || '116'} Members)
          </h3>
          <p className="text-sm text-slate-600 mt-1">Every teacher, department head, and institutional leader is listed here</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {editingBadge ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const val = e.target.badgeVal.value.trim();
                await updateSettings({ ...settings, moduleBadges: { ...(settings?.moduleBadges || {}), faculty: val } });
                setEditingBadge(false);
              }}
              className="flex items-center gap-1.5"
            >
              <input
                name="badgeVal"
                defaultValue={settings?.moduleBadges?.faculty || `${faculty.length || 116}`}
                className="w-24 px-2.5 py-1.5 rounded-lg border border-[#C5A15B] text-xs font-bold text-[#101B2D]"
              />
              <button type="submit" className="px-2.5 py-1.5 rounded-lg bg-[#101B2D] text-[#C5A15B] text-xs font-bold">Save</button>
              <button type="button" onClick={() => setEditingBadge(false)} className="text-xs text-slate-500 font-bold px-1">✕</button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setEditingBadge(true)}
              title="Click to edit sidebar badge count/label"
              className="text-xs font-bold text-[#A68238] bg-[#C5A15B]/15 px-3.5 py-2 rounded-xl hover:bg-[#C5A15B]/25 transition"
            >
              Badge: {settings?.moduleBadges?.faculty || faculty.length || '116'} ✎
            </button>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-md"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Educator</span>
          </button>
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
            className="w-full pl-10 pr-3.5 py-2 text-sm rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-[#101B2D] outline-none focus:border-[#C5A15B]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['All', 'Science', 'Management', 'Humanities & Law'].map((s) => (
            <button
              key={s}
              onClick={() => setFacultyFilter(s)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                facultyFilter === s
                  ? 'bg-[#101B2D] text-[#C5A15B] font-bold shadow-xs'
                  : 'bg-[#FAF8F5] border border-[#E3DCCB] text-slate-600 hover:bg-white'
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
                <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                  No teachers found matching your search.
                </td>
              </tr>
            ) : (
              filteredFaculty.map((f) => (
                <tr key={f.id || f._id} className="hover:bg-[#FAF8F5]">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      {f.image ? (
                        <img
                          src={f.image}
                          alt={f.name}
                          className="h-8 w-8 rounded-full object-cover shrink-0 border border-[#C5A15B]/30"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-[#101B2D] text-[#C5A15B] font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-[#C5A15B]/30">
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
                        className="px-3 py-1.5 rounded-lg border border-[#E3DCCB] bg-[#FAF8F5] text-xs font-bold text-[#101B2D] hover:border-[#C5A15B]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(f._id || f.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
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
          <div className="w-full max-w-lg rounded-2xl border border-[#C5A15B] bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3">
              <h4 className="font-serif font-bold text-lg text-[#101B2D]">Edit Educator Profile</h4>
              <button
                onClick={() => setEditingTeacher(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Faculty Stream</label>
                  <select
                    value={editingTeacher.facultyStream || 'Science'}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, facultyStream: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Department</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.department || ''}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Academic Qualification</label>
                <input
                  type="text"
                  value={editingTeacher.qualification || ''}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, qualification: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                  className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] disabled:opacity-50"
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
          <div className="w-full max-w-lg rounded-2xl border border-[#E3DCCB] bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFECE3] pb-3">
              <h4 className="font-serif font-bold text-lg text-[#101B2D]">Add New Educator Profile</h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Faculty Stream</label>
                  <select
                    value={newFaculty.facultyStream}
                    onChange={(e) => setNewFaculty({ ...newFaculty, facultyStream: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
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
                  className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] disabled:opacity-50"
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
