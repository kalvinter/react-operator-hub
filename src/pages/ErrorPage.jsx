import { useRouteError } from 'react-router-dom'

import { links } from '../Config'

import Card from '../components/common/Card'
import { useTranslation } from 'react-i18next'
import Logo from '../assets/svg/github-mark-white.svg?react'

export const errorPageTestId = 'errorPageTestId'

export default function ErrorPage() {
    const error = useRouteError()

    const {t} = useTranslation()

    return (
        <div className="flex m-auto justify-center items-center h-[100vh] w-[100wh]" data-testid={errorPageTestId}>
            <Card className="min-w-[50%] min-h-[50%] flex justify-center flex-col items-center">
                <h1 className="mb-6 w-full text-center">ERROR</h1>
                <h4 className='mb-6'>{t("Error--Sub-Title")}</h4>
                
                <p className='flex items-center'>
                    {t("Error--Instructions")}
                    <a
                        className="flex item-center ml-2"
                        target="_blank"
                        rel="noreferrer"
                        href={`${links.repositoryOnGithub}`}
                    >
                        <Logo className="small-icon mr-2" /> Github.
                    </a>
                </p>

                <p className="my-6 bg-gray-200 text-black py-2 px-4">
                    <i>Error: {error.statusText || error.message}</i>
                </p>

            </Card>
        </div>
    )
}
