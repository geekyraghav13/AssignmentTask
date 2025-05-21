"use client";

import type { GameTile, TileValue } from '@/types/game';
import { getTileColors } from '@/lib/game-logic';
import { cn } from '@/lib/utils';

interface TileProps {
  tile: GameTile;
}

const Tile: React.FC<TileProps> = ({ tile }) => {
  const { value, isNew, isMerged } = tile;
  const { background, text, fontSize } = getTileColors(value);

  const animationClass = isNew ? 'tile-new' : isMerged ? 'tile-merged' : '';

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-md font-bold select-none',
        'aspect-square w-full h-full', // Ensure square tiles
        animationClass
      )}
      style={{ backgroundColor: background, color: text, transition: 'background-color 0.2s ease-in-out' }}
      aria-label={`Tile with value ${value === 0 ? 'empty' : value}`}
    >
      <span className={cn(fontSize, 'transition-opacity duration-200', value === 0 ? 'opacity-0' : 'opacity-100')}>
        {value !== 0 ? value : ''}
      </span>
    </div>
  );
};

export default Tile;
