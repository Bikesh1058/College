import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  collegeName: { type: String, default: 'Khwopa Secondary School (+2)' },
  tagline: { type: String, default: 'Dedicated to Country and People' },
  establishedYearBS: { type: String, default: '2058 BS' },
  establishedYearAD: { type: String, default: '2001 AD' },
  address: { type: String, default: 'Dekocha, Bhaktapur, Nepal' },
  phone: { type: String, default: '+977-1-6610932, 01-6614336' },
  email: { type: String, default: 'info@khwopa.edu.np' },
  socialLinks: {
    facebook: { type: String, default: 'https://facebook.com' },
    youtube: { type: String, default: 'https://youtube.com' }
  },
  announcementBanner: {
    enabled: { type: Boolean, default: false },
    text: { type: String, default: '' },
    link: { type: String, default: '' }
  },
  navigationLinks: [
    {
      label: { type: String },
      to: { type: String },
      visible: { type: Boolean, default: true },
      badge: { type: String, default: '' }
    }
  ],
  moduleBadges: {
    academics: { type: String, default: '' },
    examinations: { type: String, default: 'Code 104' },
    faculty: { type: String, default: '' },
    campuslife: { type: String, default: '' },
    research: { type: String, default: 'NepJOL' },
    resources: { type: String, default: '' }
  }
}, {
  timestamps: true
});

export const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

