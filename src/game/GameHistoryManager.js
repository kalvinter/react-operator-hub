import { gameHistoryStorage } from './Storage'

class GameHistoryManager {
    constructor() {
        this.gameHistoryStorage = gameHistoryStorage
        this.gameHistory = this.gameHistoryStorage.load()
    }

    addNewEntry(newGameHistory) {
        this.gameHistory = [newGameHistory, ...this.gameHistory]
        this.gameHistoryStorage.save({
            gameHistory: this.gameHistory,
        })
    }

    deleteGameHistory() {
        this.gameHistoryStorage.deleteAllEntries()
        this.gameHistory = []
    }

    reloadHistoryFromStorage() {
        this.gameHistory = this.gameHistoryStorage.load()
    }
}

export const gameHistoryManager = new GameHistoryManager()
