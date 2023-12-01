import ModalFooter from './ModalFooter'
import Button, { buttonSizes } from '../common/Button'
import ModalLayout from './ModalLayout'
import { buttonTypes } from '../common/Button'
import { useTranslation } from 'react-i18next'
import Logo from '../../assets/svg/logo.svg?react'

const reactorConfigCardTestId = "reactorConfigCardTestId"

export default function SwitchReactorModal(props) {
    const {t} = useTranslation()
    return (
        <ModalLayout showModal={props.showModal} title={t("SwitchReactorModal--Title")}>
            <div className="relative p-6 flex-auto">
                <div className="text-lg leading-relaxed">
                    <p className='mb-5'>
                        {t("SwitchReactorModal--Explanation")}
                    </p>

                    <div className='flex gap-2 flex-col mb-5'>
                        {props.reactorConfigManager.availableReactorConfigs.map(reactorConfig => {
                            let isActiveSelection = props.reactorConfigManager.activeReactorConfig.key === reactorConfig.key
                            return (
                                <div
                                    key={reactorConfig.key} 
                                    className="bg-element hover:shadow-lg transition-shadow w-full p-2 rounded" data-testid={reactorConfigCardTestId}
                                >
                                    
                                    <div className='flex items-center justify-between mb-2'>
                                        <div className='flex items-center'>
                                            <Logo className="w-fit mr-2 small-main-logo-svg" />
                                            <h3>
                                                {reactorConfig.getLabel()}
                                            </h3>
                                        </div>
                                        <Button 
                                        buttonType={isActiveSelection ? buttonTypes.neutralButton : buttonTypes.successButton}
                                        buttonSize={buttonSizes.small}
                                        disabled={isActiveSelection}
                                        onClick={() => props.setActiveReactorConfigKey(reactorConfig.key)}
                                        >
                                            {isActiveSelection ? t("SelectReactor-Button-Label-Already-Selected") : t("SelectReactor-Button-Label")}
                                        </Button>
                                    </div>
                                    
                                    <small className='mb-2'>
                                        {reactorConfig.getDescription()}
                                    </small>
                                    <br></br>
                                    
                                 
                            </div>
                            )
                        })}
                    </div>

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
