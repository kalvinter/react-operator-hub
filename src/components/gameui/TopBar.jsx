import { useContext } from 'react'

import { GameDataContext } from '../../pages/Game.jsx'

import Card from '../common/Card.jsx'

import { PauseIcon, PlayIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Button, { buttonSizes, buttonTypes } from '../common/Button.jsx'
import { useTranslation } from 'react-i18next'

function ButtonLabel(props) {
    const {t} = useTranslation()

    return (
        <span className="flex justify-center">
            {props.gameData.gameIsPaused ? (
                <PlayIcon className="small-icon mr-1"></PlayIcon>
            ) : (
                <PauseIcon className="small-icon mr-1"></PauseIcon>
            )}
            {props.gameData.gameIsPaused ? <span>{t("TopBar--Unpause-Button-Label")}</span> : <span>{t("TopBar--Pause-Button-Label")}</span>}
        </span>
    )
}

export default function TopBar(props) {
    const {t} = useTranslation()

    const gameData = useContext(GameDataContext)

    let shiftTimeLeftInSeconds = Math.round(gameData.shiftTimeLeft / 1000)

    let pauseButton
    if (gameData.gameIsLost) {
        pauseButton = (
            <Button 
                className=" w-full md:w-fit" 
                buttonType={buttonTypes.dangerButton}
                disabled={true}
                buttonSize={buttonSizes.small}
            >{t("TopBar--Lost-Label")}
            </Button>
        )
    } else {
        pauseButton = (
            <Button
                onClick={(event) => {
                    gameData.toggleGamePauseOnClick(event)
                }}
                buttonType={gameData.gameIsPaused ? buttonTypes.successButton : buttonTypes.neutralButton}
                buttonSize={buttonSizes.small}
                className={'w-full md:w-fit'}
            >
                <ButtonLabel gameData={gameData} />
            </Button>
        )
    }

    return (
        <Card className="w-full flex justify-between items-center mt-0 flex-col md:flex-row gap-2">
            <div className='flex justify-around w-full md:w-fit gap-1'>
                <span>{t("TopBar--Time-Until-Shift-Ends-Label")}:</span> 
                <span>{shiftTimeLeftInSeconds} {t("seconds")}</span>
            </div>
            <div className="flex gap-1 w-full md:w-fit">
                {pauseButton}
                <Button
                    onClick={() => props.stopGame()}
                    buttonType={buttonTypes.neutralButton}
                    buttonSize={buttonSizes.small}
                    className={'w-full md:w-fit'}
                >
                    <span className="flex items-center justify-center">
                        <XMarkIcon className="small-icon mr-1" />{t("Quit-Button-Label")}
                    </span>
                </Button>
            </div>
        </Card>
    )
}
