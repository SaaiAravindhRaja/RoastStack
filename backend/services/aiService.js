const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Generate roast prompts based on intensity level
   */
  getRoastPrompt(techStack, roastMode = 'medium') {
    const basePrompt = `You are a Gen-Z tech influencer with zero chill and maximum sass. Your job is to absolutely roast this tech stack: "${techStack}".`;
    
    const modePrompts = {
      mild: `${basePrompt} Be playfully sarcastic but keep it light and fun. Use some emojis and gentle teasing. Think "friendly roast at a coffee shop" vibes. Keep it under 150 words.`,
      
      medium: `${basePrompt} Go full Gen-Z mode with the roast. Use internet slang, be sarcastic, and don't hold back on the tech jokes. Call out outdated choices, over-engineering, or basic picks. Use emojis and make it spicy but not mean. Think "roasting your friend's playlist" energy. Keep it under 200 words.`,
      
      savage: `${basePrompt} ABSOLUTELY DEMOLISH this tech stack with zero mercy. Use all the Gen-Z slang, call out every questionable choice, roast their life decisions, and be brutally honest about why their stack is trash. Go nuclear but keep it clever and funny, not just mean. Think "Twitter ratio energy" but educational. Use emojis liberally. Keep it under 250 words.`,
      
      grandma: `${basePrompt} Roast this tech stack like a disappointed grandma who somehow became a senior developer. Use phrases like "back in my day," be passive-aggressive about modern frameworks, and act confused by new technologies while secretly being savage. Mix wholesome grandma energy with brutal technical criticism. Keep it under 200 words.`
    };

    return modePrompts[roastMode] || modePrompts.medium;
  }

  /**
   * Generate a roast score based on the tech stack
   */
  generateRoastScore(techStack) {
    // Simple scoring algorithm based on tech choices
    const stack = techStack.toLowerCase();
    let score = 50; // Base score
    
    // Boost score for controversial/outdated choices
    if (stack.includes('php')) score += 15;
    if (stack.includes('jquery')) score += 20;
    if (stack.includes('internet explorer')) score += 30;
    if (stack.includes('flash')) score += 35;
    if (stack.includes('perl')) score += 10;
    
    // Boost for over-engineering
    if (stack.includes('microservices') && stack.includes('kubernetes')) score += 15;
    if (stack.split(',').length > 8) score += 10; // Too many technologies
    
    // Reduce score for modern, solid choices
    if (stack.includes('typescript')) score -= 5;
    if (stack.includes('react') || stack.includes('vue') || stack.includes('svelte')) score -= 5;
    if (stack.includes('postgresql')) score -= 5;
    
    // Keep score in reasonable range
    return Math.max(10, Math.min(100, score));
  }

  /**
   * Generate a roast using Gemini AI
   */
  async generateRoast(techStack, roastMode = 'medium') {
    try {
      const prompt = this.getRoastPrompt(techStack, roastMode);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const roastText = response.text();
      
      const roastScore = this.generateRoastScore(techStack);
      
      return {
        roast: roastText.trim(),
        roastScore,
        roastMode,
        techStack
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Fallback roasts if AI fails
      const fallbackRoasts = {
        mild: `Your tech stack "${techStack}" is like a participation trophy - technically functional but nobody's impressed 😅`,
        medium: `"${techStack}" - I see you chose the "I learned this from a 2019 YouTube tutorial" starter pack 💀 At least you're consistent in your questionable choices!`,
        savage: `BESTIE NO 💀 "${techStack}" is giving "I copy-pasted from Stack Overflow and called it architecture" energy. This stack is more outdated than my grandma's flip phone. Please touch some grass and maybe a modern framework while you're at it 🔥`,
        grandma: `Oh honey, "${techStack}"? Back in my day we called this "making do with what we had." Bless your heart for trying, but maybe it's time to learn something from this decade? 👵💅`
      };
      
      return {
        roast: fallbackRoasts[roastMode] || fallbackRoasts.medium,
        roastScore: this.generateRoastScore(techStack),
        roastMode,
        techStack,
        fallback: true
      };
    }
  }
}

module.exports = new AIService();