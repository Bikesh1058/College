import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
  id: { type: String, unique: true, index: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  roleCategory: {
    type: String,
    enum: ['Chairman', 'Principal', 'Vice Principal', 'HOD', 'Teaching Faculty'],
    default: 'Teaching Faculty',
    index: true
  },
  facultyStream: {
    type: String,
    enum: ['Science', 'Management', 'Humanities & Law', 'Governance'],
    default: 'Science',
    index: true
  },
  subject: { type: String, required: true, index: true },
  department: { type: String, required: true },
  qualification: { type: String, default: '' },
  image: { type: String, default: null },
  order: { type: Number, default: 100 }
}, {
  timestamps: true
});

facultySchema.index({ name: 'text', subject: 'text', department: 'text' });

export const Faculty = mongoose.model('Faculty', facultySchema);

