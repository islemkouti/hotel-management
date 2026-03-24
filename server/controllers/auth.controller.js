import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/config.js';

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpire }
  );
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // TODO: Check if user already exists in database
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'User already exists with this email',
    //   });
    // }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // TODO: Create user in database
    // const user = await User.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });

    // Mock user for now
    const user = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user',
    };

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: Find user in database
    // const user = await User.findOne({ email }).select('+password');
    // if (!user) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Invalid credentials',
    //   });
    // }

    // TODO: Check password
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Invalid credentials',
    //   });
    // }

    // Mock user for development
    const user = {
      id: '1',
      name: 'Test User',
      email,
      role: email === 'admin@example.com' ? 'admin' : 'user',
    };

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    // TODO: Fetch user from database
    // const user = await User.findById(req.user.id);

    // Mock response
    res.json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // TODO: Update user in database
    // const user = await User.findByIdAndUpdate(
    //   req.user.id,
    //   { name, email, phone },
    //   { new: true, runValidators: true }
    // );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          ...req.user,
          name: name || req.user.name,
          email: email || req.user.email,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    });
  }
};

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // TODO: Verify current password and update
    // const user = await User.findById(req.user.id).select('+password');
    // const isMatch = await bcrypt.compare(currentPassword, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Current password is incorrect',
    //   });
    // }

    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(newPassword, salt);
    // await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: error.message,
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  // TODO: Invalidate token if using token blacklist
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};
