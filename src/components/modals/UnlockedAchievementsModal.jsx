import ModalFooter from './ModalFooter'
import Button from '../common/Button'
import ModalLayout from './ModalLayout'
import { buttonTypes } from '../common/Button'

import { AchievementBadge } from '../Achievements'
import { useTranslation } from 'react-i18next'

export default function unlockedAchievementsModal(props) {
    const {t} = useTranslation()
    return (
        <ModalLayout showModal={props.showModal} title={t("UnlockedAchievementsModal--Title")}>
            <div className="relative p-6 gap-2">
                <p>{t("UnlockedAchievementsModal--Description")}</p>
                <div className="w-full flex flex-col mt-4">
                    {props.newlyUnlockedAchievements.map((achievement) => {
                        return (
                            <AchievementBadge
                                key={achievement.labelKey}
                                achievement={achievement}
                                showDescription={true}
                            />
                        )
                    })}
                </div>
            </div>
            <ModalFooter>
                <Button buttonType={buttonTypes.neutralButton} onClick={() => props.cancelButtonOnClick()}>
                    {t("Close-Button-Label")}
                </Button>
            </ModalFooter>
        </ModalLayout>
    )
}
