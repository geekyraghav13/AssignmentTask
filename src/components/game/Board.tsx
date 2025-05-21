"use client";

import type { GameBoard } from '@/types/game';
import Tile from './Tile';
import { GRID_SIZE } from '@/lib/game-constants';

interface BoardProps {
  board: GameBoard;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div 
      className="grid gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-[hsl(var(--game-board-bg))] shadow-md"
      style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
    >
      {board.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <Tile key={tile.id} tile={tile} />
        ))
      )}
    </div>
  );
};

export default Board;
