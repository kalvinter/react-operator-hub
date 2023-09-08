
import React from 'react';

import Menu from './components/Menu'
import GameUI from './components/GameUI'

import GameStats from './components/GameStats';
import Welcome from './components/Welcome';
import GameHistory from './components/GameHistory';


class Game extends React.Component {
  
  constructor(props){
    super(props);

    this.productionDemandDeltaLimit = 30

    this.naturalCoolingFactor = 0.1
    this.minimumTemperature = 90
    this.baseTemperature = 30
    this.maxTemperature = 300

    this.maxPossibleDemand = 1500
    this.mediumDemand = this.maxPossibleDemand / 2

    this.initialElectricityDemand = 0

    this.newGameState = {
      gameIsRunning: false,
      gameIsPaused: true,
      gameIsLost: false,

      timeRunning: 0,

      producedEnergy: 0,
      currentCoolingLevel: 0,
      currentFuelInputLevel: 0,
      currentElectricityOutput: 0,
      currentTemperature: this.baseTemperature,

      demandIsChangingSoon: false,
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

    let gameHistory = this.state.gameHistory.slice()

    gameHistory.push({
      date: new Date(),
      timeRunning: this.state.timeRunning,
      producedEnergy: this.state.producedEnergy,
      averageProductionIntensity: this.state.averageProductionIntensity,
      gameLost: this.gameIsLost(),
    })

    console.log(gameHistory)
    
    this.setState({
      ...this.newGameState,
      gameHistory: gameHistory
    })
  }

  gameIsLost(){
    if (this.state.currentTemperature > this.maxTemperature){
      return true
    }
    return false
  }

  tick() {
    // Electricity Demand
    let electricityDemandHistory = this.state.electricityDemandHistory.slice()
    let currentElectricityDemand = electricityDemandHistory[electricityDemandHistory.length - 1]
    let lastElectricityDemand = currentElectricityDemand

    const randomFactor = Math.random()

    console.log(this.state.timeRunning % 100)

    let demandIsChangingSoon = this.state.demandIsChangingSoon

    if (!this.state.demandIsChangingSoon && this.state.timeRunning % 50 == 30 && randomFactor > 0.5){
      demandIsChangingSoon = true
    }

    if (this.state.timeRunning === 0){
      /*  At the start of the game it is necessary to use demand generation method that cannot go negative.
          Otherwise it might generate a negative demand, leaving it at 0 which would be weird to users
      */
      currentElectricityDemand = currentElectricityDemand + 200 * randomFactor
      demandIsChangingSoon = false
    } else if ( this.state.timeRunning % 50 === 0 && this.state.demandIsChangingSoon) {
      /*
        Generally, the electricity demand should fluctuate randomly. However, this can lead to it 
        being stuck at 0 or at the highest setting for too long. 
      */

      let upDownFactor = (lastElectricityDemand === 0) ? 1 : 0.75

      currentElectricityDemand = currentElectricityDemand + 400 * (upDownFactor - randomFactor)
      demandIsChangingSoon = false
    }

    currentElectricityDemand = (currentElectricityDemand <= 0) ? 0 : currentElectricityDemand
    currentElectricityDemand = (currentElectricityDemand > this.maxPossibleDemand) ? this.maxPossibleDemand : currentElectricityDemand

    electricityDemandHistory.push(currentElectricityDemand)

    let displayedElectricityDemandHistory = electricityDemandHistory.slice(-11)

    // Temperature
    let currentTemperature = this.state.currentTemperature + (this.state.currentFuelInputLevel * 0.075 - this.state.currentCoolingLevel * 0.1)
    
    if (currentTemperature - this.naturalCoolingFactor > this.baseTemperature) {
      currentTemperature -= this.naturalCoolingFactor
    }
    
    let reactionLevel = currentTemperature / this.maxTemperature

    if (currentTemperature < this.minimumTemperature) {
      // If the temperature is below the limit - reactionLevel and thus output falls to 0
      reactionLevel = 0
    }
    
    let temperatureHistory = this.state.temperatureHistory.slice()
    temperatureHistory.push(currentTemperature)

    let displayedTemperatureHistory = temperatureHistory.slice(-6)
    displayedTemperatureHistory.push(null, null, null, null, null)

    // Electricity Output
    let currentElectricityOutput = (this.state.currentFuelInputLevel * 1.05 + this.state.currentTemperature * 0.05 * this.state.currentFuelInputLevel) * reactionLevel
    
    let electricityOutputHistory = this.state.electricityOutputHistory.slice()
    electricityOutputHistory.push(currentElectricityOutput)
    
    let displayedElectricityOutputHistory = electricityOutputHistory.slice(-6)
    displayedElectricityOutputHistory.push(null, null, null, null, null)
    let producedEnergy = this.state.producedEnergy + currentElectricityOutput

    // Production / Demand Delta
    let productionDemandDelta = currentElectricityOutput - electricityDemandHistory.slice(-6)[0]
    let overProduction = productionDemandDelta > this.productionDemandDeltaLimit
    let underProduction = productionDemandDelta < ((-1) * this.productionDemandDeltaLimit)

    // Other metrics
    let gameIsLost = this.gameIsLost()

    this.setState({
        gameIsLost: gameIsLost,
        
        demandIsChangingSoon: demandIsChangingSoon, 
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
    let main_button_label;
    let main_button_callback;
    let app_body;

    if (this.state.gameIsRunning){

      main_button_label = "Stop Game"
      main_button_callback = () => {this.stopGame()}

      app_body = (
        <div className='main-card'>
          <GameStats 
            timeRunning={this.state.timeRunning}
            producedEnergy={this.state.producedEnergy}
          />

          <GameUI 
            timeRunning={this.state.timeRunning}
            toggleGamePauseOnClick={() => {this.toggleGamePauseOnClick()}}
            
            demandIsChangingSoon={this.state.demandIsChangingSoon}
            productionDemandDelta={this.state.productionDemandDelta}
            overProduction={this.state.overProduction}
            underProduction={this.state.underProduction}

            gameIsLost={this.state.gameIsLost}
            gameIsPaused={this.state.gameIsPaused}
            gameIsRunning={this.state.gameIsRunning}
            fuelInputOnChange={(event) => this.changeFuelInputValue(event)}
            coolingLevelOnChange={(event) => this.changeCoolingLevelValue(event)}
            currentElectricityOutput={this.state.currentElectricityOutput}
            currentTemperature={this.state.currentTemperature}
            currentCoolingLevel={this.state.currentCoolingLevel}
            currentFuelInputLevel={this.state.currentFuelInputLevel}
            
            minimumTemperature={this.minimumTemperature}
            maxTemperature={this.maxTemperature}
            
            temperatureHistory={this.state.temperatureHistory}
            displayedTemperatureHistory={this.state.displayedTemperatureHistory}

            electricityOutputHistory={this.state.electricityOutputHistory}
            displayedElectricityOutputHistory={this.state.displayedElectricityOutputHistory}

            displayedElectricityDemandHistory={this.state.displayedElectricityDemandHistory}
          />
        </div>
      )

    } else {
      main_button_label = "Start a new Game"
      main_button_callback = () => {this.startGame()}
      app_body = (
        <div className="main-card">
          <Welcome 
            onClick={main_button_callback}
          />
          <GameHistory 
            gameHistory={this.state.gameHistory}
          />
        </div>
      )
    }

    return (
      <div className="App container p-[4rem] w-full mx-auto">
        <Menu 
          label={main_button_label}
          onClick={main_button_callback}
        />

        {app_body}

      </div>
    )
  }
}

export default Game
