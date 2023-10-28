import React from 'react'

function Card(props) {
  return (
    <div className={`${props.className} my-2 rounded-md border-solid border-2 border-gray-900 p-2 bg-medium`}>
        {props.children}
    </div>
  )
}

export default Card