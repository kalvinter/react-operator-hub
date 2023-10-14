import React from 'react'

export default function ModalFooter({children}) {
  return (
    <div className="flex items-center justify-end p-2 border-t-2 border-solid border-gray-900 rounded-b">
          {children}
    </div>
  )
}
