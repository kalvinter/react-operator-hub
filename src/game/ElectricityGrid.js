import { GameConfig } from './Config.js'
import { AvailableEventHandler, effectDirection } from './Events.js'

import i18n from '../i18n.js'

export const eventOperation = {
    add: "add",
    remove: "remove"
}

export class ElectricityGrid {
    constructor({ initialElectricityDemand, productionDemandDeltaLimit, baseDemandAddition, maximumPossibleDemand, demandChangeStepSize, spaceBetweenEvents }) {
        this.availableEventHandler = new AvailableEventHandler()

        this.demandChangeStepSize = demandChangeStepSize
        this.productionDemandDeltaLimit = productionDemandDeltaLimit
        this.productionDemandDelta = 0
        this.overProduction = false
        this.underProduction = false
        this.productionDemandMatch = true

        this.maximumPossibleDemand = maximumPossibleDemand
        this.baseDemandAddition = baseDemandAddition

        this.currentElectricityDemand = initialElectricityDemand
        this.productionDemandDelta = initialElectricityDemand

        this.electricityDemandHistory = Array(11).fill(this.initialElectricityDemand)

        this.activeIncreaseEvents = []
        this.activeDecreaseEvents = []

        this.upcomingEventChange = []

        this.appliedDemandChange = 0

        this.displayedEventText = this.getNoEventText()

        this.spaceBetweenEvents = spaceBetweenEvents
    }

    getNoEventText(){
        return i18n.t("No-Event-Text", {ns: "events"})
    }

    performScheduledEventChange() {
        /* Introduce the scheduled event change */
        // console.log(this.upcomingEventChange)

        this.displayedEventText = this.getNoEventText()

        let originalEvent = this.upcomingEventChange[0].originalEvent

        if (this.upcomingEventChange[0].operation === eventOperation.add) {
            if (originalEvent.direction === effectDirection.increase) {
                this.activeIncreaseEvents.push(this.upcomingEventChange[0])
                this.availableEventHandler.removeEvent(
                    originalEvent
                )
            } else {
                this.activeDecreaseEvents.push(this.upcomingEventChange[0])
                this.availableEventHandler.removeEvent(
                    originalEvent
                )
            }
        } else {
            this.availableEventHandler.addEvent(originalEvent)

            if (originalEvent.direction === effectDirection.increase) {
                this.activeIncreaseEvents = this.activeIncreaseEvents.filter((eventChange) => {
                    return eventChange.originalEvent.id !== originalEvent.id
                })
            } else {
                this.activeDecreaseEvents = this.activeDecreaseEvents.filter((eventChange) => {
                    return eventChange.originalEvent.id !== originalEvent.id
                })
            }
        }

        /* Change electricity demand accordingly - use -1 to reverse the effect when it is removed */
        let upDownFactor = this.upcomingEventChange[0].operation === eventOperation.add ? 1 : -1
        
        this.appliedDemandChange += this.upcomingEventChange[0].addedElectricityDemand * upDownFactor

        this.upcomingEventChange = []
    }

