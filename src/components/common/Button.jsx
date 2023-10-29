import React from 'react'

export const buttonTypes = {
    successButton: "successButton",
    neutralButton: "neutralButton",
    dangerButton: "dangerButton"
}

export const buttonSizes = {
    small: "small",
    standard: "standard",
    large: "large"
}

function getButtonColorClasses(buttonType){
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

function getButtonSizeClasses(buttonSize){
    let buttonClasses = "text-sm px-6 py-3";

    switch (buttonSize){
        case buttonSizes.small:
            buttonClasses = "text-sm px-2 py-1"
            break

        case buttonSizes.large:
            buttonClasses = "px-6 py-3"
            break
    }
    return buttonClasses
}

export default function Button(props) {
    let buttonColorClasses = getButtonColorClasses(props.buttonType)

    let buttonSizeClasses = getButtonSizeClasses(props.buttonSize)

    return (
      <button
          className={`${buttonColorClasses} ${buttonSizeClasses} ${(!props.className) ? '' : props.className} 
                      font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none 
                      ease-linear transition-all duration-150`}
          type="button"
          onClick={() => props.onClick()}
      >
          {props.children}
      </button>
    )
}
