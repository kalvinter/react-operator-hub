import { GameConfig } from './Config.js'
import {AvailableEventHandler, effectDirection, noEventText} from './Events.js'


export class ElectricityGrid {
    constructor({initialElectricityDemand, productionDemandDeltaLimit, baseDemandAddition, maximumPossibleDemand}){
        this.availableEventHandler = new AvailableEventHandler()

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

        this.displayedEventText = noEventText
    }

    performScheduledEventChange(){
      /* Introduce the scheduled event change */
      console.log(this.upcomingEventChange)
    
      this.displayedEventText = noEventText

      if (this.upcomingEventChange[0].operation === "add"){
        if (this.upcomingEventChange[0].originalEvent.direction === effectDirection.increase){
          this.activeIncreaseEvents.push(this.upcomingEventChange[0])
          this.availableEventHandler.removeEvent(this.upcomingEventChange[0].indexInSourceList, effectDirection.increase)
        } else {
          this.activeDecreaseEvents.push(this.upcomingEventChange[0])
          this.availableEventHandler.removeEvent(this.upcomingEventChange[0].indexInSourceList, effectDirection.decrease)
        }

      } else {
        this.availableEventHandler.addEvent(this.upcomingEventChange[0].originalEvent)

        if (this.upcomingEventChange[0].direction === effectDirection.increase){
          this.activeIncreaseEvents.splice(this.upcomingEventChange[0].indexInSourceList, 1)

        } else {
          this.activeDecreaseEvents.splice(this.upcomingEventChange[0].indexInSourceList, 1)
          
        }
      }

      /* Change electricity demand accordingly - use -1 to reverse the effect when it is removed */
      let upDownFactor = (this.upcomingEventChange[0].operation === "add") ? 1 : -1
      
      console.log(upDownFactor)
      console.log(this.upcomingEventChange[0].addedElectricityDemand)

      this.appliedDemandChange = this.upcomingEventChange[0].addedElectricityDemand * upDownFactor
      
      console.log(this.activeIncreaseEvents)
      this.upcomingEventChange = []
    }

    updateElectricityDemand(timeRunning){
        let lastElectricityDemand = this.currentElectricityDemand
        console.log(this.activeDecreaseEvents)
        console.log(this.activeIncreaseEvents)

        let activeEvents = [...this.activeDecreaseEvents, ...this.activeIncreaseEvents]

        let availableIncreaseEvents = this.availableEventHandler.getAvailableEvents(effectDirection.increase)
        let availableDecreaseEvents = this.availableEventHandler.getAvailableEvents(effectDirection.decrease)

        console.log(availableIncreaseEvents)
        console.log(availableDecreaseEvents)
        console.log(timeRunning % 100)
        
        /* If there is no upcoming event - decide if there should be one */
        if (this.upcomingEventChange.length === 0 && timeRunning % 100 == 40 && Math.random() > 0.2){
    
          /* If there is now a new event coming, decide if an existing event should be phased out or a new one should be introduced */
          const introduceNewEvent = (activeEvents.length === 0)? true : Math.random() > 0.4
          console.log("introduceNewEvent ", introduceNewEvent)
    
          if (introduceNewEvent){
            
            let introduceIncreaseEvent = true

            if (lastElectricityDemand === 0){
              /* If the demand is already at 0 - choose an event that would increase demand */
              introduceIncreaseEvent = true
            } else if (this.currentElectricityDemand + this.baseDemandAddition > this.maximumPossibleDemand){
              /* If an increase event could push the demand above the limit, introduce a decrease event */
              introduceIncreaseEvent = false
            } else {
              introduceIncreaseEvent = Math.random() > 0.1
            }
            
            const eventList = introduceIncreaseEvent ? availableIncreaseEvents : availableDecreaseEvents
            
            /* Check if the event list even has events before proceeding */
            if (eventList.length > 0){
              /* Remove the event from the list while it is active */
              const index = Math.floor(Math.random() * eventList.length)
              const newEvent = eventList[index]
              
              /* calculate effect */
              const upDownFactor = (newEvent.direction === effectDirection.increase)? 1 : -1
              
              this.displayedEventText = newEvent.textStart
    
              /* the effect is the main component - the math-random effect is added on top
              * so that a low effect is unlikely to be stronger than a medium effect
              * It is capped using a min function at 1 so that the overal added 
              * electricity demand cannot exceed the base increase
              */
              let addedElectricityDemandFactor = Math.min(
                (newEvent.effect + 0.5 * Math.random() * newEvent.effect) * upDownFactor, 1
              )

              this.upcomingEventChange = [{
                operation: "add",
                indexInSourceList: index,
                direction: newEvent.direction,
                addedElectricityDemand: this.baseDemandAddition * addedElectricityDemandFactor,
                originalEvent: newEvent
              }]
            }
    
          } else {
            const removeIncreaseEvent = (lastElectricityDemand === 0)? true : Math.random() > 0.5
    
            let eventList = removeIncreaseEvent ? this.activeIncreaseEvents : this.activeDecreaseEvents
            
            if (eventList.length > 0){
              const index = Math.floor(Math.random() * eventList.length)
              const removedEvent = eventList[index]
    
              this.displayedEventText = removedEvent.originalEvent.textEnd
              removedEvent.operation = "remove"
    
              this.upcomingEventChange = [removedEvent]
            }
          }
        }
    
        if (this.upcomingEventChange.length > 0 && timeRunning % 100 === 0){
          this.performScheduledEventChange()
        }

        /* Apply any further demand changes.
        Electricity demand changes that stem from events are not fulle added at once to make it
        easier for players to follow the change.
        Instead it is added gradually
        */
        if (this.appliedDemandChange !== 0){
          let change = (this.appliedDemandChange > GameConfig.demandChangeStepSize) ? GameConfig.demandChangeStepSize : this.appliedDemandChange
          
          this.currentElectricityDemand += change
          this.appliedDemandChange -= change

          console.log(this.appliedDemandChange)

          this.currentElectricityDemand = (this.currentElectricityDemand <= 0) ? 0 : this.currentElectricityDemand
        }
        
    
        /* Initialize a minimum demand at the beginning of the game  */
        if (timeRunning === 0){
          this.currentElectricityDemand += 300 * Math.random() + 100
        }
    
        this.electricityDemandHistory.push(this.currentElectricityDemand)
    }

    updateDemandDelta(currentElectricityOutput){
      this.productionDemandDelta = currentElectricityOutput - this.currentElectricityDemand
      this.overProduction = this.productionDemandDelta > this.productionDemandDeltaLimit
      this.underProduction = this.productionDemandDelta < ((-1) * this.productionDemandDeltaLimit)
      this.productionDemandMatch = (!this.overProduction && !this.underProduction)
      console.log(this.productionDemandDelta, this.overProduction, this.underProduction, this.productionDemandMatch)
    }
}