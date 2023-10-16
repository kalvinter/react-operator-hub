import React, {useContext} from 'react'

import { GameDataContext } from '../Game.jsx';

import Card from '../common/Card.jsx';

export default function TopBar() {
    const gameData = useContext(GameDataContext)

    let shiftTimeLeftInSeconds = Math.round(gameData.shiftTimeLeft / 1000)

    let pauseButton;
    if (gameData.gameIsLost){
        pauseButton = (
            <div className=" border-gray-900 rounded bg-red-500  px-2 py-1">
                <h4>You have lost.</h4>
            </div>
        )
    } else {
        pauseButton = (
            <button 
                onClick={(event) => {gameData.toggleGamePauseOnClick(event)}}
                className={`${(gameData.gameIsPaused ? 'bg-green-400' : 'bg-gray-400')} text-black p-1 border-solid border-2 rounded border-slate-900`}
            >{`${gameData.gameIsPaused ? 'Start Game' : 'Pause Game'}`}</button>
        )
    }

    return (
        <Card className="w-full flex justify-between items-center mt-0">
            <div>Time until shift ends: {shiftTimeLeftInSeconds} seconds</div>
            {pauseButton}
        </Card>
    )
}
