import { render, screen } from '@testing-library/react'

import { afterEach, test, describe, expect } from 'vitest'

import AchievementsPage from '../../pages/Achievements'
import { achievementBadgeTestId, unlockedAchievementBadgeTestId } from '../../components/Achievements'

import { achievementsPageTestId } from '../../pages/Achievements'

import { achievementsManager } from '../../game/Achievements'

import { storedDataTypes } from '../../game/Storage'

import { MemoryRouter } from 'react-router-dom'
import { gameHistoryEntriesUnlockingAchievments } from '../utils'

describe('page loads without error', () => {
    afterEach(() => {
        localStorage.clear()
    })

    test('page loads with no unlocked achievements', () => {
        localStorage.setItem(storedDataTypes.gameHistory, JSON.stringify([]))

        render(
            <MemoryRouter>
                <AchievementsPage />
            </MemoryRouter>
        )

        expect(screen.getByTestId(achievementsPageTestId)).toBeInTheDocument()

        // There should be one locked achievement card per available achievement
        expect(screen.getAllByTestId(achievementBadgeTestId).length).equals(
            achievementsManager.availableAchievements.length
        )

        // There should be no unlocked achievements since there is no game history
        expect(screen.queryAllByTestId(unlockedAchievementBadgeTestId).length).equals(0)
    })

    test('with GameHistoryItems and unlocked achievements', () => {
        // Manually re-check gamehistory in the manager class.
        achievementsManager.checkGameHistoryEntries({
            gameHistoryEntries: gameHistoryEntriesUnlockingAchievments,
            unlockAchievements: true,
        })

        render(
            <MemoryRouter>
                <AchievementsPage />
            </MemoryRouter>
        )

        expect(screen.getByTestId(achievementsPageTestId)).toBeInTheDocument()

        // There should be an achievement card per available achievement
        // two are already unlocked
        expect(screen.getAllByTestId(achievementBadgeTestId).length).equals(
            achievementsManager.availableAchievements.length - 2
        )

        // There should be two unlocked achievements since there is no game history
        expect(screen.getAllByTestId(unlockedAchievementBadgeTestId).length).equals(2)
    })
})
