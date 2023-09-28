import React, {useContext} from 'react'

import { GameDataContext } from '../Game.jsx';

import { getProductionLabelBg, productionMatchedBg, productionMisMatchBg } from './Utils'


function ShiftProgressBar(props) {
  const gameData = useContext(GameDataContext)

  let delta = getProductionLabelBg({
    overProduction: gameData.overProduction, 
    underProduction: gameData.underProduction
  })

  let shiftTimeLeftInSeconds = Math.round(gameData.shiftTimeLeft / 1000)

  let chart;

  for (let item of gameData.demandMatchedStatusHistory){
    chart += (
        <div className={`${item ? productionMatchedBg : productionMisMatchBg}`} style="width: 1px"></div>
    )
  }

  return (
    <div className="w-full my-2 border-solid border-2 rounded border-gray-900 p-2 items-center bg-neutral-700">
        <div className='w-full flex justify-between'>
            <span>Demand Matched History</span>
            <span className='pr-2'>Demand Matched Rate: </span>
        </div>
        <div className='w-full flex justify-between py-2'>
            <div className='flex p-1 bg-black whitespace-nowrap w-full mr-2'>
                {gameData.demandMatchedStatusHistory.map((item, index) => {
                    return <div key={index} className={`${item ? productionMatchedBg : productionMisMatchBg}`} style={{width: "1px", height: "100%"}}></div>
                })}
            </div>
            <h4 className={`${delta.deltaBg} px-2 whitespace-nowrap`}>{(gameData.achievedMatchedRate * 100).toFixed(2)} %</h4>
        </div>
        <div>Time until shift ends: {shiftTimeLeftInSeconds} seconds</div>
    </div>
  )
}

export default ShiftProgressBar