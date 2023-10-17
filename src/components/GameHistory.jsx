

import React from 'react'

import Button, { buttonTypes } from './common/Button'


function GameHistorySection(props){
    return (
        <div className='min-w-[10rem] py-1 px-0'>
            <span className='font-bold'>{props.label}</span> <br></br>
            {props.value}
        </div>
    )
}

function GameHistory(props) {
    let gameHistoryElement = (
        <div>You have not played any games yet. Finished games and highscores will appear here.</div>
    )

    let deleteHistoryButton = ""

    if (props.gameHistory.length > 0) {
        gameHistoryElement = (
            props.gameHistory.map((element) => (
                <div className='flex justify-between w-full py-1 px-3 my-1 mx-auto flex-wrap border-solid border-2 rounded border-neutral-400' key={element.date}>
                    
                    <GameHistorySection 
                        label={"Date"}
                        value={`${element.date.toLocaleDateString("de-DE")} ${element.date.getUTCHours()}:${element.date.getUTCMinutes()}`}
                    />

                    <GameHistorySection 
                        label={"Game Duration"}
                        value={`${element.timeRunningInSeconds.toFixed(0)} seconds`}
                    />
                    
                    <GameHistorySection 
                        label={"Achieved Matched Rate"}
                        value={`${(element.achievedMatchedRate * 100).toFixed(2)} %`}
                    />

                    <GameHistorySection 
                        label={"Status"}
                        value={element.gameStatus}
                    />
                </div>
            ))
        )

        deleteHistoryButton = (
            <div className='flex justify-center mt-4'>
                <Button 
                    buttonType={buttonTypes.neutralButton}
                    onClick={() => props.deleteHistoryOnClick()}>
                    Reset History
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