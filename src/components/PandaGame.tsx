import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import pandaGameImage from "@/assets/panda-game.png";
import GameOverModal from "./GameOverModal";

interface PandaGameProps {
  onBackToHome: () => void;
}

interface PandaPosition {
  x: number;
  y: number;
  id: number;
}

const PandaGame = ({ onBackToHome }: PandaGameProps) => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showPanda, setShowPanda] = useState(false);
  const [pandaPosition, setPandaPosition] = useState<PandaPosition>({ x: 50, y: 50, id: 0 });
  const [timeLimit, setTimeLimit] = useState(2000);
  const [gameStarted, setGameStarted] = useState(false);
  const [scoreAnimation, setScoreAnimation] = useState(false);

  const pandaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateRandomPosition = useCallback(() => {
    const margin = 10;
    const x = Math.random() * (100 - 2 * margin) + margin;
    const y = Math.random() * (100 - 2 * margin) + margin;
    return { x, y, id: Date.now() };
  }, []);

  const startRound = useCallback(() => {
    if (gameOver) return;

    setPandaPosition(generateRandomPosition());
    setShowPanda(true);

    // Clear existing timeout
    if (pandaTimeoutRef.current) clearTimeout(pandaTimeoutRef.current);

    // Set new timeout to end round
    pandaTimeoutRef.current = setTimeout(() => {
      setShowPanda(false);
      setGameOver(true);
    }, timeLimit);
  }, [generateRandomPosition, gameOver, timeLimit]);

  const handlePandaTap = useCallback(() => {
    if (!showPanda) return;

    if (pandaTimeoutRef.current) clearTimeout(pandaTimeoutRef.current);

    setShowPanda(false);
    setScore(prev => prev + 1);
    setScoreAnimation(true);

    setTimeLimit(prev => Math.max(200, prev - 50));

    setTimeout(() => setScoreAnimation(false), 300);
    setTimeout(() => startRound(), 600); // short delay for next round
  }, [showPanda, startRound]);

  const resetGame = useCallback(() => {
    if (pandaTimeoutRef.current) clearTimeout(pandaTimeoutRef.current);

    setScore(0);
    setGameOver(false);
    setTimeLimit(2000);
    setGameStarted(true);
    setScoreAnimation(false);
    startRound();
  }, [startRound]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    startRound();
  }, [startRound]);

  useEffect(() => {
    return () => {
      if (pandaTimeoutRef.current) clearTimeout(pandaTimeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-game relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 relative z-10">
        <div className={`text-2xl font-bold text-foreground transition-all duration-300 ${scoreAnimation ? 'animate-score-pop text-game-success' : ''}`}>
          Score: {score}
        </div>
        <Button
          variant="cute"
          size="icon"
          onClick={resetGame}
          className="rounded-full"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      {/* Game Area */}
      <div className="absolute inset-0 pt-20 pb-4">
        {!gameStarted ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <h2 className="text-4xl font-bold text-foreground text-center">Ready to Play? 🐼</h2>
            <p className="text-muted-foreground text-center px-4">
              Tap the panda as fast as you can! You have {(timeLimit / 1000).toFixed(1)} seconds per round.
            </p>
            <Button
              variant="game"
              size="lg"
              onClick={startGame}
              className="text-xl px-8 py-4 animate-bounce-cute"
            >
              Start Game! 🎮
            </Button>
          </div>
        ) : (
          <>
            {/* Panda */}
            {showPanda && (
              <div
                className="absolute transition-all duration-200 cursor-pointer animate-panda-appear hover:animate-wiggle"
                style={{
                  left: `${pandaPosition.x}%`,
                  top: `${pandaPosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={handlePandaTap}
              >
                <img
                  src={pandaGameImage}
                  alt="Tap me!"
                  className="w-20 h-20 md:w-24 md:h-24 drop-shadow-panda hover:scale-110 transition-transform duration-200"
                  draggable={false}
                />
              </div>
            )}

            {/* Time Info */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-muted-foreground">
              <p className="text-sm">Tap time: {(timeLimit / 1000).toFixed(1)}s</p>
            </div>
          </>
        )}
      </div>

      {/* Game Over Modal */}
      <GameOverModal
        isOpen={gameOver}
        score={score}
        onRestart={resetGame}
        onBackToHome={onBackToHome}
      />
    </div>
  );
};

export default PandaGame;
