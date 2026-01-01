import React from 'react';
import { Link } from 'react-router-dom';
import { useSound } from '@/contexts/SoundContext';

const categories = [
  { emoji: '🔤', title: 'Alphabet Fun', description: 'Learn A to Z!', color: 'game-card-1' },
  { emoji: '🔢', title: 'Math Magic', description: 'Count & Calculate!', color: 'game-card-2' },
  { emoji: '🔷', title: 'Shapes & Colors', description: 'Match & Learn!', color: 'game-card-3' },
  { emoji: '🧠', title: 'Memory Games', description: 'Train Your Brain!', color: 'game-card-4' },
  { emoji: '🐾', title: 'Animal World', description: 'Meet the Animals!', color: 'game-card-5' },
  { emoji: '✏️', title: 'Spelling Bee', description: 'Words are Fun!', color: 'game-card-6' },
];

const GameCategories: React.FC = () => {
  const { playClick } = useSound();

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Choose Your Adventure! 🚀
          </h2>
          <p className="text-xl text-muted-foreground">
            Pick a category and start learning through play
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Link 
              key={category.title}
              to="/games"
              onClick={playClick}
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className={`${category.color} rounded-3xl p-8 text-white shadow-card transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-6xl block mb-4 group-hover:animate-wiggle transition-transform">
                  {category.emoji}
                </span>
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="opacity-90">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameCategories;
