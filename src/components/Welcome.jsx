
import React from 'react'

function Welcome(props) {
  return (
    <div>
        <h1>Welcome to the Reactor Game!</h1>

        <p>In this game you take control of a reactor and your goal is 
        to produce as much energy as possible. However, this is not so easy 
        as the reactor will explode if the temperature gets to high. So be careful
        and try to find the optimal settings for achieving the highest 
        output for the longest possible time.</p>
        <br></br>
        <p><strong>Keep the following mechanics in mind:</strong></p>
        
        <ul className='list-inside list-disc'>
            <li>Increasing the fuel input increases energy output but also 
            the temperature.</li>
            <li>A higher temperature increases the energy output.</li>
            <li>Increase the cooling level to counter the increase in temperature.</li>
        </ul>

        <div className='w-full mt-6 flex align-middle'>
        <h4 className='mx-auto'>Have fun playing!</h4>
        </div>
        

        <div className='w-full flex align-middle'>
            <button className='bg-gray-500 px-4 py-2 rounded mt-4 mb-4 mx-auto'
                onClick={() => {props.onClick()}}
            >Start a new Game</button>
        </div>
    </div>
  )
}

export default Welcome
