import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-16 text-purple-300">
      <div className="border-t border-purple-400 border-opacity-30 pt-8">
        <p className="text-sm mb-2">
          Made with 💜 and a concerning amount of caffeine
        </p>
        <p className="text-xs opacity-75">
          Roast Stack © 2024 - Destroying developer egos since today
        </p>
        <div className="mt-4 text-xs">
          <span className="inline-block mx-2">🔥 Powered by Gemini AI</span>
          <span className="inline-block mx-2">⚛️ Built with React</span>
          <span className="inline-block mx-2">🎨 Styled with Tailwind</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;