import ModalFooter from './ModalFooter'
import Button from '../common/Button'
import ModalLayout from './ModalLayout'
import { buttonTypes } from '../common/Button'
import { useTranslation } from 'react-i18next'

export default function SwitchReactorModal(props) {
    const {t} = useTranslation()
    return (
        <ModalLayout showModal={props.showModal} title={t("SwitchReactorModal--Title")}>
            <div className="relative p-6 flex-auto">
                <div className="text-lg leading-relaxed">
                    <p>
                        {t("SwitchReactorModal--Explanation")}
                    </p>

                    <p className="font-bold text-center my-10">
                        {t("SwitchReactorModal--Coming-Soon")}
                    </p>

                    <small>
                        {t("SwitchReactorModal--Note")}
                    </small>
                </div>
            </div>
            <ModalFooter>
                <Button buttonType={buttonTypes.neutralButton} onClick={() => props.cancelButtonOnClick()}>
                    Close
                </Button>
            </ModalFooter>
        </ModalLayout>
    )
}
