import React from 'react';
import { RotateCcw, Users, Bot, Trophy } from 'lucide-react';
import { GameMode } from '../types/game';

interface GameControlsProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onReset: () => void;
  onResetScores: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ mode, onModeChange, onReset, onResetScores }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <div className="flex gap-2">
        <button
          onClick={() => onModeChange('pvp')}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2
            ${mode === 'pvp' 
              ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
              : 'bg-white/20 text-white/80 hover:bg-white/30 hover:text-white'
            }
          `}
        >
          <Users size={18} />
          Player vs Player
        </button>
        
        <button
          onClick={() => onModeChange('ai')}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2
            ${mode === 'ai' 
              ? 'bg-purple-500 text-white shadow-lg transform scale-105' 
              : 'bg-white/20 text-white/80 hover:bg-white/30 hover:text-white'
            }
          `}
        >
          <Bot size={18} />
          Player vs AI
        </button>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onReset}
          className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
        >
          <RotateCcw size={18} />
          New Game
        </button>
        
        <button
          onClick={onResetScores}
          className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
        >
          <Trophy size={18} />
          Reset Scores
        </button>
      </div>
    </div>
  );
};

export default GameControls;