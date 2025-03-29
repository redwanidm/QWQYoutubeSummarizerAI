// src/components/Layout.tsx
import React from 'react';
import Header from '../components/header'; 
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-200 pb-20">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {children}
      </main>
    </div>
  );
};

export default Layout;