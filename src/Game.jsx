
import React from 'react';

import Menu from './components/Menu'
import GameUI from './components/GameUI'

import GameStats from './components/GameStats';
import Welcome from './components/Welcome';
import GameHistory from './components/GameHistory';


class Game extends React.Component {
  
  constructor(props){
    super(props);

    this.maxTemperature = 300

    this.state = {
      gameIsRunning: false,
      timeRunning: 0,
      producedEnergy: 0,
      currentCoolingLevel: 0,
      currentFuelInputLevel: 0,
      currentElectricityOutput: 0,
      currentTemperature: 30,
      averageProductionIntensity: 0,
      reactorIsRunning: false,
      temperatureHistory: [],
      electricityOutputHistory: [],
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

    if (this.state.reactorIsRunning){
      this.toggleReactorActive()
    }

    let gameHistory = this.state.gameHistory.slice()

    gameHistory.push({
      date: new Date(),
      timeRunning: this.state.timeRunning,
      producedEnergy: this.state.producedEnergy,
      averageProductionIntensity: this.state.averageProductionIntensity,
      gameWon: false,
    })

    console.log(gameHistory)
    
    this.setState({
      gameIsRunning: false,
      timeRunning: 0,
      producedEnergy: 0,
      currentCoolingLevel: 0,
      currentFuelInputLevel: 0,
      currentTemperature: 30,
      currentElectricityOutput: 0,
      averageProductionIntensity: 0,
      temperatureHistory: [],
      electricityOutputHistory: [],
      gameHistory: gameHistory
    })
  }

  tick() {
    let currentElectricityOutput = this.state.currentFuelInputLevel * 1.5 + this.state.currentTemperature * 0.5 * this.state.currentFuelInputLevel
    let currentTemperature = this.state.currentTemperature + (this.state.currentFuelInputLevel * 0.25 - this.state.currentCoolingLevel * 0.1) 
    
    let temperatureHistory = this.state.temperatureHistory.slice()
    temperatureHistory.push(currentTemperature)

    let electricityOutputHistory = this.state.electricityOutputHistory.slice()
    electricityOutputHistory.push(currentElectricityOutput)

    let producedEnergy = this.state.producedEnergy + currentElectricityOutput
    let averageProductionIntensity = producedEnergy / (this.state.timeRunning + 1)

    this.setState({
        timeRunning: this.state.timeRunning + 1,
        currentElectricityOutput: currentElectricityOutput,
        currentTemperature: currentTemperature,
        producedEnergy: producedEnergy,
        temperatureHistory: temperatureHistory,
        electricityOutputHistory: electricityOutputHistory,
        averageProductionIntensity: averageProductionIntensity
    });
  }

  toggleReactorActive(){

    let a = this.state.temperatureHistory.slice()
    console.log(a)

    if (this.state.reactorIsRunning){
      clearInterval(this.timerID);
    } else {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }

    this.setState({
      reactorIsRunning: !this.state.reactorIsRunning
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
            averageProductionIntensity={this.state.averageProductionIntensity}
          />

          <GameUI 
            timeRunning={this.state.timeRunning}
            reactorActivateOnClick={() => {this.toggleReactorActive()}}
            reactorIsRunning={this.state.reactorIsRunning}
            fuelInputOnChange={(event) => this.changeFuelInputValue(event)}
            coolingLevelOnChange={(event) => this.changeCoolingLevelValue(event)}
            currentElectricityOutput={this.state.currentElectricityOutput}
            currentTemperature={this.state.currentTemperature}
            currentCoolingLevel={this.state.currentCoolingLevel}
            currentFuelInputLevel={this.state.currentFuelInputLevel}
            maxTemperature={this.maxTemperature}
            temperatureHistory={this.state.temperatureHistory}
            electricityOutputHistory={this.state.electricityOutputHistory}
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

    console.log(this.state.temperatureHistory)

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
