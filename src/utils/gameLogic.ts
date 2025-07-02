import { Board, Player, Cell } from '../types/game';

export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export const createEmptyBoard = (): Board => Array(9).fill(null);

export const checkWinner = (board: Board): { winner: Player | null; winningCells: number[] } => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, winningCells: combination };
    }
  }
  return { winner: null, winningCells: [] };
};

export const isBoardFull = (board: Board): boolean => {
  return board.every(cell => cell !== null);
};

export const getAvailableMoves = (board: Board): number[] => {
  return board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
};

export const minimax = (board: Board, depth: number, isMaximizing: boolean, alpha: number = -Infinity, beta: number = Infinity): number => {
  const { winner } = checkWinner(board);
  
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (isBoardFull(board)) return 0;
  
  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of getAvailableMoves(board)) {
      board[move] = 'O';
      const evaluation = minimax(board, depth + 1, false, alpha, beta);
      board[move] = null;
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of getAvailableMoves(board)) {
      board[move] = 'X';
      const evaluation = minimax(board, depth + 1, true, alpha, beta);
      board[move] = null;
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

export const getBestMove = (board: Board): number => {
  let bestMove = -1;
  let bestValue = -Infinity;
  
  for (const move of getAvailableMoves(board)) {
    board[move] = 'O';
    const moveValue = minimax(board, 0, false);
    board[move] = null;
    
    if (moveValue > bestValue) {
      bestValue = moveValue;
      bestMove = move;
    }
  }
  
  return bestMove;
};