    updateElectricityDemand(timeRunning) {
        let lastElectricityDemand = this.currentElectricityDemand

        let activeEvents = [...this.activeDecreaseEvents, ...this.activeIncreaseEvents]

        let availableIncreaseEvents = this.availableEventHandler.getAvailableEvents(effectDirection.increase)
        let availableDecreaseEvents = this.availableEventHandler.getAvailableEvents(effectDirection.decrease)

        // console.log(availableIncreaseEvents)
        // console.log(availableDecreaseEvents)
        console.log(timeRunning % this.spaceBetweenEvents)

        /* If there is no upcoming event - decide if there should be one */
        if (this.upcomingEventChange.length === 0 && timeRunning % this.spaceBetweenEvents === (this.spaceBetweenEvents / 2)) {
            /* If there is now a new event coming, decide if an existing event should be phased out or a new one should be introduced */
            const introduceNewEvent = activeEvents.length === 0 ? true : Math.random() > 0.4
            console.log('introduceNewEvent ', introduceNewEvent)

            if (introduceNewEvent) {
                let introduceIncreaseEvent = true

                if (lastElectricityDemand === 0) {
                    /* If the demand is already at 0 - choose an event that would increase demand */
                    introduceIncreaseEvent = true
                } else if (this.currentElectricityDemand + this.baseDemandAddition > this.maximumPossibleDemand) {
                    /* If an increase event could push the demand above the limit, introduce a decrease event */
                    introduceIncreaseEvent = false
                } else {
                    introduceIncreaseEvent = Math.random() > 0.4
                }

                const eventList = introduceIncreaseEvent ? availableIncreaseEvents : availableDecreaseEvents

                /* Check if the event list even has events before proceeding */
                if (eventList.length > 0) {
                    /* Remove the event from the list while it is active */
                    const index = Math.floor(Math.random() * eventList.length)
                    const newEvent = eventList[index]

                    /* calculate effect */
                    const upDownFactor = newEvent.direction === effectDirection.increase ? 1 : -1

                    this.displayedEventText = newEvent.getTextStart()

                    /* the effect is the main component - the math-random effect is added on top
                     * so that a low effect is unlikely to be stronger than a medium effect
                     * It is capped using a min function at 1 so that the overal added
                     * electricity demand cannot exceed the base increase
                     */
                    let addedElectricityDemandFactor = Math.min(
                        (newEvent.effect + 0.5 * Math.random() * newEvent.effect) * upDownFactor,
                        1
                    )

                    this.upcomingEventChange = [
                        {
                            operation: eventOperation.add,
                            direction: newEvent.direction,
                            addedElectricityDemand: this.baseDemandAddition * addedElectricityDemandFactor,
                            originalEvent: newEvent,
                        },
                    ]
                }
            } else {
                const removeIncreaseEvent = lastElectricityDemand === 0 ? true : Math.random() > 0.5

                let eventList = removeIncreaseEvent ? this.activeIncreaseEvents : this.activeDecreaseEvents

                if (eventList.length > 0) {
                    const index = Math.floor(Math.random() * eventList.length)
                    const removedEvent = eventList[index]

                    this.displayedEventText = removedEvent.originalEvent.getTextEnd()
                    removedEvent.operation = eventOperation.remove

                    this.upcomingEventChange = [removedEvent]
                }
            }
        }

        if (this.upcomingEventChange.length > 0 && timeRunning % this.spaceBetweenEvents === 0) {
            this.performScheduledEventChange()
        }
        
        this.applyDemandChange()

        /* Initialize a minimum demand at the beginning of the game  */
        if (timeRunning === 0) {
            this.currentElectricityDemand += 300 * Math.random() + 100
        }

        this.electricityDemandHistory.push(this.currentElectricityDemand)
    }

    applyDemandChange(){
        /* Apply any further demand changes.
        Electricity demand changes that stem from events are not fully added at once but gradually
        to make it easier for players to follow the change.
        */
        if (this.appliedDemandChange !== 0) {
            let change =
                this.appliedDemandChange > this.demandChangeStepSize
                    ? this.demandChangeStepSize
                    : this.appliedDemandChange

            this.currentElectricityDemand += change
            this.appliedDemandChange -= change

            this.currentElectricityDemand = this.currentElectricityDemand <= 0 ? 0 : this.currentElectricityDemand
        }
    }

    updateDemandDelta(currentElectricityOutput) {
        this.productionDemandDelta = currentElectricityOutput - this.currentElectricityDemand
        this.overProduction = this.productionDemandDelta > this.productionDemandDeltaLimit
        this.underProduction = this.productionDemandDelta < -1 * this.productionDemandDeltaLimit
        this.productionDemandMatch = !this.overProduction && !this.underProduction
    }
}
