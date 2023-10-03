import React from 'react'


export default function ModalLayout(props) {
    return (
            <div className={`modal ${props.showModal ? 'show' : ''}`}>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="shadow-lg relative flex flex-col w-full bg-neutral-600 border-solid border-2 border-gray-900 outline-none focus:outline-none">
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
