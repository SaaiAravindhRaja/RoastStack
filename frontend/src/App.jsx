import { useState } from 'react'
import TechStackForm from './components/TechStackForm'
import RoastModeSelector from './components/RoastModeSelector'
import RoastResult from './components/RoastResult'
import Header from './components/Header'

// Use VITE_ prefix for environment variables and provide your backend URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://roaststack-gogd.onrender.com/api';

function App() {
  const [roastResult, setRoastResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedMode, setSelectedMode] = useState('medium')

  const handleRoast = async (techStack) => {
    setLoading(true)
    setRoastResult(null)
    
    try {
      const response = await fetch(`${API_BASE_URL}/roast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tech_stack: techStack,
          roast_mode: selectedMode
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setRoastResult(data.data)
      } else {
        throw new Error(data.message || 'Failed to generate roast')
      }
    } catch (error) {
      console.error('Error:', error)
      setRoastResult({
        roast: "Oops! Even our roasting engine couldn't handle your stack. That's... concerning. 💀",
        roastScore: 100,
        roastMode: selectedMode,
        techStack: techStack,
        error: true
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <RoastModeSelector 
                selectedMode={selectedMode}
                onModeChange={setSelectedMode}
              />
              <TechStackForm 
                onSubmit={handleRoast}
                loading={loading}
                selectedMode={selectedMode}
              />
            </div>
            
            <div>
              <RoastResult 
                result={roastResult}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
