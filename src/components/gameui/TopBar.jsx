import React, {useContext} from 'react'

import { getProductionLabelBg } from './Utils'

import { GameDataContext } from '../../Game.jsx';

export default function TopBar(props) {
    const gameData = useContext(GameDataContext)

    let delta = getProductionLabelBg({
        overProduction: gameData.overProduction, 
        underProduction: gameData.underProduction
    })

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
        <div className="w-full my-2 border-solid border-2 rounded border-gray-900 flex justify-between p-2 items-center bg-neutral-700">
            <h4>Points &nbsp;<span className={`${delta.deltaBg} px-2`}>{gameData.currentPoints.toFixed(0)}</span></h4>
            {pauseButton}
        </div>
    )
}
