import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  category: {
    type: String,
    enum: ['Academic', 'Examination', 'Admission', 'General', 'Event', 'Scholarship', 'Results'],
    default: 'General',
    index: true
  },
  content: { type: String, required: true },
  attachment: {
    title: { type: String },
    url: { type: String },
    fileType: { type: String, default: 'application/pdf' },
    fileSize: { type: String }
  },
  isPinned: { type: Boolean, default: false, index: true },
  isPublished: { type: Boolean, default: true, index: true },
  publishedAt: { type: Date, default: Date.now, index: true },
  expiresAt: { type: Date }
}, {
  timestamps: true
});

noticeSchema.index({ title: 'text', content: 'text' });

export const Notice = mongoose.model('Notice', noticeSchema);

