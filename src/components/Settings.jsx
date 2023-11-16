import React from 'react'

import { useState, useEffect } from 'react'

import Button, { buttonSizes, buttonTypes } from './common/Button'

import { themes } from '../game/ThemeManager'
import { Cog6ToothIcon } from '@heroicons/react/20/solid'

function Settings(props) {
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

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="flex items-center">
                {' '}
                <Cog6ToothIcon className="small-icon mr-2" /> Settings
            </h2>

            <div className="w-full flex gap-3 items-center">
                <label className="whitespace-nowrap">Select Theme</label>

                <select
                    className="w-full bg-element border-2 border-solid border-color-text"
                    value={activeTheme}
                    onChange={(event) => setActiveTheme(event.currentTarget.value)}
                >
                    {Object.keys(themes).map((key) => {
                        return (
                            <option key={key} value={key}>
                                {themes[key]}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div className="w-full mt-5">
                <Button
                    buttonType={buttonTypes.neutralButton}
                    buttonSize={buttonSizes.small}
                    onClick={() => props.showDeleteHistoryModal()}
                >
                    Delete History
                </Button>
            </div>
        </div>
    )
}

export default Settings
