import React from 'react'

import ModalFooter from './ModalFooter'
import ModalFooterButton from './ModalFooterButton'
import ModalLayout from './ModalLayout'
import { buttonType } from './ModalFooterButton'

import { AchievementBadgeFull } from '../Achievements'

export default function unlockedAchievementsModal(props) {
    
    return (
        <ModalLayout
            showModal={props.showModal}
            title={"You have unlocked new Achievements!"}
        >
            <div className="relative p-6 gap-2 flex flex-col">
                {props.newlyUnlockedAchievements.map((achievement) => {
                    return <AchievementBadgeFull 
                        key={achievement.label} 
                        achievement={achievement}
                        showDescription={true}
                     />
                })}
            </div>
            <ModalFooter>
                <ModalFooterButton
                    buttonType={buttonType.neutralButton}
                    label={"Close"}
                    actionButtonOnClick={() => props.cancelButtonOnClick()}
                />
            </ModalFooter>

        </ModalLayout>
    )
}
