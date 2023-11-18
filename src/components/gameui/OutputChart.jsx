import { useContext } from 'react'

import { useTranslation } from 'react-i18next'
import { Line } from 'react-chartjs-2'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'

import { BoltIcon } from '@heroicons/react/20/solid'

import Card from '../common/Card.jsx'
import { GameConfig } from '../../game/Config.js'
import { lineChartBaseOptions, generateChartLabels } from './ChartUtils.js'
import { getProductionBg } from '../Utils.js'

import { GameDataContext, ReactorDataContext } from '../../pages/Game.jsx'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const outputChartOptions = {
    ...lineChartBaseOptions,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Energy Output',
        },
        tooltip: {
            enabled: false,
        },
        filler: {
            propagate: true,
        },
    },
    scales: {
        y: {
            min: 0,
            suggestedMax: GameConfig.maximumPossibleDemand,
            ticks: {
                callback: function (value, index, ticks) {
                    return value + ' Watt'
                },
            },
        },
    },
}

export default function OutputChart() {
    const {t} = useTranslation()

    const gameData = useContext(GameDataContext)
    const reactorData = useContext(ReactorDataContext)

    let displayedUpperElectricityDemandLimit = reactorData.displayedElectricityDemandHistory.map((element) => {
        return element + GameConfig.productionDemandDeltaLimit === 0
            ? 0
            : element + GameConfig.productionDemandDeltaLimit
    })
    let displayedLowerElectricityDemandLimit = reactorData.displayedElectricityDemandHistory.map((element) => {
        return element - GameConfig.productionDemandDeltaLimit === 0
            ? 0
            : element - GameConfig.productionDemandDeltaLimit
    })

    let labels = generateChartLabels(gameData.timeRunning)

    let outputChartData = {
        labels,
        datasets: [
            {
                label: "Electricity Output",
                data: reactorData.displayedElectricityOutputHistory,
                borderColor: '#5169e9',
                borderWidth: 4,
            },
            {
                label: 'Electricity Demand Upper Limit',
                data: displayedUpperElectricityDemandLimit,
            },
            {
                label: 'Electricity Demand Lower Limit',
                data: displayedLowerElectricityDemandLimit,
                fill: {
                    target: '-1',
                    below: 'rgb(86, 98, 116)'
                },
            },
        ],
    }

    let deltaBg = getProductionBg({
        overProduction: gameData.overProduction,
        underProduction: gameData.underProduction,
    })

    let deltaComponent

    if (gameData.overProduction || gameData.underProduction) {
        let deltaLabel = gameData.overProduction ? t("OutputChart--Label-OverProduction") : t("OutputChart--Label-UnderProduction")

        deltaComponent = (
            <span>
                {deltaLabel} {gameData.productionDemandDelta.toFixed(0)} {t('Electricity-Output-Unit')}
            </span>
        )
    } else {
        deltaComponent = <span>{t("OutputChart--Perfect-Match-Message")}</span>
    }

    return (
        <Card className="w-full my-0">
            <div className="grid grid-cols-2 mb-2 border-b-2 border-gray-200 items-center py-1">
                <div className="flex items-center gap-1">
                    <BoltIcon className="small-icon" />
                    <span>{t('OutputChart--Title')}</span>
                </div>
                <div className="w-full text-right px-2 flex justify-end">
                    <div>{reactorData.currentElectricityOutput.toFixed(2)}</div>
                    <div className="w-[40px]">{t('Electricity-Output-Unit')}</div>
                </div>
            </div>
            <Line options={outputChartOptions} data={outputChartData} />
            <div
                className={`w-full border-solid border-2 rounded border-gray-900 my-1 flex justify-between px-2 py-1 items-center ${deltaBg}`}
            >
                {deltaComponent}
            </div>
        </Card>
    )
}
