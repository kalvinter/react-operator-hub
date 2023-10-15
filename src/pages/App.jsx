import React, { Component } from 'react'

import Game from '../components/Game';
import Welcome from '../components/Welcome';
import GameHistory from '../components/GameHistory';
import About from '../components/About';
import Navigation from '../components/Navigation';
import {AchievementsBar} from '../components/Achievements';

import ScrollToTop from '../components/ScrollToTop';

import ResetHistoryModal from '../components/modals/ResetHistoryModal';
import UnlockedAchievementsModal from '../components/modals/UnlockedAchievementsModal';

export const pages = {
    landingPage: "Landing Page",
    gamePage: "Game",
}

export class App extends Component {
    
  constructor(props){
    super(props);

    this.gameHistoryStorage = props.gameHistoryStorage

    this.achievementsManager = props.achievementsManager

    let gameHistory = this.gameHistoryStorage.load()
    console.log("gameHistory ", gameHistory)

    gameHistory = (gameHistory !== undefined)? gameHistory : []

    this.achievementsManager.checkGameHistoryEntries({gameHistoryEntries: gameHistory, unlockAchievements: true})

    this.defaultMainButtonConfig = {
        display: true,
        label: "Start Game",
        onClick: () => this.startGame()
    }

    this.state = {
        activePage: pages.landingPage,
        gameHistory: gameHistory,
        mainButtonConfig: this.defaultMainButtonConfig,
        showDeleteHistoryModal: false,
        showUnlockedAchievementsModal: false,
        newlyUnlockedAchievements: []
    }
  }

  toggleResetHistoryModal(){
    this.setState({
        showDeleteHistoryModal: !this.state.showDeleteHistoryModal
    })
  }

  toggleShowUnlockedAchievementsModal(){
    this.setState({
        showUnlockedAchievementsModal: !this.state.showUnlockedAchievementsModal
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
    this.achievementsManager.resetAchievements()
    this.toggleResetHistoryModal()

    this.setState({
        gameHistory: []
    })
  }

  addGameToGameHistory({gameHistoryEntry}){
    let gameHistory = this.state.gameHistory.slice()

    gameHistory.push(gameHistoryEntry)
    
    let newlyUnlockedAchievements = this.achievementsManager.checkGameHistoryEntries({
        gameHistoryEntries: gameHistory,
        unlockAchievements: true
    })

    console.log("newlyUnlocked ", newlyUnlockedAchievements)

    this.gameHistoryStorage.save({
        gameHistory: gameHistory
    })

    this.setState({
        gameHistory: gameHistory,
        newlyUnlockedAchievements: newlyUnlockedAchievements,
    })

    if (newlyUnlockedAchievements.length){
        this.showUnlockedAchievementsModalTimer = setTimeout(() => {
            this.setState({ showUnlockedAchievementsModal: true });
        }, 10);
    } else {
        this.setState({ showUnlockedAchievementsModal: false });
    }
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

  componentWillUnmount(){
    clearTimeout(this.showUnlockedAchievementsModalTimer)
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
                <div>
                    <ResetHistoryModal 
                        showModal={this.state.showDeleteHistoryModal}
                        cancelButtonOnClick={() => this.toggleResetHistoryModal()}
                        deleteButtonOnClick={() => this.deleteHistory()}
                    />

                    <UnlockedAchievementsModal 
                        showModal={this.state.showUnlockedAchievementsModal}
                        cancelButtonOnClick={() => this.toggleShowUnlockedAchievementsModal()}
                        newlyUnlockedAchievements={this.state.newlyUnlockedAchievements}
                    />

                    <Welcome
                        setMainButton={(display, label, onClick) => {this.setMainButton(display, label, onClick)}} 
                        onClick={() => {this.startGame()}}
                    />

                    <div className='w-full my-2 border-solid border-2 rounded border-gray-900 flex justify-between p-2 items-center bg-neutral-700'>
                        <AchievementsBar 
                            achievementsManager={this.achievementsManager}
                            goToPage={(page) => {this.goToPage(page)}}
                        />
                    </div>

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
            <ScrollToTop />
            <Navigation
                mainButtonConfig={this.state.mainButtonConfig}
             />
            <div className="main-card">
                {app_body}
            </div>
        </div>
    )
  }
}

export default App