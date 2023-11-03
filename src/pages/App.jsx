import React, { Component, useEffect, useState } from 'react'

import { Route, Routes } from 'react-router-dom';

import AchievementsPage from './Achievements';
import GameHistoryPage from './GameHistoryPage';

import Game from './Game';
import Welcome from '../components/Welcome';
import GameHistorySummary from '../components/GameHistory';
import About from '../components/About';
import {AchievementsBar} from '../components/Achievements';

import Card from '../components/common/Card';

import ResetHistoryModal from '../components/modals/ResetHistoryModal';
import UnlockedAchievementsModal from '../components/modals/UnlockedAchievementsModal';
import NotFoundPage from './404Page';
import Settings from '../components/Settings';
import { useGameHistory } from '../hooks/useGameHistory';
import { useAchievementsManager } from '../hooks/useAchievementsManager';
import { useThemeManager } from '../hooks/useThemeManager';


function App() {
    const gameHistoryManager = useGameHistory()
    const achievementsManager = useAchievementsManager()

    achievementsManager.checkGameHistoryEntries({
        gameHistoryEntries: gameHistoryManager.gameHistory,
        unlockAchievements: true
    })

    const [showDeleteHistoryModal, setShowDeleteHistoryModal] = useState(false);

    const deleteHistory = () => {
        gameHistoryManager.deleteGameHistory()
        achievementsManager.resetAchievements()
        setShowDeleteHistoryModal(false)
    }

    useThemeManager()
    const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState([])

    const endGame = ({gameHistoryEntry, gameStatus}) => {
        gameHistoryManager.addNewEntry(gameHistoryEntry)

        let newlyUnlockedAchievements = achievementsManager.checkGameHistoryEntries({
            gameHistoryEntries: gameHistoryManager.gameHistory,
            unlockAchievements: true
        })

        setNewlyUnlockedAchievements(newlyUnlockedAchievements)

        setShowUnlockedAchievementsModal(newlyUnlockedAchievements.length > 0)
    }

    const [showUnlockedAchievementsModal, setShowUnlockedAchievementsModal] = useState(false)

    return (
        <Routes>
            <Route path='/'
                element={
                    <div>
                        <ResetHistoryModal 
                            showModal={showDeleteHistoryModal}
                            cancelButtonOnClick={() => setShowDeleteHistoryModal(false)}
                            deleteButtonOnClick={() => deleteHistory()}
                        />

                        <UnlockedAchievementsModal 
                            showModal={showUnlockedAchievementsModal}
                            cancelButtonOnClick={() => setShowUnlockedAchievementsModal(false)}
                            newlyUnlockedAchievements={newlyUnlockedAchievements}
                        />

                        <Welcome />

                        <Card>
                            <AchievementsBar
                                achievementsManager={achievementsManager}
                             />
                        </Card>

                        <Card>
                            <GameHistorySummary />
                        </Card>

                        <div className='md:grid md:grid-cols-3 md:gap-2 flex flex-col'>
                            <Card>
                                <Settings 
                                    showDeleteHistoryModal={() => setShowDeleteHistoryModal(true)}
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
                        endGame={(gameResult, gameStatus) => endGame(gameResult, gameStatus)}
                            gameIsRunning={true}
                        />
                }
            />  
            <Route path="achievements/" element={<AchievementsPage />} />
            <Route path="game-history/" element={<GameHistoryPage />} />
            <Route path="/*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App