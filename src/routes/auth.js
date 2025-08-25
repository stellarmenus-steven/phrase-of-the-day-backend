const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();

// GET /admin/login - Show login page
router.get('/login', (req, res) => {
  res.render('auth/login', { 
    title: 'Admin Login',
    error: req.query.error || null,
    success: req.query.success || null,
    layout: false // Don't use the main layout
  });
});

// POST /admin/login - Handle login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.redirect('/admin/login?error=Username and password are required');
    }

    // Find admin user
    const admin = await Admin.findOne({ username, isActive: true });
    if (!admin) {
      return res.redirect('/admin/login?error=Invalid credentials');
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.redirect('/admin/login?error=Invalid credentials');
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id, 
        username: admin.username, 
        email: admin.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Set cookie and redirect to admin dashboard
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.redirect('/admin/login?error=Login failed');
  }
});

// GET /admin/logout - Handle logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/admin/login?success=Logged out successfully');
});

module.exports = router;
