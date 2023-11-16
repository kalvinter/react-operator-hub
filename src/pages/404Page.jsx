import { Link } from 'react-router-dom'
import { links } from '../Config'
import Button from '../components/common/Button'
import { buttonTypes } from '../components/common/Button'
import Card from '../components/common/Card'

const notFoundPageTestId = 'notFoundPageTestId'

export default function NotFoundPage() {
    return (
        <div className="flex m-auto justify-center items-center h-[100vh] w-[100wh]">
            <Card
                className="min-w-[50%] min-h-[50%] flex justify-center flex-col items-center"
                id="error-page"
                data-testid={notFoundPageTestId}
            >
                <h1 className="mb-2 w-full text-center">404</h1>
                <p className="mb-10">Page not found</p>

                <Link to={"/"}>
                    <Button onClick={() => {}} buttonType={buttonTypes.neutralButton}>Back to Home</Button>
                </Link>
            </Card>
        </div>
    )
}
