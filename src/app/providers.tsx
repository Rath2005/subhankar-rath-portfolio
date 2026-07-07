"use client";

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { OSProvider } from '@/components/os/OSProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <OSProvider>
        {children}
      </OSProvider>
    </SessionProvider>
  );
}
