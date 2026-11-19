import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    default: 'General Inquiry'
  },
  category: {
    type: String,
    enum: ['General', 'Admissions', 'Academic Stream', 'Examinations', 'Fee & Scholarships', 'Administration', 'Campus Tour', 'Feedback'],
    default: 'General'
  },
  message: {
    type: String,
    required: [true, 'Message content is required']
  },
  status: {
    type: String,
    enum: ['New', 'In Review', 'Replied', 'Archived'],
    default: 'New'
  },
  notes: {
    type: String,
    default: ''
  },
  ipAddress: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

contactMessageSchema.index({ fullName: 'text', email: 'text', subject: 'text', message: 'text' });
contactMessageSchema.index({ status: 1, createdAt: -1 });

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

