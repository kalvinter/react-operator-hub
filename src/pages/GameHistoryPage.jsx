import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from "@heroicons/react/20/solid"

import Card from '../components/common/Card'

import { GameHistoryCard } from '../components/GameHistory'


export default function GameHistoryPage(props) {
  let gameHistory = props.gameHistoryStorage.load()

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
