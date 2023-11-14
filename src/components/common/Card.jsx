import React from "react"

export default function Card(props) {
  return (
    <div className={`${(props.className !== undefined) ? props.className : ''} mb-2 
    rounded-md border-solid border-2 border-color-card p-2 md:p-3 bg-card`}>
        {props.children}
    </div>
  )
}
