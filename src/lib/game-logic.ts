import type { Board, Direction, TileValue, GameBoard, GameTile } from '@/types/game';
import { GRID_SIZE, WIN_TILE_VALUE, INITIAL_TILES_COUNT } from './game-constants';

let tileIdCounter = 0;
const generateTileId = () => `tile-${tileIdCounter++}`;

const createNewGameTile = (value: TileValue, isNew: boolean = false): GameTile => ({
  id: generateTileId(),
  value,
  isNew,
  isMerged: false,
});

export const initializeGameBoard = (size: number = GRID_SIZE): GameBoard => {
  const newBoard = Array(size)
    .fill(null)
    .map(() => Array(size).fill(null).map(() => createNewGameTile(0)));
  
  let tilesAdded = 0;
  while (tilesAdded < INITIAL_TILES_COUNT) {
    if (!addRandomTile(newBoard, true)) break; // Break if board is full
    tilesAdded++;
  }
  return newBoard;
};

export const getEmptyCells = (board: GameBoard): { r: number; c: number }[] => {
  const emptyCells: { r: number; c: number }[] = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c].value === 0) {
        emptyCells.push({ r, c });
      }
    }
  }
  return emptyCells;
};

export const addRandomTile = (board: GameBoard, isInitial: boolean = false): boolean => {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) {
    return false; // No space to add a new tile
  }

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newValue = Math.random() < 0.9 ? 2 : 4;
  
  board[randomCell.r][randomCell.c] = createNewGameTile(newValue as TileValue, !isInitial);
  return true;
};

// Helper to reset animation flags
const resetAnimationFlags = (board: GameBoard): void => {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      board[r][c].isNew = false;
      board[r][c].isMerged = false;
    }
  }
};

// Core move logic for a single line (row or column)
const processLine = (line: GameTile[]): { newLine: GameTile[]; scoreGained: number; moved: boolean } => {
  let scoreGained = 0;
  let moved = false;

  // 1. Slide non-zero tiles to the beginning
  const filteredLine = line.filter(tile => tile.value !== 0);
  
  const newLineTiles: GameTile[] = [];
  
  // 2. Merge tiles
  for (let i = 0; i < filteredLine.length; i++) {
    if (i + 1 < filteredLine.length && filteredLine[i].value === filteredLine[i + 1].value) {
      const mergedValue = (filteredLine[i].value * 2) as TileValue;
      newLineTiles.push({...createNewGameTile(mergedValue), isMerged: true});
      scoreGained += mergedValue;
      i++; // Skip next tile as it's merged
      moved = true;
    } else {
      newLineTiles.push(filteredLine[i]);
    }
  }

  // 3. Check if anything moved before merge
  if (!moved && filteredLine.length !== line.filter(t => t.value !== 0).length) {
     moved = true;
  }
  if (!moved) {
    for(let i=0; i < filteredLine.length; i++) {
        if(filteredLine[i].id !== line.filter(t => t.value !==0)[i]?.id) {
            moved = true;
            break;
        }
    }
  }


  // 4. Pad with empty tiles
  const resultLine: GameTile[] = Array(line.length).fill(null).map((_, i) => 
    newLineTiles[i] ? newLineTiles[i] : createNewGameTile(0)
  );
  
  // Check if the line actually changed
  if (!moved) {
    for (let i = 0; i < line.length; i++) {
      if (line[i].value !== resultLine[i].value) {
        moved = true;
        break;
      }
    }
  }

  return { newLine: resultLine, scoreGained, moved };
};


