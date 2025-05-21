"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface GameStatusDialogProps {
  isOpen: boolean;
  status: 'WIN' | 'GAME_OVER';
  score: number;
  onRestart: () => void;
}

const GameStatusDialog: React.FC<GameStatusDialogProps> = ({ isOpen, status, score, onRestart }) => {
  if (!isOpen) return null;

  const title = status === 'WIN' ? "Congratulations! You Win!" : "Game Over!";
  const description = status === 'WIN' 
    ? `You've reached the 2048 tile! Your final score is ${score}.`
    : `No more moves available. Your final score is ${score}.`;

  return (
    <AlertDialog open={isOpen} onOpenChange={() => { /* Controlled externally */ }}>
      <AlertDialogContent className="bg-card text-card-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-2xl font-bold text-primary">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-lg py-4">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction asChild>
            <Button onClick={onRestart} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Play Again
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GameStatusDialog;
