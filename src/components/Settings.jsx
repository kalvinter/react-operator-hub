import { useState, useEffect } from 'react'

import Button, { buttonSizes, buttonTypes } from './common/Button'

import { themes } from '../game/ThemeManager'
import { Cog6ToothIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'react-i18next'

const locales = {
    en: "English",
    de: "Deutsch"
}

function Settings(props) {
    const { t, i18n } = useTranslation();

    const [activeTheme, setActiveTheme] = useState(props.themeManager.activeTheme)
    
    useEffect(() => {
        if (activeTheme === props.themeManager.activeTheme) {
            return
        }
        
        props.themeManager.setThemeChangeEffect()
        let timeout = setTimeout(() => {
            props.themeManager.setActiveTheme({ activeTheme: activeTheme })
        }, 200)
        return () => clearTimeout(timeout)
    }, [activeTheme])

    const [activeLanguage, setActiveLanguage] = useState(i18n.resolvedLanguage)

    useEffect(() => {
        if (activeLanguage === i18n.resolvedLanguage){
            return
        }

        props.themeManager.setThemeChangeEffect()
        let timeout = setTimeout(() => {
            i18n.changeLanguage(activeLanguage)
            props.themeManager.removeThemeChangeEffect()
        }, 200)
        return () => clearTimeout(timeout)

    }, [activeLanguage])

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="flex items-center">
                {' '}
                <Cog6ToothIcon className="small-icon mr-2" /> {t("Settings")}
            </h2>

            <div className="w-full grid grid-cols-3 gap-3 items-center mb-4">
                <label className="whitespace-nowrap">{t("Settings--Select-Theme")}</label>

                <select
                    className="w-full bg-element border-2 border-solid border-color-text col-span-2"
                    value={activeTheme}
                    onChange={(event) => setActiveTheme(event.currentTarget.value)}
                >
                    {themes.map((themeEntry) => {
                        return (
                            <option key={themeEntry.key} value={themeEntry.key}>
                                {themeEntry.label}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div className="w-full grid grid-cols-3 gap-3 items-center mb-4">
                <label className="whitespace-nowrap">{t("Settings--Select-Language")}</label>

                <select
                    className="w-full bg-element border-2 border-solid border-color-text col-span-2"
                    value={i18n.resolvedLanguage}
                    onChange={(event) => setActiveLanguage(event.currentTarget.value)}
                >
                    {Object.keys(locales).map((key) => {
                        return (
                            <option key={key} value={key}>
                                {locales[key]}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div className="w-full mt-auto mb-2">
                <Button
                    buttonType={buttonTypes.neutralButton}
                    buttonSize={buttonSizes.small}
                    onClick={() => props.showDeleteHistoryModal()}
                >
                    {t("Delete-History-Button-Label")}
                </Button>
            </div>
        </div>
    )
}

export default Settings
