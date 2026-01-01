import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/contexts/SoundContext';
import { RefreshCw } from 'lucide-react';

const shapes = [
  { name: 'Circle', emoji: '🔴', color: 'bg-coral' },
  { name: 'Square', emoji: '🟦', color: 'bg-secondary' },
  { name: 'Triangle', emoji: '🔺', color: 'bg-accent' },
  { name: 'Star', emoji: '⭐', color: 'bg-primary' },
  { name: 'Heart', emoji: '❤️', color: 'bg-coral' },
  { name: 'Diamond', emoji: '💎', color: 'bg-sky' },
];

const ShapesGame: React.FC = () => {
  const [targetShape, setTargetShape] = useState(shapes[0]);
  const [score, setScore] = useState(0);
  const [shuffledShapes, setShuffledShapes] = useState(shapes);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const { playClick, playSuccess, playError } = useSound();

  const shuffleAndSetTarget = () => {
    const shuffled = [...shapes].sort(() => Math.random() - 0.5);
    setShuffledShapes(shuffled);
    const unmatched = shapes.filter(s => !matched.includes(s.name));
    if (unmatched.length > 0) {
      setTargetShape(unmatched[Math.floor(Math.random() * unmatched.length)]);
    } else {
      // All matched! Reset
      setMatched([]);
      setTargetShape(shapes[Math.floor(Math.random() * shapes.length)]);
    }
  };

  useEffect(() => {
    shuffleAndSetTarget();
  }, [matched]);

  const handleShapeClick = (shape: typeof shapes[0]) => {
    playClick();
    if (shape.name === targetShape.name) {
      playSuccess();
      setFeedback('correct');
      setScore(s => s + 10);
      setMatched(m => [...m, shape.name]);
      setTimeout(() => {
        setFeedback(null);
      }, 800);
    } else {
      playError();
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 500);
    }
  };

  const resetGame = () => {
    playClick();
    setScore(0);
    setMatched([]);
    setFeedback(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="bg-secondary/20 rounded-2xl px-6 py-3">
          <span className="text-lg font-bold">Score: </span>
          <span className="text-2xl font-black text-secondary">{score}</span>
        </div>
        <div className="bg-accent/20 rounded-2xl px-4 py-2">
          <span className="font-bold">{matched.length}/{shapes.length} matched</span>
        </div>
        <Button variant="ghost" size="icon" onClick={resetGame}>
          <RefreshCw className="w-6 h-6" />
        </Button>
      </div>

      <div className={`bg-muted rounded-3xl p-8 text-center transition-all duration-300 ${
        feedback === 'correct' ? 'bg-accent/30 animate-pop' : 
        feedback === 'wrong' ? 'bg-destructive/30 animate-wiggle' : ''
      }`}>
        <p className="text-2xl font-bold mb-4">Find the:</p>
        <div className="text-6xl mb-2 animate-float">{targetShape.emoji}</div>
        <div className="text-4xl font-black text-secondary">{targetShape.name}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
        {shuffledShapes.map((shape, index) => (
          <button
            key={shape.name}
            onClick={() => handleShapeClick(shape)}
            disabled={matched.includes(shape.name)}
            className={`aspect-square rounded-3xl text-6xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              matched.includes(shape.name) 
                ? 'bg-muted opacity-50 cursor-not-allowed' 
                : `${shape.color} shadow-lg hover:shadow-xl cursor-pointer`
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {shape.emoji}
          </button>
        ))}
      </div>

      {matched.length === shapes.length && (
        <div className="text-center animate-bounce-in">
          <div className="text-4xl font-black text-accent mb-2">🎉 All Shapes Matched! 🎉</div>
          <Button variant="secondary" onClick={resetGame}>Play Again!</Button>
        </div>
      )}
    </div>
  );
};

export default ShapesGame;
