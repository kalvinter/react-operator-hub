import { GameEndTypes } from "./Config";

export const storedDataTypes = {
    // Finished Games
    gameHistory: "gameHistory",

    // Saved Games that can be resumed
    savedGames: "savedGames",

    // Preferences such as dark mode
    preferences: "preferences"
}

export class LocalStorageManager {
    save({storedDataType, data}){
        try {
            
            if (typeof data !== "string"){
                data = JSON.stringify(data)
            }

            localStorage.setItem(storedDataType, data);
        } catch (error) {
            console.error("Failed to save to local storage:", error);
        }
    }

    delete({storedDataType}){
        localStorage.removeItem(storedDataType)
    }

    load({storedDataType}){
        try {
            const serializedData = localStorage.getItem(storedDataType);
            if (serializedData === null) {
              return null;
            }
            return JSON.parse(serializedData);
        } catch (error) {
            console.error("Failed to load from local storage:", error);
            return null;
        }   
    }
}

export class gameHistoryEntry{
    constructor({date, timeRunningInSeconds, producedEnergy, achievedMatchedRate, averageProductionIntensity, gameStatus}){
        this.date = date
        this.timeRunningInSeconds = timeRunningInSeconds
        this.producedEnergy = producedEnergy
        this.achievedMatchedRate = achievedMatchedRate
        this.averageProductionIntensity = averageProductionIntensity
        this.gameStatus = gameStatus
    }

    serialize(){
        return {
            date: this.date.toISOString(),
            timeRunningInSeconds: this.timeRunningInSeconds,
            producedEnergy: this.producedEnergy,
            achievedMatchedRate: this.achievedMatchedRate,
            averageProductionIntensity: this.averageProductionIntensity,
            gameStatus: this.gameStatus
        }
    }

    static loadFromJson({parsedData}){
        try {
            console.log(parsedData)

            let date = new Date(parsedData.date)
            
            let gameStatus = parsedData.gameStatus

            if (!Object.values(GameEndTypes).includes(gameStatus)){
                throw Error(`ERROR: Received an invalid game status: '${gameStatus}'`)
            }

            return new gameHistoryEntry({
                date: date,
                timeRunningInSeconds: parsedData.timeRunningInSeconds,
                producedEnergy: parsedData.producedEnergy,
                achievedMatchedRate: parsedData.achievedMatchedRate,
                averageProductionIntensity: parsedData.averageProductionIntensity,
                gameStatus: parsedData.gameStatus
            })

        } catch (error) {
            console.error(`ERROR: Could not parse saved game history item: ${parsedData}. Error: ${error.message}`)
            return null
        }
    }
}

export class GameHistoryStorage {
    constructor(){
        this.storageManager = new LocalStorageManager()
        this.storedDataType = storedDataTypes.gameHistory
    }

    save({gameHistory}){
        console.log(gameHistory)

        return this.storageManager.save({
            storedDataType: this.storedDataType,
            data: gameHistory.map((item) => {return item.serialize()})
        })
    }

    deleteAllEntries(){
        this.storageManager.delete({storedDataType: this.storedDataType})
    }

    load(){
        let gameHistoryData = this.storageManager.load({
            storedDataType: this.storedDataType,
        })

        console.log(gameHistoryData)
        
        if (gameHistoryData === null || gameHistoryData === undefined){
            // return an empty list, if no gameHistory was saved yet
            return []
        }

        let gameHistory = []
        
        for (let entry of gameHistoryData){
            console.log(entry)
            let parsedGameHistoryEntry = gameHistoryEntry.loadFromJson({parsedData: entry})
            
            if (parsedGameHistoryEntry !== null){
                gameHistory.push(parsedGameHistoryEntry)
            }
        }
        
        // parse saved objects
        return gameHistory
    }
}
