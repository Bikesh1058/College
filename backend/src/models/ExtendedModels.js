import mongoose from 'mongoose';

// News & Articles
const newsArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  category: { type: String, default: 'Academic', index: true },
  date: { type: String, default: 'Recently Published' },
  readTime: { type: String, default: '3 min read' },
  image: { type: String, default: '' },
  excerpt: { type: String, required: true },
  content: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

// Events
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  date: { type: String, required: true },
  time: { type: String, default: '10:00 AM - 3:00 PM' },
  location: { type: String, default: 'College Auditorium / Courtyard' },
  category: { type: String, default: 'Academic' },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  isUpcoming: { type: Boolean, default: true }
}, { timestamps: true });

// Research & Publications
const researchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  journal: { type: String, default: 'Khwopa Journal of Research' },
  year: { type: String, default: '2081/2082' },
  department: { type: String, default: 'Research Management Cell (RMC)' },
  abstract: { type: String, required: true },
  pdfUrl: { type: String, default: '' },
  category: { type: String, default: 'Scientific' }
}, { timestamps: true });

// Campus Facilities
const facilitySchema = new mongoose.Schema({
  number: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, default: 'Academic' },
  image: { type: String, required: true },
  badge: { type: String, default: 'Verified Facility' },
  description: { type: String, required: true },
  summary: { type: String, default: '' }
}, { timestamps: true });

// Student Clubs & Campus Life
const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, default: 'Student Society' },
  lead: { type: String, required: true },
  members: { type: String, default: '50+ Members' },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  activities: { type: String, default: '' }
}, { timestamps: true });

// Downloadable Documents / Syllabi
const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'Syllabus' },
  fileSize: { type: String, default: '1.2 MB PDF' },
  fileUrl: { type: String, default: '#' },
  academicYear: { type: String, default: '2082/2083' },
  description: { type: String, default: '' }
}, { timestamps: true });

// Examinations & NEB Schedules
const examinationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  examDate: { type: String, required: true },
  status: { type: String, default: 'Routine Published' },
  center: { type: String, default: 'Center 104 (Khwopa)' },
  gradeLevel: { type: String, default: 'Grade 12' },
  routineImage: { type: String, default: '' },
  description: { type: String, default: '' }
}, { timestamps: true });

// Newsletter Subscribers
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active'
  },
  source: {
    type: String,
    default: 'website-footer'
  }
}, { timestamps: true });

export const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);
export const Event = mongoose.model('Event', eventSchema);
export const Research = mongoose.model('Research', researchSchema);
export const Facility = mongoose.model('Facility', facilitySchema);
export const Club = mongoose.model('Club', clubSchema);
export const DownloadDocument = mongoose.model('DownloadDocument', documentSchema);
export const Examination = mongoose.model('Examination', examinationSchema);
export const Subscriber = mongoose.model('Subscriber', subscriberSchema);


