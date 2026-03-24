import { body, param, query, validationResult } from 'express-validator';

// Handle validation errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// Auth validations
export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  validate,
];

export const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

// Hotel validations
export const hotelValidation = [
  body('name').trim().notEmpty().withMessage('Hotel name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('pricePerNight').isNumeric().withMessage('Price per night must be a number'),
  validate,
];

// Room validations
export const roomValidation = [
  body('name').trim().notEmpty().withMessage('Room name is required'),
  body('type').trim().notEmpty().withMessage('Room type is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('hotelId').notEmpty().withMessage('Hotel ID is required'),
  validate,
];

// Booking validations
export const bookingValidation = [
  body('roomId').notEmpty().withMessage('Room ID is required'),
  body('checkIn').isISO8601().withMessage('Valid check-in date is required'),
  body('checkOut').isISO8601().withMessage('Valid check-out date is required'),
  body('guests').isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
  validate,
];

// Review validations
export const reviewValidation = [
  body('hotelId').notEmpty().withMessage('Hotel ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required'),
  validate,
];

// Search validations
export const searchValidation = [
  query('location').optional().trim(),
  query('checkIn').optional().isISO8601().withMessage('Valid check-in date required'),
  query('checkOut').optional().isISO8601().withMessage('Valid check-out date required'),
  query('guests').optional().isInt({ min: 1 }).withMessage('Guests must be at least 1'),
  query('rooms').optional().isInt({ min: 1 }).withMessage('Rooms must be at least 1'),
  query('minPrice').optional().isNumeric().withMessage('Min price must be a number'),
  query('maxPrice').optional().isNumeric().withMessage('Max price must be a number'),
  validate,
];

// ID param validation
export const idValidation = [
  param('id').notEmpty().withMessage('ID is required'),
  validate,
];
