
import React from 'react';

import {GameConfig} from './Config.js'
import {AvailableEventHandler, effectDirection, noEventText} from '../Events.js'

import {pages} from '../App.jsx'

import GameStats from './gameui/GameStats.jsx';
import TopBar from './gameui/TopBar.jsx';
import EventsBar from './gameui/EventsBar.jsx';
import InputBar from './gameui/InputBar.jsx';
import OutputChart from './gameui/OutputChart.jsx';
import TemperatureChart from './gameui/TemperatureChart.jsx';


export const ReactorDataContext = React.createContext()
export const GameDataContext = React.createContext()
export const EventDataContext = React.createContext()


export default class Game extends React.Component {

  constructor(props){
    super(props);
    console.log(pages)
    props.setMainButton(true, "Stop Game", () => {this.stopGame()})

    this.mediumDemand = this.maxPossibleDemand / 2

    this.initialElectricityDemand = 0
    
    this.addGameToGameHistory = props.addGameToGameHistory

    this.availableEventHandler = new AvailableEventHandler()

    this.newGameState = {
      gameIsRunning: true,
      gameIsPaused: true,
      gameIsLost: false,

      currentPoints: 0,

      timeRunning: 0,

      displayedEventText: noEventText,
      upcomingEventChange: [],
      activeIncreaseEvents: [],
      activeDecreaseEvents: [],

      producedEnergy: 0,
      currentCoolingLevel: 0,
      currentFuelInputLevel: 0,
      currentElectricityOutput: 0,
      currentTemperature: GameConfig.baseTemperature,

      productionDemandDelta: this.initialElectricityDemand,
      underProduction: false,
      overProduction: false,

      temperatureHistory: Array(11).fill(0),
      displayedTemperatureHistory: [],

      electricityOutputHistory: Array(11).fill(0),
      displayedElectricityOutputHistory: [],

      currentElectricityDemand: this.initialElectricityDemand,
      electricityDemandHistory: Array(11).fill(this.initialElectricityDemand),
      displayedElectricityDemandHistory: []
    }

    this.state = {
      ...this.newGameState,
      gameHistory: []
    }
  }

  startGame(){
    this.setState({
      gameIsRunning: true
    })
  }

  stopGame(){
    console.log("stopping game")

    if (!this.state.gameIsPaused){
      this.toggleGamePauseOnClick()
    }

    const gameHistoryEntry = {
      date: new Date(),
      timeRunning: this.state.timeRunning,
      currentPoints: this.state.currentPoints,
      producedEnergy: this.state.producedEnergy,
      averageProductionIntensity: this.state.averageProductionIntensity,
      gameLost: this.gameIsLost(),
    }

    console.log(gameHistoryEntry)

    this.props.addGameToGameHistory(gameHistoryEntry)

    this.setState({
      ...this.newGameState
    })
    console.log(pages.landingPage)
    this.props.goToPage(pages.landingPage)
  }

  gameIsLost(){
    if (this.state.currentTemperature > GameConfig.maxTemperature){
      return true
    }
    return false
  }

