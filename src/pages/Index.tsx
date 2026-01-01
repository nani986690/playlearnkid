import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import GameCategories from '@/components/home/GameCategories';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <GameCategories />
        
        {/* Footer */}
        <footer className="py-12 px-4 text-center bg-muted/50">
          <div className="container mx-auto">
            <div className="text-4xl mb-4">🎮📚✨</div>
            <p className="text-xl font-bold text-foreground mb-2">
              Play & Learn Kids
            </p>
            <p className="text-muted-foreground">
              Making learning fun, one game at a time! 🌟
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Perfect for curious minds aged 4-10
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
