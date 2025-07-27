import React, { useState, useEffect } from 'react';
import RoastForm from './components/RoastForm';
import RoastResult from './components/RoastResult';
import Header from './components/Header';
import Footer from './components/Footer';
import { RoastResponse, RoastMode } from './types/roast';
import './App.css';

function App() {
  const [roastResult, setRoastResult] = useState<RoastResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved roast from localStorage on component mount
  useEffect(() => {
    const savedRoast = localStorage.getItem('lastRoast');
    if (savedRoast) {
      try {
        setRoastResult(JSON.parse(savedRoast));
      } catch (e) {
        console.error('Failed to parse saved roast:', e);
        localStorage.removeItem('lastRoast');
      }
    }
  }, []);

  const handleRoastSubmit = async (techStack: string, roastMode: RoastMode) => {
    setIsLoading(true);
    setError(null);
    setRoastResult(null);

    try {
      const response = await fetch('http://localhost:3001/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tech_stack: techStack,
          roast_mode: roastMode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate roast');
      }

      const data = await response.json();
      const roastResponse: RoastResponse = data.data;
      
      setRoastResult(roastResponse);
      
      // Save to localStorage
      localStorage.setItem('lastRoast', JSON.stringify(roastResponse));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      console.error('Roast generation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewRoast = () => {
    setRoastResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <main className="max-w-4xl mx-auto">
          {!roastResult && !isLoading && (
            <RoastForm 
              onSubmit={handleRoastSubmit}
              isLoading={isLoading}
              error={error}
            />
          )}
          
          {isLoading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4"></div>
              <p className="text-white text-xl font-medium">
                🔥 Preparing your roast... This is gonna be good! 
              </p>
              <p className="text-purple-200 mt-2">
                Our AI is crafting the perfect insults for your tech choices
              </p>
            </div>
          )}
          
          {roastResult && (
            <RoastResult 
              roast={roastResult}
              onNewRoast={handleNewRoast}
            />
          )}
          
          {error && !isLoading && (
            <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-100 px-6 py-4 rounded-lg text-center max-w-2xl mx-auto">
              <h3 className="font-bold text-lg mb-2">Oops! 💀</h3>
              <p>{error}</p>
              <button 
                onClick={handleNewRoast}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
