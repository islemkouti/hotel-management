import { Router } from 'express';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  getRecentlyViewed,
  addRecentlyViewed,
  getDashboardStats,
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// All routes are protected
router.use(protect);

// Favorites
router.get('/favorites', getFavorites);
router.post('/favorites/:hotelId', addFavorite);
router.delete('/favorites/:hotelId', removeFavorite);

// Recently viewed
router.get('/recently-viewed', getRecentlyViewed);
router.post('/recently-viewed/:hotelId', addRecentlyViewed);

// Dashboard
router.get('/dashboard-stats', getDashboardStats);

export default router;