export const moveTiles = (currentBoard: GameBoard, direction: Direction): { newBoard: GameBoard; scoreGained: number; moved: boolean } => {
  const size = currentBoard.length;
  let newBoard = currentBoard.map(row => row.map(tile => ({ ...tile, isNew: false, isMerged: false }))); // Deep copy and reset flags
  let scoreGained = 0;
  let movedOverall = false;

  if (direction === 'LEFT' || direction === 'RIGHT') {
    for (let r = 0; r < size; r++) {
      let row = newBoard[r];
      if (direction === 'RIGHT') row = [...row].reverse();
      
      const { newLine, scoreGained: lineScore, moved: lineMoved } = processLine(row);
      
      newBoard[r] = direction === 'RIGHT' ? [...newLine].reverse() : newLine;
      scoreGained += lineScore;
      if (lineMoved) movedOverall = true;
    }
  } else if (direction === 'UP' || direction === 'DOWN') {
    for (let c = 0; c < size; c++) {
      let col: GameTile[] = [];
      for (let r = 0; r < size; r++) col.push(newBoard[r][c]);
      
      if (direction === 'DOWN') col = [...col].reverse();
      
      const { newLine, scoreGained: lineScore, moved: lineMoved } = processLine(col);
      
      const finalCol = direction === 'DOWN' ? [...newLine].reverse() : newLine;
      for (let r = 0; r < size; r++) newBoard[r][c] = finalCol[r];
      scoreGained += lineScore;
      if (lineMoved) movedOverall = true;
    }
  }
  
  return { newBoard, scoreGained, moved: movedOverall };
};


export const checkForWin = (board: GameBoard): boolean => {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c].value === WIN_TILE_VALUE) {
        return true;
      }
    }
  }
  return false;
};

export const isBoardFull = (board: GameBoard): boolean => {
  return getEmptyCells(board).length === 0;
};

const canTilesMerge = (board: GameBoard): boolean => {
  const size = board.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const currentValue = board[r][c].value;
      if (currentValue === 0) continue; // Should not happen if board is full, but good check

      // Check right neighbor
      if (c + 1 < size && board[r][c + 1].value === currentValue) return true;
      // Check bottom neighbor
      if (r + 1 < size && board[r + 1][c].value === currentValue) return true;
    }
  }
  return false;
};

export const checkGameOver = (board: GameBoard): boolean => {
  if (!isBoardFull(board)) {
    return false; // Not game over if there are empty cells
  }
  // Board is full, check if any merges are possible
  return !canTilesMerge(board);
};

export const getTileColors = (value: TileValue): { background: string; text: string; fontSize: string } => {
  let background = 'hsl(var(--game-tile-empty-bg))';
  let text = 'hsl(var(--foreground))';
  let fontSize = 'text-2xl sm:text-3xl'; // Default font size

  switch (value) {
    case 0:
      return { background, text: 'transparent', fontSize }; // Empty tile text is transparent
    case 2:
      background = 'hsl(30 50% 95%)'; text = 'hsl(20 15% 25%)';
      break;
    case 4:
      background = 'hsl(35 60% 90%)'; text = 'hsl(20 15% 25%)';
      break;
    case 8:
      background = 'hsl(33 100% 75%)'; text = 'hsl(0 0% 100%)';
      break;
    case 16:
      background = 'hsl(30 100% 70%)'; text = 'hsl(0 0% 100%)';
      break;
    case 32:
      background = 'hsl(25 100% 65%)'; text = 'hsl(0 0% 100%)';
      break;
    case 64:
      background = 'hsl(15 100% 60%)'; text = 'hsl(0 0% 100%)';
      break;
    case 128:
      background = 'hsl(50 80% 70%)'; text = 'hsl(0 0% 100%)'; fontSize = 'text-xl sm:text-2xl';
      break;
    case 256:
      background = 'hsl(48 90% 65%)'; text = 'hsl(0 0% 100%)'; fontSize = 'text-xl sm:text-2xl';
      break;
    case 512:
      background = 'hsl(46 100% 60%)'; text = 'hsl(0 0% 100%)'; fontSize = 'text-xl sm:text-2xl';
      break;
    case 1024:
      background = 'hsl(44 100% 55%)'; text = 'hsl(0 0% 100%)'; fontSize = 'text-lg sm:text-xl';
      break;
    case 2048:
      background = 'hsl(42 100% 50%)'; text = 'hsl(0 0% 100%)'; fontSize = 'text-lg sm:text-xl';
      break;
    default: // For values > 2048
      background = 'hsl(210 100% 50%)'; text = 'hsl(0 0% 100%)'; fontSize = 'text-base sm:text-lg'; // A distinct color like blue
      break;
  }
  return { background, text, fontSize };
};
