# AI Language Teacher Platform

An immersive 3D virtual classroom environment for learning Japanese with AI-powered teachers. This Next.js application combines cutting-edge technologies to create an engaging and interactive language learning experience.

## Features

### Interactive 3D Classroom Environment
- Fully immersive 3D classroom built with React Three Fiber (R3F)
- Multiple classroom layouts with seamless switching capabilities
- Dynamic camera controls for an engaging learning experience
- Realistic lighting and environment effects

### AI-Powered Teaching
- Intelligent AI tutors that adapt to your learning style
- Real-time conversation practice with natural language processing
- Customizable teaching approaches (formal/casual speech modes)
- Comprehensive feedback system with pronunciation and grammar corrections

### Personalized Learning Experience
- Toggle between Japanese and English explanations
- Furigana support for reading assistance
- Multiple teacher avatars with unique personalities
- Progress tracking and achievement system

### User Authentication & Dashboard
- Secure authentication powered by Clerk
- Personalized dashboard showing learning progress
- Achievement tracking and rewards system
- Responsive design for both desktop and mobile devices

## Technology Stack

- **Frontend Framework**: Next.js 14
- **3D Rendering**: React Three Fiber, Three.js
- **UI Components**: Tailwind CSS, shadcn/ui
- **Authentication**: Clerk
- **State Management**: Zustand
- **Animation**: React Three Drei
- **Development Tools**: ESLint, PostCSS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn package manager
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd r3f-ai-language-teacher
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add the following variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── Experience.jsx   # Main 3D classroom experience
│   ├── Teacher.jsx      # 3D teacher model and animations
│   ├── BoardSettings.jsx# Classroom settings controls
│   └── ...             # Other components
├── hooks/              # Custom React hooks
└── styles/             # Global styles and Tailwind config
```

## Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. Configuration can be found in `tailwind.config.js`. Custom theme extensions and fonts are defined here.

### 3D Models

3D models are stored in the `public/models` directory:
- `classroom_default.glb`: Default classroom environment
- `classroom_alternative.glb`: Alternative classroom layout
- `Teacher_*.glb`: Teacher character models
- `animations_*.glb`: Animation files for teacher characters

## Features in Detail

### Camera System
The application implements a sophisticated camera system with:
- Smooth transitions between different viewing positions
- Automatic focus during teacher interactions
- Touch and mouse controls for user navigation

### Teacher Animations
Teachers feature realistic animations including:
- Lip sync during speech
- Natural blinking and idle movements
- Gesture animations during explanations

### Learning Interface
The learning interface includes:
- Real-time message display
- Interactive question input
- Progress tracking
- Settings for language preferences

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js and React Three Fiber communities
- Clerk authentication team
- Contributors to the shadcn/ui component library