  tick() {
    // Electricity Demand
    let electricityDemandHistory = this.state.electricityDemandHistory.slice()
    let currentElectricityDemand = electricityDemandHistory[electricityDemandHistory.length - 1]
    let lastElectricityDemand = currentElectricityDemand

    let availableIncreaseEvents = this.availableEventHandler.getAvailableEvents(effectDirection.increase)
    let availableDecreaseEvents = this.availableEventHandler.getAvailableEvents(effectDirection.decrease)

    console.log(availableIncreaseEvents)
    console.log(availableDecreaseEvents)

    let activeIncreaseEvents = this.state.activeIncreaseEvents.slice()
    let activeDecreaseEvents = this.state.activeDecreaseEvents.slice()

    let activeEvents = [...activeDecreaseEvents, ...activeIncreaseEvents]
    console.log(activeEvents)

    let upcomingEventChange = this.state.upcomingEventChange
    let displayedEventText = this.state.displayedEventText
    
    const randomFactor = Math.random()

    console.log(this.state.timeRunning % 100)
    /* If there is no upcoming event - decide if there should be one */
    if (this.state.upcomingEventChange.length === 0 && this.state.timeRunning % 100 == 40 && randomFactor > 0.4){

      /* If there is now a new event coming, decide if an existing event should be phased out or a new one should be introduced */
      const introduceNewEvent = (activeEvents.length === 0)? true : Math.random() > 0.5
      console.log("introduceNewEvent ", introduceNewEvent)

      if (introduceNewEvent){
        /* If the demand is already at 0 - choose an event that would increase demand */
        const introduceIncreaseEvent = (lastElectricityDemand === 0)? true : Math.random() > 0.5
        
        const eventList = introduceIncreaseEvent ? availableIncreaseEvents : availableDecreaseEvents
        
        /* Check if the event list even has events before proceeding */
        if (eventList.length > 0){
          /* Remove the event from the list while it is active */
          const index = Math.floor(Math.random() * eventList.length)
          const newEvent = eventList[index]
          
          /* calculate effect */
          const upDownFactor = (newEvent.direction === effectDirection.increase)? 1 : -1
          
          displayedEventText = newEvent.textStart

          upcomingEventChange = [{
            operation: "add",
            indexInSourceList: index,
            direction: newEvent.direction,
            addedElectricityDemand: 200 * (Math.random() * 0.25 + newEvent.effect) * upDownFactor,
            originalEvent: newEvent
          }]
        }

      } else {
        const removeIncreaseEvent = (lastElectricityDemand === 0)? true : Math.random() > 0.5

        let eventList = removeIncreaseEvent ? activeIncreaseEvents : activeDecreaseEvents
        
        if (eventList.length > 0){
          const index = Math.floor(Math.random() * eventList.length)
          const removedEvent = eventList[index]

          displayedEventText = removedEvent.originalEvent.textEnd
          removedEvent.operation = "remove"

          upcomingEventChange = [removedEvent]
        }
      }
    }

    if (upcomingEventChange.length > 0 && this.state.timeRunning % 100 === 0){
        /* Introduce the scheduled event change */
        console.log(upcomingEventChange)

        displayedEventText = noEventText

        if (upcomingEventChange[0].operation === "add"){
          if (upcomingEventChange[0].originalEvent.direction === effectDirection.increase){
            activeIncreaseEvents.push(upcomingEventChange[0])
            this.availableEventHandler.removeEvent(upcomingEventChange[0].indexInSourceList, effectDirection.increase)
          } else {
            activeDecreaseEvents.push(upcomingEventChange[0])
            this.availableEventHandler.removeEvent(upcomingEventChange[0].indexInSourceList, effectDirection.decrease)
          }

        } else {
          this.availableEventHandler.addEvent(upcomingEventChange[0].originalEvent)

          if (upcomingEventChange[0].direction === effectDirection.increase){
            activeIncreaseEvents.splice(upcomingEventChange[0].indexInSourceList, 1)

          } else {
            activeDecreaseEvents.splice(upcomingEventChange[0].indexInSourceList, 1)
            
          }
        }

        /* Change electricity demand accordingly - use -1 to reverse the effect when it is removed */
        let upDownFactor = (upcomingEventChange[0].operation === "add") ? 1 : -1
        
        console.log(upDownFactor)
        console.log(upcomingEventChange[0].addedElectricityDemand)

        currentElectricityDemand += upcomingEventChange[0].addedElectricityDemand * upDownFactor

        currentElectricityDemand = (currentElectricityDemand <= 0) ? 0 : currentElectricityDemand
        
        console.log(activeIncreaseEvents)
        upcomingEventChange = []
    }

    /* Initialize a minimum demand of 100 at the beginning of the game  */
    if (this.state.timeRunning === 0){
      currentElectricityDemand = currentElectricityDemand + 300 * Math.random() + 100
    }

    electricityDemandHistory.push(currentElectricityDemand)

    let displayedElectricityDemandHistory = electricityDemandHistory.slice(-11)

    // Temperature
    let currentTemperature = this.state.currentTemperature + (this.state.currentFuelInputLevel * 0.05 - this.state.currentCoolingLevel * 0.1)
    
    if (currentTemperature - GameConfig.naturalCoolingFactor > GameConfig.baseTemperature) {
      currentTemperature -= GameConfig.naturalCoolingFactor
    }

    currentTemperature = currentTemperature >= 0 ? currentTemperature : 0
    
    let reactionLevel = 1 + (currentTemperature / GameConfig.maxTemperature)

    if (currentTemperature < GameConfig.minimumTemperature) {
      // If the temperature is below the limit - reactionLevel and thus output falls to 0
      reactionLevel = 0
    }
    
    let temperatureHistory = this.state.temperatureHistory.slice()
    temperatureHistory.push(currentTemperature)

    let displayedTemperatureHistory = temperatureHistory.slice(-6)
    displayedTemperatureHistory.push(null, null, null, null, null)

    // Electricity Output
    let currentElectricityOutput = (this.state.currentFuelInputLevel * 1.05 + this.state.currentTemperature * 0.025 * this.state.currentFuelInputLevel) * reactionLevel
    
    let electricityOutputHistory = this.state.electricityOutputHistory.slice()
    electricityOutputHistory.push(currentElectricityOutput)
    
    let displayedElectricityOutputHistory = electricityOutputHistory.slice(-6)
    displayedElectricityOutputHistory.push(null, null, null, null, null)
    let producedEnergy = this.state.producedEnergy + currentElectricityOutput

    // Production / Demand Delta
    let productionDemandDelta = currentElectricityOutput - electricityDemandHistory.slice(-6)[0]
    let overProduction = productionDemandDelta > GameConfig.productionDemandDeltaLimit
    let underProduction = productionDemandDelta < ((-1) * GameConfig.productionDemandDeltaLimit)

    let currentPoints = this.state.currentPoints

    // Add more points for matching production and a smaller penalty if there is no match
    // Otherwise it is difficult to gain points
    currentPoints += (overProduction || underProduction)? -1 : 2

    currentPoints = (currentPoints < 0)? 0 : currentPoints

    // Other metrics
    let gameIsLost = this.gameIsLost()
    
    this.setState({
        gameIsLost: gameIsLost,

        currentPoints: currentPoints,

        activeIncreaseEvents: activeIncreaseEvents,
        activeDecreaseEvents: activeDecreaseEvents,

        upcomingEventChange: upcomingEventChange,
        displayedEventText: displayedEventText,
        
        productionDemandDelta: productionDemandDelta,
        overProduction: overProduction,
        underProduction: underProduction,

        timeRunning: this.state.timeRunning + 1,
        currentElectricityOutput: currentElectricityOutput,
        currentTemperature: currentTemperature,
        producedEnergy: producedEnergy,
        
        temperatureHistory: temperatureHistory,
        displayedTemperatureHistory: displayedTemperatureHistory,

        electricityOutputHistory: electricityOutputHistory,
        displayedElectricityOutputHistory: displayedElectricityOutputHistory,

        electricityDemandHistory: electricityDemandHistory,
        displayedElectricityDemandHistory: displayedElectricityDemandHistory,

    });

    if (gameIsLost && this.state.gameIsRunning){
      this.toggleGamePauseOnClick()
    }
  }

