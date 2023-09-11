import GameStats from './gameui/GameStats.jsx';
import TopBar from './gameui/TopBar.jsx';
import EventsBar from './gameui/EventsBar.jsx';
import InputBar from './gameui/InputBar.jsx';
import OutputChart from './gameui/OutputChart.jsx';
import TemperatureChart from './gameui/TemperatureChart.jsx';

const GameUI = (props) => {
    return (
        <div>
            <GameStats 
                timeRunning={props.timeRunning}
                producedEnergy={props.producedEnergy}
            />
            <div className="w-full h-full mt-1">
                <TopBar 
                    currentPoints={props.currentPoints}
                    overProduction={props.overProduction}
                    underProduction={props.underProduction}
                    gameIsLost={props.gameIsLost}
                    gameIsPaused={props.gameIsPaused}
                    toggleGamePauseOnClick={props.toggleGamePauseOnClick}
                />
                <EventsBar 
                    activeEvents={props.activeEvents}
                    upcomingEventChange={props.upcomingEventChange}
                    displayedEventText={props.displayedEventText}
                />
                <InputBar 
                    currentFuelInputLevel={props.currentFuelInputLevel}
                    fuelInputOnChange={props.fuelInputOnChange}
                    currentCoolingLevel={props.currentCoolingLevel}
                    coolingLevelOnChange={props.coolingLevelOnChange}
                />

                    <div className='flex flex-1 gap-2 my-2'>
                        <TemperatureChart 
                            timeRunning={props.timeRunning}
                            currentTemperature={props.currentTemperature}
                            displayedTemperatureHistory={props.displayedTemperatureHistory}
                        />
                        
                        <OutputChart 
                            timeRunning={props.timeRunning}
                            displayedElectricityDemandHistory={props.displayedElectricityDemandHistory}
                            displayedElectricityOutputHistory={props.displayedElectricityOutputHistory}
                            overProduction={props.overProduction}
                            underProduction={props.underProduction}
                            productionDemandDelta={props.productionDemandDelta}
                            currentElectricityOutput={props.currentElectricityOutput}
                        />
                    </div>

                </div>
        </div>  
    )
}

export default GameUI
