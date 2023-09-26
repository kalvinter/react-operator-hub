import React, {useContext} from 'react'

import { GameConfig } from '../../game/Config.js';
import {lineChartBaseOptions, generateChartLabels} from './ChartUtils.js'
import { Line } from 'react-chartjs-2';

import {ExclamationTriangleIcon} from '@heroicons/react/20/solid'

import { GameDataContext, ReactorDataContext } from '../Game.jsx';

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

const temperatureChartOptions = {
    ... lineChartBaseOptions,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Reactor Temperature',
        },
    },
    scales: {
        y: {
            min: 0,
            suggestedMax: GameConfig.maximumTemperature,
            ticks: {
                callback: function(value, index, ticks) {
                    return value + ' °C';
                }
            }
        }
    }
};


const TemperatureChart = () => {
    const reactorData = useContext(ReactorDataContext)
    const gameData = useContext(GameDataContext)

    let temperature_indication_bg;
    let temperature_text;
    let display_temperature_text;
            
    if (reactorData.currentTemperature <= GameConfig.minimumTemperature) {
        temperature_indication_bg = "bg-blue-600"
        temperature_text = (
            <h4>Temperature is not high enough </h4>
        )
        display_temperature_text = true
    } else if (reactorData.currentTemperature <= 150){
        temperature_indication_bg = "bg-green-600"
        temperature_text = (
            <h4>Temperature is normal</h4>
        )
        display_temperature_text = false
    } else if (reactorData.currentTemperature <= 200){
        temperature_indication_bg = "bg-yellow-600"
        temperature_text = (
            <h4>Temperature is above normal</h4>
        )
        display_temperature_text = false
    } else if (reactorData.currentTemperature < 250){
        temperature_indication_bg = "bg-orange-500"
        temperature_text = (
            <h4>Temperature is high!</h4>
        )
        display_temperature_text = true
    } else if (reactorData.currentTemperature < GameConfig.maxTemperature) {
        temperature_indication_bg = "bg-red-500"
        temperature_text = (
            <h4>Temperature is critical! <br></br>Reactor breakdown occures above {GameConfig.maxTemperature}°C!</h4>
        )
        display_temperature_text = true
    } else {
        temperature_indication_bg = "bg-red-500"
        temperature_text = (
            <h4>The reactor exceeded critical temperature</h4>
        )
        display_temperature_text = true
    }
    
    let labels = generateChartLabels(gameData.timeRunning)
    
    let temperature_line_chart_data = {
        labels,
        datasets: [
            {
              label: 'Temperature',
              data: reactorData.displayedTemperatureHistory,
              borderColor: 'red',
              backgroundColor: 'red',
            },
          ],
    }
        
    return (
        <div className='border-2 rounded border-gray-900 p-2 bg-neutral-700 w-full'>
                        
            <div className="grid grid-cols-2 mb-2 border-b-2 border-gray-200 py-1 items-center">
                <div className="game--chart-label"><ExclamationTriangleIcon className='game--chart-label-icon'/><span>Reactor Temperature</span></div>
                <div className={`${temperature_indication_bg} 
                    w-full text-right px-2 flex justify-end`}
                >
                    <div>{reactorData.currentTemperature.toFixed(2)}</div> 
                    <div className="w-[40px]">°C</div>
                </div>    
            </div>
            <div id='temperatureLineChartWrapper'>
                <Line options={temperatureChartOptions} data={temperature_line_chart_data} />
            </div>
            <div className={`${display_temperature_text? '' : 'invisible'} w-full border-solid border-2 rounded border-gray-900
            ${temperature_indication_bg} p-2 my-2`}>
                {temperature_text}
            </div>
            
        </div>
    )
}

export default TemperatureChart