import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/contexts/SoundContext';

const alphabetData = [
  { letter: 'A', word: 'Apple', emoji: '🍎' },
  { letter: 'B', word: 'Ball', emoji: '⚽' },
  { letter: 'C', word: 'Cat', emoji: '🐱' },
  { letter: 'D', word: 'Dog', emoji: '🐕' },
  { letter: 'E', word: 'Elephant', emoji: '🐘' },
  { letter: 'F', word: 'Fish', emoji: '🐟' },
  { letter: 'G', word: 'Grapes', emoji: '🍇' },
  { letter: 'H', word: 'House', emoji: '🏠' },
  { letter: 'I', word: 'Ice cream', emoji: '🍦' },
  { letter: 'J', word: 'Jelly', emoji: '🍮' },
  { letter: 'K', word: 'Kite', emoji: '🪁' },
  { letter: 'L', word: 'Lion', emoji: '🦁' },
  { letter: 'M', word: 'Moon', emoji: '🌙' },
  { letter: 'N', word: 'Nest', emoji: '🪺' },
  { letter: 'O', word: 'Orange', emoji: '🍊' },
  { letter: 'P', word: 'Pencil', emoji: '✏️' },
  { letter: 'Q', word: 'Queen', emoji: '👸' },
  { letter: 'R', word: 'Rainbow', emoji: '🌈' },
  { letter: 'S', word: 'Sun', emoji: '☀️' },
  { letter: 'T', word: 'Tree', emoji: '🌳' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️' },
  { letter: 'V', word: 'Violin', emoji: '🎻' },
  { letter: 'W', word: 'Whale', emoji: '🐋' },
  { letter: 'X', word: 'Xylophone', emoji: '🎵' },
  { letter: 'Y', word: 'Yo-yo', emoji: '🪀' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓' },
];

const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }
};

const AlphabetGame: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<typeof alphabetData[0] | null>(null);
  const { playClick, playSuccess, soundEnabled } = useSound();

  const handleLetterClick = (item: typeof alphabetData[0]) => {
    playClick();
    setSelectedLetter(item);
    
    if (soundEnabled) {
      setTimeout(() => {
        speakText(`${item.letter} is for ${item.word}`);
      }, 100);
    }
    
    setTimeout(() => playSuccess(), 200);
  };

  return (
    <div className="space-y-6">
      <p className="text-center text-lg text-muted-foreground">
        Click on any letter to learn about it! 🎉
      </p>

      {selectedLetter && (
        <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-3xl p-8 text-center animate-bounce-in">
          <div className="text-8xl md:text-9xl font-black text-secondary mb-4">
            {selectedLetter.letter}
          </div>
          <div className="text-6xl mb-4 animate-float">{selectedLetter.emoji}</div>
          <div className="text-3xl font-bold text-foreground">
            {selectedLetter.letter} is for <span className="text-accent">{selectedLetter.word}</span>!
          </div>
        </div>
      )}

      <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
        {alphabetData.map((item) => (
          <Button
            key={item.letter}
            variant={selectedLetter?.letter === item.letter ? 'secondary' : 'default'}
            size="lg"
            className="text-2xl font-black h-14 w-14 p-0 hover-bounce"
            onClick={() => handleLetterClick(item)}
          >
            {item.letter}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AlphabetGame;
