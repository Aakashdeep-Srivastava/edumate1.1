'use client';
// src/components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navigation background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-transparent backdrop-blur-md shadow-lg' : 'bg-transparent backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/images/logo.webp"
              alt="EduMate Logo"
              width={40}
              height={40}
              className="w-10 h-10 transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-bold text-white">EduMate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isSignedIn ? (
              <>
                <Link href="/classroom" className="text-white hover:text-purple-200 transition-colors">
                  Enter Classroom
                </Link>
                <Link href="/dashboard" className="text-white hover:text-purple-200 transition-colors">
                  Dashboard
                </Link>
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10",
                      userButtonTrigger: "hover:opacity-80 transition-opacity"
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </>
            ) : (
              <>
                <Link href="#features" className="text-white hover:text-purple-200 transition-colors">
                  Features
                </Link>
                <Link href="#vision" className="text-white hover:text-purple-200 transition-colors">
                  Vision
                </Link>
                <Link href="#team" className="text-white hover:text-purple-200 transition-colors">
                  Team
                </Link>
                <SignInButton mode="modal">
                  <button className="text-white hover:text-purple-200 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-white text-purple-900 hover:bg-gray-100 px-6 py-2 rounded-full transition-colors">
                    Get Started
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-6 py-4 space-y-4 bg-purple-900/95 backdrop-blur-sm">
            {isSignedIn ? (
              <>
                <Link 
                  href="/classroom" 
                  className="block text-white hover:text-purple-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Enter Classroom
                </Link>
                <Link 
                  href="/dashboard" 
                  className="block text-white hover:text-purple-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="pt-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="#features" 
                  className="block text-white hover:text-purple-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  href="#vision" 
                  className="block text-white hover:text-purple-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Vision
                </Link>
                <Link 
                  href="#team" 
                  className="block text-white hover:text-purple-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Team
                </Link>
                <div className="space-y-3">
                  <SignInButton mode="modal">
                    <button className="block w-full text-left text-white hover:text-purple-200 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="block w-full bg-white text-purple-900 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors">
                      Get Started
                    </button>
                  </SignUpButton>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;