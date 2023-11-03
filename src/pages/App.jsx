import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

import { Route, Routes, useLocation } from 'react-router-dom';

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

import ThemeManager from '../game/ThemeManager';

import { gameHistoryManager } from '../game/GameHistoryManager';
import { achievementsManager } from '../game/Achievements';
import ErrorPage from './ErrorPage';
import MainLayout from './MainLayout';


function App() {
    const location = useLocation();

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

    const themeManager = new ThemeManager()
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
        <AnimatePresence initial={false} mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path="/react-reactor-game/*" element={<MainLayout />} errorElement={<ErrorPage />}>

                    <Route index
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
                                            themeManager={themeManager}
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
                    <Route path='game/'
                        element={
                                <Game 
                                endGame={(gameResult, gameStatus) => endGame(gameResult, gameStatus)}
                                    gameIsRunning={true}
                                />
                        }
                    />  
                    <Route path="achievements/" element={<AchievementsPage />} />
                    <Route path="game-history/" element={<GameHistoryPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AnimatePresence>
    )
}

export default App