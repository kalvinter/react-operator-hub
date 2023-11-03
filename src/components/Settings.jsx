import React from 'react'

import { useState, useEffect } from 'react'

import Button, {buttonSizes, buttonTypes} from './common/Button'

import { themes } from '../game/ThemeManager'
import { useThemeManager } from '../hooks/useThemeManager'

function Settings(props) {
    const themeManager = useThemeManager()
    
    const [activeTheme, setActiveTheme] = useState(themeManager.activeTheme)

    useEffect(() => {
        if (activeTheme === themeManager.activeTheme){
            return
        }

        themeManager.setThemeChangeEffect()
        let timeout = setTimeout(() => {
            themeManager.setActiveTheme({activeTheme: activeTheme})
        }, 200);
        return () => clearTimeout(timeout);
    }, [activeTheme])

    return (
        <div className='w-full h-full flex flex-col'>
            <h2>Settings</h2>
            
            <div className='w-full flex gap-3'>
                <label className='whitespace-nowrap'>Select Theme</label>
                
                <select 
                    className='w-full bg-back'
                    value={activeTheme} onChange={(event) => setActiveTheme(event.currentTarget.value)}>
                        {Object.keys(themes).map((key) => {
                            return <option key={key} value={key}>{themes[key]}</option>
                        })}
                </select>
            </div>

            <div className='w-full mt-5'>
                <Button 
                    buttonType={buttonTypes.neutralButton}
                    buttonSize={buttonSizes.small}
                    onClick={() => props.showDeleteHistoryModal()}>
                    Delete History
                </Button>
            </div>

        </div>
    )
}

export default Settings