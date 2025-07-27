import { useState } from 'react'

const TechStackForm = ({ onSubmit, loading, selectedMode }) => {
  const [techStack, setTechStack] = useState('')
  const [selectedCategories, setSelectedCategories] = useState({
    frontend: '',
    backend: '',
    database: '',
    deployment: '',
    tools: ''
  })

  const techOptions = {
    frontend: ['React', 'Vue', 'Angular', 'Svelte', 'jQuery', 'Vanilla JS', 'NextJS', 'Nuxt', 'Gatsby'],
    backend: ['Node.js', 'Python/Django', 'Python/Flask', 'Ruby on Rails', 'PHP', 'Java/Spring', 'C#/.NET', 'Go', 'Rust'],
    database: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis', 'Firebase', 'Supabase', 'DynamoDB'],
    deployment: ['Vercel', 'Netlify', 'AWS', 'Heroku', 'DigitalOcean', 'Docker', 'Kubernetes', 'Railway'],
    tools: ['Webpack', 'Vite', 'Parcel', 'ESLint', 'Prettier', 'TypeScript', 'Sass', 'Tailwind CSS']
  }

  const handleCategoryChange = (category, value) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: value
    }))
    
    // Update the tech stack string
    const newCategories = { ...selectedCategories, [category]: value }
    const stackArray = Object.entries(newCategories)
      .filter(([_, val]) => val)
      .map(([key, val]) => `${key}: ${val}`)
    
    setTechStack(stackArray.join(', '))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (techStack.trim()) {
      onSubmit(techStack)
    }
  }

  const getModeEmoji = () => {
    const emojis = {
      mild: '🧂',
      medium: '🌶️',
      savage: '🔥',
      grandma: '👵'
    }
    return emojis[selectedMode] || '🌶️'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Build Your Tech Stack</h3>
      
      <div className="space-y-4 mb-6">
        {Object.entries(techOptions).map(([category, options]) => (
          <div key={category}>
            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {category}
            </label>
            <select
              value={selectedCategories[category]}
              onChange={(e) => handleCategoryChange(category, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select {category}...</option>
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or describe your stack manually:
        </label>
        <textarea
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          placeholder="e.g., React, Node.js, MongoDB, AWS, TypeScript..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          rows={3}
          maxLength={500}
        />
        <p className="text-xs text-gray-500 mt-1">
          {techStack.length}/500 characters
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!techStack.trim() || loading}
        className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-200 ${
          !techStack.trim() || loading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600 text-white transform hover:scale-105'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Roasting your stack...
          </span>
        ) : (
          `${getModeEmoji()} Roast My Stack!`
        )}
      </button>
    </div>
  )
}

export default TechStackForm
