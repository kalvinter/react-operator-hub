import { render, screen, fireEvent } from '@testing-library/react'

import { afterEach, test, describe, expect } from 'vitest'

import { gameHistoryCardTestId } from '../../components/GameHistory'

import { storedDataTypes } from '../../game/Storage'

import { gameHistoryManager } from '../../game/GameHistoryManager'

import App, {appTestId} from '../../pages/App'

import { gameHistoryEntriesUnlockingAchievments } from '../utils'
import { MemoryRouter } from 'react-router-dom'
import { achievementBadgeTestId, unlockedAchievementBadgeTestId } from '../../components/Achievements'
import { achievementsManager } from '../../game/Achievements'
import { startGameButtonTestId } from '../../components/StartShiftCTA'
import { gameTestId } from '../../pages/Game'
import { quitButtonTestId } from '../../components/gameui/TopBar'

function checkAppMainComponentsLoaded(screen){
    expect(screen.getByTestId(appTestId)).toBeInTheDocument()

    expect(screen.getByTestId(appTestId)).toBeInTheDocument()
        
    let startGameButton = screen.getByTestId(startGameButtonTestId)
    expect(startGameButton).toBeInTheDocument()
}


describe('page loads without error', () => {
    afterEach(() => {
        localStorage.clear()
    })

    test('page loads with no GameHistory', () => {
        localStorage.setItem(storedDataTypes.gameHistory, JSON.stringify([]))

        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )

        checkAppMainComponentsLoaded(screen)
    })

    test('with GameHistoryItems and unlocked achievements', () => {
        let gameHistoryEntries = []

        gameHistoryEntriesUnlockingAchievments.map((entry) => {
            gameHistoryEntries.push(entry.serialize())
        })

        localStorage.setItem(storedDataTypes.gameHistory, JSON.stringify(gameHistoryEntries))

        /* Manually reload from storage
         * This is necessary as the data is loaded during import but the fake data is added later in the
         * beginning of the test
         */
        gameHistoryManager.reloadHistoryFromStorage()

        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )

        checkAppMainComponentsLoaded(screen)

        // The screen should include two GameHistoryCards
        let nodes = screen.getAllByTestId(gameHistoryCardTestId)

        expect(nodes.length).equals(2)

        nodes.forEach((node) => {
            expect(node).toBeInTheDocument()
        })

        // There should be an achievement card per available achievement
        // two are already unlocked
        expect(screen.getAllByTestId(achievementBadgeTestId).length).equals(
            achievementsManager.availableAchievements.length - 2
        )

        // There should be two unlocked achievements since there is no game history
        expect(screen.getAllByTestId(unlockedAchievementBadgeTestId).length).equals(2)
    })
})

describe('game', () => {
    afterEach(() => {
        localStorage.clear()
    })

    test('game starts and exits without error', () => {
        localStorage.setItem(storedDataTypes.gameHistory, JSON.stringify([]))

        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )
        
        checkAppMainComponentsLoaded(screen)
        
        let startGameButton = screen.getByTestId(startGameButtonTestId)
        fireEvent.click(startGameButton)

        expect(screen.getByTestId(gameTestId)).toBeInTheDocument()

        let quitGameButton = screen.getByTestId(quitButtonTestId)
        expect(quitGameButton).toBeInTheDocument()

        fireEvent.click(quitGameButton)

        checkAppMainComponentsLoaded(screen)
    })
})
