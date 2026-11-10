import express from 'express';
import { getPageBySlug, getAllPages, createPage, updatePage } from '../controllers/pageController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllPages);
router.get('/:slug', getPageBySlug);
router.post('/', protect, authorize('Super Admin', 'Principal / Approver'), createPage);
router.put('/:slug', protect, authorize('Super Admin', 'Principal / Approver'), updatePage);

export default router;

