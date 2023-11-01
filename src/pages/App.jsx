import React, { Component } from 'react'

import { Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Game from '../components/Game';
import Welcome from '../components/Welcome';
import GameHistorySummary from '../components/GameHistory';
import About from '../components/About';
import {AchievementsBar} from '../components/Achievements';

import Card from '../components/common/Card';

import ResetHistoryModal from '../components/modals/ResetHistoryModal';
import UnlockedAchievementsModal from '../components/modals/UnlockedAchievementsModal';
import NotFoundPage from './404-page';
import Settings from '../components/Settings';

export const pages = {
    landingPage: "Landing Page",
    gamePage: "Game",
}

export class App extends Component {
    
  constructor(props){
    super(props);
    console.log("props ", props)

    this.gameHistoryStorage = props.gameHistoryStorage
    this.achievementsManager = props.achievementsManager
    this.themeManager = props.themeManager

    let gameHistory = this.gameHistoryStorage.load()

    gameHistory = (gameHistory !== undefined)? gameHistory : []

    this.achievementsManager.checkGameHistoryEntries({gameHistoryEntries: gameHistory, unlockAchievements: true})

    this.state = {
        activePage: pages.landingPage,
        gameHistory: gameHistory,
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

  componentWillUnmount(){
    clearTimeout(this.showUnlockedAchievementsModalTimer)
  }

  render() {
    return (
        <Routes>
            <Route path='/'
                element={
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
                            onClick={() => {this.startGame()}}
                        />

                        <Card>
                            <AchievementsBar 
                                achievementsManager={this.achievementsManager}
                            />
                        </Card>

                        <Card>
                            <GameHistorySummary 
                                gameHistory={this.state.gameHistory}
                                deleteHistoryOnClick={() => this.toggleResetHistoryModal()}
                            />
                        </Card>

                        <div className='md:grid md:grid-cols-3 md:gap-2 flex flex-col'>
                            <Card>
                                <Settings 
                                    themeManager={this.themeManager}
                                    deleteHistoryOnClick={() => this.toggleResetHistoryModal()}
                                />
                            </Card>

                            <Card className='col-span-2'>
                                <About />
                            </Card>
                        </div>
                    </div>
                }
            />
            <Route path='/game/'
                element={
                        <Game 
                            addGameToGameHistory={(gameResult) => this.addGameToGameHistory(gameResult)}
                            gameIsRunning={true}
                        />
                }
            />
            <Route path="/*" element={<NotFoundPage />} />
        </Routes>
    )
  }
}

export default App
