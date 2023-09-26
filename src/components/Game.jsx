
import React from 'react';

import {GameConfig} from '../game/Config.js'

import {pages} from '../App.jsx'

import {Reactor} from '../game/Reactor.js'
import {ElectricityGrid} from '../game/ElectricityGrid.js'

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
    
    this.addGameToGameHistory = props.addGameToGameHistory

    this.reactor = new Reactor({
      baseTemperature: GameConfig.baseTemperature,
      maximumTemperature: GameConfig.maximumTemperature,
      minimumTemperature: GameConfig.minimumTemperature,
      naturalCoolingFactor: GameConfig.naturalCoolingFactor
    })
    
    this.electricityGrid = new ElectricityGrid({
      initialElectricityDemand: 0,
      productionDemandDeltaLimit: GameConfig.productionDemandDeltaLimit
    })

    this.newGameState = {
      gameIsRunning: true,
      gameIsPaused: true,
      gameIsLost: false,

      currentPoints: 0,

      timeRunning: 0,

      displayedEventText: this.electricityGrid.displayedEventText,
      upcomingEventChange: [],
      activeIncreaseEvents: [],
      activeDecreaseEvents: [],

      producedEnergy: this.reactor.producedEnergy,
      currentCoolingLevel: 0,
      currentFuelInputLevel: 0,
      currentElectricityOutput: 0,
      currentTemperature: this.reactor.currentTemperature,

      productionDemandDelta: this.electricityGrid.productionDemandDelta,
      underProduction: false,
      overProduction: false,

      temperatureHistory: this.reactor.temperatureHistory,
      displayedTemperatureHistory: [],

      electricityOutputHistory: this.reactor.electricityOutputHistory,
      displayedElectricityOutputHistory: [],

      currentElectricityDemand: this.electricityGrid.currentElectricityDemand,
      electricityDemandHistory: this.electricityGrid.electricityDemandHistory,
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
    if (this.state.currentTemperature > GameConfig.maximumTemperature){
      return true
    }
    return false
  }

  tick() {
    // Temperature and Electricity Output
    this.reactor.updateElectricityOutput(this.state.currentFuelInputLevel, this.state.currentCoolingLevel)

    // Electricity Demand
    this.electricityGrid.updateElectricityDemand(this.state.timeRunning)
    let displayedElectricityDemandHistory = this.electricityGrid.electricityDemandHistory.slice(-11)

    let displayedTemperatureHistory = this.reactor.temperatureHistory.slice(-6)
    displayedTemperatureHistory.push(null, null, null, null, null)

    let displayedElectricityOutputHistory = this.reactor.electricityOutputHistory.slice(-6)
    displayedElectricityOutputHistory.push(null, null, null, null, null)
    
    // Production / Demand Delta
    this.electricityGrid.updateDemandDelta(this.reactor.currentElectricityOutput)
    let currentPoints = this.state.currentPoints

    // Add more points for matching production and a smaller penalty if there is no match
    // Otherwise it is difficult to gain points
    currentPoints += (this.electricityGrid.productionDemandMatch)? 2 : 1

    currentPoints = (currentPoints < 0)? 0 : currentPoints

    // Other metrics
    let gameIsLost = this.gameIsLost()
    
    this.setState({
        gameIsLost: gameIsLost,

        currentPoints: currentPoints,

        activeIncreaseEvents: this.electricityGrid.activeIncreaseEvents,
        activeDecreaseEvents: this.electricityGrid.activeDecreaseEvents,

        upcomingEventChange: this.electricityGrid.upcomingEventChange,
        displayedEventText: this.electricityGrid.displayedEventText,
        
        productionDemandDelta: this.electricityGrid.productionDemandDelta,
        overProduction: this.electricityGrid.overProduction,
        underProduction: this.electricityGrid.underProduction,

        timeRunning: this.state.timeRunning + 1,
        currentElectricityOutput: this.reactor.currentElectricityOutput,
        currentTemperature: this.reactor.currentTemperature,
        producedEnergy: this.reactor.producedEnergy,
        
        temperatureHistory: this.reactor.temperatureHistory,
        displayedTemperatureHistory: displayedTemperatureHistory,

        electricityOutputHistory: this.reactor.electricityOutputHistory,
        displayedElectricityOutputHistory: displayedElectricityOutputHistory,

        electricityDemandHistory: this.electricityGrid.electricityDemandHistory,
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
