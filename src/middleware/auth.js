const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.redirect('/admin/login');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.clearCookie('token');
    return res.redirect('/admin/login');
  }
};

module.exports = authMiddleware;
