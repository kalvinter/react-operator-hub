import React from 'react'

function Card(props) {
  return (
    <div className={`${props.className} mb-2 
    shadow-2xl rounded-md border-solid border-2 border-color-card p-2 bg-card`}>
        {props.children}
    </div>
  )
}

export default Card