

import { render, screen } from '@testing-library/react';

import { afterEach, test, describe, expect } from 'vitest';

import AchievementsPage from '../../pages/Achievements';
import { achievementBadgeTestId, unlockedAchievementBadgeTestId } from '../../components/Achievements';

import { achievemenetsPageTestId } from '../../pages/Achievements';

import { achievementsManager } from '../../game/Achievements';

import { storedDataTypes, gameHistoryEntry } from '../../game/Storage';
import { GameEndTypes } from '../../game/Config';

import { MemoryRouter } from 'react-router-dom';


describe('page loads without error', () => {
      
      afterEach(() => {
          localStorage.clear()
      })

    test('page loads with no unlocked achievements', () => {
      localStorage.setItem(storedDataTypes.gameHistory, JSON.stringify([]));

      render(
        <MemoryRouter>
          <AchievementsPage />
        </MemoryRouter>
      );
    
      expect(screen.getByTestId(achievemenetsPageTestId)).toBeInTheDocument();
      
      // There should be one locked achievement card per available achievement
      expect(screen.getAllByTestId(achievementBadgeTestId).length).equals(achievementsManager.availableAchievements.length)

      // There should be no unlocked achievements since there is no game history
      expect(screen.queryAllByTestId(unlockedAchievementBadgeTestId).length).equals(0)
    });

    test('with GameHistoryItems and unlocked achievements', () => {
        // Each entry will unlock one achievement (100% matched rate & 1 aborted)
        let gameHistoryEntries = [
          new gameHistoryEntry({
              date: new Date(),
              timeRunningInSeconds: 50,
              shiftTimeLeft: 70,
              producedEnergy: 0,
              achievedMatchedRate: 0.2,
              demandMatchedStatusHistory: [],
              gameStatus: GameEndTypes.aborted
          }),
          new gameHistoryEntry({
            date: new Date(),
            timeRunningInSeconds: 120,
            shiftTimeLeft: 0,
            producedEnergy: 0,
            achievedMatchedRate: 1,
            demandMatchedStatusHistory: [],
            gameStatus: GameEndTypes.shiftWasFinished
          })
        ]

        // Manually re-check gamehistory in the manager class.
        achievementsManager.checkGameHistoryEntries({
          gameHistoryEntries: gameHistoryEntries,
          unlockAchievements: true
        })
                
        render(
          <MemoryRouter>
            <AchievementsPage />
          </MemoryRouter>
        );
      
        expect(screen.getByTestId(achievemenetsPageTestId)).toBeInTheDocument();
      
      
        // There should be an achievement card per available achievement
        expect(screen.getAllByTestId(achievementBadgeTestId).length).equals(
          achievementsManager.availableAchievements.length - 2
        )
        
        // There should be two unlocked achievements since there is no game history
        expect(screen.getAllByTestId(unlockedAchievementBadgeTestId).length).equals(2)
      });
})
