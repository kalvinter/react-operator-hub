import React from 'react'

import Percentage from './common/Percentage.jsx'

import { productionMatchedBg, productionMisMatchBg } from './Utils'

export default function ShiftProgressGraph(props) {
    return (
        <div className="w-full flex justify-between py-2">
            <div className="flex border-2 border-color-element whitespace-nowrap w-full mr-0">
                {props.demandMatchedStatusHistory.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`${item.productionDemandMatch ? productionMatchedBg : productionMisMatchBg}`}
                            style={{ width: `${item.duration}%`, height: '100%' }}
                        ></div>
                    )
                })}
                <div
                    key="remaining-time"
                    className="bg-gray-500"
                    style={{ width: `${props.shiftTimeLeft / 50}%`, height: '100%' }}
                ></div>
            </div>
            <h4
                className={`${props.rateBg} w-[10ch] text-right border-2 border-l-0 border-rounded border-color-element px-2 my-0 whitespace-nowrap`}
            >
                <Percentage decimalFigure={props.achievedMatchedRate} /> %
            </h4>
        </div>
    )
}
