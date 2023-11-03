import { useContext } from 'react';
import React from 'react'

import Percentage from '../common/Percentage.jsx';

import { GameDataContext } from '../../pages/Game.jsx';

import ModalLayout from './ModalLayout.jsx';
import ModalFooter from './ModalFooter.jsx';
import Button, {buttonTypes} from '../common/Button.jsx';


export default function ShiftEndModal(props) {
    const gameData = useContext(GameDataContext)

    let matchRateBg = ""

    if (gameData.achievedMatchedRate > 0.75){
        matchRateBg = "bg-success"
    } else if (gameData.achievedMatchedRate > 0.4) {
        matchRateBg = "bg-warning"
    } else {
        matchRateBg = "bg-danger"
    }

    return (
        <ModalLayout
            title={"You have finished your Shift"}
            showModal={props.showModal}
        >
            <div className="relative p-6 flex-auto">
                <div className="my-4  text-lg leading-relaxed">
                    {/* Main Modal Text */}
                    Congratulations! You have successfully finished your shift as Operater!

                    <div className='w-full text-center my-4 font-bold justify-center flex'>
                        <span className='py-1'>Your Demand-Matched-Rate was </span>
                        <span className={`${matchRateBg} rounded ml-4 py-1 px-2`}><Percentage decimalFigure={gameData.achievedMatchedRate} /> %</span>
                    </div>
                    
                </div>
            </div>
            <ModalFooter>
                <Button
                    buttonType={buttonTypes.neutralButton}
                    onClick={() => props.actionButtonOnClick()}
                >
                    Back to Main Menu
                </Button>
            </ModalFooter>
        </ModalLayout>
    )
}
