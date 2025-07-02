import { useState, useCallback, useEffect } from 'react';
import { GameState, Player, GameMode } from '../types/game';
import { createEmptyBoard, checkWinner, isBoardFull, getBestMove } from '../utils/gameLogic';

const initialGameState: GameState = {
  board: createEmptyBoard(),
  currentPlayer: 'X',
  status: 'playing',
  winner: null,
  winningCells: [],
  mode: 'pvp',
  scores: {
    X: 0,
    O: 0,
    draws: 0
  }
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const makeMove = useCallback((cellIndex: number) => {
    if (gameState.board[cellIndex] || gameState.status !== 'playing') return;

    setGameState(prev => {
      const newBoard = [...prev.board];
      newBoard[cellIndex] = prev.currentPlayer;

      const { winner, winningCells } = checkWinner(newBoard);
      const isDraw = !winner && isBoardFull(newBoard);

      let newScores = prev.scores;
      if (winner) {
        newScores = { ...prev.scores, [winner]: prev.scores[winner] + 1 };
      } else if (isDraw) {
        newScores = { ...prev.scores, draws: prev.scores.draws + 1 };
      }

      return {
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        status: winner ? 'won' : isDraw ? 'draw' : 'playing',
        winner,
        winningCells,
        scores: newScores
      };
    });
  }, [gameState.board, gameState.status]);

  const makeAIMove = useCallback(() => {
    if (gameState.mode !== 'ai' || gameState.currentPlayer !== 'O' || gameState.status !== 'playing') return;

    setTimeout(() => {
      const bestMove = getBestMove([...gameState.board]);
      if (bestMove !== -1) {
        makeMove(bestMove);
      }
    }, 500);
  }, [gameState.mode, gameState.currentPlayer, gameState.status, gameState.board, makeMove]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: createEmptyBoard(),
      currentPlayer: 'X',
      status: 'playing',
      winner: null,
      winningCells: []
    }));
  }, []);

  const changeMode = useCallback((mode: GameMode) => {
    setGameState(prev => ({
      ...initialGameState,
      mode,
      scores: prev.scores
    }));
  }, []);

  const resetScores = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      scores: { X: 0, O: 0, draws: 0 }
    }));
  }, []);

  useEffect(() => {
    makeAIMove();
  }, [makeAIMove]);

  return {
    gameState,
    makeMove,
    resetGame,
    changeMode,
    resetScores
  };
};