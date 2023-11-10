

import React from 'react'

import { CubeTransparentIcon } from '@heroicons/react/20/solid'

function HubBanner() {
  return (
    <div className='p-2 text-color--hover rounded'>
        <div className='mb-4'>
            <h1 className='justify-center md:justify-start mb-1 text-4xl flex items-center'><CubeTransparentIcon className='large-icon mr-2' /> OperatorHub <sup className='text-sm'>TM</sup></h1>
            <p className='text-center md:text-left italic opacity-80'>The all-in-one Reactor Management Solution</p>
        </div>
        
    </div>
  )
}

export default HubBanner