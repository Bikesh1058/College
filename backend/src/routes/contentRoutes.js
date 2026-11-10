import express from 'express';
import {
  getNews, createNews, deleteNews,
  getEvents, createEvent,
  getResearch, createResearch, updateResearch, deleteResearch,
  getFacilities, createFacility, updateFacility, deleteFacility,
  getClubs, createClub, updateClub, deleteClub,
  getDocuments, createDocument, updateDocument, deleteDocument,
  getExaminations, createExamination, updateExamination, deleteExamination,
  getUsers, createUser, deleteUser,
  subscribeNewsletter, getSubscribers
} from '../controllers/contentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// News
router.get('/news', getNews);
router.post('/news', protect, authorize('Super Admin', 'News Editor'), createNews);
router.delete('/news/:id', protect, authorize('Super Admin', 'News Editor'), deleteNews);

// Events
router.get('/events', getEvents);
router.post('/events', protect, authorize('Super Admin', 'Campus Life Editor'), createEvent);

// Research
router.get('/research', getResearch);
router.post('/research', protect, authorize('Super Admin', 'Research Editor'), createResearch);
router.put('/research/:id', protect, authorize('Super Admin', 'Research Editor'), updateResearch);
router.delete('/research/:id', protect, authorize('Super Admin', 'Research Editor'), deleteResearch);

// Facilities
router.get('/facilities', getFacilities);
router.post('/facilities', protect, authorize('Super Admin'), createFacility);
router.put('/facilities/:id', protect, authorize('Super Admin'), updateFacility);
router.delete('/facilities/:id', protect, authorize('Super Admin'), deleteFacility);

// Clubs
router.get('/clubs', getClubs);
router.post('/clubs', protect, authorize('Super Admin'), createClub);
router.put('/clubs/:id', protect, authorize('Super Admin'), updateClub);
router.delete('/clubs/:id', protect, authorize('Super Admin'), deleteClub);

// Documents
router.get('/documents', getDocuments);
router.post('/documents', protect, authorize('Super Admin'), createDocument);
router.put('/documents/:id', protect, authorize('Super Admin'), updateDocument);
router.delete('/documents/:id', protect, authorize('Super Admin'), deleteDocument);

// Examinations
router.get('/examinations', getExaminations);
router.post('/examinations', protect, authorize('Super Admin', 'Examination Officer'), createExamination);
router.put('/examinations/:id', protect, authorize('Super Admin', 'Examination Officer'), updateExamination);
router.delete('/examinations/:id', protect, authorize('Super Admin', 'Examination Officer'), deleteExamination);

// Team Users / RBAC
router.get('/users', protect, getUsers);
router.post('/users', protect, authorize('Super Admin'), createUser);
router.delete('/users/:id', protect, authorize('Super Admin'), deleteUser);

// Newsletter Subscribers
router.post('/newsletter/subscribe', subscribeNewsletter);
router.get('/newsletter/subscribers', protect, authorize('Super Admin', 'News Editor'), getSubscribers);

export default router;


