import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/contexts/SoundContext';
import { RefreshCw, Trophy } from 'lucide-react';

const MathGame: React.FC = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState<'+' | '-'>('+');
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [streak, setStreak] = useState(0);
  const { playClick, playSuccess, playError } = useSound();

  const generateQuestion = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    const op = Math.random() > 0.5 ? '+' : '-';
    
    // Ensure no negative results for subtraction
    if (op === '-' && n1 < n2) {
      setNum1(n2);
      setNum2(n1);
    } else {
      setNum1(n1);
      setNum2(n2);
    }
    setOperation(op);

    const correctAnswer = op === '+' ? n1 + n2 : Math.abs(n1 - n2);
    const wrongAnswers = [
      correctAnswer + Math.floor(Math.random() * 3) + 1,
      correctAnswer - Math.floor(Math.random() * 3) - 1,
      correctAnswer + Math.floor(Math.random() * 5) + 2,
    ].filter(a => a >= 0 && a !== correctAnswer);

    const allOptions = [correctAnswer, ...wrongAnswers.slice(0, 3)];
    setOptions(allOptions.sort(() => Math.random() - 0.5));
    setFeedback(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;

  const handleAnswer = (answer: number) => {
    playClick();
    if (answer === correctAnswer) {
      playSuccess();
      setFeedback('correct');
      setScore(s => s + 10 + streak * 5);
      setStreak(s => s + 1);
      setTimeout(() => generateQuestion(), 1000);
    } else {
      playError();
      setFeedback('wrong');
      setStreak(0);
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const resetGame = () => {
    playClick();
    setScore(0);
    setStreak(0);
    generateQuestion();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-secondary/20 rounded-2xl px-6 py-3">
            <span className="text-lg font-bold">Score: </span>
            <span className="text-2xl font-black text-secondary">{score}</span>
          </div>
          {streak > 1 && (
            <div className="bg-accent/20 rounded-2xl px-4 py-2 animate-bounce-in">
              <span className="text-lg font-bold">🔥 {streak} streak!</span>
            </div>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={resetGame}>
          <RefreshCw className="w-6 h-6" />
        </Button>
      </div>

      <div className={`bg-muted rounded-3xl p-8 text-center transition-all duration-300 ${
        feedback === 'correct' ? 'bg-accent/30 animate-pop' : 
        feedback === 'wrong' ? 'bg-destructive/30 animate-wiggle' : ''
      }`}>
        <div className="text-6xl md:text-8xl font-black mb-4">
          {num1} {operation} {num2} = ?
        </div>
        
        {feedback === 'correct' && (
          <div className="text-3xl font-bold text-accent animate-bounce-in flex items-center justify-center gap-2">
            <Trophy className="w-8 h-8" /> Correct! Great job! 🎉
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="text-3xl font-bold text-destructive animate-bounce-in">
            Oops! Try again! 💪
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {options.map((option, index) => (
          <Button
            key={index}
            variant="secondary"
            size="xl"
            className="text-4xl font-black h-20 hover-bounce"
            onClick={() => handleAnswer(option)}
            disabled={feedback === 'correct'}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MathGame;
