import React from 'react'
import { useTranslation } from 'react-i18next';

import Button from './common/Button'

import { buttonTypes } from './common/Button'
import { BoltIcon, CubeTransparentIcon } from '@heroicons/react/20/solid'

function StartShiftCTA(props) {
    const {t} = useTranslation()

    return (
        <div className="w-full py-5 flex justify-between mb-2 gap-2 md:flex-row flex-col items-center border-2 border-solid border-color-back rounded px-5">
            <div className="flex items-center">
                <CubeTransparentIcon className="large-icon mr-5" />
                <h2 className="mb-0">{t("Start-Game-CTA-Header")}</h2>
            </div>
            <Button
                buttonType={buttonTypes.successButton}
                onClick={() => {
                    props.startGame()
                }}
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
