import { test, describe, expect, beforeEach } from "vitest";
import { ElectricityGrid, eventOperation } from "../../game/ElectricityGrid";
import { AvailableEventHandler } from "../../game/Events";

const demandChangeStepSize = 3

const getElectricityGridInstance = () => {
    return new ElectricityGrid({
        initialElectricityDemand: 100, 
        productionDemandDeltaLimit: 100, 
        baseDemandAddition: 200, 
        maximumPossibleDemand: 1000,
        spaceBetweenEvents: 200,
        demandChangeStepSize: demandChangeStepSize
    })
}

let availableEventHandler = new AvailableEventHandler()

let initialIncreaseEventsLength = availableEventHandler.increaseEvents.length
let initialDecreaseEventsLength = availableEventHandler.decreaseEvents.length

describe('electricity grid event handling', () => {

    test('add and remove increase events', () => {
        let electricityGrid = getElectricityGridInstance()

        let newEvent = electricityGrid.availableEventHandler.increaseEvents[initialIncreaseEventsLength - 2]
        let addedElectricityDemand = 200

        let eventChange = [
            {
                operation: eventOperation.add,
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

        let secondNewEvent = electricityGrid.availableEventHandler.increaseEvents[initialIncreaseEventsLength - 3]
        let secondAddedElectricityDemand = 100

        let secondEventChange = [
            {
                operation: eventOperation.add,
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

        let newEvent = electricityGrid.availableEventHandler.decreaseEvents[initialDecreaseEventsLength - 2]
        let addedElectricityDemand = 200

        let eventChange = [
            {
                operation: eventOperation.add,
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

        let secondNewEvent = electricityGrid.availableEventHandler.decreaseEvents[initialDecreaseEventsLength - 3]
        let secondAddedElectricityDemand = 100

        let secondEventChange = [
            {
                operation: eventOperation.add,
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
        electricityGrid.appliedDemandChange = demandChangeStepSize + 100

        electricityGrid.applyDemandChange()

        expect(electricityGrid.currentElectricityDemand).equals(100 + demandChangeStepSize)
    })

    test("apply negative demand change but do not go below 0", () => {
        let electricityGrid = getElectricityGridInstance()

        electricityGrid.currentElectricityDemand = 10
        electricityGrid.appliedDemandChange = -300

        electricityGrid.applyDemandChange()

        expect(electricityGrid.currentElectricityDemand).equals(0)
    })
})