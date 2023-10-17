import React from 'react'

import ModalFooter from './ModalFooter'
import Button from '../common/Button'
import ModalLayout from './ModalLayout'
import { buttonTypes } from '../common/Button'

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
                <Button
                    buttonType={buttonTypes.neutralButton}
                    onClick={() => props.cancelButtonOnClick()}
                >
                    Close
                </Button>
            </ModalFooter>

        </ModalLayout>
    )
}
