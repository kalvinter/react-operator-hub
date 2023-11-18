import ModalFooter from './ModalFooter'
import ModalLayout from './ModalLayout'
import Button, { buttonTypes } from '../common/Button'
import { useTranslation } from 'react-i18next'

export default function ResetHistoryModal(props) {
    const {t} = useTranslation()

    return (
        <ModalLayout showModal={props.showModal} title={t("ResetHistoryModal--Title")}>
            <div className="relative p-6 flex-auto">
                <div className="my-4 text-lg leading-relaxed">
                    <h4>{t("ResetHistoryModal--Are-You-Sure")}</h4>

                    <p>{t("ResetHistoryModal--Explanation")}</p>
                </div>
            </div>
            <ModalFooter>
                <Button buttonType={buttonTypes.neutralButton} onClick={() => props.cancelButtonOnClick()}>
                    {t("Cancel-Button-Label")}
                </Button>

                <Button buttonType={buttonTypes.dangerButton} onClick={() => props.deleteButtonOnClick()}>
                    {t("ResetHistoryModal--Confirm-Button-Label")}
                </Button>
            </ModalFooter>
        </ModalLayout>
    )
}
