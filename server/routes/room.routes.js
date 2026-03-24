import { Router } from 'express';
import {
  getRoomsByHotel,
  getRoom,
  checkRoomAvailability,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/room.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { roomValidation, idValidation } from '../middleware/validation.middleware.js';

const router = Router();

// Public routes
router.get('/hotel/:hotelId', getRoomsByHotel);
router.get('/:id', idValidation, getRoom);
router.get('/:id/availability', idValidation, checkRoomAvailability);

// Admin routes
router.post('/', protect, adminOnly, roomValidation, createRoom);
router.put('/:id', protect, adminOnly, idValidation, updateRoom);
router.delete('/:id', protect, adminOnly, idValidation, deleteRoom);

export default router;
