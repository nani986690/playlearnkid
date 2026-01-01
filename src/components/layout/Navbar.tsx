import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Gamepad2, Info, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/contexts/SoundContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { soundEnabled, toggleSound, playClick } = useSound();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/games', label: 'Games', icon: Gamepad2 },
    { path: '/about', label: 'About', icon: Info },
  ];

  const handleSoundToggle = () => {
    playClick();
    toggleSound();
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b-4 border-primary shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center gap-3 hover-bounce"
            onClick={playClick}
          >
            <span className="text-4xl">🎮</span>
            <span className="text-xl md:text-2xl font-extrabold text-gradient">
              Play & Learn Kids
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path} onClick={playClick}>
                <Button
                  variant={location.pathname === path ? 'secondary' : 'ghost'}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:inline">{label}</span>
                </Button>
              </Link>
            ))}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSoundToggle}
              className="ml-2"
            >
              {soundEnabled ? (
                <Volume2 className="w-6 h-6 text-accent" />
              ) : (
                <VolumeX className="w-6 h-6 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
