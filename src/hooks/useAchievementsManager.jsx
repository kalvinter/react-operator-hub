
import { useEffect, useState } from 'react';

import { achievementsManager, AchievementsManager } from '../game/Achievements';

export function useAchievementsManager() {
  // Suppose GameHistoryManager is a class with a method named logHistory
  const [manager] = useState(achievementsManager);

  return manager;
}
