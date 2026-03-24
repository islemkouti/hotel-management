import { Router } from 'express';
import {
  createBooking,
  getMyBookings,
  getBooking,
  updateBooking,
  cancelBooking,
  processPayment,
  getBookingStats,
} from '../controllers/booking.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { bookingValidation, idValidation } from '../middleware/validation.middleware.js';

const router = Router();

// All routes are protected
router.use(protect);

router.post('/', bookingValidation, createBooking);
router.get('/', getMyBookings);
router.get('/stats', getBookingStats);
router.get('/:id', idValidation, getBooking);
router.put('/:id', idValidation, updateBooking);
router.put('/:id/cancel', idValidation, cancelBooking);
router.post('/:id/pay', idValidation, processPayment);

export default router;
