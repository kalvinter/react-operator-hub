import React from 'react'

import ModalFooter from './ModalFooter'
import ModalLayout from './ModalLayout'
import Button, { buttonTypes } from '../common/Button'


export default function ResetHistoryModal(props) {
    
    return (
        <ModalLayout
            showModal={props.showModal}
            title={"Reset saved History"}
        >
            <div className="relative p-6 flex-auto">
                <div className="my-4 text-white text-lg leading-relaxed">
                    <h4>Are you sure?</h4>

                    <p>Deleting your locally saved history cannot be reversed</p>
                </div>
            </div>
            <ModalFooter>
                <Button
                    buttonType={buttonTypes.neutralButton}
                    onClick={() => props.cancelButtonOnClick()}
                >
                    Cancel
                </Button>

                <Button
                    buttonType={buttonTypes.dangerButton}
                    onClick={() => props.deleteButtonOnClick()}
                >
                    Delete History
                </Button>

            </ModalFooter>

        </ModalLayout>
    )
}
