import express from 'express';
import { getFacultyList, createFaculty, updateFaculty, deleteFaculty } from '../controllers/facultyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getFacultyList);
router.post('/', protect, authorize('Super Admin', 'Faculty Coordinator'), createFaculty);
router.put('/:id', protect, authorize('Super Admin', 'Faculty Coordinator'), updateFaculty);
router.delete('/:id', protect, authorize('Super Admin'), deleteFaculty);

export default router;

