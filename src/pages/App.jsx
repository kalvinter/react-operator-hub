import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import Game from './Game'
import Welcome from '../components/Welcome'
import GameHistorySummary from '../components/GameHistory'
import About from '../components/About'
import { AchievementsBar } from '../components/Achievements'

import Card from '../components/common/Card'

import ResetHistoryModal from '../components/modals/ResetHistoryModal'
import UnlockedAchievementsModal from '../components/modals/UnlockedAchievementsModal'

import Settings from '../components/Settings'

import ThemeManager from '../game/ThemeManager'

import { ReactorConfigManager, availableReactorConfigsByKey } from '../game/AvailableReactors'
import { GameHistoryManager } from '../game/GameHistoryManager'
import { achievementsManager } from '../game/Achievements'

import ReactorConnectionBar from '../components/ReactorConnectionBar'
import StartShiftCTA from '../components/StartShiftCTA'
import SwitchReactorModal from '../components/modals/SwitchReactorModal'
import { MotionWrapper } from '../hocs/MotionWrapper'


export const appTestId = "appTestId"


function App() {
    const reactorConfigManager = new ReactorConfigManager()

    const [showSwitchReactorModal, setShowSwitchReactorModal] = useState(false)
    const [activeReactorConfigKey, setActiveReactorConfigKey] = useState(reactorConfigManager.activeReactorConfig.key)
    
    const [showUnlockedAchievementsModal, setShowUnlockedAchievementsModal] = useState(false)
    const [showDeleteHistoryModal, setShowDeleteHistoryModal] = useState(false)

    const [gameIsRunning, setGameIsRunning] = useState(false)

    let activeReactorConfig = availableReactorConfigsByKey[activeReactorConfigKey]
    
    const gameHistoryManager = new GameHistoryManager({activeReactorConfigKey: activeReactorConfig.key})

    achievementsManager.checkGameHistoryEntries({
        gameHistoryEntries: gameHistoryManager.gameHistory,
        unlockAchievements: true,
    })

    const deleteHistory = () => {
        gameHistoryManager.deleteGameHistory()
        achievementsManager.resetAchievements()
        setShowDeleteHistoryModal(false)
    }
    
    const themeManager = new ThemeManager()
    const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState([])

    useEffect(() => {
        if (activeReactorConfigKey === reactorConfigManager.activeReactorConfig.key) {
            return
        }
        
        setShowSwitchReactorModal(false)
        gameHistoryManager.changeActiveReactorConfig({activeReactorConfigKey: activeReactorConfigKey})

        achievementsManager.resetAchievements()

        achievementsManager.checkGameHistoryEntries({
            gameHistoryEntries: gameHistoryManager.gameHistory,
            unlockAchievements: true,
        })

        reactorConfigManager.setThemeChangeEffect()
        let timeout = setTimeout(() => {
            reactorConfigManager.setActiveReactorConfig({ reactorConfigKey: activeReactorConfigKey })
        }, 200)
        return () => clearTimeout(timeout)
    }, [activeReactorConfigKey])

    const endGame = ({ gameHistoryEntry }) => {
        gameHistoryManager.addNewEntry(gameHistoryEntry)

        let newlyUnlockedAchievements = achievementsManager.checkGameHistoryEntries({
            gameHistoryEntries: gameHistoryManager.gameHistory,
            unlockAchievements: true,
        })

        setNewlyUnlockedAchievements(newlyUnlockedAchievements)

        setShowUnlockedAchievementsModal(newlyUnlockedAchievements.length > 0)

        setGameIsRunning(false)
    }

    return (
        <AnimatePresence initial={false} mode="wait">
            {gameIsRunning ? (
                <MotionWrapper locationKey={'Game'}>
                    <ReactorConnectionBar 
                            activeReactorConfig={activeReactorConfig}
                            showSwitchReactorButton={false}
                    />
                    <Game 
                        endGame={(gameResult) => endGame(gameResult)} 
                        activeReactorConfig={activeReactorConfig}    
                    />
                </MotionWrapper>
            ) : (
                <MotionWrapper locationKey={'Menu'}>
                    <div data-testid={appTestId}>
                        <SwitchReactorModal
                            showModal={showSwitchReactorModal}
                            reactorConfigManager={reactorConfigManager}
                            setActiveReactorConfigKey={(reactorConfigKey) => {setActiveReactorConfigKey(reactorConfigKey)}}
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
                            activeReactorConfig={activeReactorConfig}
                            showSwitchReactorButton={true}
                            setShowSwitchReactorModal={setShowSwitchReactorModal} 
                        />

                        <StartShiftCTA
                            startGame={() => {
                                setGameIsRunning(true)
                            }}
                        />

                        <Card>
                            <Welcome />
                        </Card>

                        <Card>
                            <AchievementsBar achievementsManager={achievementsManager} />
                        </Card>

                        <Card>
                            <GameHistorySummary 
                                gameHistoryManager={gameHistoryManager}
                            />
                        </Card>

                        <div className="md:grid md:grid-cols-3 md:gap-2 flex flex-col">
                            <Card>
                                <Settings
                                    themeManager={themeManager}
                                    showDeleteHistoryModal={() => setShowDeleteHistoryModal(true)}
                                />
                            </Card>

                            <Card className="col-span-2">
                                <About />
                            </Card>
                        </div>
                    </div>
                </MotionWrapper>
            )}
        </AnimatePresence>
    )
}

export default App
