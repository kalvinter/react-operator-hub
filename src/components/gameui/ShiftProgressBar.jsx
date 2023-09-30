import React, {useContext} from 'react'

import { GameDataContext } from '../Game.jsx';

import { getProductionLabelBg, productionMatchedBg, productionMisMatchBg } from './Utils'


function ShiftProgressBar(props) {
  const gameData = useContext(GameDataContext)

  let delta = getProductionLabelBg({
    overProduction: gameData.overProduction, 
    underProduction: gameData.underProduction
  })

  return (
    <div className="w-full my-2 border-solid border-2 rounded border-gray-900 p-2 items-center bg-neutral-700">
        <div className='w-full flex justify-between'>
            <span>Demand Matched History</span>
            <span className='pr-2'>Demand Matched Rate: </span>
        </div>
        <div className='w-full flex justify-between py-2'>
            <div className='flex p-1 bg-black whitespace-nowrap w-full mr-2'>
                {gameData.demandMatchedStatusHistory.map((item, index) => {
                    return <div key={index} className={`${item.productionDemandMatch ? productionMatchedBg : productionMisMatchBg}`} style={{width: `${item.duration}%`, height: "100%"}}></div>
                })}
                <div key="remaining-time" className="bg-gray-500" style={{width: `${gameData.shiftTimeLeft / 50}%`, height: "100%"}}></div>
            </div>
            <h4 className={`${delta.deltaBg} px-2 whitespace-nowrap`}>{(gameData.achievedMatchedRate * 100).toFixed(2)} %</h4>
        </div>
    </div>
  )
}

export default ShiftProgressBar