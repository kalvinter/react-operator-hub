
import { afterEach, describe, expect, test } from "vitest";
import { v4 as uuidv4 } from 'uuid';

import { defaultReactorConfig } from "../../game/AvailableReactors";

import { GameHistoryEntry, gameHistoryStorage, storedDataTypes } from "../../game/Storage";
import { GameEndTypes } from "../../game/Config";

afterEach(() => {
    localStorage.clear()
})

const getValidGameHistoryEntry = () => {
    return new GameHistoryEntry({
        id: uuidv4(),
        date: new Date(),
        timeRunningInSeconds: 50,
        shiftTimeLeft: 70,
        producedEnergy: 0,
        achievedMatchedRate: 0.2,
        demandMatchedStatusHistory: [],
        gameStatus: GameEndTypes.aborted,
    })
}

describe("test backwards compatibility with older game histories", () => {
    test("parsing game history that is not grouped by reactor config", () => {
        let gameHistoryEntry = getValidGameHistoryEntry()

        // save the entry locally as a list without a correct reactor config key
        localStorage.setItem(storedDataTypes.gameHistory, JSON.stringify([gameHistoryEntry.serialize()]))

        // load the game history from localstorage
        let gameHistory = gameHistoryStorage.load()
        
        // The loaded game history entry should be a dictionary with the default key
        expect(Object.keys(gameHistory)).toEqual([defaultReactorConfig.key])

        let gameHistoryEntries = gameHistory[defaultReactorConfig.key]

        // it should only contain the locally saved entry which should be equal to the initial entry
        expect(gameHistoryEntries.length).equals(1)
        expect(gameHistoryEntries[0].serialize()).toEqual(gameHistoryEntry.serialize())
    })
    
    test("game history entries without an id have their id appended", () => {
        let invalidGameHistoryEntry = getValidGameHistoryEntry()

        // delete id 
        let serializedGameEntry = invalidGameHistoryEntry.serialize()
        delete serializedGameEntry.id

        let gameHistoryData = {}
        gameHistoryData[defaultReactorConfig.key] = [serializedGameEntry]

        localStorage.setItem(storedDataTypes.gameHistory, JSON.stringify(gameHistoryData))

        // load the game history from localstorage
        let gameHistory = gameHistoryStorage.load()
        
        // The loaded game history entry should be a dictionary with the inititally set key
        let gameHistoryEntries = gameHistory[defaultReactorConfig.key]

        // it should only contain the locally saved entry
        expect(gameHistoryEntries.length).equals(1)
        
        let gameHistoryEntry = gameHistoryEntries[0]
        
        // the id should be correctly set to something other than null
        expect(gameHistoryEntry.id).not.toBe(null)

        // after adding the id to the original invalid game history entry, the values should be equal
        invalidGameHistoryEntry.id = gameHistoryEntry.id
        expect(gameHistoryEntry.serialize()).toEqual(invalidGameHistoryEntry.serialize())
    })
})

describe('test dealing with corrupted locally saved history data', () => { 
    test("entries with missing required keys are ignored", () => {
        for (let requiredKey of GameHistoryEntry.requiredKeys){
            console.error("requiredKey, ", requiredKey)
            // delete id 
            let serializedGameEntry = getValidGameHistoryEntry().serialize()
            delete serializedGameEntry[requiredKey]

            localStorage.setItem(storedDataTypes.gameHistory, JSON.stringify({
                [defaultReactorConfig.key]: [serializedGameEntry]
            }))

            // load the game history from localstorage
            let gameHistory = gameHistoryStorage.load()
            
            // Due to the missing required key the game history entry should have been ignored
            expect(gameHistory).toEqual({
                [defaultReactorConfig.key]: []
            })
        }
    })

    test("entries with an invalid data are ignored", () => {
        const invalidKeyValues = {
            date: false,
            gameStatus: false
        }
        
        for (let key of Object.keys(invalidKeyValues)){
            let serializedGameEntry = getValidGameHistoryEntry().serialize()
            
            serializedGameEntry[key] = invalidKeyValues[key]

            localStorage.setItem(storedDataTypes.gameHistory, JSON.stringify({
                [defaultReactorConfig.key]: [serializedGameEntry]
            }))

            // load the game history from localstorage
            let gameHistory = gameHistoryStorage.load()
            
            // Due to the invalid date it is ignored
            expect(gameHistory).toEqual({
                [defaultReactorConfig.key]: []
            })
        }
        
    })
})