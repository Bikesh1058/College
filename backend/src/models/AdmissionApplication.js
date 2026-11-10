import mongoose from 'mongoose';

const admissionApplicationSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  // Student Personal Details
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  dobBS: {
    type: String,
    default: ''
  },
  dobAD: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Male'
  },
  bloodGroup: {
    type: String,
    default: ''
  },

  // Academic Stream Preference
  stream: {
    type: String,
    required: true
  },
  streamName: {
    type: String,
    required: true
  },

  // Previous Academic (SEE) Details
  seeSchool: {
    type: String,
    required: true
  },
  seeSchoolType: {
    type: String,
    enum: ['Government/Community', 'Private/Institutional'],
    default: 'Private/Institutional'
  },
  seeSymbolNo: {
    type: String,
    required: true
  },
  seeGpa: {
    type: Number,
    required: true
  },
  seePassedYear: {
    type: String,
    default: '2081/2082'
  },

  // Parent / Guardian Details
  fatherName: {
    type: String,
    required: true
  },
  fatherMobile: {
    type: String,
    default: ''
  },
  fatherOccupation: {
    type: String,
    default: ''
  },
  motherName: {
    type: String,
    default: ''
  },
  motherMobile: {
    type: String,
    default: ''
  },

  // Address
  province: {
    type: String,
    default: 'Bagmati Province'
  },
  district: {
    type: String,
    default: 'Bhaktapur'
  },
  municipality: {
    type: String,
    default: 'Bhaktapur Municipality'
  },
  wardNo: {
    type: String,
    default: '1'
  },
  tole: {
    type: String,
    default: ''
  },

  // Uploaded Documents
  photoUrl: {
    type: String,
    default: ''
  },
  marksheetUrl: {
    type: String,
    default: ''
  },
  marksheetFileName: {
    type: String,
    default: ''
  },

  // Status & Communications
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Verified', 'Entrance Eligible', 'Accepted', 'Rejected'],
    default: 'Submitted',
    index: true
  },
  adminRemarks: {
    type: String,
    default: ''
  },
  emailLogs: [
    {
      subject: { type: String, required: true },
      message: { type: String, required: true },
      sentBy: { type: String, default: 'Admissions Office' },
      sentAt: { type: Date, default: Date.now },
      status: { type: String, default: 'Sent' }
    }
  ]
}, { timestamps: true });

export const AdmissionApplication = mongoose.model('AdmissionApplication', admissionApplicationSchema);

