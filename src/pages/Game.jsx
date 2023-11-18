import React from 'react'

import { GameConfig, GameEndTypes } from '../game/Config.js'

import { Reactor } from '../game/Reactor.js'
import { ElectricityGrid } from '../game/ElectricityGrid.js'

import ShiftProgressBar from '../components/gameui/ShiftProgressBar.jsx'
import TopBar from '../components/gameui/TopBar.jsx'
import EventsBar from '../components/gameui/EventsBar.jsx'
import InputBar from '../components/gameui/InputBar.jsx'
import OutputChart from '../components/gameui/OutputChart.jsx'
import TemperatureChart from '../components/gameui/TemperatureChart.jsx'

import ShiftEndModal from '../components/modals/ShiftEndModal.jsx'
import StartShiftModal from '../components/modals/StartShiftModal.jsx'
import { gameHistoryEntry } from '../game/Storage.js'

export const ReactorDataContext = React.createContext()
export const GameDataContext = React.createContext()
export const EventDataContext = React.createContext()

export const gameTestId = "gameTestId"

class Game extends React.Component {
    constructor(props) {
        super(props)

        this.shiftDuration = GameConfig.shiftDuration
        this.shiftDurationInSeconds = this.shiftDuration / 20 / 50

        this.reactor = new Reactor({
            baseTemperature: GameConfig.baseTemperature,
            maximumTemperature: GameConfig.maximumTemperature,
            minimumTemperature: GameConfig.minimumTemperature,
            naturalCoolingFactor: GameConfig.naturalCoolingFactor,
        })

        this.electricityGrid = new ElectricityGrid({
            initialElectricityDemand: 0,
            productionDemandDeltaLimit: GameConfig.productionDemandDeltaLimit,
            maximumPossibleDemand: GameConfig.maximumPossibleDemand,
            baseDemandAddition: GameConfig.baseDemandAddition,
        })

        this.newGameState = {
            gameIsRunning: true,
            gameIsPaused: true,
            gameIsLost: false,

            showShiftEndeModal: false,
            showShiftStartModal: false,

            achievedMatchedRate: 0,

            timeRunning: 0,
            shiftTimeLeft: this.shiftDuration,

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
            productionDemandMatch: true,

            temperatureHistory: this.reactor.temperatureHistory,
            displayedTemperatureHistory: [],

            electricityOutputHistory: this.reactor.electricityOutputHistory,
            displayedElectricityOutputHistory: [],

            currentElectricityDemand: this.electricityGrid.currentElectricityDemand,
            electricityDemandHistory: this.electricityGrid.electricityDemandHistory,
            displayedElectricityDemandHistory: [],

            demandMatchedStatusHistory: [],
        }

        this.state = {
            ...this.newGameState,
            gameHistory: [],
        }
    }

    componentDidMount() {
        /* delay the shiftStartModal opening for a short time so that it fades in and does
         * not just appear
         */
        console.log('start timer')
        this.showShiftStartModalTimer = setTimeout(() => {
            this.setState({ showShiftStartModal: true })
        }, 10)
    }

    componentWillUnmount() {
        // Cleanup the timer when the component is unmounted
        clearTimeout(this.showShiftStartModalTimer)
    }

    startGame() {
        this.setState({
            gameIsRunning: true,
            showShiftStartModal: false,
            gameIsPaused: false,
        })

        this.toggleGamePauseOnClick()
    }

    stopGame({ shiftWasFinished }) {
        console.log('stopping game')

        if (!this.state.gameIsPaused) {
            this.toggleGamePauseOnClick()
        }

        console.log('shiftWasFinished ', shiftWasFinished)

        let gameStatus = GameEndTypes.aborted

        if (this.gameIsLost()) {
            gameStatus = GameEndTypes.lost
        } else if (shiftWasFinished) {
            gameStatus = GameEndTypes.shiftWasFinished
        }

        console.log(gameStatus)

        this.props.endGame({
            gameHistoryEntry: new gameHistoryEntry({
                date: new Date(),
                timeRunningInSeconds: this.state.timeRunning / 20,
                shiftTimeLeft: this.state.shiftTimeLeft,
                producedEnergy: this.state.producedEnergy,
                achievedMatchedRate: this.state.achievedMatchedRate,
                demandMatchedStatusHistory: this.state.demandMatchedStatusHistory.slice(),
                gameStatus: gameStatus,
            }),
        })

        this.setState({
            ...this.newGameState,
        })
    }

