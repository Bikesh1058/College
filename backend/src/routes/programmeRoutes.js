import express from 'express';
import { getProgrammes, getProgrammeBySlug, createProgramme, updateProgramme, deleteProgramme } from '../controllers/programmeController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProgrammes);
router.get('/:slug', getProgrammeBySlug);
router.post('/', protect, authorize('Super Admin', 'Principal / Approver', 'Academic Administrator'), createProgramme);
router.put('/:id', protect, authorize('Super Admin', 'Principal / Approver', 'Academic Administrator'), updateProgramme);
router.delete('/:id', protect, authorize('Super Admin', 'Principal / Approver', 'Academic Administrator'), deleteProgramme);

export default router;

