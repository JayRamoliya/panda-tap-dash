import { Button } from "@/components/ui/button";
import pandaLogo from "@/assets/panda-logo.png";

interface WelcomeScreenProps {
  onStartGame: () => void;
}

const WelcomeScreen = ({ onStartGame }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-game flex flex-col items-center justify-center space-y-8 p-6">
      {/* Panda Logo */}
      <div className="text-center space-y-6">
        <div className="relative">
          <img 
            src={pandaLogo} 
            alt="Panda Tap Game" 
            className="w-32 h-32 md:w-40 md:h-40 mx-auto animate-bounce-cute drop-shadow-panda"
            draggable={false}
          />
          <div className="absolute -top-2 -right-2 text-4xl animate-float">✨</div>
          <div className="absolute -bottom-2 -left-2 text-3xl animate-float delay-1000">💫</div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground animate-float">
          Panda Tap! 🐼
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
          Tap the panda in 0.2 seconds or lose it! How many can you catch? 🎯
        </p>
      </div>

      {/* Start Button */}
      <Button 
        variant="game" 
        size="lg" 
        onClick={onStartGame}
        className="text-xl md:text-2xl px-8 md:px-12 py-4 md:py-6 animate-bounce-cute hover:animate-wiggle font-bold"
      >
        Start Game! 🕹️
      </Button>

      {/* Fun Instructions */}
      <div className="text-center space-y-2 text-muted-foreground text-sm md:text-base">
        <p>💡 Tip: Each round gets faster!</p>
        <p>🏆 Challenge: Beat your high score!</p>
      </div>

      {/* Floating decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-2xl animate-float delay-500">🎋</div>
        <div className="absolute top-32 right-16 text-3xl animate-float delay-1000">🎍</div>
        <div className="absolute bottom-32 left-20 text-2xl animate-float delay-1500">🌸</div>
        <div className="absolute bottom-20 right-12 text-3xl animate-float delay-2000">🎊</div>
      </div>
    </div>
  );
};

export default WelcomeScreen;