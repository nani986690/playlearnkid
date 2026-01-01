import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/contexts/SoundContext';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose, title, children }) => {
  const { playClick } = useSound();

  if (!isOpen) return null;

  const handleClose = () => {
    playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-bounce-in">
        <div className="flex items-center justify-between p-4 md:p-6 border-b-4 border-primary bg-muted">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
            {title}
          </h2>
          <Button variant="ghost" size="icon" onClick={handleClose} className="hover-wiggle">
            <X className="w-8 h-8" />
          </Button>
        </div>
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GameModal;
