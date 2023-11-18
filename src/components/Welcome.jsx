import React from 'react'
import { useTranslation } from 'react-i18next';

import { InformationCircleIcon } from '@heroicons/react/20/solid'

function Welcome() {
    const {t} = useTranslation()

    return (
        <div>
            <h2 className="flex items-center">
                <InformationCircleIcon className="small-icon mr-2" /> {t("Welcome-Header")}
            </h2>

            <p>
                {t("Welcome-Introduction")}
            </p>
            <p className='mb-6'>
                <b>{t("Welcome-Introduction-CTA")}</b>
            </p>

            <h3 className="mt-4">{t("Welcome-Sub-Header-Essentials")}</h3>
            <p>
                {t("Welcome-Essentials-Fuel-Text")}
            </p>
            <p className='mb-6'>
                <b>{t("Welcome-Essentials-Call-to-Attention")} </b> 
                {t("Welcome-Essentials-Demand-Text")}
            </p>

            <h3 className="mt-4">{t("Welcome-Sub-Header-Quick-Tips")}</h3>
            <ul className="list-inside list-disc mb-2">
                <li>{t("Welcome-Quick-Tip-Fuel-Heat")}</li>
                <li>{t("Welcome-Quick-Tip-Heat")}</li>
                <li>{t("Welcome-Quick-Tip-Heat-Cooling")}</li>
                <li>{t("Welcome-Quick-Tip-Events")}</li>
                <li>{t("Welcome-Quick-Tip-Demand-Match")}</li>
            </ul>
        </div>
    )
}

export default Welcome
