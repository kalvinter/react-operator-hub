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
  import { Line } from 'react-chartjs-2';
import {GameConfig} from './Config.js'
import { effectDirection } from './Events.js';

import {ArrowDownCircleIcon, ArrowUpCircleIcon} from '@heroicons/react/20/solid'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const baseOptions = {
    responsive: true,
    pointStyle: "line",
    animations: {
        x: {
            type: 'number',
            easing: 'linear',
            duration: 2,
            }
        },
        y: {
            duration: 2
        }
    };


const temperature_options = {
    ... baseOptions,
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
            suggestedMax: GameConfig.maxTemperature,
            ticks: {
                callback: function(value, index, ticks) {
                    return value + ' °C';
                }
            }
        }
    }
};

const output_options = {
    ... baseOptions,
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


const inputLevelList = Array.from({ length: 100 }, (_, i) => <option key={i} value={i}>{i}</option>)
  
const GameUI = (props) => {
    let temperature_indication_bg;
    let temperature_text;
    let display_temperature_text;
            
    if (props.currentTemperature <= GameConfig.minimumTemperature) {
        temperature_indication_bg = "bg-blue-600"
        temperature_text = (
            <h4>Temperature is not high enough </h4>
        )
        display_temperature_text = true
    } else if (props.currentTemperature <= 150){
        temperature_indication_bg = "bg-green-600"
        temperature_text = (
            <h4>Temperature is normal</h4>
        )
        display_temperature_text = false
    } else if (props.currentTemperature <= 200){
        temperature_indication_bg = "bg-yellow-600"
        temperature_text = (
            <h4>Temperature is above normal</h4>
        )
        display_temperature_text = false
    } else if (props.currentTemperature < 250){
        temperature_indication_bg = "bg-orange-500"
        temperature_text = (
            <h4>Temperature is high!</h4>
        )
        display_temperature_text = true
    } else if (props.currentTemperature < GameConfig.maxTemperature) {
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

    let labels;

    if (props.timeRunning <= 10) {
        labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]
    } else {
        let rawLabels = Array.from(Array(props.timeRunning).keys()).slice(-11)
        
        labels = []

        for (let label of rawLabels){
            labels.push((label / 10).toFixed(1))
        }
    }

    let temperature_line_chart_data = {
        labels,
        datasets: [
            {
              label: 'Temperature',
              data: props.displayedTemperatureHistory,
              borderColor: 'red',
              backgroundColor: 'red',
            },
          ],
    }

    let displayedUpperElectricityDemandLimit = props.displayedElectricityDemandHistory.map((element) => {
        return (element + GameConfig.productionDemandDeltaLimit) === 0 ? 0 : element + GameConfig.productionDemandDeltaLimit
    })
    let displayedLowerElectricityDemandLimit = props.displayedElectricityDemandHistory.map((element) => {
        return (element - GameConfig.productionDemandDeltaLimit) === 0 ? 0 : element - GameConfig.productionDemandDeltaLimit
    })

    let output_line_chart_data = {
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

    if (props.gameIsLost){
        gamePauseBar = (
            <div className="w-full border-gray-900 rounded bg-red-500  p-2 my-2">
                <h4>You have lost.</h4>
            </div>
        )
    }

    let deltaLabel = "";
    let deltaBg = "bg-green-600"

    if (props.overProduction){
        deltaLabel = "Overproduction"
        deltaBg = "bg-yellow-600"

    } else if (props.underProduction) {
        deltaLabel = "Underproduction"
        deltaBg = "bg-yellow-600"
    } else {
        deltaBg = "bg-green-600"
    }

    let deltaComponent;
    if (props.overProduction || props.underProduction) {
        deltaComponent = (
            <div className={`w-full my-2 border-solid border-2 rounded border-gray-900 flex justify-between p-2 items-center ${deltaBg}`}>
                <h5>{deltaLabel}</h5> 
                <div>{props.productionDemandDelta.toFixed(0)} Watt</div>
            </div>    
        )
    } else {
        deltaComponent = (
            <div className={`w-full border-solid border-2 rounded border-gray-900 my-2 flex justify-between p-2 items-center ${deltaBg}`}>
                <h5>Perfect Production / Demand Match</h5>
            </div>    
        )
    }
    
    const activeEvents = props.activeEvents.map((activeEvent) => {
        let element = activeEvent.originalEvent
        return (
            <div className='mx-3' key={element.id}><span className='flex items-center'>{element.direction === effectDirection.increase ?  <ArrowUpCircleIcon></ArrowUpCircleIcon>: <ArrowDownCircleIcon></ArrowDownCircleIcon>} &nbsp;{element.title}</span></div>
        )
    })
    let topBar = (
        <div className="w-full my-2 border-solid border-2 rounded border-gray-900 flex justify-between p-2 items-center bg-neutral-700">
            <h4>Points &nbsp;<span className={`${deltaBg} px-2`}>{props.currentPoints.toFixed(0)}</span></h4>
            <button 
                onClick={() => {props.toggleGamePauseOnClick()}}
                className={`${(props.gameIsPaused ? 'bg-green-400' : 'bg-red-400')} text-black p-1 border-solid border-2 rounded border-slate-900`}
            >{`${props.gameIsPaused ? 'Start Game' : 'Pause Game'}`}</button>
        </div>
    )

    let eventPrefixLabel = (props.upcomingEventChange)? (<span className='text-orange-600'>WARNING:</span>) : (<span>STATUS:</span>)

    let eventsBar = (
        <div className="w-full my-2 border-solid border-2 rounded border-gray-900 p-2 bg-neutral-700">
            <div className='w-full my-2 flex justify-between items-center'>
                <div className='w-full my-1 border-solid border-2 rounded border-gray-900 bg-black p-2 flex items-center' id='eventsArea'>
                    <span>{eventPrefixLabel} {props.displayedEventText}</span>
                </div>
            </div>
            <div className='w-full my-2 flex justify-between items-center'>
                <b className='ml-2 mr-4 whitespace-nowrap'>Active Events</b>
                <div className='w-full my-1 flex items-center' id='activeEventsArea'>
                    {activeEvents}
                </div>
            </div>
        </div>
    )

    return (
        <div className="w-full h-full mt-1">
            {topBar}
            {eventsBar}

            <div className="flex flex-1 gap-2 my-2">
                <div className="border-2 rounded border-gray-900 p-2 bg-neutral-700 w-full">
                    <datalist id="input-level-list">
                        {inputLevelList}
                    </datalist>
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        <label>Fuel Input</label>
                        <p className='text-right'>{props.currentFuelInputLevel}</p>
                        <input type='range' min="0" max="100" step="1" 
                            className="bg-neutral-600 text-right col-span-5"
                            onChange={props.fuelInputOnChange}
                            placeholder="0"
                            list="input-level-list"
                            value={props.currentFuelInputLevel}
                        ></input>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        <label>Cooling Level</label>
                        <p className='text-right'>{props.currentCoolingLevel}</p>
                        <input type='range' min="0" max="100" step="1" 
                            className="bg-neutral-600 text-right col-span-5" 
                            onChange={props.coolingLevelOnChange}
                            list="input-level-list"
                            value={props.currentCoolingLevel}
                        ></input>
                    </div>
                </div>

            </div>

            <div className='flex flex-1 gap-2 my-2'>

                <div className='border-2 rounded border-gray-900 p-2 bg-neutral-700 w-full'>
                    <div className="grid grid-cols-2 mb-2 border-b-2 border-gray-200">
                        <p className="w-full">Reactor Temperature</p>
                        <div className={`${temperature_indication_bg} 
                            w-full text-right px-2 flex justify-end`}
                        >
                            <div>{props.currentTemperature.toFixed(2)}</div> 
                            <div className="w-[40px]">°C</div>
                        </div>    
                    </div>
                    <Line options={temperature_options} data={temperature_line_chart_data} />
                    <div className={`${display_temperature_text? '' : 'invisible'} w-full border-solid border-2 rounded border-gray-900
                     ${temperature_indication_bg} p-2 my-2`}>
                        {temperature_text}
                    </div>
                </div>

                <div className='border-2 rounded border-gray-900 p-2 bg-neutral-700 w-full'>
                    <div className="grid grid-cols-2 mb-2 border-b-2 border-gray-200">
                        <p className="w-full">Current Electricity Output</p>
                        <div className="w-full text-right px-2 flex justify-end">
                            <div>{props.currentElectricityOutput.toFixed(2)}</div> 
                            <div className="w-[40px]">Watt</div>
                        </div>
                    </div>
                    <Line options={output_options} data={output_line_chart_data} />
                    {deltaComponent}

                </div>

            </div>

        </div>
    )
}

export default GameUI
