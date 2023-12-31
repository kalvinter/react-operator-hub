import { useContext } from 'react'

import Card from '../common/Card'
import { useTranslation } from 'react-i18next'
import { ReactorDataContext } from '../../pages/Game.jsx'

const inputLevelList = Array.from({ length: 100 }, (_, i) => (
    <option key={i} value={i}>
        {i}
    </option>
))

export const inputBarTestId = "inputBarTestId"

export default function InputBar() {
    const reactorData = useContext(ReactorDataContext)
    const {t} = useTranslation()

    return (
        <Card className="w-full mb-0" testId={inputBarTestId}>
            <datalist id="input-level-list">{inputLevelList}</datalist>
            <div className="grid grid-cols-8 gap-2 mb-2 items-center">
                <label className="md:col-span-1 col-span-2">{t("Input--Fuel-Label")}</label>
                <span className="text-right mr-2">{reactorData.currentFuelInputLevel}</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    className="md:col-span-6 col-span-5"
                    onChange={(event) => {
                        reactorData.fuelInputOnChange(event)
                    }}
                    placeholder="0"
                    id="fuel-input-range"
                    list="input-level-list"
                    value={reactorData.currentFuelInputLevel}
                ></input>
            </div>
            <div className="grid grid-cols-8 gap-2 items-center">
                <label className="md:col-span-1 col-span-2">{t("Input--Cooling-Label")}</label>
                <span className="text-right mr-2">{reactorData.currentCoolingLevel}</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    className="md:col-span-6 col-span-5"
                    onChange={(event) => {
                        reactorData.coolingLevelOnChange(event)
                    }}
                    list="input-level-list"
                    id="cooling-input-range"
                    value={reactorData.currentCoolingLevel}
                ></input>
            </div>
        </Card>
    )
}
