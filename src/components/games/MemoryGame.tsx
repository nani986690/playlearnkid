import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/contexts/SoundContext';
import { RefreshCw, Clock } from 'lucide-react';

const emojis = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const { playClick, playSuccess, playError } = useSound();

  const initializeGame = () => {
    const shuffledEmojis = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledEmojis);
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isWon) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isWon]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsWon(true);
      setIsPlaying(false);
      playSuccess();
    }
  }, [cards]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length >= 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    playClick();
    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          playSuccess();
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          playError();
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-4">
          <div className="bg-secondary/20 rounded-2xl px-4 py-2">
            <span className="font-bold">Moves: </span>
            <span className="text-xl font-black text-secondary">{moves}</span>
          </div>
          <div className="bg-accent/20 rounded-2xl px-4 py-2 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="text-xl font-black text-accent">{formatTime(time)}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={initializeGame}>
          <RefreshCw className="w-6 h-6" />
        </Button>
      </div>

      {isWon && (
        <div className="bg-accent/20 rounded-3xl p-6 text-center animate-bounce-in">
          <div className="text-4xl font-black text-accent mb-2">🎉 You Won! 🎉</div>
          <p className="text-lg">Completed in {moves} moves and {formatTime(time)}!</p>
          <Button variant="secondary" className="mt-4" onClick={initializeGame}>
            Play Again!
          </Button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-2xl text-4xl flex items-center justify-center transition-all duration-300 transform ${
              card.isFlipped || card.isMatched
                ? 'bg-card shadow-card rotate-0'
                : 'bg-secondary shadow-button hover:scale-105 cursor-pointer'
            } ${card.isMatched ? 'opacity-70' : ''}`}
            disabled={card.isMatched}
          >
            {card.isFlipped || card.isMatched ? (
              <span className="animate-pop">{card.emoji}</span>
            ) : (
              <span className="text-2xl">❓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
