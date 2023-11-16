import ModalFooter from './ModalFooter'
import Button from '../common/Button'
import ModalLayout from './ModalLayout'
import { buttonTypes } from '../common/Button'

export default function SwitchReactorModal(props) {
    return (
        <ModalLayout showModal={props.showModal} title={'Switch Reactor'}>
            <div className="relative p-6 flex-auto">
                <div className="text-lg leading-relaxed">
                    <p>
                        Switch between reactors for an easier experience or more of a challenge. Each one has unique
                        temperature limits and responds differently to fuel and cooling. Additionally, they're linked to
                        various parts of the power grid, affecting the time you have to react to events.
                    </p>

                    <p className="font-bold text-center my-10">
                        Currently, there is only one reactor available. Reactor switching coming soon!
                    </p>

                    <small>
                        Note: Your progress and achievements are specific to each reactor. If you switch, you'll need to
                        earn them again.
                    </small>
                </div>
            </div>
            <ModalFooter>
                <Button buttonType={buttonTypes.neutralButton} onClick={() => props.cancelButtonOnClick()}>
                    Close
                </Button>
            </ModalFooter>
        </ModalLayout>
    )
}
