import { useState } from 'react';
import { useAdminData } from '../context/useAdminData';
import { useAlert } from '../../context/useAlert';
import ImageUploadInput from '../components/ImageUploadInput';

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
        <div className="border-b border-[#EFECE3] pb-5 mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A68238] mb-1">
            Institutional Configuration
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight">College Information & Header Banner</h3>
          <p className="text-sm text-slate-600 mt-1">Update contact details, official telephone numbers, and broadcast urgent notices at the very top of the website</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">College Legal Name</label>
              <input
                type="text"
                value={formData.collegeName || ''}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Tagline</label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Official Address</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Official Telephone Lines</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Official Email Address</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">Official Facebook Page URL</label>
              <input
                type="url"
                value={formData.socialLinks?.facebook || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, facebook: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1.5">College Crest / Banner Image (Upload or URL)</label>
              <ImageUploadInput
                value={formData.logoUrl || ''}
                onChange={(val) => setFormData({ ...formData, logoUrl: val })}
                placeholder="https://... or click Upload on the left"
              />
            </div>
          </div>

          {/* Announcement Ribbon */}
          <div className="p-5 rounded-2xl border border-[#E3DCCB] bg-[#FAF8F5] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#101B2D] uppercase tracking-wider">Top Notification Ribbon</p>
                <p className="text-xs text-slate-600 mt-0.5">Displays a prominent gold announcement bar across the top of all public pages</p>
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
                <span className="text-xs font-bold text-[#A68238]">Enable Top Ribbon</span>
              </label>
            </div>

            {formData.announcementBanner?.enabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
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
                  placeholder="Banner message (e.g. Class 11 Admissions Open for 2083!)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D]"
                />
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
                  placeholder="Destination link (e.g. /admissions/apply)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-white text-sm text-[#101B2D]"
                />
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#EFECE3] flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shadow-md disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save College Information'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
