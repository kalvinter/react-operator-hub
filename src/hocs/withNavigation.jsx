import { useNavigate } from 'react-router-dom'

export default function withNavigation(WrappedComponent) {
    return (props) => {
        const navigate = useNavigate()
        return <WrappedComponent {...props} navigate={navigate} />
    }
}
