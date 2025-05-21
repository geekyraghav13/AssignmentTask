export type TileValue = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192;

export type Board = TileValue[][];

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface GameTile {
  id: string; // For unique key prop during rendering and animations
  value: TileValue;
  isNew?: boolean;
  isMerged?: boolean;
  previousValue?: TileValue; // For animation purposes, if needed
  mergedFrom?: [GameTile, GameTile] | null; // To trace merge origins
}

export type GameBoard = GameTile[][];

export interface GameState {
  board: GameBoard;
  score: number;
  isGameOver: boolean;
  hasWon: boolean;
  gridSize: number;
}
