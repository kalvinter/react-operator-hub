

import React from 'react'

import Button, { buttonType } from './common/Button'

function GameHistory(props) {
    let gameHistoryElement = (
        <div>You have not played any games yet. Finished games and highscores will appear here.</div>
    )

    let deleteHistoryButton = ""

    if (props.gameHistory.length > 0) {
        gameHistoryElement = (
            props.gameHistory.map((element) => (
                <div className='history-card flex-wrap border-solid border-2 rounded border-neutral-400' key={element.date}>
                    <div className='history-card--section min-w-[10rem] px-0 py-1'>
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

        deleteHistoryButton = (
            <div className='flex justify-center mt-4'>
                <Button 
                    buttonType={buttonType.neutralButton}
                    label={"Reset History"}
                    onClick={() => props.deleteHistoryOnClick()}>
                </Button>
            </div>
        )
    
    }

    return (
        <div className='w-full'>
            <h2>Game History</h2>
            
            {gameHistoryElement}
            {deleteHistoryButton}
        </div>
    )
}

export default GameHistory