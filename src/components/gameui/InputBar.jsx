import React from 'react'

const inputLevelList = Array.from({ length: 100 }, (_, i) => <option key={i} value={i}>{i}</option>)

export default function InputBar(props) {
  return (
    <div className="flex flex-1 gap-2 my-2">
        <div className="border-2 rounded border-gray-900 p-2 bg-neutral-700 w-full">
            <datalist id="input-level-list">
                {inputLevelList}
            </datalist>
            <div className="grid grid-cols-7 gap-2 mb-2">
                <label>Fuel Input</label>
                <p className='text-right'>{props.currentFuelInputLevel}</p>
                <input type='range' min="0" max="100" step="1" 
                    className="bg-neutral-600 text-right col-span-5"
                    onChange={props.fuelInputOnChange}
                    placeholder="0"
                    list="input-level-list"
                    value={props.currentFuelInputLevel}
                ></input>
            </div>
            <div className="grid grid-cols-7 gap-2">
                <label>Cooling Level</label>
                <p className='text-right'>{props.currentCoolingLevel}</p>
                <input type='range' min="0" max="100" step="1" 
                    className="bg-neutral-600 text-right col-span-5" 
                    onChange={props.coolingLevelOnChange}
                    list="input-level-list"
                    value={props.currentCoolingLevel}
                ></input>
            </div>
        </div>

    </div>
  )
}
