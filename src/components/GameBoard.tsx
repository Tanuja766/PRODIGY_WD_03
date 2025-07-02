import React from 'react';
import { Cell as CellType } from '../types/game';

interface GameBoardProps {
  board: CellType[];
  onCellClick: (index: number) => void;
  winningCells: number[];
  disabled: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick, winningCells, disabled }) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== null}
          className={`
            aspect-square w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28
            bg-white/20 backdrop-blur-sm rounded-xl border border-white/30
            flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl font-bold
            transition-all duration-300 transform hover:scale-105 hover:bg-white/30
            disabled:cursor-not-allowed active:scale-95
            ${winningCells.includes(index) 
              ? 'bg-gradient-to-br from-yellow-400/40 to-orange-500/40 border-yellow-400/50 animate-pulse' 
              : ''
            }
            ${cell === 'X' ? 'text-blue-400' : cell === 'O' ? 'text-purple-400' : 'text-transparent'}
            ${!cell && !disabled ? 'hover:shadow-lg hover:shadow-white/20' : ''}
          `}
        >
          {cell && (
            <span className="animate-in zoom-in-50 duration-300">
              {cell}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;