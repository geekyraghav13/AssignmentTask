"use client";

import { Button } from '@/components/ui/button';
import type { Direction } from '@/types/game';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onMove: (direction: Direction) => void;
  onRestart: () => void;
  isGameOverOrWon: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ onMove, onRestart, isGameOverOrWon }) => {
  const controlButtonClass = "w-16 h-16 sm:w-20 sm:h-20 text-2xl p-0 bg-secondary hover:bg-secondary/80 text-secondary-foreground shadow-md";
  const iconSize = "w-8 h-8 sm:w-10 sm:h-10";

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className="grid grid-cols-3 gap-2 items-center justify-center">
        <div></div> {/* Empty cell for layout */}
        <Button onClick={() => onMove('UP')} className={controlButtonClass} aria-label="Move Up" disabled={isGameOverOrWon}>
          <ArrowUp className={iconSize} />
        </Button>
        <div></div> {/* Empty cell for layout */}

        <Button onClick={() => onMove('LEFT')} className={controlButtonClass} aria-label="Move Left" disabled={isGameOverOrWon}>
          <ArrowLeft className={iconSize} />
        </Button>
        <Button onClick={() => onMove('DOWN')} className={controlButtonClass} aria-label="Move Down" disabled={isGameOverOrWon}>
          <ArrowDown className={iconSize} />
        </Button>
        <Button onClick={() => onMove('RIGHT')} className={controlButtonClass} aria-label="Move Right" disabled={isGameOverOrWon}>
          <ArrowRight className={iconSize} />
        </Button>
      </div>
      <Button 
        onClick={onRestart} 
        variant="outline" 
        className="mt-4 px-6 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-md"
      >
        <RotateCcw className="mr-2 h-5 w-5" />
        Restart Game
      </Button>
    </div>
  );
};

export default GameControls;
