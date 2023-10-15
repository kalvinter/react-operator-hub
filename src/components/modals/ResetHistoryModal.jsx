import React from 'react'

import ModalFooter from './ModalFooter'
import ModalLayout from './ModalLayout'
import Button, { buttonType } from '../common/Button'


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
                    buttonType={buttonType.neutralButton}
                    label={"Cancel"}
                    onClick={() => props.cancelButtonOnClick()}
                />
                <Button
                    buttonType={buttonType.dangerButton}
                    label={"Delete History"}
                    onClick={() => props.deleteButtonOnClick()}
                />
            </ModalFooter>

        </ModalLayout>
    )
}
