import React from 'react'

import { useNavigate } from 'react-router-dom'

import Button from './common/Button'

import { buttonTypes } from './common/Button'
import { BoltIcon, CubeTransparentIcon, PlayIcon } from '@heroicons/react/20/solid'

function StartShiftCTA() {
  const navigate = useNavigate()

  return (
    <div className='w-full py-5 flex justify-between mb-2 items-center border-2 border-solid border-color-back rounded px-5'>
        <div className='flex items-center'>
            <CubeTransparentIcon className='large-icon mr-5' />
            <h2 className='mb-0'>Reactor is ready</h2>
        </div>
        <Button
            buttonType={buttonTypes.successButton}
            onClick={() => {navigate("/react-reactor-game/game/", { replace: true })}}
        >
            <div className='flex items-center'>
                <BoltIcon className='small-icon mr-2' />
                Start your Shift
            </div>
        </Button>
    </div>
  )
}

export default StartShiftCTA