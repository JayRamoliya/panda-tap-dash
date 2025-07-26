import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import PandaGame from "@/components/PandaGame";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type GameState = "welcome" | "playing";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("welcome");

  const startGame = () => setGameState("playing");
  const backToHome = () => setGameState("welcome");

  return (
    <div className="relative">
      <ThemeToggle />
      
      {gameState === "welcome" ? (
        <WelcomeScreen onStartGame={startGame} />
      ) : (
        <PandaGame onBackToHome={backToHome} />
      )}
    </div>
  );
};

export default Index;
