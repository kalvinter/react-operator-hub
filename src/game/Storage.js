import { v4 as uuidv4 } from 'uuid';

import { GameEndTypes } from './Config'
import { darkTheme, lightTheme } from './ThemeManager'

import { defaultReactorConfig } from './AvailableReactors';


export const storedDataTypes = {
    // Finished Games
    gameHistory: 'gameHistory',

    // Saved Games that can be resumed
    // Not yet implemented
    savedGames: 'savedGames',

    theme: 'theme',

    // currently selected reactor aka level
    reactorConfig: "reactorConfig"
}

export class LocalStorageManager {
    save({ storedDataType, data }) {
        try {
            if (typeof data !== 'string') {
                data = JSON.stringify(data)
            }

            localStorage.setItem(storedDataType, data)
        } catch (error) {
            console.error('Failed to save to local storage:', error)
        }
    }

    delete({ storedDataType }) {
        localStorage.removeItem(storedDataType)
    }

    load({ storedDataType }) {
        try {
            const serializedData = localStorage.getItem(storedDataType)

            if (serializedData === null) {
                return null
            }

            return JSON.parse(serializedData)
        } catch (error) {
            console.error('Failed to load from local storage:', error)
            return null
        }
    }
}

export class GameHistoryEntry {
    static requiredKeys = [
        'date',
        'timeRunningInSeconds',
        'shiftTimeLeft',
        'achievedMatchedRate',
        'demandMatchedStatusHistory',
        'gameStatus',
    ]

    constructor({
        id,
        date,
        timeRunningInSeconds,
        shiftTimeLeft,
        producedEnergy,
        achievedMatchedRate,
        demandMatchedStatusHistory,
        gameStatus,
    }) {
        this.id = id || uuidv4()
        this.date = date
        this.timeRunningInSeconds = timeRunningInSeconds
        this.shiftTimeLeft = shiftTimeLeft
        this.producedEnergy = producedEnergy
        this.achievedMatchedRate = achievedMatchedRate
        this.demandMatchedStatusHistory = demandMatchedStatusHistory
        this.gameStatus = gameStatus
    }

    serialize() {
        return {
            id: this.id,
            date: this.date.toISOString(),
            timeRunningInSeconds: this.timeRunningInSeconds,
            shiftTimeLeft: this.shiftTimeLeft,
            producedEnergy: this.producedEnergy,
            achievedMatchedRate: this.achievedMatchedRate,
            demandMatchedStatusHistory: this.demandMatchedStatusHistory,
            gameStatus: this.gameStatus,
        }
    }

    static loadFromJson({ parsedData }) {
        try {
            let date = new Date(parsedData.date)

            if (date.toISOString() !== parsedData.date){
                console.warn(
                    `ERROR: Could not parse date in saved game history item: ${parsedData}.
                     Discarding history entry.`
                )
                return null
            }

            let gameStatus = parsedData.gameStatus

            if (!Object.values(GameEndTypes).includes(gameStatus)) {
                throw Error(`ERROR: Received an invalid game status: '${gameStatus}'`)
            }

            if(!Object.keys(parsedData).includes("id")){
                // Ensuring backwards compatibility. Add an id if it does not exist yet
                parsedData.id = uuidv4()
            }

            for (let requiredKey of this.requiredKeys) {
                if (!Object.keys(parsedData).includes(requiredKey)) {
                    console.warn(`ERROR: Could not parse saved game history item: ${parsedData}. Missing 
                    required Key '${requiredKey}'. Discarding history entry.`)
                    return null
                }
            }
            
            return new GameHistoryEntry({
                id: parsedData.id,
                date: date,
                timeRunningInSeconds: parsedData.timeRunningInSeconds,
                shiftTimeLeft: parsedData.shiftTimeLeft,
                producedEnergy: parsedData.producedEnergy,
                achievedMatchedRate: parsedData.achievedMatchedRate,
                demandMatchedStatusHistory: parsedData.demandMatchedStatusHistory,
                gameStatus: parsedData.gameStatus,
            })
        } catch (error) {
            console.warn(`ERROR: Could not parse saved game history item: ${parsedData}. Error: ${error.message}`)
            return null
        }
    }
}

