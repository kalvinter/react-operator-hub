import React from 'react'

import { useState, useEffect } from 'react'

import { defaultTheme, themes } from '../game/ThemeManager'

function Settings(props) {
    const [activeTheme, setActiveTheme] = useState(props.themeManager.activeTheme)

    useEffect(() => {
        props.themeManager.setActiveTheme({activeTheme: activeTheme})
    }, [activeTheme])

    return (
        <div className='w-full'>
            <h2>Settings</h2>
            
            <div className='w-full flex gap-3'>
                <label>Select Theme</label>
                
                <select 
                    className='min-w-[30%] bg-dark'
                    value={activeTheme} onChange={(event) => setActiveTheme(event.currentTarget.value)}>
                        {Object.keys(themes).map((key) => {
                            return <option key={key} value={key}>{themes[key]}</option>
                        })}
                </select>
            </div>
        </div>
    )
}

export default Settings