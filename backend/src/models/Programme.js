import mongoose from 'mongoose';

const programmeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  code: { type: String, default: '+2' },
  facultyStream: {
    type: String,
    enum: ['Science', 'Management', 'Humanities & Law', 'Humanities', 'Law'],
    required: true,
    index: true
  },
  duration: { type: String, default: '2 Years (Grades 11 & 12)' },
  affiliatedBody: { type: String, default: 'National Examinations Board (NEB)' },
  overview: { type: String, required: true },
  description: { type: String, default: '' },
  eligibility: { type: String, default: '' },
  image: { type: String, default: '' },
  subjects: [{ type: String }],
  curriculum: [
    {
      grade: { type: String, enum: ['Grade 11', 'Grade 12'] },
      compulsory: [{ type: String }],
      optional: [{ type: String }]
    }
  ],
  labs: [
    {
      title: { type: String },
      image: { type: String },
      equipment: [{ type: String }],
      description: { type: String }
    }
  ],
  isPublished: { type: Boolean, default: true, index: true }
}, {
  timestamps: true
});

export const Programme = mongoose.model('Programme', programmeSchema);

