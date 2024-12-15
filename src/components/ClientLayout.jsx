'use client';

import { ClerkProvider } from '@clerk/nextjs';

export default function ClientLayout({ children }) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}