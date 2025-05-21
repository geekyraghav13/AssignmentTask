"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Board from '@/components/game/Board';
import GameControls from '@/components/game/GameControls';
import ScoreDisplay from '@/components/game/ScoreDisplay';
import GameStatusDialog from '@/components/game/GameStatusDialog';
import { initializeGameBoard, moveTiles, addRandomTile, checkForWin, checkGameOver } from '@/lib/game-logic';
import type { GameBoard, Direction, GameState } from '@/types/game';
import { GRID_SIZE } from '@/lib/game-constants';
import { Button } from '@/components/ui/button'; // For potential future use e.g. theme toggle
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TwentyFortyFunPage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: initializeGameBoard(GRID_SIZE),
    score: 0,
    isGameOver: false,
    hasWon: false,
    gridSize: GRID_SIZE,
  }));

  const [showDialog, setShowDialog] = useState(false);

  const resetGame = useCallback(() => {
    setGameState({
      board: initializeGameBoard(GRID_SIZE),
      score: 0,
      isGameOver: false,
      hasWon: false,
      gridSize: GRID_SIZE,
    });
    setShowDialog(false);
  }, []);

  const handleMove = useCallback((direction: Direction) => {
    if (gameState.isGameOver || gameState.hasWon) return;

    const { newBoard, scoreGained, moved } = moveTiles(gameState.board, direction);

    let currentScore = gameState.score + scoreGained;
    let boardAfterMove = newBoard;

    if (moved) {
      addRandomTile(boardAfterMove); // Add new tile only if something moved
    }
    
    const gameWon = checkForWin(boardAfterMove);
    // Game over check should be done after checking for win and potentially adding new tile
    const gameOver = checkGameOver(boardAfterMove);

    setGameState(prev => ({
      ...prev,
      board: boardAfterMove,
      score: currentScore,
      isGameOver: gameOver && !gameWon, // Game over only if not won
      hasWon: gameWon,
    }));

    if (gameWon || (gameOver && !gameWon)) {
      setShowDialog(true);
    }

  }, [gameState.board, gameState.score, gameState.isGameOver, gameState.hasWon]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState.isGameOver || gameState.hasWon) return;

      let direction: Direction | null = null;
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          direction = 'UP';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          direction = 'DOWN';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          direction = 'LEFT';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          direction = 'RIGHT';
          break;
      }

      if (direction) {
        event.preventDefault(); // Prevent page scrolling
        handleMove(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleMove, gameState.isGameOver, gameState.hasWon]);
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-2 sm:mb-0">TwentyFortyFun</h1>
          <ScoreDisplay score={gameState.score} />
        </header>
        
        <Card className="mb-6 shadow-xl border-2 border-primary/50 bg-card">
          <CardContent className="p-2 sm:p-3">
             <Board board={gameState.board} />
          </CardContent>
        </Card>

        <GameControls 
          onMove={handleMove} 
          onRestart={resetGame}
          isGameOverOrWon={gameState.isGameOver || gameState.hasWon}
        />

        <footer className="mt-8 text-center text-muted-foreground text-sm">
          <p>Use arrow keys or WASD to move tiles. Combine tiles to reach 2048!</p>
          <p>Inspired by the original 2048 game.</p>
        </footer>
      </div>

      <GameStatusDialog
        isOpen={showDialog}
        status={gameState.hasWon ? 'WIN' : 'GAME_OVER'}
        score={gameState.score}
        onRestart={resetGame}
      />
    </main>
  );
};

export default TwentyFortyFunPage;
