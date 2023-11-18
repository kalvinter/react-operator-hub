import { useContext } from 'react'
import { Line } from 'react-chartjs-2'

import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import { useTranslation } from 'react-i18next'

import { GameConfig } from '../../game/Config.js'
import { lineChartBaseOptions, generateChartLabels } from './ChartUtils.js'

import { GameDataContext, ReactorDataContext } from '../../pages/Game.jsx'

import Card from '../common/Card.jsx'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const temperatureChartOptions = {
    ...lineChartBaseOptions,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Reactor Temperature',
        },
        tooltip: {
            enabled: false,
        },
    },
    scales: {
        y: {
            min: 0,
            suggestedMax: GameConfig.maximumTemperature,
            ticks: {
                callback: function (value, index, ticks) {
                    return value + ' °C'
                },
            },
        },
    },
}

export const temperatureChartTestId = "temperatureChartTestId"

const TemperatureChart = () => {
    const {t} = useTranslation()

    const reactorData = useContext(ReactorDataContext)
    const gameData = useContext(GameDataContext)

    let temperature_indication_bg
    let temperature_text
    let display_temperature_text

    if (reactorData.currentTemperature <= GameConfig.minimumTemperature) {
        temperature_indication_bg = 'bg-dark text-color--light'
        temperature_text = (<span>{t("TemperatureChart--Message-Low")}</span>)
        display_temperature_text = true
    } else if (reactorData.currentTemperature <= 150) {
        temperature_indication_bg = 'bg-light'
        temperature_text = (<span>{t("TemperatureChart--Message-Normal")}</span>)
        display_temperature_text = true
    } else if (reactorData.currentTemperature <= 200) {
        temperature_indication_bg = 'bg-warning'
        temperature_text = (<span>{t("TemperatureChart--Message-Above-Normal")}</span>)
        display_temperature_text = true
    } else if (reactorData.currentTemperature < 250) {
        temperature_indication_bg = 'bg-strong-warning'
        temperature_text = (<span>{t("TemperatureChart--Message-High")}</span>)
        display_temperature_text = true
    } else if (reactorData.currentTemperature < GameConfig.maximumTemperature) {
        temperature_indication_bg = 'bg-danger'
        temperature_text = (<span>{t("TemperatureChart--Message-Critical")} {GameConfig.maximumTemperature}°C!</span>)
        display_temperature_text = true
    } else {
        temperature_indication_bg = 'bg-danger'
        temperature_text = (<span>{t("TemperatureChart--Message-Lost")}</span>)
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
        <Card className="w-full my-0" testId={temperatureChartTestId}>
            <div className="grid grid-cols-8 mb-2 border-b-2 border-gray-200 py-1 items-center">
                <div className="flex items-center md:col-span-4 col-span-5 gap-1">
                    <ExclamationTriangleIcon className="small-icon" />
                    <span>{t("TemperatureChart--Title")}</span>
                </div>
                <div
                    className={`${temperature_indication_bg} 
                    px-2 gap-2 flex justify-end md:col-span-4 col-span-3 w-full`}
                >
                    <div>{reactorData.currentTemperature.toFixed(2)}</div>
                    <div>°C</div>
                </div>
            </div>
            <div className="hidden md:flex">
                <Line options={temperatureChartOptions} data={temperature_line_chart_data} />
            </div>
            <div
                className={`${
                    display_temperature_text ? '' : 'invisible'
                } w-full border-solid border-2 rounded border-gray-900
            ${temperature_indication_bg} px-2 py-1 my-1`}
            >
                {temperature_text}
            </div>
        </Card>
    )
}

export default TemperatureChart
