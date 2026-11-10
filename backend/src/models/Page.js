import mongoose from 'mongoose';

/*
  Universal Page Schema supporting the PageBuilder pattern.
  Each page can hold ordered sections:
    - hero
    - rich_text
    - statistics
    - timeline
    - feature_cards
    - gallery
    - faq
    - cta
*/

const sectionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  enabled: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  content: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { _id: true });

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  pageType: { type: String, default: 'standard' },
  template: { type: String, default: 'editorial' },
  status: {
    type: String,
    enum: ['draft', 'in_review', 'scheduled', 'published', 'archived'],
    default: 'published',
    index: true
  },
  seo: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    ogImage: { type: String, default: '' }
  },
  sections: [sectionSchema],
  createdBy: { type: String, default: 'admin' },
  updatedBy: { type: String, default: 'admin' }
}, {
  timestamps: true
});

export const Page = mongoose.model('Page', pageSchema);

