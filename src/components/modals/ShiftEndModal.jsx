import { useContext } from 'react';
import React from 'react'

import { GameDataContext } from '../Game.jsx';

import { greenBg, orangeBg, redBg } from '../Utils.js';

import ModalLayout from './ModalLayout.jsx';
import ModalFooter from './ModalFooter.jsx';
import ModalFooterButton, {buttonType} from './ModalFooterButton.jsx';


export default function ShiftEndModal(props) {
    const gameData = useContext(GameDataContext)

    let matchRateBg = ""

    console.log(gameData.achievedMatchedRate)
    if (gameData.achievedMatchedRate > 0.75){
        matchRateBg = greenBg
    } else if (gameData.achievedMatchedRate > 0.4) {
        matchRateBg = orangeBg
    } else {
        matchRateBg = redBg
    }

    return (
        <ModalLayout
            title={"You have finished your Shift"}
            showModal={props.showModal}
        >
            <div className="relative p-6 flex-auto">
                <div className="my-4 text-white text-lg leading-relaxed">
                    {/* Main Modal Text */}
                    Congratulations! You have successfully finished your shift as Operater!

                    <div className='w-full text-center my-4 font-bold justify-center flex'>
                        <span className='py-1'>Your Demand-Matched-Rate was </span>
                        <span className={`${matchRateBg} ml-4 py-1 px-2`}>{(gameData.achievedMatchedRate * 100).toFixed(2)} %</span>
                    </div>
                    
                </div>
            </div>
            <ModalFooter>
                <ModalFooterButton
                    buttonType={buttonType.neutralButton}
                    label={"Back to Main Menu"}
                    actionButtonOnClick={() => props.actionButtonOnClick()}
                />
            </ModalFooter>
        </ModalLayout>
    )
}
