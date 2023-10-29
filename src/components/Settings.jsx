import React from 'react'

import { useState, useEffect } from 'react'

import { themes } from '../game/ThemeManager'

function Settings(props) {
    const [activeTheme, setActiveTheme] = useState(props.themeManager.activeTheme)

    useEffect(() => {
        if (activeTheme === props.themeManager.activeTheme){
            return
        }
        
        props.themeManager.setThemeChangeEffect()
        let timeout = setTimeout(() => {
            props.themeManager.setActiveTheme({activeTheme: activeTheme})
        }, 200);
        return () => clearTimeout(timeout);
    }, [activeTheme])

    return (
        <div className='w-full'>
            <h2>Settings</h2>
            
            <div className='w-full flex gap-3'>
                <label className='whitespace-nowrap'>Select Theme</label>
                
                <select 
                    className='w-full bg-dark'
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