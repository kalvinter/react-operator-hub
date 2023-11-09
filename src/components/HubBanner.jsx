

import React from 'react'

import { CubeTransparentIcon } from '@heroicons/react/20/solid'

function HubBanner() {
  return (
    <div className='p-2 text-color--hover rounded'>

        <div className='mb-4'>
            <h1 className='font-mono text-4xl flex items-center'><CubeTransparentIcon className='large-icon mr-2' /> OperatorHub <sup className='text-sm'>TM</sup></h1>
            <h3 className='italic'>The all-in-one Reactor Management Solution</h3>
        </div>
        
    </div>
  )
}

export default HubBanner