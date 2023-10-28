import React from 'react'

import { themes } from '../game/ThemeManager'

function Settings(props) {
    let activeTheme = props.themeManager.getActiveTheme()
    return (
        <div className='w-full'>
            <h2>Settings</h2>
            
            <div className='w-full flex gap-3'>
                <label>Select Theme</label>
                
                <select 
                    className='min-w-[30%] bg-dark'
                    value={activeTheme} onChange={(event) => props.themeManager.setActiveTheme({activeTheme: event.currentTarget.value})}>
                        {Object.keys(themes).map((key) => {
                            return <option key={key} value={key}>{themes[key]}</option>
                        })}
                </select>
            </div>
        </div>
    )
}

export default Settings