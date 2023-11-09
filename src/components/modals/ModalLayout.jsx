import React, {useRef, useState, useEffect} from 'react'


export default function ModalLayout(props) {
    const [showModal, setshowModal] = useState(false);
    const hasBeenRendered = useRef(false);

    useEffect(() => {
        if (props.showModal && !hasBeenRendered.current) {
          // Use a setTimeout to delay setting the show class.
          // this way, if the page is rendered and the modal is already set to be shown
          // the hidden modal is rendered and only a few milliseconds after that 
          // the class is applied. This way any fade-in effect can be applied
          setTimeout(() => {
            setshowModal(true);
          }, 10);
          hasBeenRendered.current = true;
        } else if (!props.showModal) {
            setshowModal(false);
          hasBeenRendered.current = false;
        }
      }, [props.showModal]);

    return (
            <div className={`modal ${showModal ? 'show' : ''}`}>
                <div
                    className="justify-center modal--body items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                        <div className="md:min-h-fit md:min-w-fit min-h-[100vh] min-w-[100vw] shadow-lg relative flex flex-col w-full bg-card border-solid border-2 border-gray-900 outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b-2 border-solid border-gray-900 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    {props.title}
                                </h3>
                            </div>
                            {props.children}
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </div>
    )
}
