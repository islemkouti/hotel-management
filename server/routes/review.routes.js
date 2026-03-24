import { Router } from 'express';
import {
  getHotelReviews,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
  markHelpful,
} from '../controllers/review.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { reviewValidation, idValidation } from '../middleware/validation.middleware.js';

const router = Router();

// Public routes
router.get('/hotel/:hotelId', getHotelReviews);

// Protected routes
router.get('/my-reviews', protect, getMyReviews);
router.post('/', protect, reviewValidation, createReview);
router.put('/:id', protect, idValidation, updateReview);
router.delete('/:id', protect, idValidation, deleteReview);
router.post('/:id/helpful', protect, idValidation, markHelpful);

export default router;
