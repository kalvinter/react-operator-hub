import React, {useContext} from 'react'

import Card from '../common/Card.jsx';

import { GameDataContext } from '../Game.jsx';

import Percentage from '../common/Percentage.jsx';

import { getProductionLabelBg, productionMatchedBg, productionMisMatchBg } from './Utils'


function ShiftProgressBar() {
  const gameData = useContext(GameDataContext)

  let delta = getProductionLabelBg({
    overProduction: gameData.overProduction, 
    underProduction: gameData.underProduction
  })

  return (
    <Card className="w-full items-center">
        <div className='w-full flex justify-between'>
            <span>Demand Matched History</span>
            <span className='pr-2'>Demand Matched Rate: </span>
        </div>
        <div className='w-full flex justify-between py-2'>
            <div className='flex p-1 bg-black whitespace-nowrap w-full mr-0'>
                {gameData.demandMatchedStatusHistory.map((item, index) => {
                    return <div key={index} className={`${item.productionDemandMatch ? productionMatchedBg : productionMisMatchBg}`} style={{width: `${item.duration}%`, height: "100%"}}></div>
                })}
                <div key="remaining-time" className="bg-gray-500" style={{width: `${gameData.shiftTimeLeft / 50}%`, height: "100%"}}></div>
            </div>
            <h4 className={`${delta.deltaBg} border-4 border-l-0 border-rounded border-black px-2 my-0 whitespace-nowrap`}><Percentage decimalFigure={gameData.achievedMatchedRate} /> %</h4>
        </div>
    </Card>
  )
}

export default ShiftProgressBar