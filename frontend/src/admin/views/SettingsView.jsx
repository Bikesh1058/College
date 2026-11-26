import { useState } from 'react';
import { useAdminData } from '../context/useAdminData';
import { useAlert } from '../../context/useAlert';
import ImageUploadInput from '../components/ImageUploadInput';
import { Shield, Building, Megaphone, Check } from 'lucide-react';

export default function SettingsView() {
  const { settings, updateSettings } = useAdminData();
  const { alert } = useAlert();
  const [formData, setFormData] = useState(() => settings || {
    collegeName: 'Khwopa Secondary School',
    tagline: 'An Undertaking of Bhaktapur Municipality',
    logoUrl: '',
    address: 'Dekocha, Bhaktapur, Nepal',
    phone: '+977-1-6614336',
    email: 'info@khwopa.edu.np',
    establishedYearBS: '2056 BS',
    socialLinks: {
      facebook: 'https://www.facebook.com/KhwopaSecondarySchool',
      youtube: 'https://www.youtube.com'
    },
    announcementBanner: {
      enabled: false,
      text: '',
      link: ''
    }
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings(formData);
    } catch (err) {
      alert({
        title: 'Settings Update Error',
        message: err.response?.data?.message || err.message,
        type: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#E3DCCB] bg-white p-7 shadow-xs">
        <div className="border-b border-[#EFECE3] pb-5 mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">College Information & Header Banner</h3>
            <p className="text-xs text-slate-500 mt-1">Institutional identity, official contact channels, and global announcement bar</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-sm">
          {/* Institutional Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">College Legal Name</label>
              <input
                type="text"
                value={formData.collegeName || ''}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Tagline / Motto</label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Official Address</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Official Telephone Lines</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Official Email Address</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Official Facebook Page URL</label>
              <input
                type="url"
                value={formData.socialLinks?.facebook || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, facebook: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white transition"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">College Logo / Institutional Seal</label>
              <ImageUploadInput
                value={formData.logoUrl || ''}
                onChange={(val) => setFormData({ ...formData, logoUrl: val })}
                placeholder="https://... or click Upload on the left"
              />
            </div>
          </div>

          {/* Announcement Ribbon */}
          <div className="p-5 rounded-2xl border border-[#E3DCCB] bg-[#FAF8F5] space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#101B2D] uppercase tracking-wider">
                  <Megaphone className="h-3.5 w-3.5 text-[#C5A15B]" />
                  <span>Top Notification Ribbon</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Displays a prominent gold announcement banner across the top of all public pages</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.announcementBanner?.enabled || false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      announcementBanner: {
                        ...formData.announcementBanner,
                        enabled: e.target.checked
                      }
                    })
                  }
                  className="h-4 w-4 rounded accent-[#C5A15B]"
                />
                <span className="text-xs font-bold text-[#101B2D]">Enable Banner</span>
              </label>
            </div>

            {formData.announcementBanner?.enabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Banner Broadcast Text</label>
                  <input
                    type="text"
                    value={formData.announcementBanner?.text || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        announcementBanner: {
                          ...formData.announcementBanner,
                          text: e.target.value
                        }
                      })
                    }
                    placeholder="e.g. Admissions Open for Academic Year 2083/2084!"
                    className="w-full px-3 py-2 rounded-xl border border-[#E3DCCB] bg-white text-xs sm:text-sm text-[#101B2D] outline-none focus:border-[#C5A15B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Action Link (Optional)</label>
                  <input
                    type="text"
                    value={formData.announcementBanner?.link || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        announcementBanner: {
                          ...formData.announcementBanner,
                          link: e.target.value
                        }
                      })
                    }
                    placeholder="/admissions/apply"
                    className="w-full px-3 py-2 rounded-xl border border-[#E3DCCB] bg-white text-xs sm:text-sm text-[#101B2D] outline-none focus:border-[#C5A15B]"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-xs disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
              <span>{saving ? 'Saving Changes...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
