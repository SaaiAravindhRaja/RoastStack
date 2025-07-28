import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../App'
const RoastModeSelector = ({ selectedMode, onModeChange }) => {
  const [modes, setModes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchModes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/modes`)
        const data = await response.json()
        if (data.success) {
          setModes(data.data.modes)
        }
      } catch (error) {
        console.error('Failed to fetch modes:', error)
        // Manually set modes
        setModes([
          { id: 'mild', name: 'Mild', emoji: '🧂', description: 'Gentle teasing with a smile' },
          { id: 'medium', name: 'Medium', emoji: '🌶️', description: 'Classic Gen-Z sass and sarcasm' },
          { id: 'savage', name: 'Savage', emoji: '🔥', description: 'Absolutely no mercy, maximum destruction' },
          { id: 'grandma', name: 'Grandma', emoji: '👵', description: 'Disappointed grandma developer energy' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchModes()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Choose Your Roast Level</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Choose Your Roast Level</h3>
      <div className="space-y-3">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedMode === mode.id
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg mr-2">{mode.emoji}</span>
                <span className="font-medium">{mode.name}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1 ml-6">
              {mode.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RoastModeSelector
