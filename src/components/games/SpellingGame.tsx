import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSound } from '@/contexts/SoundContext';
import { RefreshCw, Lightbulb, Check, X } from 'lucide-react';

const words = [
  { word: 'CAT', emoji: '🐱', hint: 'A furry pet that says meow' },
  { word: 'DOG', emoji: '🐕', hint: 'A loyal pet that barks' },
  { word: 'SUN', emoji: '☀️', hint: 'It shines in the sky during the day' },
  { word: 'BALL', emoji: '⚽', hint: 'Round toy you can kick or throw' },
  { word: 'FISH', emoji: '🐟', hint: 'It swims in water' },
  { word: 'BIRD', emoji: '🐦', hint: 'It has wings and can fly' },
  { word: 'TREE', emoji: '🌳', hint: 'It has leaves and grows tall' },
  { word: 'STAR', emoji: '⭐', hint: 'It twinkles in the night sky' },
  { word: 'MOON', emoji: '🌙', hint: 'You see it at night in the sky' },
  { word: 'BOOK', emoji: '📚', hint: 'You read stories in this' },
];

const SpellingGame: React.FC = () => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const { playClick, playSuccess, playError } = useSound();

  const getNewWord = () => {
    const availableWords = words.filter(w => !usedWords.includes(w.word));
    if (availableWords.length === 0) {
      setUsedWords([]);
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    } else {
      setCurrentWord(availableWords[Math.floor(Math.random() * availableWords.length)]);
    }
    setUserInput('');
    setShowHint(false);
    setFeedback(null);
  };

  useEffect(() => {
    getNewWord();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    
    if (userInput.toUpperCase() === currentWord.word) {
      playSuccess();
      setFeedback('correct');
      setScore(s => s + (showHint ? 5 : 10));
      setUsedWords(prev => [...prev, currentWord.word]);
      setTimeout(() => getNewWord(), 1500);
    } else {
      playError();
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const handleHint = () => {
    playClick();
    setShowHint(true);
  };

  const resetGame = () => {
    playClick();
    setScore(0);
    setUsedWords([]);
    getNewWord();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-secondary/20 rounded-2xl px-6 py-3">
          <span className="text-lg font-bold">Score: </span>
          <span className="text-2xl font-black text-secondary">{score}</span>
        </div>
        <div className="bg-accent/20 rounded-2xl px-4 py-2">
          <span className="font-bold">{usedWords.length}/{words.length} words</span>
        </div>
        <Button variant="ghost" size="icon" onClick={resetGame}>
          <RefreshCw className="w-6 h-6" />
        </Button>
      </div>

      <div className={`bg-muted rounded-3xl p-8 text-center transition-all duration-300 ${
        feedback === 'correct' ? 'bg-accent/30' : 
        feedback === 'wrong' ? 'bg-destructive/30' : ''
      }`}>
        <div className="text-8xl mb-4 animate-float">{currentWord.emoji}</div>
        <p className="text-xl text-muted-foreground mb-4">
          How do you spell this?
        </p>
        
        {showHint && (
          <div className="bg-primary/20 rounded-2xl p-4 mb-4 animate-bounce-in">
            <p className="text-lg font-semibold">💡 Hint: {currentWord.hint}</p>
          </div>
        )}

        {feedback === 'correct' && (
          <div className="text-3xl font-bold text-accent mb-4 animate-bounce-in flex items-center justify-center gap-2">
            <Check className="w-8 h-8" /> Correct! The word is {currentWord.word}! 🎉
          </div>
        )}
        
        {feedback === 'wrong' && (
          <div className="text-2xl font-bold text-destructive mb-4 animate-wiggle flex items-center justify-center gap-2">
            <X className="w-6 h-6" /> Try again! 💪
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          placeholder="Type your answer..."
          className="text-2xl text-center font-bold h-14 rounded-2xl uppercase"
          disabled={feedback === 'correct'}
          autoFocus
        />
        <Button 
          type="submit" 
          variant="secondary" 
          size="lg"
          disabled={!userInput || feedback === 'correct'}
        >
          Check!
        </Button>
      </form>

      {!showHint && feedback !== 'correct' && (
        <div className="text-center">
          <Button variant="ghost" onClick={handleHint} className="text-muted-foreground">
            <Lightbulb className="w-5 h-5 mr-2" />
            Need a hint?
          </Button>
        </div>
      )}

      {usedWords.length === words.length && (
        <div className="text-center animate-bounce-in">
          <div className="text-4xl font-black text-accent mb-2">🎉 Amazing! You spelled all words! 🎉</div>
          <Button variant="secondary" onClick={resetGame}>Play Again!</Button>
        </div>
      )}
    </div>
  );
};

export default SpellingGame;
