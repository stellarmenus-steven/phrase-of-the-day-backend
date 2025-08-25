const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    console.log('🔐 Auth middleware called for:', req.path);
    
    // Get token from cookie or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      console.log('❌ No token found, redirecting to login');
      return res.redirect('/admin/login');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified for user:', decoded.username);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ Auth middleware error:', error);
    res.clearCookie('token');
    return res.redirect('/admin/login');
  }
};

module.exports = authMiddleware;
