import { useContext } from 'react'

import Percentage from '../common/Percentage.jsx'

import { GameDataContext } from '../../pages/Game.jsx'

import ModalLayout from './ModalLayout.jsx'
import ModalFooter from './ModalFooter.jsx'
import Button, { buttonTypes } from '../common/Button.jsx'

export default function ShiftEndModal(props) {
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
        <ModalLayout title={'You have finished your Shift'} showModal={props.showModal}>
            <div className="relative p-6 flex-auto flex items-center flex-col">
                <div className="text-lg mt-10 md:mt-2">
                    <p>Congratulations! You have successfully finished your shift as Operater!</p>

                    <div className="w-full text-center my-4 font-bold justify-center flex flex-col md:flex-row md:gap-5 gap-2">
                        <span className="py-1">Your Demand-Matched-Rate was </span>
                        <span className={`${matchRateBg} text-center rounded py-1 px-5`}>
                            <Percentage decimalFigure={gameData.achievedMatchedRate} /> %
                        </span>
                    </div>
                </div>
            </div>
            <ModalFooter>
                <Button buttonType={buttonTypes.neutralButton} onClick={() => props.actionButtonOnClick()}>
                    Back to Main Menu
                </Button>
            </ModalFooter>
        </ModalLayout>
    )
}
