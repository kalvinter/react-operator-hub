
import { useState } from 'react';

import { gameHistoryManager } from '../game/GameHistoryManager';

export function useGameHistory() {
  const [manager] = useState(gameHistoryManager);
  return manager;
}
