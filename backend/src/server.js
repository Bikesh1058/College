import http from 'http';
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
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Allowed frontend origins
const allowedOrigins = [
  process.env.CLIENT_URL?.replace(/\/+$/, ""),
  "https://college-omega-roan.vercel.app",
  "http://localhost:5173"
].filter(Boolean);

// Allow preview deployments belonging to your Vercel project
const vercelPreviewOrigin =
  /^https:\/\/college-[a-z0-9-]+-bikesh1058s-projects\.vercel\.app$/i;

const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      vercelPreviewOrigin.test(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
};

// Express CORS
app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Initialize Socket.IO Server
const io = new Server(server, {
  cors: corsOptions
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

// Health & Root Status
app.get(['/', '/api', '/api/health', '/health'], (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'Khwopa College MERN CMS Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes mounted on /api/v1, /api, and root prefix for complete frontend compatibility
const mountApiRoutes = (prefix = '') => {
  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/pages`, pageRoutes);
  app.use(`${prefix}/faculty`, facultyRoutes);
  app.use(`${prefix}/programmes`, programmeRoutes);
  app.use(`${prefix}/notices`, noticeRoutes);
  app.use(`${prefix}/admin/dashboard`, dashboardRoutes);
  app.use(`${prefix}/content`, contentRoutes);
  app.use(`${prefix}/settings`, settingRoutes);
  app.use(`${prefix}/admissions`, admissionRoutes);
  app.use(`${prefix}/contact`, contactRoutes);
};

mountApiRoutes('/api/v1');
mountApiRoutes('/api');
mountApiRoutes('');

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

const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Khwopa MERN + Socket.IO Server running on port ${PORT}`);
});
