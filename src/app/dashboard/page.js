'use client';

import { useUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import { Dashboard } from '../../components/Dashboard';

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser();

  // If the user is not signed in, redirect to the home page
  if (isLoaded && !isSignedIn) {
    redirect('/');
  }

  return <Dashboard />;
}