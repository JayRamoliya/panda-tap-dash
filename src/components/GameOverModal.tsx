import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  onRestart: () => void;
  onBackToHome: () => void;
}

const getGameOverMessage = (score: number) => {
  if (score === 0) return "Oops! Too slow, ninja! 🥷";
  if (score < 5) return "Not bad for a beginner! 🐣";
  if (score < 10) return "Getting faster! 🏃‍♀️";
  if (score < 20) return "Panda ninja in training! 🥋";
  if (score < 30) return "Impressive reflexes! ⚡";
  return "PANDA MASTER! 🏆";
};

const GameOverModal = ({ isOpen, score, onRestart, onBackToHome }: GameOverModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md bg-card border-2 border-primary/20 shadow-cute rounded-2xl">
        <DialogHeader className="text-center space-y-4">
          <div className="text-6xl animate-wiggle">☠️</div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            You missed the panda!
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary animate-score-pop">
              {score}
            </div>
            <div className="text-muted-foreground">
              {score === 1 ? "panda tapped" : "pandas tapped"}
            </div>
          </div>
          
          <div className="text-lg text-foreground animate-float">
            {getGameOverMessage(score)}
          </div>
          
          <div className="flex flex-col space-y-3 pt-4">
            <Button 
              variant="game" 
              onClick={onRestart}
              className="w-full text-lg py-6 animate-bounce-cute"
            >
              Try Again! 🔄
            </Button>
            <Button 
              variant="cute" 
              onClick={onBackToHome}
              className="w-full"
            >
              Back to Home 🏠
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverModal;