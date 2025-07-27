const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const roastRoutes = require('./routes/roast');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'server.log'), { flags: 'a' });
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