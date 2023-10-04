

import React from 'react'

function GameHistory(props) {
    let gameHistory = props.gameHistory.sort(
        (p1, p2) => (p1.averageProductionIntensity < p2.averageProductionIntensity) ? 1 : -1
    );

    let gameHistoryElement = (
        <div>You have not played any games yet. Finished games and highscores will appear here.</div>
    )

    if (gameHistory.length > 0) {
        gameHistoryElement = (
            gameHistory.map((element) => (
                <div className='history-card flex-wrap border-solid border-2 rounded border-neutral-400' key={element.date}>
                    <div className='history-card--section'>
                        <span className='history-card-label'>Date</span> <br></br>
                        {element.date.toLocaleDateString("de-DE") + " " + element.date.getUTCHours() + ":" + element.date.getUTCMinutes()}
                    </div>
                    <div className='history-card--section'>
                        <span className='history-card-label'>Game Duration</span> <br></br>
                        {element.timeRunningInSeconds.toFixed(0)} seconds
                    </div>
                    
                    <div className='history-card--section'>
                        <span className='history-card-label'>Achieved Matched Rate</span> <br></br>
                        {(element.achievedMatchedRate * 100).toFixed(2)} % 
                    </div>
                    
                    <div className='history-card--section'>
                        <span className='history-card-label'>Status</span> <br></br>
                        {element.gameStatus}
                    </div>
                </div>
            ))
        )
    }

    return (
        <div className='w-full'>
            <h2>Past Games and Highscores</h2>
            {gameHistoryElement}    
        </div>
    )
}

export default GameHistory