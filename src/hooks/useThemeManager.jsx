
import { useState } from 'react';

import ThemeManager from '../game/ThemeManager';

export function useThemeManager() {
  const [manager] = useState(() => {return new ThemeManager()});
  return manager;
}
