

import React from 'react'

function GameHistory(props) {
    if (props.gameHistory.length === 0){
        return (<div></div>)
    }

    let gameHistory = props.gameHistory.sort(
        (p1, p2) => (p1.averageProductionIntensity < p2.averageProductionIntensity) ? 1 : -1
    );

    return (
        <div className='w-full'>
            <hr className='mt-4 mb-4'></hr>
            <h4 className='mb-2'>Past Games and Highscores</h4>

            {gameHistory.map((element) => (
                <div className='history-card bg-slate-400'>
                    <div>
                        <span className='history-card-label'>Date</span> <br></br>
                        {element.date.toLocaleDateString("de-DE") + " " + element.date.getUTCHours() + ":" + element.date.getUTCMinutes()}
                    </div>
                    <div>
                        <span className='history-card-label'>Game Duration</span> <br></br>
                        {element.timeRunning} seconds
                    </div>
                    <div>
                        <span className='history-card-label'>Produced Energy</span> <br></br>
                        {element.producedEnergy.toFixed(2)} kWh
                    </div>
                    
                    <div>
                        <span className='history-card-label'>Production Intensity</span> <br></br>
                        {element.averageProductionIntensity.toFixed(2)} kWh / s
                    </div>
                    <div>
                        <span className='history-card-label'>Game Won</span> <br></br>
                        {element.gameWon? 'Won' : '-'}
                    </div>
                </div>
            ))}    
        </div>
    )
}

export default GameHistory