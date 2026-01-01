import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import GameCard from '@/components/games/GameCard';
import GameModal from '@/components/games/GameModal';
import AlphabetGame from '@/components/games/AlphabetGame';
import MathGame from '@/components/games/MathGame';
import ShapesGame from '@/components/games/ShapesGame';
import MemoryGame from '@/components/games/MemoryGame';
import AnimalSoundsGame from '@/components/games/AnimalSoundsGame';
import SpellingGame from '@/components/games/SpellingGame';

type GameType = 'alphabet' | 'math' | 'shapes' | 'memory' | 'animals' | 'spelling' | null;

const games = [
  {
    id: 'alphabet' as const,
    title: 'Alphabet Learning 🔤',
    description: 'Learn letters A to Z with fun pictures and sounds!',
    emoji: '🔤',
    colorClass: 'game-card-1',
  },
  {
    id: 'math' as const,
    title: 'Math Fun 🔢',
    description: 'Practice addition and subtraction with exciting challenges!',
    emoji: '➕',
    colorClass: 'game-card-2',
  },
  {
    id: 'shapes' as const,
    title: 'Shapes & Colors 🔷',
    description: 'Match colorful shapes and learn their names!',
    emoji: '🔷',
    colorClass: 'game-card-3',
  },
  {
    id: 'memory' as const,
    title: 'Memory Match 🧠',
    description: 'Flip cards and find matching pairs to train your brain!',
    emoji: '🎴',
    colorClass: 'game-card-4',
  },
  {
    id: 'animals' as const,
    title: 'Animal Sounds 🐾',
    description: 'Click on animals and learn what sounds they make!',
    emoji: '🦁',
    colorClass: 'game-card-5',
  },
  {
    id: 'spelling' as const,
    title: 'Spelling Bee ✏️',
    description: 'Look at pictures and spell the words correctly!',
    emoji: '✏️',
    colorClass: 'game-card-6',
  },
];

const gameComponents: Record<Exclude<GameType, null>, React.ReactNode> = {
  alphabet: <AlphabetGame />,
  math: <MathGame />,
  shapes: <ShapesGame />,
  memory: <MemoryGame />,
  animals: <AnimalSoundsGame />,
  spelling: <SpellingGame />,
};

const gameTitles: Record<Exclude<GameType, null>, string> = {
  alphabet: '🔤 Alphabet Learning',
  math: '➕ Math Fun',
  shapes: '🔷 Shapes & Colors',
  memory: '🧠 Memory Match',
  animals: '🐾 Animal Sounds',
  spelling: '✏️ Spelling Bee',
};

const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameType>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-4 animate-slide-up">
              <span className="text-gradient">Choose a Game!</span> 🎮
            </h1>
            <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Click on any game to start learning and having fun!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {games.map((game, index) => (
              <GameCard
                key={game.id}
                title={game.title}
                description={game.description}
                emoji={game.emoji}
                colorClass={game.colorClass}
                onPlay={() => setActiveGame(game.id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>

      <GameModal
        isOpen={activeGame !== null}
        onClose={() => setActiveGame(null)}
        title={activeGame ? gameTitles[activeGame] : ''}
      >
        {activeGame && gameComponents[activeGame]}
      </GameModal>
    </div>
  );
};

export default Games;
