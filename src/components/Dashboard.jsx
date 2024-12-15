'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { Experience } from './Experience';
import { 
  Home,
  BookOpen, 
  MessageSquare,
  Settings, 
  HelpCircle,
  Star,
  Activity,
  Volume2,
  Camera,
  Moon,
  Sun,
  Accessibility,
  Globe
} from 'lucide-react';

// Accessible sidebar button with visual and text indicators
const AccessibleSidebarButton = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center space-x-3 px-6 py-4 rounded-lg 
      transition-all duration-300 text-lg
      focus:outline-none focus:ring-2 focus:ring-white
      ${isActive 
        ? 'bg-white text-black font-medium shadow-lg' 
        : 'text-black hover:bg-white/60'
      }
    `}
    aria-label={label}
    role="menuitem"
  >
    <Icon size={24} />
    <span>{label}</span>
  </button>
);

// Learning mode selector for different interaction methods
const LearningModeSelector = ({ currentMode, onChange }) => (
  <div className="bg-white/80 p-4 rounded-xl shadow-lg">
    <h3 className="text-black font-medium mb-4">Choose Your Learning Mode</h3>
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => onChange('voice')}
        className={`flex items-center space-x-2 p-3 rounded-lg transition-all
          ${currentMode === 'voice' ? 'bg-black text-white' : 'bg-white/60 text-black hover:bg-white/80'}`}
      >
        <Volume2 size={20} />
        <span>Voice Mode</span>
      </button>
      <button
        onClick={() => onChange('sign')}
        className={`flex items-center space-x-2 p-3 rounded-lg transition-all
          ${currentMode === 'sign' ? 'bg-black text-white' : 'bg-white/60 text-black hover:bg-white/80'}`}
      >
        <Camera size={20} />
        <span>Sign Language</span>
      </button>
      <button
        onClick={() => onChange('accessibility')}
        className={`flex items-center space-x-2 p-3 rounded-lg transition-all
          ${currentMode === 'accessibility' ? 'bg-black text-white' : 'bg-white/60 text-black hover:bg-white/80'}`}
      >
        <Accessibility size={20} />
        <span>Accessibility Mode</span>
      </button>
      <button
        onClick={() => onChange('cultural')}
        className={`flex items-center space-x-2 p-3 rounded-lg transition-all
          ${currentMode === 'cultural' ? 'bg-black text-white' : 'bg-white/60 text-black hover:bg-white/80'}`}
      >
        <Globe size={20} />
        <span>Cultural Mode</span>
      </button>
    </div>
  </div>
);

export const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [show3D, setShow3D] = useState(false);
  const [learningMode, setLearningMode] = useState('voice');
  const [themeMode, setThemeMode] = useState('morning');
  const router = useRouter();
  const { user } = useUser();

  // If 3D classroom is active, render it directly
  if (show3D) {
    return <Experience />;
  }

  const renderMainContent = () => {
    switch(currentTab) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Welcome Message */}
            <div className="bg-white/80 p-6 rounded-xl shadow-lg">
              <h1 className="text-2xl font-medium text-black mb-2">
                Welcome back, {user?.firstName || 'Student'}! 👋
              </h1>
              <p className="text-gray-700">
                Let's continue your learning journey together. Choose how you'd like to learn today.
              </p>
            </div>

            {/* Learning Mode Selection */}
            <LearningModeSelector 
              currentMode={learningMode}
              onChange={setLearningMode}
            />

            {/* Quick Access Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Enter Classroom Card */}
              <button
                onClick={() => setShow3D(true)}
                className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg
                  hover:shadow-xl transition-all duration-300 text-left group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-medium text-black mb-2">
                      Enter 3D Classroom
                    </h3>
                    <p className="text-gray-700">
                      Join your interactive learning environment with your AI teacher
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg group-hover:scale-110 transition-transform">
                    <MessageSquare className="text-blue-500" size={24} />
                  </div>
                </div>
              </button>

              {/* Help & Support Card */}
              <button
                onClick={() => setCurrentTab('help')}
                className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl shadow-lg
                  hover:shadow-xl transition-all duration-300 text-left group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-medium text-black mb-2">
                      Need Help?
                    </h3>
                    <p className="text-gray-700">
                      Get assistance or adjust your learning preferences
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg group-hover:scale-110 transition-transform">
                    <HelpCircle className="text-green-500" size={24} />
                  </div>
                </div>
              </button>
            </div>

            {/* Recent Progress */}
            <div className="bg-white/80 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-medium text-black mb-4">Your Learning Journey</h2>
              <div className="space-y-4">
                <div className="bg-white/60 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Today's Progress</span>
                    <span className="text-blue-500 font-medium">20 minutes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="text-black">Loading your content...</div>;
    }
  };

  return (
    <div className={`flex h-screen ${themeMode === 'night' ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-100 to-white'}`}>
      {/* Accessible Sidebar */}
      <div className="w-72 bg-white/80 backdrop-blur-xl shadow-lg p-4">
        <div className="flex items-center space-x-3 p-4 mb-6">
          <Image
            src="/images/logo.webp"
            alt="EduMate Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-xl font-medium text-black">EduMate</span>
        </div>

        <nav className="space-y-2" role="menu">
          <AccessibleSidebarButton
            icon={Home}
            label="Home"
            isActive={currentTab === 'home'}
            onClick={() => setCurrentTab('home')}
          />
          <AccessibleSidebarButton
            icon={BookOpen}
            label="My Lessons"
            isActive={currentTab === 'lessons'}
            onClick={() => setCurrentTab('lessons')}
          />
          <AccessibleSidebarButton
            icon={Activity}
            label="Progress"
            isActive={currentTab === 'progress'}
            onClick={() => setCurrentTab('progress')}
          />
          <AccessibleSidebarButton
            icon={Star}
            label="Rewards"
            isActive={currentTab === 'rewards'}
            onClick={() => setCurrentTab('rewards')}
          />
          <AccessibleSidebarButton
            icon={HelpCircle}
            label="Help & Support"
            isActive={currentTab === 'help'}
            onClick={() => setCurrentTab('help')}
          />
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* Accessible Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm">
          <div className="flex items-center justify-end px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-black font-medium">{user?.fullName}</p>
                <p className="text-gray-600 text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10"
                  }
                }}
              />
              <button
                onClick={() => setThemeMode(themeMode === 'morning' ? 'night' : 'morning')}
                className="p-2 rounded-full transition-all"
                aria-label="Toggle theme mode"
              >
                {themeMode === 'morning' ? <Moon size={24} className="text-black" /> : <Sun size={24} className="text-yellow-500" />}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8 h-[calc(100vh-4rem)] overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};