require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 4001;

// Security middleware with CSP configuration for admin interface
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      scriptSrcAttr: ["'unsafe-inline'"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      mediaSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration for React app
app.use(cors({
  origin: [
    'https://spanishphraseoftheday.com',  // Your production domain
    'http://localhost:5173',              // Local development
    'http://localhost:5174'               // Local development fallback
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil(parseInt(process.env.RATE_LIMIT_WINDOW_MS) / 1000 / 60)
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to API routes
app.use(process.env.API_BASE_URL || '/api/v1', apiLimiter);

// View engine setup for admin interface
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Static files for admin interface
app.use('/admin/static', express.static(path.join(__dirname, 'public')));

// Static files for uploads (audio files)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Import routes
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

// Routes
app.use(process.env.API_BASE_URL || '/api/v1', apiRoutes);
app.use(process.env.ADMIN_BASE_URL || '/admin', authRoutes); // Auth routes first
app.use(process.env.ADMIN_BASE_URL || '/admin', adminRoutes);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    const mongoose = require('mongoose');
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    const healthData = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: {
        status: dbStatus[dbState] || 'unknown',
        connected: dbState === 1,
        host: mongoose.connection.host || null,
        name: mongoose.connection.name || null,
        port: mongoose.connection.port || null
      },
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      }
    };

    // If database is not connected, change overall status
    if (dbState !== 1) {
      healthData.status = 'DEGRADED';
      healthData.database.error = 'Database connection is not established';
    }

    res.json(healthData);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      error: error.message,
      database: {
        status: 'error',
        connected: false,
        error: 'Failed to check database status'
      }
    });
  }
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found',
    path: req.originalUrl
  });
});

// 404 handler for admin routes
app.use('/admin/*', (req, res) => {
  res.status(404).render('404', { 
    title: 'Page Not Found',
    message: 'The requested admin page was not found.'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  if (req.path.startsWith('/api/')) {
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  } else {
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Something went wrong',
      error: process.env.NODE_ENV === 'development' ? err : {}
    });
  }
});

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📱 API available at http://localhost:${PORT}${process.env.API_BASE_URL || '/api/v1'}`);
      console.log(`⚙️  Admin interface at http://localhost:${PORT}${process.env.ADMIN_BASE_URL || '/admin'}`);
      console.log(`🏥 Health check at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
