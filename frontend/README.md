# RoastStack Frontend

A React + Vite + Tailwind CSS frontend for the RoastStack API - where tech stacks go to get brutally roasted! 🔥

## Features

- **Tech Stack Builder**: Choose from popular options in categories like frontend, backend, database, deployment, and tools
- **Multiple Roast Modes**:
  - 🧂 **Mild**: Gentle teasing with a smile
  - 🌶️ **Medium**: Classic Gen-Z sass and sarcasm
  - 🔥 **Savage**: Absolutely no mercy, maximum destruction
  - 👵 **Grandma**: Disappointed grandma developer energy
- **Real-time Results**: Get your roast with a roast score out of 100
- **Clean UI**: Built with Tailwind CSS for a modern, responsive design

## Quick Start

1. Make sure the backend is running on `http://localhost:3001`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser

## Project Structure

```
src/
├── components/
│   ├── Header.jsx           # App header with title and description
│   ├── RoastModeSelector.jsx # Choose your roast intensity level
│   ├── TechStackForm.jsx     # Tech stack input form with dropdowns
│   └── RoastResult.jsx       # Display the roast results
├── App.jsx                  # Main app component
├── main.jsx                 # App entry point
└── index.css                # Tailwind CSS imports
```

## Components

### TechStackForm
- Dropdown selectors for different tech categories
- Manual text input for custom tech stacks
- Real-time preview of selected technologies
- Validates input before submission

### RoastModeSelector
- Fetches available modes from the backend API
- Visual mode selection with descriptions
- Fallback modes if API is unavailable

### RoastResult
- Displays the AI-generated roast
- Shows roast score with color coding
- Handles loading and error states
- Option to try another stack

## API Integration

The frontend communicates with the backend API at:
- `GET /api/modes` - Fetch available roast modes
- `POST /api/roast` - Submit tech stack for roasting

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ES Modules** - Modern JavaScript modules

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Development Notes

- The app is designed with small, reusable components
- Uses React hooks for state management
- Responsive design works on mobile and desktop
- Error handling for API failures with fallback content+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
