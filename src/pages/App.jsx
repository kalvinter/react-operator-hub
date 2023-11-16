import { useState } from 'react'
import { AnimatePresence } from 'framer-motion';

import Game from './Game';
import Welcome from '../components/Welcome';
import GameHistorySummary from '../components/GameHistory';
import About from '../components/About';
import {AchievementsBar} from '../components/Achievements';

import Card from '../components/common/Card';

import ResetHistoryModal from '../components/modals/ResetHistoryModal';
import UnlockedAchievementsModal from '../components/modals/UnlockedAchievementsModal';

import Settings from '../components/Settings';

import ThemeManager from '../game/ThemeManager';

import { gameHistoryManager } from '../game/GameHistoryManager';
import { achievementsManager } from '../game/Achievements';

import ReactorConnectionBar from '../components/ReactorConnectionBar';
import StartShiftCTA from '../components/StartShiftCTA';
import SwitchReactorModal from '../components/modals/SwitchReactorModal';
import { MotionWrapper } from '../hocs/MotionWrapper';


function App() {
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

    const endGame = ({gameHistoryEntry}) => {
        gameHistoryManager.addNewEntry(gameHistoryEntry)

        let newlyUnlockedAchievements = achievementsManager.checkGameHistoryEntries({
            gameHistoryEntries: gameHistoryManager.gameHistory,
            unlockAchievements: true
        })

        setNewlyUnlockedAchievements(newlyUnlockedAchievements)

        setShowUnlockedAchievementsModal(newlyUnlockedAchievements.length > 0)

        setGameIsRunning(false)
    }

    const [showUnlockedAchievementsModal, setShowUnlockedAchievementsModal] = useState(false)

    const [showSwitchReactorModal, setShowSwitchReactorModal] = useState(false)

    const [gameIsRunning, setGameIsRunning] = useState(false)
      
    return (
        <AnimatePresence initial={false} mode='wait'>
                {(gameIsRunning ? 
                    <MotionWrapper locationKey={"Game"}>
                        <Game 
                            endGame={(gameResult) => endGame(gameResult)}
                        />
                    </MotionWrapper>
                    :
                    <MotionWrapper locationKey={"Menu"}>
                        <SwitchReactorModal
                            showModal={showSwitchReactorModal}
                            cancelButtonOnClick={() => setShowSwitchReactorModal(false)} 
                        />
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

                        <ReactorConnectionBar
                            setShowSwitchReactorModal={setShowSwitchReactorModal}
                        />

                        <StartShiftCTA 
                            startGame={() => {setGameIsRunning(true)}}
                        />
                        
                        <Card>
                            <Welcome />
                        </Card>

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
                    </MotionWrapper>
                )}

        </AnimatePresence>
            
    )
}

export default App