    gameIsLost() {
        if (this.state.currentTemperature > GameConfig.maximumTemperature) {
            return true
        }
        return false
    }

    addToMatchedStatusHistory(demandMatchedStatusHistory, productionDemandMatch) {
        if (demandMatchedStatusHistory.length === 0) {
            demandMatchedStatusHistory = [
                {
                    productionDemandMatch: productionDemandMatch,
                    duration: 1,
                },
            ]

            return demandMatchedStatusHistory
        }

        let lastEntry = demandMatchedStatusHistory.slice(-1)[0]

        if (lastEntry.productionDemandMatch === productionDemandMatch) {
            demandMatchedStatusHistory[demandMatchedStatusHistory.length - 1].duration += 1
        } else {
            demandMatchedStatusHistory.push({
                productionDemandMatch: productionDemandMatch,
                duration: 1,
            })
        }

        return demandMatchedStatusHistory
    }

    calculateMatchedRate(demandMatchedStatusHistory) {
        if (demandMatchedStatusHistory.length === 0) {
            return 0
        }

        let totalDuration = 0
        let matchedDuration = 0

        for (let item of demandMatchedStatusHistory) {
            totalDuration += item.duration

            if (item.productionDemandMatch) {
                matchedDuration += item.duration
            }
        }

        return matchedDuration / totalDuration
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

        let demandMatchedStatusHistory = this.state.demandMatchedStatusHistory.slice()
        demandMatchedStatusHistory = this.addToMatchedStatusHistory(
            demandMatchedStatusHistory,
            this.electricityGrid.productionDemandMatch
        )

        let achievedMatchedRate = this.calculateMatchedRate(demandMatchedStatusHistory)

        let shiftTimeLeft = this.shiftDuration - this.state.timeRunning * 50

        let showShiftEndeModal = false

        if (shiftTimeLeft <= 0) {
            showShiftEndeModal = true
            this.toggleGamePauseOnClick()
        }

        // Other metrics
        let gameIsLost = this.gameIsLost()

        console.log("-# active Events")
        console.log(this.electricityGrid.activeIncreaseEvents)
        console.log(this.electricityGrid.activeDecreaseEvents)

        this.setState({
            gameIsLost: gameIsLost,

            showShiftEndeModal: showShiftEndeModal,

            shiftTimeLeft: shiftTimeLeft,

            achievedMatchedRate: achievedMatchedRate,

            activeIncreaseEvents: this.electricityGrid.activeIncreaseEvents.slice(),
            activeDecreaseEvents: this.electricityGrid.activeDecreaseEvents.slice(),

            upcomingEventChange: this.electricityGrid.upcomingEventChange,
            displayedEventText: this.electricityGrid.displayedEventText,

            productionDemandDelta: this.electricityGrid.productionDemandDelta,
            overProduction: this.electricityGrid.overProduction,
            underProduction: this.electricityGrid.underProduction,
            productionDemandMatch: this.electricityGrid.productionDemandMatch,

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

            demandMatchedStatusHistory: demandMatchedStatusHistory,
        })

        if (gameIsLost && this.state.gameIsRunning) {
            this.toggleGamePauseOnClick()
        }
    }

    toggleGamePauseOnClick() {
        if (!this.state.gameIsPaused) {
            clearInterval(this.timerID)
        } else {
            this.timerID = setInterval(() => this.tick(), 50)
        }

        this.setState({
            gameIsPaused: !this.state.gameIsPaused,
        })
    }

