import { Router } from 'express';
import {
  getHotels,
  getFeaturedHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelAvailability,
} from '../controllers/hotel.controller.js';
import { protect, adminOnly, optionalAuth } from '../middleware/auth.middleware.js';
import { hotelValidation, searchValidation, idValidation } from '../middleware/validation.middleware.js';

const router = Router();

// Public routes
router.get('/', searchValidation, getHotels);
router.get('/featured', getFeaturedHotels);
router.get('/:id', idValidation, getHotel);
router.get('/:id/availability', idValidation, getHotelAvailability);

// Admin routes
router.post('/', protect, adminOnly, hotelValidation, createHotel);
router.put('/:id', protect, adminOnly, idValidation, updateHotel);
router.delete('/:id', protect, adminOnly, idValidation, deleteHotel);

export default router;
