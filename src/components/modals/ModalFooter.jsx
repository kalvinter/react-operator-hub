export default function ModalFooter({ children }) {
    return (
        <div className="flex items-center justify-end gap-2 p-2 border-t-2 border-solid border-gray-900 rounded-b mt-auto">
            {children}
        </div>
    )
}
