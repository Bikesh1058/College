import express from 'express';
import {
  submitContactMessage,
  getContactMessages,
  updateContactStatus,
  replyContactMessage,
  deleteContactMessage
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public contact submission
router.post('/', submitContactMessage);

// Protected Admin inquiries management
router.get('/', protect, authorize('Super Admin', 'Principal / Approver', 'Academic Administrator', 'News Editor', 'Campus Life Editor', 'Research Editor', 'Admission Officer', 'Examination Officer'), getContactMessages);
router.put('/:id/status', protect, authorize('Super Admin', 'Principal / Approver', 'Academic Administrator', 'Admission Officer'), updateContactStatus);
router.post('/:id/reply', protect, authorize('Super Admin', 'Principal / Approver', 'Academic Administrator', 'Admission Officer'), replyContactMessage);
router.delete('/:id', protect, authorize('Super Admin', 'Principal / Approver'), deleteContactMessage);

export default router;

