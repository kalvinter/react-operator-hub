import { Link } from 'react-router-dom'
import { AchievementBadge } from '../components/Achievements'
import { AchievementGroups } from '../game/Achievements'
import { StarIcon } from '@heroicons/react/20/solid'

import { ArrowLeftIcon } from '@heroicons/react/20/solid'

import { achievementsManager } from '../game/Achievements'

import Card from '../components/common/Card'
import { useTranslation } from 'react-i18next'

import ReactorConnectionBar from '../components/ReactorConnectionBar'
import { ReactorConfigManager } from '../game/AvailableReactors'

export const achievementsPageTestId = 'game-history-page'

export default function AchievementsPage() {
    const {t} = useTranslation()

    const reactorConfigManager = new ReactorConfigManager()

    const unlockedAchievements = achievementsManager.getUnlockedAchievements()

    return (
        <div className="w-full" data-testid={achievementsPageTestId}>
            <ReactorConnectionBar 
                activeReactorConfig={reactorConfigManager.activeReactorConfig}
                showSwitchReactorButton={false}
            /> 

            <Card className="align-center flex">
                <Link to={`/`} className="flex items-center gap-2 no-underline">
                    <ArrowLeftIcon className="small-icon"></ArrowLeftIcon>{t("Go-Back-Button-Label")}
                </Link>
            </Card>

            <Card>
                <h2 className="flex items-center">
                    <StarIcon className="small-icon mr-2"></StarIcon> {t("Achievements")}
                </h2>

                <p className="mb-6">
                    <small className="w-full">
                        {unlockedAchievements.length} / {achievementsManager.availableAchievements.length} {t("unlocked")}
                    </small>
                </p>
                
                <h4>{t("Achievements-Group-Matched-Rate--Header")}</h4>
                <div className="mb-6 flex gap-2 flex-col">
                    {achievementsManager
                        .getAchievementsByGroup({ achievementGroup: AchievementGroups.achievedMatchedRate })
                        .map((achievement) => {
                            return (
                                <AchievementBadge
                                    key={achievement.labelKey}
                                    achievement={achievement}
                                    showDescription={true}
                                />
                            )
                        })}
                </div>
                
                <h4>{t("Achievements-Group-Finished-Shifts--Header")}</h4>
                <div className="mb-6 flex gap-2 flex-col">
                    {achievementsManager
                        .getAchievementsByGroup({ achievementGroup: AchievementGroups.numberOfGames })
                        .map((achievement) => {
                            return (
                                <AchievementBadge
                                    key={achievement.labelKey}
                                    achievement={achievement}
                                    showDescription={true}
                                />
                            )
                        })}
                </div>

                <h4>{t("Achievements-Group-Other--Header")}</h4>
                <div className="mb-1 flex gap-2 flex-col">
                    {achievementsManager
                        .getAchievementsByGroup({ achievementGroup: AchievementGroups.numberOfGameEnds })
                        .map((achievement) => {
                            return (
                                <AchievementBadge
                                    key={achievement.labelKey}
                                    achievement={achievement}
                                    showDescription={true}
                                />
                            )
                        })}
                </div>
            </Card>
        </div>
    )
}
