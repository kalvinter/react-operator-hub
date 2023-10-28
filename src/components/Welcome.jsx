
import React from 'react'

import { useNavigate } from 'react-router-dom'

import { buttonTypes } from './common/Button'
import Button from './common/Button'


function Welcome() {
  const navigate = useNavigate()

  return (
    <div>
        <h1>Welcome to the Grid</h1>
        <p>Step into the role of a reactor operator at the heart of the nation's power grid. Your mission? 
        Keep the country powered up! But remember, it's all about balance: match the country's electricity demand without overloading the system.</p>

        <h2 className='mt-4'>Gameplay Essentials</h2>
        <p>Your reactor relies on <b>fuel</b> to generate electricity. The more fuel you use, the hotter the reactor becomes, leading to increased power output.</p>
        <p><b>Stay vigilant!</b> <b>Demand</b> can fluctuate based on various events, such as other reactors going offline. 
        These events will be highlighted at the top of your screen.</p>

        <h2 className='mt-4'><strong>Quick Tips for Power Mastery:</strong></h2>
        <ul className='list-inside list-disc'>
            <li>Adding fuel boosts power but also heats up the reactor.</li>
            <li>A hotter reactor means a faster reaction-factor, giving you more power.</li>
            <li>If things heat up too much, up the cooling level to keep things stable.</li>
            <li>Always be on the lookout for events affecting power demand.</li>
            <li>Always maintain power production within the optimal green zone to earn achievements.</li>
        </ul>

        <div className='w-full mt-6 flex align-middle'>
          <h4 className='mx-auto'>Have fun playing!</h4>
        </div>
        

        <div className='w-full py-5 text-center'>
                <Button
                    buttonType={buttonTypes.successButton}
                    onClick={() => {navigate("/react-reactor-game/game/", { replace: true })}}
                >
                    Start your Shift
                </Button>
        </div>
    </div>
  )
}

export default Welcome
