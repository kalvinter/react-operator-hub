import ModalFooter from './ModalFooter'
import Button from '../common/Button'
import ModalLayout from './ModalLayout'
import { BoltIcon } from '@heroicons/react/20/solid'
import { buttonTypes } from '../common/Button'
import { useTranslation } from 'react-i18next'

export default function StartShiftModal(props) {
    const {t} = useTranslation()

    return (
        <ModalLayout showModal={props.showModal} title={t("StartShiftModal--Title")}>
            <div className="relative p-6 flex-auto">
                <div className="text-lg leading-relaxed">
                    <p>{t("StartShiftModal--Duration-Prefix")} <b>{props.shiftDurationInSeconds} {t("seconds")}</b>{t("StartShiftModal--Duration-Ending")}</p>

                    <p>
                        {t("StartShiftModal--Explanation")}
                    </p>

                    <p className="font-bold my-4">
                        {t("StartShiftModal--Warning-Start")}
                        {props.maximumTemperature} °C {t("StartShiftModal--Warning-End")}
                    </p>

                    <p>{t("StartShiftModal--Good-Luck")}</p>
                </div>
            </div>
            <ModalFooter>
                <Button buttonType={buttonTypes.successButton} onClick={() => props.actionButtonOnClick()}>
                    <div className="flex items-center">
                        <BoltIcon className="small-icon mr-2" />
                        {t("StartShiftModal--Start-Shift-Button-Label")}
                    </div>
                </Button>
            </ModalFooter>
        </ModalLayout>
    )
}
