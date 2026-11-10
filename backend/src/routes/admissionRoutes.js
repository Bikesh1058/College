import express from 'express';
import {
  submitApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  sendApplicantEmail
} from '../controllers/admissionController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route for students submitting admission form
router.post('/apply', submitApplication);

// Protected routes for college administrators
router.get('/applications', protect, authorize('Super Admin', 'Principal / Approver', 'Admission Officer'), getApplications);
router.get('/applications/:id', protect, authorize('Super Admin', 'Principal / Approver', 'Admission Officer'), getApplicationById);
router.put('/applications/:id/status', protect, authorize('Super Admin', 'Principal / Approver', 'Admission Officer'), updateApplicationStatus);
router.post('/applications/:id/send-email', protect, authorize('Super Admin', 'Principal / Approver', 'Admission Officer'), sendApplicantEmail);

export default router;

