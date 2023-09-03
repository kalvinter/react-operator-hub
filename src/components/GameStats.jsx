

import React from 'react'

const GameStats = (props) => {
  return (
    <div className="w-full p-1 px-5 my-1 rounded bg-slate-400">
        <h4>Game-Stats</h4>
        <table className='w-full' id='game-stats-table'>
            <tbody>
                <tr>
                    <td>Reactor running in sec</td>
                    <td>{ props.timeRunning.toFixed(2)}</td>
                    <td> sec.</td>
                </tr>
                <tr>
                    <td>Produced Energy</td>
                    <td>{ props.producedEnergy.toFixed(2)}</td>
                    <td>kWh</td>
                </tr>
                <tr>
                    <td>Average Intensity</td>
                    <td>{ props.averageProductionIntensity.toFixed(2)} </td>
                    <td>kWh / sec.</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default GameStats;