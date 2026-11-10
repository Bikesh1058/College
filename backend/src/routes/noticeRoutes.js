import express from 'express';
import { getNotices, getNoticeBySlug } from '../controllers/noticeController.js';
import { createNotice, updateNotice, deleteNotice } from '../controllers/noticeAdminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getNotices);
router.get('/:slug', getNoticeBySlug);
router.post('/', protect, authorize('Super Admin', 'News Editor', 'Examination Officer'), createNotice);
router.put('/:id', protect, authorize('Super Admin', 'News Editor', 'Examination Officer'), updateNotice);
router.delete('/:id', protect, authorize('Super Admin'), deleteNotice);

export default router;
