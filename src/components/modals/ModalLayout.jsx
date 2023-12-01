import { useRef, useState, useEffect } from 'react'

export default function ModalLayout(props) {
    const [showModal, setshowModal] = useState(false)
    const hasBeenRendered = useRef(false)

    useEffect(() => {
        if (props.showModal && !hasBeenRendered.current) {
            // Use a setTimeout to delay setting the show class.
            // this way, if the page is rendered and the modal is already set to be shown
            // the hidden modal is rendered and only a few milliseconds after that
            // the class is applied. This way any fade-in effect can be applied
            setTimeout(() => {
                setshowModal(true)
            }, 10)
            hasBeenRendered.current = true
        } else if (!props.showModal) {
            setshowModal(false)
            hasBeenRendered.current = false
        }
    }, [props.showModal])

    return (
        <div className={`modal ${showModal ? 'show' : ''} flex flex-col h-screen w-full absolute top-0 left-0 justify-center items-center z-50`}>
            <div className="modal--body flex flex-col h-screen sm:h-fit max-w-3xl w-full bg-card border-solid border-2 border-gray-900 shadow-lg overflow-y-auto z-50 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b-2 border-solid border-gray-900 rounded-t">
                    <h3 className="text-3xl font-semibold">{props.title}</h3>
                </div>
                {props.children}
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}
