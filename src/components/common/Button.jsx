import React from 'react'

export const buttonTypes = {
    successButton: "successButton",
    neutralButton: "neutralButton",
    dangerButton: "dangerButton"
}

function getButtonClasses(buttonType){
    let buttonClasses = "";

    switch (buttonType){
        case buttonTypes.successButton:
            buttonClasses = "bg-success text-color--light"
            break

        case buttonTypes.neutralButton:
            buttonClasses = "bg-neutral text-color--light"
            break

        case buttonTypes.dangerButton:
            buttonClasses = "bg-danger text-color--light"
            break
    }
    return buttonClasses
}

export default function Button(props) {
    let buttonClasses = getButtonClasses(props.buttonType)

    return (
      <button
          className={`${buttonClasses} ${props.className} font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150`}
          type="button"
          onClick={() => props.onClick()}
      >
          {props.children}
      </button>
    )
}

export function ButtonSmall(props) {
    let buttonClasses = getButtonClasses(props.buttonType)

    return (
      <button
          className={`${buttonClasses} ${props.className} text-black joo font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150`}
          type="button"
          onClick={() => props.onClick()}
      >
          {props.children}
      </button>
    )
}
