import React, {useContext} from 'react'

import Card from '../common/Card.jsx';

import { GameDataContext } from '../../pages/Game.jsx';

import { getProductionLabelBg } from '../Utils.js'

import ShiftProgressGraph from '../ShiftProgressGraph.jsx';


function ShiftProgressBar() {
  const gameData = useContext(GameDataContext)

  let delta = getProductionLabelBg({
    overProduction: gameData.overProduction, 
    underProduction: gameData.underProduction
  })

  /* 
    <div className='flex p-1 bg-black whitespace-nowrap w-full mr-0'>
        {gameData.demandMatchedStatusHistory.map((item, index) => {
            return <div key={index} className={`${item.productionDemandMatch ? productionMatchedBg : productionMisMatchBg}`} style={{width: `${item.duration}%`, height: "100%"}}></div>
        })}
        <div key="remaining-time" className="bg-gray-500" style={{width: `${gameData.shiftTimeLeft / 50}%`, height: "100%"}}></div>
    </div>
    <h4 className={`${delta.deltaBg} w-[10ch] text-right border-4 border-l-0 border-rounded border-black px-2 my-0 whitespace-nowrap`}><Percentage decimalFigure={gameData.achievedMatchedRate} /> %</h4>
  */

  return (
    <Card className="w-full items-center">
        <div className='w-full flex justify-between'>
            <span className='hidden md:block'>Demand Matched History</span>
            <span className='pr-2'>Demand Matched Rate</span>
        </div>
        <ShiftProgressGraph 
          demandMatchedStatusHistory={gameData.demandMatchedStatusHistory}
          achievedMatchedRate={gameData.achievedMatchedRate}
          shiftTimeLeft={gameData.shiftTimeLeft}
          rateBg={delta.deltaBg}
        />
    </Card>
  )
}

export default ShiftProgressBar