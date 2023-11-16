import { render, screen } from '@testing-library/react'

import { afterEach, test, describe, expect } from 'vitest'
import GameHistoryPage, { gameHistoryPageTestId } from '../../pages/GameHistoryPage'

import { gameHistoryCardTestId } from '../../components/GameHistory'

import { storedDataTypes, gameHistoryEntry } from '../../game/Storage'
import { GameEndTypes } from '../../game/Config'

import { gameHistoryManager } from '../../game/GameHistoryManager'
import { MemoryRouter } from 'react-router-dom'

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
        let gameHistoryEntries = [
            new gameHistoryEntry({
                date: new Date(),
                timeRunningInSeconds: 50,
                shiftTimeLeft: 70,
                producedEnergy: 0,
                achievedMatchedRate: 0.2,
                demandMatchedStatusHistory: [],
                gameStatus: GameEndTypes.aborted,
            }).serialize(),
            new gameHistoryEntry({
                date: new Date(),
                timeRunningInSeconds: 120,
                shiftTimeLeft: 0,
                producedEnergy: 0,
                achievedMatchedRate: 1,
                demandMatchedStatusHistory: [],
                gameStatus: GameEndTypes.shiftWasFinished,
            }).serialize(),
        ]

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

        nodes.forEach((node) => {
            expect(node).toBeInTheDocument()
        })
    })
})
