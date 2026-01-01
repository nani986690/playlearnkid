import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Gamepad2, Heart, Star, Shield, Sparkles, BookOpen } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';

const features = [
  {
    icon: Gamepad2,
    title: 'Fun Learning Games',
    description: 'Interactive games that make education exciting and engaging for young minds.',
    color: 'text-secondary',
    bg: 'bg-secondary/20',
  },
  {
    icon: Shield,
    title: 'Safe for Kids',
    description: 'No ads, no external links, just pure educational fun in a safe environment.',
    color: 'text-accent',
    bg: 'bg-accent/20',
  },
  {
    icon: Star,
    title: 'Reward System',
    description: 'Earn points and celebrate achievements to keep kids motivated!',
    color: 'text-primary',
    bg: 'bg-primary/20',
  },
  {
    icon: BookOpen,
    title: 'Learn While Playing',
    description: 'Cover essential topics like letters, numbers, shapes, and more.',
    color: 'text-coral',
    bg: 'bg-coral/20',
  },
];

const About: React.FC = () => {
  const { playClick } = useSound();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-6 py-2 rounded-full mb-6 animate-bounce-in">
              <Heart className="w-5 h-5" />
              <span className="font-bold">About Us</span>
              <Heart className="w-5 h-5" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 animate-slide-up">
              Where <span className="text-gradient">Learning</span>
              <br />
              Feels Like <span className="text-secondary">Play!</span> ✨
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Play & Learn Kids is a fun, free educational platform designed specifically 
              for children aged 4-10. We believe that the best learning happens when kids 
              are having fun!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-card rounded-3xl p-8 shadow-card hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${feature.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* What Kids Learn */}
          <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-3xl p-8 md:p-12 mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-8">
              What Kids Learn 📚
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { emoji: '🔤', label: 'Alphabet & Phonics' },
                { emoji: '🔢', label: 'Numbers & Math' },
                { emoji: '🔷', label: 'Shapes & Colors' },
                { emoji: '🐾', label: 'Animals & Nature' },
                { emoji: '📝', label: 'Spelling & Words' },
                { emoji: '🧠', label: 'Memory Skills' },
              ].map((item) => (
                <div 
                  key={item.label}
                  className="bg-card rounded-2xl p-4 text-center shadow-card hover-bounce cursor-default"
                >
                  <span className="text-4xl block mb-2">{item.emoji}</span>
                  <span className="font-bold text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center animate-slide-up">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-sparkle" />
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Jump into our games and watch your child learn while having a blast!
            </p>
            <Link to="/games" onClick={playClick}>
              <Button variant="hero" size="xl">
                <Gamepad2 className="w-6 h-6" />
                Play Now!
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 text-center bg-muted/50 mt-16">
        <div className="container mx-auto">
          <div className="text-4xl mb-4">🎮📚✨</div>
          <p className="text-xl font-bold text-foreground mb-2">
            Play & Learn Kids
          </p>
          <p className="text-muted-foreground">
            Made with ❤️ for curious little minds!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
