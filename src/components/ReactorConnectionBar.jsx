import React from 'react'
import { useTranslation } from 'react-i18next';

import { ArrowPathIcon, CommandLineIcon } from '@heroicons/react/20/solid'
import Button, { buttonSizes, buttonTypes } from './common/Button'

function ReactorConnectionBar(props) {
    const { t } = useTranslation();

    return (
        <div className="mb-4 flex gap-2 flex-col md:flex-row items-center justify-between bg-back">
            <span className="flex items-center flex-col w-full md:w-fit md:flex-row bg-card p-1 rounded border-solid border-2 border-color-back">
                <span className='flex items-center mb-2 md:mb-0'><CommandLineIcon className="small-icon mr-2" /> {t('Connected to Reactor')}</span>
                <b className='ml-1'>{props.activeReactorConfig.getLabel()}</b>
            </span>
            <span>
                {props.showSwitchReactorButton ? <Button
                    buttonType={buttonTypes.neutralButton}
                    buttonSize={buttonSizes.small}
                    onClick={() => {
                        props.setShowSwitchReactorModal(true)
                    }}
                >
                    <span className="flex items-center">
                        <ArrowPathIcon className="small-icon mr-2" /> {t('Switch-Reactor-Button-Label')}
                    </span>
                </Button> : null }
            </span>
        </div>
    )
}

export default ReactorConnectionBar