export class GameHistoryStorage {
    constructor() {
        this.storageManager = new LocalStorageManager()
        this.storedDataType = storedDataTypes.gameHistory
    }

    save({ gameHistoryData }) {
        console.log(gameHistoryData)

        let serializedGameHistoryData = {}

        for (let key of Object.keys(gameHistoryData)){
            serializedGameHistoryData[key] = []

            gameHistoryData[key].map(item => {
                serializedGameHistoryData[key].push(item.serialize())
            })
        }

        return this.storageManager.save({
            storedDataType: this.storedDataType,
            data: serializedGameHistoryData
        })
    }

    deleteAllEntries() {
        this.storageManager.delete({ storedDataType: this.storedDataType })
    }

    load() {
        let gameHistoryData = this.storageManager.load({
            storedDataType: this.storedDataType,
        })
        
        if (gameHistoryData === null || gameHistoryData === undefined) {
            // return an empty object, if no gameHistory was saved yet
            return {}
        }

        /* Ensure backwards compatibility 
        * In an earlier app version, the game history was saved directly as a list because there was only one reactor
        * In this case, transform it to the new format
        */
       if (Array.isArray(gameHistoryData)){
            let tempGameHistory = gameHistoryData
            gameHistoryData = {}
            gameHistoryData[defaultReactorConfig.key] = tempGameHistory
       }

        let gameHistory = {}

        for (let key of Object.keys(gameHistoryData)){
            gameHistory[key] = []

            gameHistoryData[key].map(entry => {
                let parsedGameHistoryEntry = GameHistoryEntry.loadFromJson({parsedData: entry})
                console.warn("RETOURNED PARSEDATA, ", parsedGameHistoryEntry)
                if (parsedGameHistoryEntry !== null){
                    gameHistory[key].push(parsedGameHistoryEntry)
                }
            })
        }

        // parse saved objects
        console.log("gameHistory, ", gameHistory)
        return gameHistory
    }
}

export class ThemeStorage {
    constructor() {
        this.storageManager = new LocalStorageManager()
        this.storedDataType = storedDataTypes.theme
    }

    save({ data }) {
        // console.log(data)

        return this.storageManager.save({
            storedDataType: this.storedDataType,
            data: data,
        })
    }

    deleteAllEntries() {
        this.storageManager.delete({ storedDataType: this.storedDataType })
    }

    load() {
        let themeData = this.storageManager.load({
            storedDataType: this.storedDataType,
        })

        console.log("themeData, ", themeData)

        if (themeData === null || themeData === undefined) {
            // if no theme was selected before, use the system Preference
            const systemPreferenceDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

            let theme = systemPreferenceDarkMode ? darkTheme.key : lightTheme.key

            return {
                theme: theme,
            }
        }

        // parse saved objects
        return themeData
    }
}

class ReactorConfigStorage {
    constructor() {
        this.storageManager = new LocalStorageManager()
        this.storedDataType = storedDataTypes.reactorConfig
    }

    save({ data }) {
        // console.log(data)
        return this.storageManager.save({
            storedDataType: this.storedDataType,
            data: data,
        })
    }

    deleteAllEntries() {
        this.storageManager.delete({ storedDataType: this.storedDataType })
    }

    load() {
        let reactorConfigData = this.storageManager.load({
            storedDataType: this.storedDataType,
        })

        if (reactorConfigData === null || reactorConfigData === undefined) {
            // if no reactor was selected before, use the default reactorConfig
            
            return {
                reactorConfigKey: defaultReactorConfig.key,
            }
        }

        // parse saved objects
        return reactorConfigData
    }
}

export const reactorConfigStorage = new ReactorConfigStorage()
export const gameHistoryStorage = new GameHistoryStorage()
