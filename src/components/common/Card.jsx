import React from 'react'

function Card(props) {
  return (
    <div className={`${props.className} my-2 border-solid border-2 rounded border-gray-900 p-2 bg-neutral-700`}>
        {props.children}
    </div>
  )
}

export default Card