    changeFuelInputValue(event) {
        this.setState({
            currentFuelInputLevel: event.target.value,
        })
    }

    changeCoolingLevelValue(event) {
        this.setState({
            currentCoolingLevel: event.target.value,
        })
    }

    render() {
        const reactorData = {
            producedEnergy: this.state.producedEnergy,

            fuelInputOnChange: (event) => {
                this.changeFuelInputValue(event)
            },
            coolingLevelOnChange: (event) => {
                this.changeCoolingLevelValue(event)
            },

            currentElectricityOutput: this.state.currentElectricityOutput,
            currentTemperature: this.state.currentTemperature,

            currentCoolingLevel: this.state.currentCoolingLevel,
            currentFuelInputLevel: this.state.currentFuelInputLevel,

            temperatureHistory: this.state.temperatureHistory,
            displayedTemperatureHistory: this.state.displayedTemperatureHistory,

            electricityOutputHistory: this.state.electricityOutputHistory,
            displayedElectricityOutputHistory: this.state.displayedElectricityOutputHistory,
            displayedElectricityDemandHistory: this.state.displayedElectricityDemandHistory,
        }

        const gameData = {
            timeRunning: this.state.timeRunning,

            shiftDuration: this.shiftDuration,
            shiftTimeLeft: this.state.shiftTimeLeft,
            achievedMatchedRate: this.state.achievedMatchedRate,

            gameIsLost: this.state.gameIsLost,
            gameIsPaused: this.state.gameIsPaused,
            gameIsRunning: this.state.gameIsRunning,

            toggleGamePauseOnClick: (event) => this.toggleGamePauseOnClick(event),

            productionDemandDelta: this.state.productionDemandDelta,
            overProduction: this.state.overProduction,
            underProduction: this.state.underProduction,
            productionDemandMatch: this.state.productionDemandMatch,

            demandMatchedStatusHistory: this.state.demandMatchedStatusHistory,
        }

        const eventData = {
            upcomingEventChange: this.state.upcomingEventChange.length !== 0,
            displayedEventText: this.state.displayedEventText,

            activeEvents: [...this.state.activeIncreaseEvents, ...this.state.activeDecreaseEvents],
        }

        return (
            <div data-testid={gameTestId}>
                <ReactorDataContext.Provider value={reactorData}>
                    <GameDataContext.Provider value={gameData}>
                        <EventDataContext.Provider value={eventData}>
                            <ShiftEndModal
                                showModal={this.state.showShiftEndeModal}
                                actionButtonOnClick={() => this.stopGame({ shiftWasFinished: true })}
                            />

                            <StartShiftModal
                                showModal={this.state.showShiftStartModal}
                                actionButtonOnClick={() => this.startGame()}
                                maximumTemperature={this.reactor.maximumTemperature}
                                shiftDurationInSeconds={this.shiftDurationInSeconds}
                            />

                            <TopBar
                                stopGame={() => {
                                    this.stopGame({ gameEndType: GameEndTypes.aborted })
                                }}
                            />

                            <ShiftProgressBar />

                            <div className="md:block hidden">
                                {/* The event bar should be at the top in desktop mode since it is the main
                                 * indication for changes
                                 */}
                                <EventsBar />
                            </div>

                            <div className="flex gap-1 my-1 mx-0 flex-col md:flex-row">
                                <TemperatureChart />
                                <OutputChart />
                            </div>

                            <InputBar />

                            <div className="md:hidden block">
                                {/* The event bar is only visible at the bottom in mobile displays since it changes height with every
                                 * added or removed event. At the bottom it does not move the interface so much and the main indicators and
                                 * input controls are visible without scrolling
                                 */}
                                <EventsBar />
                            </div>
                        </EventDataContext.Provider>
                    </GameDataContext.Provider>
                </ReactorDataContext.Provider>
            </div>
        )
    }
}

export default Game
