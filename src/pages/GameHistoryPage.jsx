import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from "@heroicons/react/20/solid"

import {ListBulletIcon} from '@heroicons/react/20/solid'

import Card from '../components/common/Card'

import { GameHistoryCard } from '../components/GameHistory'

import { gameHistoryManager } from '../game/GameHistoryManager'


export const gameHistoryPageTestId = "game-history-page"


export default function GameHistoryPage() {
  
  return (
    <div className='w-full' data-testid={gameHistoryPageTestId}>
        <Card className="align-center flex">
            <Link to={`/react-reactor-game/`} className='flex items-center gap-2 no-underline'>
                <ArrowLeftIcon className="small-icon"></ArrowLeftIcon>Go Back
            </Link>
        </Card>

        <Card>
            <h2 className='flex items-center'>
                <ListBulletIcon className='small-icon mr-2'></ListBulletIcon> Game History
            </h2>

            <div className='mb-3'>
                <small>{gameHistoryManager.gameHistory.length} Entries</small>
            </div>

            <div className='gap-2 flex flex-col'>
                {gameHistoryManager.gameHistory.map((gameHistoryEntry) => {
                    return <GameHistoryCard gameHistoryEntry={gameHistoryEntry} key={gameHistoryEntry.date}/>
                })}
            </div>

        </Card>
    </div>
  )
}
