import React from 'react'

import { ArrowPathIcon, CommandLineIcon } from '@heroicons/react/20/solid'
import Button, { buttonSizes, buttonTypes } from './common/Button'

function ReactorConnectionBar() {
  return (
    <div className=' p-2 mb-2 flex gap-2 flex-col md:flex-row items-center justify-between'>
        <span className='flex items-center'>
            <CommandLineIcon className='small-icon mr-2' /> Connected to Reactor 'TowesVil-05'</span>
        <span>
            <Button
                buttonType={buttonTypes.neutralButton}
                buttonSize={buttonSizes.small}
            >
                <span className='flex items-center'>
                    <ArrowPathIcon className='small-icon mr-2' /> Switch Reactor
                </span>
            </Button>
        </span>
    </div>
  )
}

export default ReactorConnectionBar