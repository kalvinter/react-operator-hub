import React from 'react'
import { useTranslation } from 'react-i18next';

import Button from './common/Button'

import { buttonTypes } from './common/Button'
import { BoltIcon } from '@heroicons/react/20/solid'

import Logo from '../assets/svg/logo.svg?react'

export const startGameButtonTestId = "startGameButtonTestId"

function StartShiftCTA(props) {
    const {t} = useTranslation()

    return (
        <div className="w-full py-5 flex justify-between mb-2 gap-2 md:flex-row flex-col items-center border-2 border-solid border-color-back rounded px-5">
            <div className="flex items-center">
                <Logo className="h-[3rem] w-fit mr-2 start-cta-logo" />
                <h2 className="mb-0">{t("Start-Game-CTA-Header")}</h2>
            </div>
            <Button
                buttonType={buttonTypes.successButton}
                onClick={() => {
                    props.startGame()
                }}
                testId={startGameButtonTestId}
            >
                <div className="flex items-center">
                    <BoltIcon className="small-icon mr-2" />
                    {t("Start-Game-CTA-Button-Label")}
                </div>
            </Button>
        </div>
    )
}

export default StartShiftCTA