  toggleGamePauseOnClick(){
    if (!this.state.gameIsPaused){
      clearInterval(this.timerID);
    } else {
      this.timerID = setInterval(
        () => this.tick(),
        100
      );
    }

    this.setState({
      gameIsPaused: !this.state.gameIsPaused
    })
  }

  changeFuelInputValue(event) {
    this.setState({
      currentFuelInputLevel: event.target.value
    })
  }

  changeCoolingLevelValue(event) {
    this.setState({
      currentCoolingLevel: event.target.value
    })
  }

  render(){
    const reactorData = {
      producedEnergy: this.state.producedEnergy,

      fuelInputOnChange: (event) => {this.changeFuelInputValue(event)},
      coolingLevelOnChange: (event) => {this.changeCoolingLevelValue(event)},

      currentElectricityOutput: this.state.currentElectricityOutput,
      currentTemperature: this.state.currentTemperature,

      currentCoolingLevel: this.state.currentCoolingLevel,
      currentFuelInputLevel: this.state.currentFuelInputLevel,
      
      temperatureHistory: this.state.temperatureHistory,
      displayedTemperatureHistory: this.state.displayedTemperatureHistory,

      electricityOutputHistory: this.state.electricityOutputHistory,
      displayedElectricityOutputHistory: this.state.displayedElectricityOutputHistory,
      displayedElectricityDemandHistory: this.state.displayedElectricityDemandHistory
    }

    const gameData = {
      timeRunning: this.state.timeRunning,
      currentPoints: this.state.currentPoints,

      gameIsLost: this.state.gameIsLost,
      gameIsPaused: this.state.gameIsPaused,
      gameIsRunning: this.state.gameIsRunning,

      toggleGamePauseOnClick: (event) => this.toggleGamePauseOnClick(event),

      productionDemandDelta: this.state.productionDemandDelta,
      overProduction: this.state.overProduction,
      underProduction: this.state.underProduction,
    }

    const eventData = {
      upcomingEventChange: this.state.upcomingEventChange.length !== 0,
      displayedEventText: this.state.displayedEventText,

      activeEvents: [...this.state.activeIncreaseEvents, ...this.state.activeDecreaseEvents]
    }

    return (
      <div className='main-card'>
        <ReactorDataContext.Provider value={reactorData}>
          <GameDataContext.Provider value={gameData}>
            <EventDataContext.Provider value={eventData}>
              
              <div>
                <GameStats />
                
                <div className="w-full h-full mt-1">

                    <TopBar/>
                    <EventsBar />

                    <div id='game--charts-wrapper'>
                        <TemperatureChart />
                        <OutputChart />
                    </div>

                    <InputBar/>
                </div>
              </div>

            </EventDataContext.Provider>
          </GameDataContext.Provider>
        </ReactorDataContext.Provider>
      </div>
    )
  }
}
