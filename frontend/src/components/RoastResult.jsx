const RoastResult = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Preparing Your Roast...</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
        <div className="text-center mt-6">
          <span className="text-2xl animate-bounce">🔥</span>
          <p className="text-sm text-gray-500 mt-2">Our AI is cooking up something spicy...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-6xl mb-4">🍳</div>
        <h3 className="text-lg font-semibold mb-2">Ready to Get Roasted?</h3>
        <p className="text-gray-600">
          Choose your roast level, enter your tech stack, and prepare for some brutal honesty! 
        </p>
      </div>
    )
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-red-600'
    if (score >= 60) return 'text-orange-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getScoreEmoji = (score) => {
    if (score >= 80) return '💀'
    if (score >= 60) return '🔥'
    if (score >= 40) return '🌶️'
    return '👍'
  }

  const getModeInfo = (mode) => {
    const modes = {
      mild: { emoji: '🧂', name: 'Mild' },
      medium: { emoji: '🌶️', name: 'Medium' },
      savage: { emoji: '🔥', name: 'Savage' },
      grandma: { emoji: '👵', name: 'Grandma' }
    }
    return modes[mode] || modes.medium
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Your Roast Results</h3>
        {result.fallback && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            Fallback Mode
          </span>
        )}
      </div>
      
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">
          <strong>Tech Stack:</strong> {result.techStack}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <strong>Mode:</strong> {getModeInfo(result.roastMode).emoji} {getModeInfo(result.roastMode).name}
          </p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Roast Score:</span>
            <span className={`font-bold ${getScoreColor(result.roastScore)}`}>
              {result.roastScore}/100 {getScoreEmoji(result.roastScore)}
            </span>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${result.error ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'}`}>
        <div className="text-4xl mb-3 text-center">
          {result.error ? '💥' : getModeInfo(result.roastMode).emoji}
        </div>
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {result.roast}
        </p>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-orange-600 hover:text-orange-700 underline"
        >
          Try another stack 🔥
        </button>
      </div>
    </div>
  )
}

export default RoastResult
