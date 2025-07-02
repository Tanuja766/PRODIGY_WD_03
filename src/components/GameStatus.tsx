import React from 'react';
import { GameStatus as GameStatusType, Player, GameMode } from '../types/game';

interface GameStatusProps {
  status: GameStatusType;
  currentPlayer: Player;
  winner: Player | null;
  mode: GameMode;
}

const GameStatus: React.FC<GameStatusProps> = ({ status, currentPlayer, winner, mode }) => {
  const getStatusMessage = () => {
    switch (status) {
      case 'won':
        if (mode === 'ai' && winner === 'O') {
          return "AI Wins! 🤖";
        }
        return `Player ${winner} Wins! 🎉`;
      case 'draw':
        return "It's a Draw! 🤝";
      case 'playing':
        if (mode === 'ai' && currentPlayer === 'O') {
          return "AI is thinking... 🤔";
        }
        return `Player ${currentPlayer}'s Turn`;
      default:
        return "";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'won':
        return winner === 'X' ? 'text-blue-400' : 'text-purple-400';
      case 'draw':
        return 'text-amber-400';
      case 'playing':
        return currentPlayer === 'X' ? 'text-blue-400' : 'text-purple-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className={`text-2xl sm:text-3xl font-bold text-center ${getStatusColor()} transition-colors duration-300`}>
      {getStatusMessage()}
    </div>
  );
};

export default GameStatus;