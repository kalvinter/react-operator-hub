import React, { Component } from 'react'

import Game from './components/Game';
import Welcome from './components/Welcome';
import GameHistory from './components/GameHistory';
import About from './pages/About';
import Navigation from './components/Navigation';

import ResetHistoryModal from './components/modals/ResetHistoryModal';
import {gameHistoryStorage} from './game/Storage'

export const pages = {
    landingPage: "Landing Page",
    gamePage: "Game"
}

export class App extends Component {
    
  constructor(props){
    super(props);

    this.gameHistoryStorage = new gameHistoryStorage()

    this.defaultMainButtonConfig = {
        display: true,
        label: "Start Game",
        onClick: () => this.startGame()
    }

    let gameHistory = this.gameHistoryStorage.load()
    console.log("gameHistory ", gameHistory)

    gameHistory = (gameHistory !== undefined)? gameHistory : []

    this.state = {
        activePage: pages.landingPage,
        gameHistory: gameHistory,
        mainButtonConfig: this.defaultMainButtonConfig,
        showDeleteHistoryModal: false,
    }
  }

  toggleResetHistoryModal(){
    this.setState({
        showDeleteHistoryModal: !this.state.showDeleteHistoryModal
    })
  }

  goToPage(page){
    if (page === pages.landingPage){
        this.setState({            
            mainButtonConfig: this.defaultMainButtonConfig
        })
    }

    this.setState({
        activePage: page
    })
  }

  startGame(){
    this.setState({
        activePage: pages.gamePage
    })
  }

  deleteHistory(){
    this.gameHistoryStorage.deleteAllEntries()
    this.toggleResetHistoryModal()
    
    this.setState({
        gameHistory: []
    })
  }

  addGameToGameHistory({gameHistoryEntry}){
    let gameHistory = this.state.gameHistory.slice()

    gameHistory.push(gameHistoryEntry)
    
    this.gameHistoryStorage.save({
        gameHistory: gameHistory
    })

    this.setState({
        gameHistory: gameHistory
    })

  }

  setMainButton(display, label, onClick){
    this.setState({
        mainButtonConfig: {
            display: display,
            label: label,
            onClick: onClick
        }
    })
  }

  render() {
    let app_body = "";

    switch (this.state.activePage){
        case pages.gamePage:
            app_body = (
                <Game 
                    goToPage={(page) => {this.goToPage(page)}}
                    setMainButton={(display, label, onClick) => {this.setMainButton(display, label, onClick)}}
                    addGameToGameHistory={(gameResult) => this.addGameToGameHistory(gameResult)}
                    gameIsRunning={true}
                 />
              )
              break
        default:
            app_body = (
                <div className="main-card">
                    <ResetHistoryModal 
                        showModal={this.state.showDeleteHistoryModal}
                        cancelButtonOnClick={() => this.toggleResetHistoryModal()}
                        deleteButtonOnClick={() => this.deleteHistory()}
                    />
                    <Welcome
                        setMainButton={(display, label, onClick) => {this.setMainButton(display, label, onClick)}} 
                        onClick={() => {this.startGame()}}
                    />

                    <div className='w-full my-2 border-solid border-2 rounded border-gray-900 flex justify-between p-2 items-center bg-neutral-700'>

                        <GameHistory 
                            gameHistory={this.state.gameHistory}
                            deleteHistoryOnClick={() => this.toggleResetHistoryModal()}
                        />

                    </div>
                    <div className='w-full my-2 border-solid border-2 rounded border-gray-900 flex justify-between p-2 items-center bg-neutral-700'>

                    <About />
                    </div>
                </div>
            )
        
    }

    return (
        <div className="App container">
            <Navigation
                mainButtonConfig={this.state.mainButtonConfig}
             />
            {app_body}
        </div>
    )
  }
}

export default App
