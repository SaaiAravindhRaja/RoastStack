import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import roastRoutes from './routes/roast.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Middleware
app.use(helmet());
const accessLogStream = fs.createWriteStream(path.join(logsDir, 'server.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Roast Stack API is ready to destroy your tech choices! 🔥',
    timestamp: new Date().toISOString()
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

app.listen(PORT, () => {
  console.log(`🔥 Roast Stack API is running on port ${PORT}`);
  console.log(`🎯 Ready to absolutely demolish some tech stacks!`);
});