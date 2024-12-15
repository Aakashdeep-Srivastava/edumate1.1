'use client';
import Navigation from '../components/Navigation';
import LandingPage from '../components/LandingPage';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <LandingPage />
    </main>
  );
}