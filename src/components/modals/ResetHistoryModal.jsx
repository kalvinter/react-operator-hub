import React from 'react'

import ModalFooter from './ModalFooter'
import ModalFooterButton from './ModalFooterButton'
import ModalLayout from './ModalLayout'
import { buttonType } from './ModalFooterButton'


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
                <ModalFooterButton
                    buttonType={buttonType.neutralButton}
                    label={"Cancel"}
                    actionButtonOnClick={() => props.cancelButtonOnClick()}
                />
                <ModalFooterButton
                    buttonType={buttonType.dangerButton}
                    label={"Delete History"}
                    actionButtonOnClick={() => props.deleteButtonOnClick()}
                />
            </ModalFooter>

        </ModalLayout>
    )
}
