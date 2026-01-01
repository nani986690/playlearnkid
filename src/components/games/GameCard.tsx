import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';

interface GameCardProps {
  title: string;
  description: string;
  emoji: string;
  colorClass: string;
  onPlay: () => void;
  index: number;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, emoji, colorClass, onPlay, index }) => {
  const { playClick } = useSound();

  const handlePlay = () => {
    playClick();
    onPlay();
  };

  return (
    <div 
      className={`${colorClass} rounded-3xl p-6 text-white shadow-card transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up flex flex-col`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <span className="text-6xl mb-4 block hover-wiggle cursor-default">
        {emoji}
      </span>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="opacity-90 mb-4 flex-grow">{description}</p>
      <Button 
        variant="default" 
        className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30"
        onClick={handlePlay}
      >
        <Play className="w-5 h-5" />
        Play Now!
      </Button>
    </div>
  );
};

export default GameCard;
