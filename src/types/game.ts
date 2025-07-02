export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];
export type GameMode = 'pvp' | 'ai';
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  winningCells: number[];
  mode: GameMode;
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}