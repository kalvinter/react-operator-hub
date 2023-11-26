import React from 'react'
import { useTranslation } from 'react-i18next';
import Logo from '../assets/svg/logo.svg?react'

function HubBanner() {
    const {t} = useTranslation()

    return (
        <div className="p-2 text-color--hover rounded">
            <div className="mb-4">
                
                <div className="justify-center md:justify-start flex items-center">
                    <Logo className="mr-2 w-[4rem] h-[4rem] main-logo-svg" /> 
                    <h1 className="text-4xl">OperatorHub</h1>
                </div>

                <p className="text-center md:text-left italic opacity-80">{t("App-Banner-Slogan")}</p>
                
            </div>
        </div>
    )
}

export default HubBanner
