import React from 'react'

import { Line } from 'react-chartjs-2';
import { GameConfig } from '../Config.js';
import {lineChartBaseOptions, generateChartLabels} from './ChartUtils.js'
import { getProductionLabelBg } from './Utils.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const outputChartOptions = {
    ... lineChartBaseOptions,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Energy Output',
        },
    },
    scales: {
        y: {
            min: 0,
            suggestedMax: GameConfig.maxPossibleDemand,
            ticks: {
                callback: function(value, index, ticks) {
                    return value + ' Watt';
                }
            }
        }
    }
};

export default function OutputChart(props) {
    
    let displayedUpperElectricityDemandLimit = props.displayedElectricityDemandHistory.map((element) => {
        return (element + GameConfig.productionDemandDeltaLimit) === 0 ? 0 : element + GameConfig.productionDemandDeltaLimit
    })
    let displayedLowerElectricityDemandLimit = props.displayedElectricityDemandHistory.map((element) => {
        return (element - GameConfig.productionDemandDeltaLimit) === 0 ? 0 : element - GameConfig.productionDemandDeltaLimit
    })

    let labels = generateChartLabels(props.timeRunning)

    let outputChartData = {
        labels,
        datasets: [
            {
              label: 'Electricity Output',
              data: props.displayedElectricityOutputHistory,
              borderColor: 'blue',
              backgroundColor: 'blue',
            },
            {
                label: 'Electricity Demand',
                data: props.displayedElectricityDemandHistory,
                borderColor: 'lime',
                backgroundColor: 'lime',
            },
            {
                label: 'Electricity Demand Upper Limit',
                data: displayedUpperElectricityDemandLimit,
                borderColor: 'lightgreen',
                borderWidth: 2
            },
            {
                label: 'Electricity Demand Lower Limit',
                data: displayedLowerElectricityDemandLimit,
                borderColor: 'lightgreen',
                borderWidth: 2
            },
          ],
    }

    let delta = getProductionLabelBg({
        overProduction: props.overProduction, 
        underProduction: props.underProduction
    })

    let deltaComponent;
    if (props.overProduction || props.underProduction) {
        deltaComponent = (
            <div className={`w-full my-2 border-solid border-2 rounded border-gray-900 flex justify-between p-2 items-center ${delta.deltaBg}`}>
                <h5>{delta.deltaLabel}</h5> 
                <div>{props.productionDemandDelta.toFixed(0)} Watt</div>
            </div>    
        )
    } else {
        deltaComponent = (
            <div className={`w-full border-solid border-2 rounded border-gray-900 my-2 flex justify-between p-2 items-center ${delta.deltaBg}`}>
                <h5>Perfect Production / Demand Match</h5>
            </div>    
        )
    }

    return (
        <div className='border-2 rounded border-gray-900 p-2 bg-neutral-700 w-full'>
            <div className="grid grid-cols-2 mb-2 border-b-2 border-gray-200">
                <p className="w-full">Current Electricity Output</p>
                <div className="w-full text-right px-2 flex justify-end">
                    <div>{props.currentElectricityOutput.toFixed(2)}</div> 
                    <div className="w-[40px]">Watt</div>
                </div>
            </div>
            <Line options={outputChartOptions} data={outputChartData} />
            {deltaComponent}
        </div>
    )
}
