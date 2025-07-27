import React, { useState } from 'react';
import { RoastMode } from '../types/roast';

interface RoastFormProps {
  onSubmit: (techStack: string, roastMode: RoastMode) => void;
  isLoading: boolean;
  error: string | null;
}

const roastModes = [
  { id: 'mild' as RoastMode, emoji: '🧂', name: 'Mild', description: 'Gentle teasing with a smile' },
  { id: 'medium' as RoastMode, emoji: '🌶️', name: 'Medium', description: 'Classic Gen-Z sass' },
  { id: 'savage' as RoastMode, emoji: '🔥', name: 'Savage', description: 'Absolutely no mercy' },
  { id: 'grandma' as RoastMode, emoji: '👵', name: 'Grandma', description: 'Disappointed grandma energy' },
];

const RoastForm: React.FC<RoastFormProps> = ({ onSubmit, isLoading, error }) => {
  const [techStack, setTechStack] = useState('');
  const [selectedMode, setSelectedMode] = useState<RoastMode>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (techStack.trim()) {
      onSubmit(techStack.trim(), selectedMode);
    }
  };

  const exampleStacks = [
    'React, Node.js, MongoDB',
    'PHP, MySQL, jQuery',
    'Java, Spring Boot, Oracle',
    'Python, Django, PostgreSQL',
    'Vue.js, Express, Redis',
  ];

  const handleExampleClick = (example: string) => {
    setTechStack(example);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-20">
        <div className="mb-6">
          <label htmlFor="techStack" className="block text-white text-lg font-semibold mb-3">
            What's your tech stack? 🤔
          </label>
          <textarea
            id="techStack"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="e.g., React, Node.js, MongoDB, Docker, AWS..."
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-purple-200 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
            rows={3}
            maxLength={500}
            disabled={isLoading}
          />
          <div className="text-right text-purple-200 text-sm mt-1">
            {techStack.length}/500
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-white text-lg font-semibold mb-3">
            Choose your destruction level 💀
          </label>
          <div className="grid grid-cols-2 gap-3">
            {roastModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedMode(mode.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedMode === mode.id
                    ? 'border-orange-400 bg-orange-400 bg-opacity-20 text-white'
                    : 'border-white border-opacity-30 bg-white bg-opacity-10 text-purple-200 hover:border-orange-400 hover:text-white'
                }`}
                disabled={isLoading}
              >
                <div className="text-2xl mb-1">{mode.emoji}</div>
                <div className="font-semibold">{mode.name}</div>
                <div className="text-xs opacity-80">{mode.description}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!techStack.trim() || isLoading}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Preparing your roast...
            </span>
          ) : (
            '🔥 Roast My Stack!'
          )}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}
      </form>

      <div className="mt-8 text-center">
        <p className="text-purple-200 mb-4 font-medium">Need inspiration? Try these stacks:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {exampleStacks.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1 bg-white bg-opacity-20 text-purple-200 rounded-full text-sm hover:bg-opacity-30 transition-all duration-200 border border-white border-opacity-20"
              disabled={isLoading}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoastForm;