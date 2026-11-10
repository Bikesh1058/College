import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// Route imports
import pageRoutes from './routes/pageRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import programmeRoutes from './routes/programmeRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import admissionRoutes from './routes/admissionRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_URL || 'http://localhost:5173';

// Initialize Socket.IO Server
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  }
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log(`[Socket.IO] Client connected: ${socket.id}`);
  socket.emit('cms:welcome', {
    status: 'connected',
    timestamp: new Date().toISOString()
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
  });
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Real-Time Broadcast Middleware for all CMS Mutations
app.use((req, res, next) => {
  res.on('finish', () => {
    const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
    const isSuccess = res.statusCode >= 200 && res.statusCode < 300;
    const isAuthEndpoint = req.originalUrl.includes('/auth/login');

    if (isMutation && isSuccess && !isAuthEndpoint) {
      io.emit('cms:update', {
        url: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString()
      });
    }
  });
  next();
});

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Khwopa College MERN CMS Backend',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/pages', pageRoutes);
app.use('/api/v1/faculty', facultyRoutes);
app.use('/api/v1/programmes', programmeRoutes);
app.use('/api/v1/notices', noticeRoutes);
app.use('/api/v1/admin/dashboard', dashboardRoutes);
app.use('/api/v1/content', contentRoutes);
app.use('/api/v1/settings', settingRoutes);
app.use('/api/v1/admissions', admissionRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[MERN Error]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

httpServer.listen(PORT, () => {
  console.log(`[Khwopa MERN + Socket.IO Server running on port ${PORT}]`);
});

