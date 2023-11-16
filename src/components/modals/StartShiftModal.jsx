import ModalFooter from './ModalFooter'
import Button from '../common/Button'
import ModalLayout from './ModalLayout'
import { buttonTypes } from '../common/Button'

export default function StartShiftModal(props) {
    return (
        <ModalLayout showModal={props.showModal} title={'Welcome, Operator!'}>
            <div className="relative p-6 flex-auto">
                <div className="text-lg leading-relaxed">
                    <p>Your shift is about to start and will last {props.shiftDurationInSeconds} seconds.</p>

                    <p>
                        You are in charge of this reactor's energy output. Keep it matched to the current electricity
                        demand in the grid. At the end of your shift, you will be judged by how well you matched the
                        demand.
                    </p>

                    <p className="font-bold my-4">
                        But be careful ... <br></br> do not let the reactor's temperature get above{' '}
                        {props.maximumTemperature} °C or you will be fired!
                    </p>

                    <p>Good luck on your shift, operator ... you will need it.</p>
                </div>
            </div>
            <ModalFooter>
                <Button buttonType={buttonTypes.successButton} onClick={() => props.actionButtonOnClick()}>
                    Start Shift
                </Button>
            </ModalFooter>
        </ModalLayout>
    )
}
