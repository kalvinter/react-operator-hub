import { GameEndTypes } from "./Config";
import { defaultTheme } from "./ThemeManager";

export const storedDataTypes = {
    // Finished Games
    gameHistory: "gameHistory",

    // Saved Games that can be resumed
    savedGames: "savedGames",

    
    theme: "theme"
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
    constructor({date, timeRunningInSeconds, shiftTimeLeft, producedEnergy, achievedMatchedRate, demandMatchedStatusHistory, gameStatus}){
        this.date = date
        this.timeRunningInSeconds = timeRunningInSeconds
        this.shiftTimeLeft = shiftTimeLeft
        this.producedEnergy = producedEnergy
        this.achievedMatchedRate = achievedMatchedRate
        this.demandMatchedStatusHistory = demandMatchedStatusHistory
        this.gameStatus = gameStatus
    }

    serialize(){
        return {
            date: this.date.toISOString(),
            timeRunningInSeconds: this.timeRunningInSeconds,
            shiftTimeLeft: this.shiftTimeLeft,
            producedEnergy: this.producedEnergy,
            achievedMatchedRate: this.achievedMatchedRate,
            demandMatchedStatusHistory: this.demandMatchedStatusHistory,
            gameStatus: this.gameStatus
        }
    }

    static loadFromJson({parsedData}){
        try {
            let date = new Date(parsedData.date)
            
            let gameStatus = parsedData.gameStatus

            if (!Object.values(GameEndTypes).includes(gameStatus)){
                throw Error(`ERROR: Received an invalid game status: '${gameStatus}'`)
            }

            let requiredKeys = [
                "date",
                "timeRunningInSeconds",
                "shiftTimeLeft",
                "achievedMatchedRate",
                "demandMatchedStatusHistory",
                "gameStatus"
            ]

            requiredKeys.map((requiredKey) => {
                if (!Object.keys(parsedData).includes(requiredKey)){
                    console.error(`ERROR: Could not parse saved game history item: ${parsedData}. Missing 
                    required Key '${requiredKey}'. Discarding history entry.`)
                }
                return null
            })

            return new gameHistoryEntry({
                date: date,
                timeRunningInSeconds: parsedData.timeRunningInSeconds,
                shiftTimeLeft: parsedData.shiftTimeLeft,
                producedEnergy: parsedData.producedEnergy,
                achievedMatchedRate: parsedData.achievedMatchedRate,
                demandMatchedStatusHistory: parsedData.demandMatchedStatusHistory,
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
        // console.log(gameHistory)

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

        // console.log(gameHistoryData)
        
        if (gameHistoryData === null || gameHistoryData === undefined){
            // return an empty list, if no gameHistory was saved yet
            return []
        }

        let gameHistory = []
        
        for (let entry of gameHistoryData){
            let parsedGameHistoryEntry = gameHistoryEntry.loadFromJson({parsedData: entry})
            
            if (parsedGameHistoryEntry !== null){
                gameHistory.push(parsedGameHistoryEntry)
            }
        }
        // parse saved objects
        return gameHistory
    }
}

export class ThemeStorage{
    constructor(){
        this.storageManager = new LocalStorageManager()
        this.storedDataType = storedDataTypes.theme
    }
    
    save({data}){
        // console.log(data)

        return this.storageManager.save({
            storedDataType: this.storedDataType,
            data: data
        })
    }

    deleteAllEntries(){
        this.storageManager.delete({storedDataType: this.storedDataType})
    }

    load(){
        let themeData = this.storageManager.load({
            storedDataType: this.storedDataType,
        })

        // console.log(themeData)
        
        if (themeData === null || themeData === undefined){
            // return an empty list, if no gameHistory was saved yet
            return {
                theme: defaultTheme
            }
        }
        
        // parse saved objects
        return themeData
    }
}


export const gameHistoryStorage = new GameHistoryStorage()
