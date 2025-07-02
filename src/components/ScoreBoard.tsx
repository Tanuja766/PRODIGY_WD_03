import React from 'react';
import { GameMode } from '../types/game';

interface ScoreBoardProps {
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  mode: GameMode;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores, mode }) => {
  return (
    <div className="flex justify-center gap-6 sm:gap-8">
      <div className="text-center">
        <div className="text-blue-400 text-xl sm:text-2xl font-bold">
          Player X
        </div>
        <div className="text-white text-2xl sm:text-3xl font-bold">
          {scores.X}
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-amber-400 text-xl sm:text-2xl font-bold">
          Draws
        </div>
        <div className="text-white text-2xl sm:text-3xl font-bold">
          {scores.draws}
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-purple-400 text-xl sm:text-2xl font-bold">
          {mode === 'ai' ? 'AI' : 'Player O'}
        </div>
        <div className="text-white text-2xl sm:text-3xl font-bold">
          {scores.O}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;