

import React from 'react'

import { Link } from 'react-router-dom'
import { useGameHistory } from '../hooks/useGameHistory'
import { gameHistoryManager } from '../game/GameHistoryManager'


function GameHistorySection(props){
    return (
        <div className='min-w-[10rem] py-1 px-0'>
            <span className='font-bold'>{props.label}</span> <br></br>
            {props.value}
        </div>
    )
}

export function GameHistoryCard(props){
    let entry = props.gameHistoryEntry
    return (
        <div className='bg-element hover:shadow-xl flex justify-between w-full py-1 px-3 my-1 mx-auto flex-wrap border-solid border-2 rounded border-neutral-400' key={entry.date}>
            <GameHistorySection 
                label={"Date"}
                value={`${entry.date.toLocaleDateString("de-DE")} ${entry.date.getUTCHours()}:${entry.date.getUTCMinutes()}`}
            />

            <GameHistorySection 
                label={"Game Duration"}
                value={`${entry.timeRunningInSeconds.toFixed(0)} seconds`}
            />
            
            <GameHistorySection 
                label={"Achieved Matched Rate"}
                value={`${(entry.achievedMatchedRate * 100).toFixed(2)} %`}
            />

            <GameHistorySection 
                label={"Status"}
                value={entry.gameStatus}
            />
        </div>
    )
}

const displayedHistoryEntriesLimit = 5

export default function GameHistorySummary(props) {
    // const [addGameHistoryEntry, deleteGameHistory, gameHistory] = useGameHistory()

    // console.warn("gameHistory in history summary, ", gameHistory)
    const gameHistoryManager = useGameHistory()
    let gameHistory = gameHistoryManager.gameHistory
    let gameHistoryList = (
        <div>You have not played any games yet. Finished games and highscores will appear here.</div>
    )

    if (gameHistory.length > 0) {
        gameHistoryList = (
            gameHistory.slice(0, displayedHistoryEntriesLimit).map((gameHistoryEntry) => (
                <GameHistoryCard gameHistoryEntry={gameHistoryEntry} key={gameHistoryEntry.date}/>
            ))
        )
    }

    let showMoreButton = ""

    if (gameHistory.length > displayedHistoryEntriesLimit) {
        showMoreButton = (
            <Link
                to={`/react-reactor-game/game-history/`}
            >all Game History Entries</Link>
        )
    }

    let displayedEntriesSummary = (
        <small>{gameHistory.length} Entries</small>
    )
    
    if (gameHistory.length > displayedHistoryEntriesLimit) {
        displayedEntriesSummary = (
            <small>Showing {displayedHistoryEntriesLimit} of {gameHistory.length} Entries </small>
        )
    }

    return (
        <div className='w-full'>
            
            <div className='flex flex-row justify-between'>
                <h2>Game History</h2>
                {showMoreButton}
            </div>

            <div className='mb-3'>
                {displayedEntriesSummary}
            </div>
            
            {gameHistoryList}
        </div>
    )
}
