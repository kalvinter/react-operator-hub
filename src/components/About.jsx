
import { version } from '../../package.json'; // Adjust the path as necessary

import { useTranslation } from 'react-i18next'

import { links } from '../Config'
import Logo from '../assets/svg/github-mark-white.svg?react'

import { InformationCircleIcon } from '@heroicons/react/20/solid'

function About() {
    const {t} = useTranslation()

    return (
        <div>
            <h2 className="flex items-center">
                <InformationCircleIcon className="small-icon mr-2" /> {t("About--Header")}
            </h2>

            <p>
                {t("About--Text")}
            </p>

            <p>
                {t("About--Personal-Message")}
            </p>

            <div className='flex justify-between items-end mb-2 mt-6'>
                <a
                    className="flex item-center"
                    target="_blank"
                    rel="noreferrer"
                    href={`${links.repositoryOnGithub}`}
                >
                    <Logo className="small-icon mr-2" /> {t("About--Github-Link-Label")}
                </a>

                <small>{t("About--Version")}: {version}</small>
            </div>
        </div>
    )
}

export default About
