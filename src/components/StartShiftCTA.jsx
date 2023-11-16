import React from 'react'

import Button from './common/Button'

import { buttonTypes } from './common/Button'
import { BoltIcon, CubeTransparentIcon } from '@heroicons/react/20/solid'

function StartShiftCTA(props) {
    return (
        <div className="w-full py-5 flex justify-between mb-2 gap-2 md:flex-row flex-col items-center border-2 border-solid border-color-back rounded px-5">
            <div className="flex items-center">
                <CubeTransparentIcon className="large-icon mr-5" />
                <h2 className="mb-0">Reactor is ready</h2>
            </div>
            <Button
                buttonType={buttonTypes.successButton}
                onClick={() => {
                    props.startGame()
                }}
            >
                <div className="flex items-center">
                    <BoltIcon className="small-icon mr-2" />
                    Start your Shift
                </div>
            </Button>
        </div>
    )
}

export default StartShiftCTA
