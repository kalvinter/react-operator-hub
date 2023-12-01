import { gameHistoryStorage } from './Storage'

import { defaultReactorConfig } from './AvailableReactors'

export class GameHistoryManager {
    constructor({activeReactorConfigKey}) {
        this.gameHistoryStorage = gameHistoryStorage
        this.gameHistoryData = this.gameHistoryStorage.load()
        this.changeActiveReactorConfig({activeReactorConfigKey: activeReactorConfigKey || defaultReactorConfig.key})
    }

    changeActiveReactorConfig({activeReactorConfigKey}){
        this.activeReactorConfigKey = activeReactorConfigKey
        this.gameHistory = []

        if (Object.keys(this.gameHistoryData).includes(this.activeReactorConfigKey)){
            this.gameHistory = this.gameHistoryData[this.activeReactorConfigKey]
        }
    }

    addNewEntry(newGameHistory) {
        console.log(newGameHistory)
        this.gameHistory = [newGameHistory, ...this.gameHistory]

        this.gameHistoryData[this.activeReactorConfigKey] = this.gameHistory

        this.gameHistoryStorage.save({
            gameHistoryData: this.gameHistoryData
        })
    }

    deleteGameHistory() {
        this.gameHistoryStorage.deleteAllEntries()
        this.gameHistory = []
    }

    reloadHistoryFromStorage() {
        this.gameHistoryData = this.gameHistoryStorage.load()
        this.changeActiveReactorConfig({activeReactorConfig: this.activeReactorConfig})
    }
}
