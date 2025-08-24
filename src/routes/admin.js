const express = require('express');
const router = express.Router();

// Admin dashboard - Main page
router.get('/', (req, res) => {
  res.render('admin/dashboard', {
    title: 'Admin Dashboard',
    page: 'dashboard',
    stats: {
      totalPhrases: 1,
      totalUsers: 0,
      todayRequests: 0
    }
  });
});

// Admin phrases management
router.get('/phrases', (req, res) => {
  res.render('admin/phrases', {
    title: 'Manage Phrases',
    page: 'phrases'
  });
});

// Admin users management
router.get('/users', (req, res) => {
  res.render('admin/users', {
    title: 'Manage Users',
    page: 'users'
  });
});

// Admin settings
router.get('/settings', (req, res) => {
  res.render('admin/settings', {
    title: 'Admin Settings',
    page: 'settings'
  });
});

module.exports = router;
