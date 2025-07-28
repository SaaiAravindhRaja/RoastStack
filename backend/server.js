import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import roastRoutes from './routes/roast.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(morgan('combined'));

// CORS - Allow multiple origins for deployment  
const allowedOrigins = [
  'http://localhost:3000',
  'https://roasttech.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', roastRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🔥 Welcome to Roast Stack API!',
    description: 'Ready to absolutely demolish your tech stack choices',
    endpoints: {
      health: '/health',
      roast: 'POST /api/roast',
      modes: 'GET /api/modes'
    },
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Roast Stack API is ready to destroy your tech choices! 🔥',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found', 
    message: 'This endpoint is as missing as good practices in your codebase 💀' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: 'Something went wrong! Even our error handling is better than your tech stack 😅' 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 Roast Stack API is running on port ${PORT}`);
  console.log(`🎯 Ready to absolutely demolish some tech stacks!`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});