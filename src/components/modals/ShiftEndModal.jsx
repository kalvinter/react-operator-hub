import { useContext } from 'react'

import Percentage from '../common/Percentage.jsx'

import { GameDataContext } from '../../pages/Game.jsx'

import ModalLayout from './ModalLayout.jsx'
import ModalFooter from './ModalFooter.jsx'
import Button, { buttonTypes } from '../common/Button.jsx'
import { useTranslation } from 'react-i18next'

export default function ShiftEndModal(props) {
    const {t} = useTranslation()

    const gameData = useContext(GameDataContext)

    let matchRateBg = ''

    if (gameData.achievedMatchedRate > 0.75) {
        matchRateBg = 'bg-success'
    } else if (gameData.achievedMatchedRate > 0.4) {
        matchRateBg = 'bg-warning'
    } else {
        matchRateBg = 'bg-danger'
    }

    return (
        <ModalLayout title={t("ShiftFinishedModal--Title")} showModal={props.showModal}>
            <div className="relative p-6 flex-auto flex items-center flex-col">
                <div className="text-lg mt-10 md:mt-2">
                    <p>{t("ShiftFinishedModal--Text")}</p>

                    <div className="w-full text-center my-4 font-bold justify-center flex flex-col md:flex-row md:gap-5 gap-2">
                        <span className="py-1">{t("ShiftFinishedModal--Matched-Rate-Label")}</span>
                        <span className={`${matchRateBg} text-center rounded py-1 px-5`}>
                            <Percentage decimalFigure={gameData.achievedMatchedRate} /> %
                        </span>
                    </div>
                </div>
            </div>
            <ModalFooter>
                <Button buttonType={buttonTypes.neutralButton} onClick={() => props.actionButtonOnClick()}>
                    {t("ShiftFinishedModal--Back-To-Menu-Button-Label")}
                </Button>
            </ModalFooter>
        </ModalLayout>
    )
}
