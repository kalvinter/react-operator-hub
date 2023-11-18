import React from 'react'
import { useTranslation } from 'react-i18next';

import { ArrowPathIcon, CommandLineIcon } from '@heroicons/react/20/solid'
import Button, { buttonSizes, buttonTypes } from './common/Button'

function ReactorConnectionBar(props) {
    const { t } = useTranslation();

    return (
        <div className=" p-2 mb-2 flex gap-2 flex-col md:flex-row items-center justify-between">
            <span className="flex items-center">
                <CommandLineIcon className="small-icon mr-2" /> {t('Connected to Reactor')} 'TowesVil-05'
            </span>
            <span>
                <Button
                    buttonType={buttonTypes.neutralButton}
                    buttonSize={buttonSizes.small}
                    onClick={() => {
                        props.setShowSwitchReactorModal(true)
                    }}
                >
                    <span className="flex items-center">
                        <ArrowPathIcon className="small-icon mr-2" /> {t('Switch-Reactor-Button-Label')}
                    </span>
                </Button>
            </span>
        </div>
    )
}

export default ReactorConnectionBar
