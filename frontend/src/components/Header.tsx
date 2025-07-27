import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="mb-6">
        <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
          🔥 Roast Stack
        </h1>
        <p className="text-xl text-purple-200 font-medium max-w-2xl mx-auto leading-relaxed">
          Get your tech stack absolutely <span className="text-orange-300 font-bold">demolished</span> by our 
          sassy Gen-Z AI. No mercy, just facts (and burns).
        </p>
      </div>
      
      <div className="flex justify-center space-x-8 text-purple-300">
        <div className="text-center">
          <div className="text-2xl mb-1">⚡</div>
          <div className="text-sm">Lightning Fast</div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">🎯</div>
          <div className="text-sm">Brutally Accurate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">😂</div>
          <div className="text-sm">Actually Funny</div>
        </div>
      </div>
    </header>
  );
};

export default Header;