import React from 'react'

import { Link } from 'react-router-dom'
import { gameHistoryManager } from '../game/GameHistoryManager'
import { ArrowLeftOnRectangleIcon, CheckIcon, ListBulletIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { GameEndTypes } from '../game/Config'
import ShiftProgressGraph from './ShiftProgressGraph'

export const gameHistoryCardTestId = 'gameHistoryCardTestId'

export function GameHistoryCard(props) {
    let entry = props.gameHistoryEntry

    let statusColor = ''
    let icon = ''

    switch (entry.gameStatus) {
        case GameEndTypes.shiftWasFinished:
            statusColor = 'text-color--success'
            icon = <CheckIcon className={`small-icon ${statusColor}`} />
            break
        case GameEndTypes.aborted:
            statusColor = ''
            icon = <ArrowLeftOnRectangleIcon className={`small-icon ${statusColor}`} />
            break
        case GameEndTypes.lost:
            statusColor = 'text-color--danger'
            icon = <XMarkIcon className={`small-icon ${statusColor}`} />
            break
    }

    return (
        <div className="bg-element w-full p-2 rounded" data-testid={gameHistoryCardTestId}>
            <div className="grid grid-cols-12 items-center gap-2">
                <div className="flex flex-col col-span-2 md:col-span-1 min-h-[2rem] min-w-[2rem] justify-center">
                    {icon}
                    <small className={`${statusColor} text-center`}>{entry.gameStatus}</small>
                </div>
                <div className="flex gap-2 col-span-10 md:col-span-4 justify-around">
                    <span>
                        {entry.date.toLocaleDateString('de-DE')} {entry.date.getUTCHours()}:{entry.date.getUTCMinutes()}
                    </span>
                    <span>{entry.timeRunningInSeconds.toFixed(0)} seconds</span>
                </div>
                <div className="col-span-12 md:col-span-7">
                    <ShiftProgressGraph
                        demandMatchedStatusHistory={entry.demandMatchedStatusHistory}
                        achievedMatchedRate={entry.achievedMatchedRate}
                        shiftTimeLeft={entry.shiftTimeLeft}
                        rateBg={''}
                    />
                </div>
            </div>
        </div>
    )
}

const displayedHistoryEntriesLimit = 5

export default function GameHistorySummary() {
    // const [addGameHistoryEntry, deleteGameHistory, gameHistory] = useGameHistory()

    // console.warn("gameHistory in history summary, ", gameHistory)
    // const gameHistoryManager = useGameHistory()
    let gameHistory = gameHistoryManager.gameHistory
    let gameHistoryList = <div>You have not played any games yet. Finished games and highscores will appear here.</div>

    if (gameHistory.length > 0) {
        gameHistoryList = gameHistory
            .slice(0, displayedHistoryEntriesLimit)
            .map((gameHistoryEntry) => (
                <GameHistoryCard gameHistoryEntry={gameHistoryEntry} key={gameHistoryEntry.date} />
            ))
    }

    let showMoreButton = ''

    if (gameHistory.length > displayedHistoryEntriesLimit) {
        showMoreButton = <Link to={`/react-reactor-game/game-history/`}>all Game History Entries</Link>
    }

    let displayedEntriesSummary = <small>{gameHistory.length} Entries</small>

    if (gameHistory.length > displayedHistoryEntriesLimit) {
        displayedEntriesSummary = (
            <small>
                Showing {displayedHistoryEntriesLimit} of {gameHistory.length} Entries{' '}
            </small>
        )
    }

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between">
                <h2 className="flex items-center">
                    <ListBulletIcon className="small-icon mr-2"></ListBulletIcon> Game History
                </h2>
                {showMoreButton}
            </div>

            <div className="mb-3">{displayedEntriesSummary}</div>
            <div className="flex gap-2 flex-col">{gameHistoryList}</div>
        </div>
    )
}
