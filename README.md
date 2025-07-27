# 🔥 Roast Stack

A sassy Gen-Z AI that absolutely destroys your tech stack choices with surgical precision and zero chill.

## What is this?

Ever wondered if your tech stack is actually trash? Wonder no more! Roast Stack uses AI to deliver brutally honest (and hilarious) roasts of your technology choices. From your basic LAMP stack to your over-engineered microservices nightmare, nothing is safe.

## Features

- 🔥 **Multiple Roast Modes**: From mild seasoning to nuclear devastation
- ⚡ **Lightning Fast**: Because waiting for roasts is almost as painful as your tech choices
- 📱 **Responsive Design**: Looks good on all devices (unlike your code)
- 🎯 **AI-Powered**: Uses Gemini API for maximum sass
- 💾 **Persistent Roasts**: Your shame is saved in localStorage

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn
- A sense of humor about your tech choices

### Installation

1. Clone this repository
```bash
git clone <your-repo-url>
cd roast-stack
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables
```bash
cd ../backend
cp .env.example .env
# Add your Gemini API key to .env
```

5. Start the development servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Project Structure

```
roast-stack/
├── frontend/          # React app
├── backend/           # Express.js API
├── README.md
└── .gitignore
```

## API Endpoints

- `POST /api/roast` - Submit your tech stack for roasting

## Contributing

Found a bug? Your debugging skills are probably as questionable as your framework choices, but PRs are welcome anyway! 😄

## License

MIT - Because even bad code deserves freedom