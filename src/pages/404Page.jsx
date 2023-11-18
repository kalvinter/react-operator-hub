import { Link } from 'react-router-dom'
import { links } from '../Config'
import Button from '../components/common/Button'
import { buttonTypes } from '../components/common/Button'
import Card from '../components/common/Card'
import { useTranslation } from 'react-i18next'

const notFoundPageTestId = 'notFoundPageTestId'

export default function NotFoundPage() {
    const {t} = useTranslation()

    return (
        <div className="flex m-auto justify-center items-center h-[100vh] w-[100wh]">
            <Card
                className="min-w-[50%] min-h-[50%] flex justify-center flex-col items-center"
                id="error-page"
                data-testid={notFoundPageTestId}
            >
                <h1 className="mb-2 w-full text-center">404</h1>
                <p className="mb-10">{t("404-Header")}</p>

                <Link to={"/"}>
                    <Button onClick={() => {}} buttonType={buttonTypes.neutralButton}>{t("404-Back-Home-Button-Label")}</Button>
                </Link>
            </Card>
        </div>
    )
}
