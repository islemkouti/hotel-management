import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // TODO: Add MongoDB connection string
  // mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/hotel-reservation',
  
  // TODO: Add email configuration for notifications
  // emailHost: process.env.EMAIL_HOST,
  // emailPort: process.env.EMAIL_PORT,
  // emailUser: process.env.EMAIL_USER,
  // emailPass: process.env.EMAIL_PASS,
};
