import React from 'react'

export const buttonType = {
    successButton: "successButton",
    neutralButton: "neutralButton",
    dangerButton: "dangerButton"
}

export default function ModalFooterButton(props) {
    let buttonClasses = "";

    switch (props.buttonType){
        case buttonType.successButton:
            buttonClasses = "bg-green-600 text-white hover:bg-green-700"
            break

        case buttonType.neutralButton:
            buttonClasses = "bg-gray-900 text-white hover:bg-gray-800"
            break

        case buttonType.dangerButton:
            buttonClasses = "bg-red-600 text-white hover:bg-red-700"
            break
    }

    return (
      <button
          className={`${buttonClasses} font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
          type="button"
          onClick={() => props.actionButtonOnClick()}
      >
          {props.label}
      </button>
    )
}
