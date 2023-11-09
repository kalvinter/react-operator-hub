
import React from 'react'

import { ExclamationCircleIcon } from '@heroicons/react/20/solid'


function Welcome() {

  return (
    <div>
        <h1 className='flex items-center'>
          <ExclamationCircleIcon className='small-icon mr-2' /> Welcome to the Grid
        </h1>

        <p>You are a reactor operator at the heart of the nation's power grid. Your mission? 
        Keep the country powered up! But remember, it's all about balance: match the country's electricity demand without overloading the system. <b>Start your shift to take control of the reactor.</b></p>

        
        <h2 className='mt-4'>Reactor Essentials</h2>
        <p>Your reactor relies on <b>fuel</b> to generate electricity. The more fuel you use, the hotter the reactor becomes, leading to increased power output.</p>
        <p><b>Stay vigilant!</b> <b>Demand</b> can fluctuate based on various events, such as other reactors going offline. 
        These events will be highlighted at the top of your screen.</p>

        <h2 className='mt-4'><strong>Quick Tips for Power Mastery:</strong></h2>
        <ul className='list-inside list-disc mb-2'>
            <li>Adding fuel boosts power but also heats up the reactor.</li>
            <li>A hotter reactor means a faster reaction-factor, giving you more power.</li>
            <li>If things heat up too much, up the cooling level to keep things stable.</li>
            <li>Always be on the lookout for events affecting power demand.</li>
            <li>Always maintain power production within the optimal green zone to earn achievements.</li>
        </ul>

  </div>
  )
}

export default Welcome
