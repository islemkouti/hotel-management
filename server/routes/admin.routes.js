import { Router } from 'express';
import {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUserStatus,
  getAllBookings,
  updateBookingStatus,
  getGlobalCalendar,
  getReviewStats,
} from '../controllers/admin.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = Router();

// All routes require admin access
router.use(protect, adminOnly);

// Dashboard
router.get('/stats', getDashboardStats);

// Users management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id/status', updateUserStatus);

// Bookings management
router.get('/bookings', getAllBookings);
router.put('/bookings/:id/status', updateBookingStatus);

// Calendar
router.get('/calendar', getGlobalCalendar);

// Reviews
router.get('/reviews/stats', getReviewStats);

export default router;
