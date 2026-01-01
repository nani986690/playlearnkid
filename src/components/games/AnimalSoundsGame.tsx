import React, { useState } from 'react';
import { useSound } from '@/contexts/SoundContext';

const animals = [
  { name: 'Dog', emoji: '🐕', sound: 'Woof woof!' },
  { name: 'Cat', emoji: '🐱', sound: 'Meow meow!' },
  { name: 'Cow', emoji: '🐄', sound: 'Moo moo!' },
  { name: 'Duck', emoji: '🦆', sound: 'Quack quack!' },
  { name: 'Pig', emoji: '🐷', sound: 'Oink oink!' },
  { name: 'Rooster', emoji: '🐓', sound: 'Cock-a-doodle-doo!' },
  { name: 'Sheep', emoji: '🐑', sound: 'Baa baa!' },
  { name: 'Horse', emoji: '🐴', sound: 'Neigh!' },
  { name: 'Owl', emoji: '🦉', sound: 'Hoo hoo!' },
  { name: 'Lion', emoji: '🦁', sound: 'Roar!' },
  { name: 'Frog', emoji: '🐸', sound: 'Ribbit ribbit!' },
  { name: 'Bee', emoji: '🐝', sound: 'Buzz buzz!' },
];

const AnimalSoundsGame: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<typeof animals[0] | null>(null);
  const { playClick, playSuccess } = useSound();

  const handleAnimalClick = (animal: typeof animals[0]) => {
    playClick();
    setSelectedAnimal(animal);
    setTimeout(() => playSuccess(), 100);
  };

  return (
    <div className="space-y-6">
      <p className="text-center text-lg text-muted-foreground">
        Click on an animal to hear what sound it makes! 🎵
      </p>

      {selectedAnimal && (
        <div className="bg-gradient-to-br from-lavender/30 to-coral/30 rounded-3xl p-8 text-center animate-bounce-in">
          <div className="text-8xl mb-4 animate-wiggle">{selectedAnimal.emoji}</div>
          <div className="text-3xl font-bold text-foreground mb-2">
            The {selectedAnimal.name} says:
          </div>
          <div className="text-4xl font-black text-secondary animate-pop">
            "{selectedAnimal.sound}"
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
        {animals.map((animal, index) => (
          <button
            key={animal.name}
            onClick={() => handleAnimalClick(animal)}
            className={`aspect-square rounded-3xl text-5xl flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:scale-110 shadow-card cursor-pointer ${
              selectedAnimal?.name === animal.name 
                ? 'bg-secondary/20 ring-4 ring-secondary' 
                : 'bg-card hover:shadow-xl'
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <span className="hover-wiggle">{animal.emoji}</span>
            <span className="text-xs font-bold text-muted-foreground">{animal.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimalSoundsGame;
