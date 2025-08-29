const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateTokens, verifyRefreshToken } = require('../utils/jwt');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Signup validation rules (only for commuters) - Remove role validation
const signupValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Municipality user creation validation (admin only)
const createMunicipalityUserValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').notEmpty().withMessage('Phone number is required for municipality users'),
  body('department').notEmpty().withMessage('Department is required for municipality users')
];

// Login validation rules
const loginValidation = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
];

// Public Signup (only for commuters)
router.post('/signup', signupValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create commuter user only - role is hardcoded to 'commuter'
    const user = new User({
      name,
      email,
      password,
      role: 'commuter' // Always set to commuter for public signup
    });
    
    await user.save();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Remove cookie setting - just return tokens
    res.status(201).json({
      message: 'Commuter account created successfully',
      user,
      accessToken,
      refreshToken // Send refresh token in response body
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin-only route to create municipality users
router.post('/admin/create-municipality-user', 
  authenticate, 
  authorize('admin'), 
  createMunicipalityUserValidation, 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, phone, department } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }

      // Create municipality user
      const user = new User({
        name,
        email,
        password,
        role: 'municipality',
        phone,
        department,
        createdBy: req.user._id
      });

      await user.save();

      res.status(201).json({
        message: 'Municipality user created successfully',
        user
      });

    } catch (error) {
      console.error('Create municipality user error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Get all municipality users (admin only)
router.get('/admin/municipality-users', authenticate, authorize('admin'), async (req, res) => {
  try {
    const municipalityUsers = await User.find({ role: 'municipality' })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({ users: municipalityUsers });
  } catch (error) {
    console.error('Get municipality users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update municipality user status (admin only)
router.patch('/admin/municipality-users/:userId/status', 
  authenticate, 
  authorize('admin'), 
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { isActive } = req.body;

      const user = await User.findById(userId);
      if (!user || user.role !== 'municipality') {
        return res.status(404).json({ error: 'Municipality user not found' });
      }

      user.isActive = isActive;
      await user.save();

      res.json({ 
        message: `Municipality user ${isActive ? 'activated' : 'deactivated'} successfully`,
        user 
      });
    } catch (error) {
      console.error('Update municipality user status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Get all users (admin only) - add this route
router.get('/admin/all-users', authenticate, authorize('admin'), async (req, res) => {
  try {
    const allUsers = await User.find({ role: { $ne: 'admin' } }) // Exclude admin users
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({ users: allUsers });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update any user status (admin only) - modify existing route to handle all users
router.patch('/admin/users/:userId/status', 
  authenticate, 
  authorize('admin'), 
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { isActive } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Prevent admin from deactivating themselves
      if (user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({ error: 'Cannot modify your own account status' });
      }

      // Prevent modifying other admin accounts
      if (user.role === 'admin') {
        return res.status(400).json({ error: 'Cannot modify admin accounts' });
      }

      user.isActive = isActive;
      await user.save();

      res.json({ 
        message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
        user 
      });
    } catch (error) {
      console.error('Update user status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Login (for all users)
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user and check password
    const user = await User.findOne({ email });
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid credentials or account inactive' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Remove cookie setting - just return tokens
    res.json({
      message: 'Login successful',
      user,
      accessToken,
      refreshToken // Send refresh token in response body
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update refresh token endpoint
router.post('/refresh', async (req, res) => {
  try {
    // Get refresh token from request body instead of cookies
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token required' });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

    // Return new tokens in response body
    res.json({ 
      accessToken,
      refreshToken: newRefreshToken
    });

  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Logout - simplified since no cookies
router.post('/logout', (req, res) => {
  // No cookie clearing needed
  res.json({ message: 'Logged out successfully' });
});

// Get current user
router.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;