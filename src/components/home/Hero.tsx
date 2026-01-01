import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Star, Rocket } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';

const Hero: React.FC = () => {
  const { playClick } = useSound();

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float opacity-50">⭐</div>
        <div className="absolute top-20 right-20 text-5xl animate-float opacity-50" style={{ animationDelay: '1s' }}>🌈</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-float opacity-50" style={{ animationDelay: '0.5s' }}>🎈</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-float opacity-50" style={{ animationDelay: '1.5s' }}>✨</div>
        <div className="absolute top-1/2 left-5 text-4xl animate-float opacity-30" style={{ animationDelay: '2s' }}>🎨</div>
        <div className="absolute top-1/3 right-5 text-4xl animate-float opacity-30" style={{ animationDelay: '0.7s' }}>📚</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-6 py-2 rounded-full mb-6 animate-bounce-in">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">Fun Learning Adventure!</span>
            <Sparkles className="w-5 h-5" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 animate-slide-up">
            <span className="text-gradient">Play & Learn</span>
            <br />
            <span className="text-foreground">Kids</span>
            <span className="inline-block ml-4 animate-wiggle">🎓</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up font-semibold" style={{ animationDelay: '0.1s' }}>
            Where Learning Feels Like Play! ✨
          </p>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Explore fun games that teach letters, numbers, shapes, and more! 
            Perfect for curious kids aged 4-10 🌟
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/games" onClick={playClick}>
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                <Rocket className="w-6 h-6" />
                Start Playing!
              </Button>
            </Link>
            <Link to="/about" onClick={playClick}>
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                <Star className="w-6 h-6" />
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {[
              { emoji: '🎮', number: '6+', label: 'Fun Games' },
              { emoji: '📖', number: '100+', label: 'Things to Learn' },
              { emoji: '😊', number: '∞', label: 'Smiles' },
            ].map((stat, i) => (
              <div key={i} className="bg-card rounded-3xl p-6 shadow-card hover-bounce cursor-default">
                <span className="text-4xl mb-2 block">{stat.emoji}</span>
                <div className="text-3xl font-black text-secondary">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
