'use client';
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import Link from 'next/link';
import Image from 'next/image';
import { Camera, Mic, Gesture, Languages, Globe2, Brain, Users, Database } from 'lucide-react';
import Navigation from './Navigation';
import BackgroundVideo from './BackgroundVideo';

// Feature card component
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg transform transition-all duration-300 hover:scale-105">
    <div className="mb-4">
      <Icon className="w-8 h-8 text-purple-300" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

// Team member card component
const TeamMemberCard = ({ name, role, linkedIn, imageUrl }) => (
  <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg text-center transform transition-all duration-300 hover:scale-105">
    <img 
      src={imageUrl} 
      alt={name}
      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
    />
    <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
    <p className="text-gray-300 mb-3">{role}</p>
    <a 
      href={linkedIn}
      target="_blank"
      rel="noopener noreferrer"
      className="text-purple-300 hover:text-purple-400 transition-colors"
    >
      LinkedIn Profile →
    </a>
  </div>
);

export default function LandingPage() {
  const { isSignedIn } = useUser();

  return (
    <>
      <BackgroundVideo />
      <Navigation />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Making Education Accessible to Everyone
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              EduMate reimagines education through an AI-powered 3D avatar platform that makes quality
              learning accessible to everyone, regardless of their disabilities, cultural background, or resources.
            </p>
            <div className="flex gap-4 justify-center">
              {isSignedIn ? (
                <Link
                  href="/classroom"
                  className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  Enter Classroom
                </Link>
              ) : (
                <div className="flex gap-4">
                  <SignInButton mode="modal">
                    <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors">
                      Start Learning
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Innovative Learning Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={Languages}
                title="Multi-Modal Learning"
                description="Complete multi-modal interaction supporting sign language, voice, gestures, and text"
              />
              <FeatureCard
                icon={Globe2}
                title="Cultural Integration"
                description="Deep cultural customization with local avatars and regional context adaptation"
              />
              <FeatureCard
                icon={Database}
                title="Offline Support"
                description="Full offline functionality with resource-efficient architecture"
              />
              <FeatureCard
                icon={Brain}
                title="AI-Driven Learning"
                description="Personalized learning paths adapted to each student's needs"
              />
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="py-24 bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Our Vision</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              We believe that every child deserves access to quality education, regardless of their 
              learning disabilities or socioeconomic background. Our mission is to bridge the 
              educational gap through innovative technology and inclusive design.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-4">Underserved Communities</h3>
                <p className="text-gray-300">
                  Bringing quality education to remote and underserved areas through our 
                  offline-capable platform and culturally adaptive content.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-4">Learning Disabilities</h3>
                <p className="text-gray-300">
                  Supporting students with diverse learning needs through AI-powered 
                  personalization and multi-modal interaction methods.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-16">Our Team</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <TeamMemberCard
                name="Aakashdeep Srivastava"
                role="Founder & Lead Developer"
                linkedIn="https://www.linkedin.com/in/skydeep1/"
                imageUrl="https://media.licdn.com/dms/image/v2/D5603AQHOTtGzZoWCpQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730732025380?e=1739404800&v=beta&t=Xg9_F8i0uGOznV3L-ukIlxDbsVyKQ9dROiCaCLJpBA4"
              />
              <TeamMemberCard
                name="Harsh Singh"
                role="Co-Founder & Technical Lead"
                linkedIn="https://www.linkedin.com/in/harshsingh12/"
                imageUrl="https://media.licdn.com/dms/image/v2/D5603AQHYtd-Jmrh9pQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1704990725462?e=1739404800&v=beta&t=KgV78twiTULkzKJD_VvjPCK0ymZL0lmXcFRRZhvvF6U"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-indigo-950 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">EduMate</h3>
                <p className="text-gray-400">
                  Making quality education accessible to everyone through AI-powered innovation.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                <p className="text-gray-400">Email: info@edumate.ai</p>
                <p className="text-gray-400">Location: Bangalore, India</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400">© 2024 EduMate. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}