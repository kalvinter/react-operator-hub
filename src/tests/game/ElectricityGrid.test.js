import { test, describe, expect, beforeEach } from "vitest";
import { ElectricityGrid, eventOperation } from "../../game/ElectricityGrid";
import { AvailableEventHandler } from "../../game/Events";
import { t } from "i18next";
import { GameConfig } from "../../game/Config";


const getElectricityGridInstance = () => {
    return new ElectricityGrid({
        initialElectricityDemand: 100, 
        productionDemandDeltaLimit: 100, 
        baseDemandAddition: 200, 
        maximumPossibleDemand: 1000
    })
}

let availableEventHandler = new AvailableEventHandler()

let initialIncreaseEventsLength = availableEventHandler.increaseEvents.length
let initialDecreaseEventsLength = availableEventHandler.decreaseEvents.length

describe('electricity grid event handling', () => {

    test('add and remove increase events', () => {
        let electricityGrid = getElectricityGridInstance()

        let index = 0
        let newEvent = electricityGrid.availableEventHandler.increaseEvents[index]
        let addedElectricityDemand = 200

        let eventChange = [
            {
                operation: eventOperation.add,
                indexInSourceList: index,
                direction: newEvent.direction,
                addedElectricityDemand: addedElectricityDemand,
                originalEvent: newEvent,
            }
        ]

        electricityGrid.upcomingEventChange = eventChange
        electricityGrid.performScheduledEventChange()

        expect(electricityGrid.appliedDemandChange).equals(addedElectricityDemand)
        expect(electricityGrid.availableEventHandler.increaseEvents.includes(newEvent)).equals(false)
        expect(electricityGrid.availableEventHandler.increaseEvents.length).equals(initialIncreaseEventsLength - 1)
        expect(electricityGrid.activeIncreaseEvents === eventChange)

        let secondIndex = 0
        let secondNewEvent = electricityGrid.availableEventHandler.increaseEvents[index]
        let secondAddedElectricityDemand = 100

        let secondEventChange = [
            {
                operation: eventOperation.add,
                indexInSourceList: secondIndex,
                direction: newEvent.direction,
                addedElectricityDemand: secondAddedElectricityDemand,
                originalEvent: secondNewEvent,
            }
        ]
        
        electricityGrid.upcomingEventChange = secondEventChange
        electricityGrid.performScheduledEventChange()

        expect(electricityGrid.appliedDemandChange).equals(secondAddedElectricityDemand + addedElectricityDemand)
        expect(electricityGrid.availableEventHandler.increaseEvents.includes(secondNewEvent)).equals(false)
        expect(electricityGrid.availableEventHandler.increaseEvents.length).equals(initialIncreaseEventsLength - 2)
        expect(electricityGrid.activeIncreaseEvents === eventChange.push(...secondEventChange))

        eventChange[0].operation = eventOperation.remove

        electricityGrid.upcomingEventChange = eventChange
        electricityGrid.performScheduledEventChange()

        expect(electricityGrid.appliedDemandChange).equals(secondAddedElectricityDemand)
        // event was re-added as available
        expect(electricityGrid.availableEventHandler.increaseEvents.includes(newEvent)).equals(true)
        expect(electricityGrid.availableEventHandler.increaseEvents.length).equals(initialIncreaseEventsLength - 1)
        expect(electricityGrid.activeIncreaseEvents === secondEventChange)

        secondEventChange[0].operation = eventOperation.remove

    
        electricityGrid.upcomingEventChange = secondEventChange
        electricityGrid.performScheduledEventChange()

        expect(electricityGrid.appliedDemandChange).equals(0)
                // event was re-added as available
        expect(electricityGrid.availableEventHandler.increaseEvents.includes(secondNewEvent)).equals(true)
        expect(electricityGrid.availableEventHandler.increaseEvents.length).equals(initialIncreaseEventsLength)
        expect(electricityGrid.activeIncreaseEvents.length).equals(0)
    })

    test('add decrease events', () => {
        let electricityGrid = getElectricityGridInstance()

        let index = 0
        let newEvent = electricityGrid.availableEventHandler.decreaseEvents[index]
        let addedElectricityDemand = 200

        let eventChange = [
            {
                operation: eventOperation.add,
                indexInSourceList: index,
                direction: newEvent.direction,
                addedElectricityDemand: addedElectricityDemand,
                originalEvent: newEvent,
            }
        ]

        electricityGrid.upcomingEventChange = eventChange
        electricityGrid.performScheduledEventChange()

        expect(electricityGrid.appliedDemandChange).equals(addedElectricityDemand)
        expect(electricityGrid.availableEventHandler.decreaseEvents.includes(newEvent)).equals(false)
        expect(electricityGrid.availableEventHandler.decreaseEvents.length).equals(initialDecreaseEventsLength - 1)
        expect(electricityGrid.activeDecreaseEvents === eventChange)

        let secondIndex = 0
        let secondNewEvent = electricityGrid.availableEventHandler.decreaseEvents[index]
        let secondAddedElectricityDemand = 100

        let secondEventChange = [
            {
                operation: eventOperation.add,
                indexInSourceList: secondIndex,
                direction: newEvent.direction,
                addedElectricityDemand: secondAddedElectricityDemand,
                originalEvent: secondNewEvent,
            }
        ]
        
        electricityGrid.upcomingEventChange = secondEventChange
        electricityGrid.performScheduledEventChange()

        expect(electricityGrid.appliedDemandChange).equals(secondAddedElectricityDemand + addedElectricityDemand)
        expect(electricityGrid.availableEventHandler.decreaseEvents.includes(secondNewEvent)).equals(false)
        expect(electricityGrid.availableEventHandler.decreaseEvents.length).equals(initialDecreaseEventsLength - 2)
        expect(electricityGrid.activeDecreaseEvents === eventChange.push(...secondEventChange))

        
        eventChange[0].operation = eventOperation.remove

        electricityGrid.upcomingEventChange = eventChange
        electricityGrid.performScheduledEventChange()

        expect(electricityGrid.appliedDemandChange).equals(secondAddedElectricityDemand)
        // event was re-added as available
        expect(electricityGrid.availableEventHandler.decreaseEvents.includes(newEvent)).equals(true)
        expect(electricityGrid.availableEventHandler.decreaseEvents.length).equals(initialDecreaseEventsLength - 1)
        expect(electricityGrid.activeDecreaseEvents === secondEventChange)

        secondEventChange[0].operation = eventOperation.remove

        electricityGrid.upcomingEventChange = secondEventChange
        electricityGrid.performScheduledEventChange()

        expect(electricityGrid.appliedDemandChange).equals(0)
                // event was re-added as available
        expect(electricityGrid.availableEventHandler.decreaseEvents.includes(secondNewEvent)).equals(true)
        expect(electricityGrid.availableEventHandler.decreaseEvents.length).equals(initialDecreaseEventsLength)
        expect(electricityGrid.activeDecreaseEvents.length).equals(0)
    })

})

describe("test applying a scheduled demand change", () => {
    test("apply demand change step wise", () => {
        let electricityGrid = getElectricityGridInstance()

        electricityGrid.currentElectricityDemand = 100
        electricityGrid.appliedDemandChange = GameConfig.demandChangeStepSize + 100

        electricityGrid.applyDemandChange()

        expect(electricityGrid.currentElectricityDemand).equals(100 + GameConfig.demandChangeStepSize)
    })

    test("apply negative demand change but do not go below 0", () => {
        let electricityGrid = getElectricityGridInstance()

        electricityGrid.currentElectricityDemand = 10
        electricityGrid.appliedDemandChange = -300

        electricityGrid.applyDemandChange()

        expect(electricityGrid.currentElectricityDemand).equals(0)
    })
})