

import React, {useContext} from 'react'

import { GameDataContext, ReactorDataContext } from '../Game';

const GameStats = () => {
    const gameData = useContext(GameDataContext)
    const reactorData = useContext(ReactorDataContext)

    return (
        <div className="w-full p-1 px-5 my-1 rounded bg-slate-400">
            <h4>Game-Stats</h4>
            <table className='w-full' id='game-stats-table'>
                <tbody>
                    <tr>
                        <td>Game duration</td>
                        <td>{ (gameData.timeRunning / 20).toFixed(1)}</td>
                        <td> sec.</td>
                    </tr>
                    <tr>
                        <td>Produced Energy</td>
                        <td>{ reactorData.producedEnergy.toLocaleString("de-DE", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td>kWh</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default GameStats;