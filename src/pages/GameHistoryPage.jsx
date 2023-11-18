import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

import { ListBulletIcon } from '@heroicons/react/20/solid'

import Card from '../components/common/Card'

import { GameHistoryCard } from '../components/GameHistory'

import { gameHistoryManager } from '../game/GameHistoryManager'
import { useTranslation } from 'react-i18next'

export const gameHistoryPageTestId = 'game-history-page'

export default function GameHistoryPage() {
    const {t} = useTranslation()

    return (
        <div className="w-full" data-testid={gameHistoryPageTestId}>
            <Card className="align-center flex">
                <Link to={`/`} className="flex items-center gap-2 no-underline">
                    <ArrowLeftIcon className="small-icon"></ArrowLeftIcon>{t("Go-Back-Button-Label")}
                </Link>
            </Card>

            <Card>
                <h2 className="flex items-center">
                    <ListBulletIcon className="small-icon mr-2"></ListBulletIcon> {t("Game-History--Header")}
                </h2>

                <div className="mb-3">
                    <small>{gameHistoryManager.gameHistory.length} {t("Entries")}</small>
                </div>

                <div className="gap-2 flex flex-col">
                    {gameHistoryManager.gameHistory.map((gameHistoryEntry) => {
                        return <GameHistoryCard gameHistoryEntry={gameHistoryEntry} key={gameHistoryEntry.date} />
                    })}
                </div>
            </Card>
        </div>
    )
}
