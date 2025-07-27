const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Import AI service
const aiService = require('./services/aiService');

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

// Roast endpoint
app.post('/api/roast', async (req, res) => {
  try {
    const { tech_stack, roast_mode = 'medium' } = req.body;
    
    // Validation
    if (!tech_stack || typeof tech_stack !== 'string') {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'tech_stack is required and must be a string'
      });
    }
    
    if (tech_stack.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'tech_stack cannot be empty'
      });
    }
    
    if (tech_stack.length > 500) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'tech_stack is too long (max 500 characters)'
      });
    }
    
    const validModes = ['mild', 'medium', 'savage', 'grandma'];
    if (!validModes.includes(roast_mode)) {
      return res.status(400).json({
        error: 'Invalid roast mode',
        message: `roast_mode must be one of: ${validModes.join(', ')}`
      });
    }
    
    // Generate the roast
    console.log(`🎯 Generating ${roast_mode} roast for: ${tech_stack}`);
    
    const startTime = Date.now();
    const roastResult = await aiService.generateRoast(tech_stack, roast_mode);
    const responseTime = Date.now() - startTime;
    
    console.log(`✅ Roast generated in ${responseTime}ms`);
    
    // Return the roast
    res.json({
      success: true,
      data: roastResult,
      meta: {
        responseTime,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Roast endpoint error:', error);
    
    res.status(500).json({
      error: 'Failed to generate roast',
      message: 'Our roasting engine is having issues. Even our errors are more reliable than your tech stack! 😅'
    });
  }
});

// Modes endpoint
app.get('/api/modes', (req, res) => {
  res.json({
    success: true,
    data: {
      modes: [
        {
          id: 'mild',
          name: 'Mild',
          emoji: '🧂',
          description: 'Gentle teasing with a smile'
        },
        {
          id: 'medium',
          name: 'Medium',
          emoji: '🌶️',
          description: 'Classic Gen-Z sass and sarcasm'
        },
        {
          id: 'savage',
          name: 'Savage',
          emoji: '🔥',
          description: 'Absolutely no mercy, maximum destruction'
        },
        {
          id: 'grandma',
          name: 'Grandma',
          emoji: '👵',
          description: 'Disappointed grandma developer energy'
        }
      ]
    }
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