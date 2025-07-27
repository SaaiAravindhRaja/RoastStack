const express = require('express');
const aiService = require('../services/aiService');

const router = express.Router();

/**
 * POST /api/roast
 * Generate a roast for the provided tech stack
 */
router.post('/roast', async (req, res) => {
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

/**
 * GET /api/roast/modes
 * Get available roast modes
 */
router.get('/roast/modes', (req, res) => {
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

module.exports = router;