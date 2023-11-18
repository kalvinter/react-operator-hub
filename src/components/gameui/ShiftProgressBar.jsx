import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import Card from '../common/Card.jsx'

import { GameDataContext } from '../../pages/Game.jsx'

import { getProductionBg } from '../Utils.js'

import ShiftProgressGraph from '../ShiftProgressGraph.jsx'


function ShiftProgressBar() {
    const {t} = useTranslation()

    const gameData = useContext(GameDataContext)

    let deltaBg = getProductionBg({
        overProduction: gameData.overProduction,
        underProduction: gameData.underProduction,
    })

    return (
        <Card className="w-full items-center">
            <div className="w-full flex justify-between">
                <span className="hidden md:block">{t("ShiftProgessBar--Graph-Label")}</span>
                <span className="pr-2">{t("ShiftProgessBar--Match-Rate-Label")}</span>
            </div>
            <ShiftProgressGraph
                demandMatchedStatusHistory={gameData.demandMatchedStatusHistory}
                achievedMatchedRate={gameData.achievedMatchedRate}
                shiftTimeLeft={gameData.shiftTimeLeft}
                rateBg={deltaBg}
            />
        </Card>
    )
}

export default ShiftProgressBar
