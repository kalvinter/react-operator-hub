import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from "@heroicons/react/20/solid"

import Card from '../components/common/Card'

import { GameHistoryCard } from '../components/GameHistory'
import { useGameHistory } from '../hooks/useGameHistory'


export default function GameHistoryPage(props) {
  const [addGameHistoryEntry, deleteGameHistory, gameHistory] = useGameHistory()

  return (
    <div className='w-full'>
        <Card className="align-center flex">
            <Link to={`/react-reactor-game/`} className='flex items-center gap-2 no-underline'>
                <ArrowLeftIcon className="small-icon"></ArrowLeftIcon>Go Back
            </Link>
        </Card>

        <Card>
            <h4>Game History</h4>
            
            <div className='mb-3'>
                <small>{gameHistory.length} Entries</small>
            </div>

            {gameHistory.map((gameHistoryEntry) => {
                return <GameHistoryCard gameHistoryEntry={gameHistoryEntry} key={gameHistoryEntry.date}/>
            })}

        </Card>
    </div>
  )
}
