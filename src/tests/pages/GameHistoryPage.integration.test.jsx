import { render, screen } from '@testing-library/react'

import { afterEach, test, describe, expect } from 'vitest'
import GameHistoryPage, { gameHistoryPageTestId } from '../../pages/GameHistoryPage'

import { gameHistoryCardTestId } from '../../components/GameHistory'

import { storedDataTypes } from '../../game/Storage'

import { gameHistoryManager } from '../../game/GameHistoryManager'
import { MemoryRouter } from 'react-router-dom'
import { gameHistoryEntriesUnlockingAchievments } from '../utils'

describe('page loads without error', () => {
    afterEach(() => {
        localStorage.clear()
    })

    test('page loads with no GameHistory', () => {
        localStorage.setItem(storedDataTypes.gameHistory, JSON.stringify([]))

        render(
            <MemoryRouter>
                <GameHistoryPage />
            </MemoryRouter>
        )

        expect(screen.getByTestId(gameHistoryPageTestId)).toBeInTheDocument()

        // Assertions to check if the page loaded correctly with setting A
        expect(screen.getByText(/0 Entries/)).toBeInTheDocument()
    })

    test('with GameHistoryItems', () => {
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
                <GameHistoryPage />
            </MemoryRouter>
        )

        expect(screen.getByTestId(gameHistoryPageTestId)).toBeInTheDocument()

        // The screen should read the correct entry number
        expect(screen.getByText(/2 Entries/)).toBeInTheDocument()

        // The screen should include two GameHistoryCards
        let nodes = screen.getAllByTestId(gameHistoryCardTestId)
        
        expect(nodes.length).equals(2)

        nodes.forEach((node) => {
            expect(node).toBeInTheDocument()
        })
    })
})
