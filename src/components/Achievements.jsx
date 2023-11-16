import React from 'react'

import { Link } from 'react-router-dom'

import { AchievementGroups } from '../game/Achievements'
import { StarIcon } from '@heroicons/react/20/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'

import { achievementsManager } from '../game/Achievements'

export function AchievementGroup(props) {
    let achievements = props.achievements.sort((a, b) => a.order - b.order)

    return (
        <div className="w-full flex gap-2 justify-around md:flex-row flex-col" key={props.achievementGroup}>
            {achievements.map((achievement) => {
                return <AchievementBadge key={achievement.label} achievement={achievement} />
            })}
        </div>
    )
}

export const achievementBadgeTestId = 'achievementBadge'
export const unlockedAchievementBadgeTestId = 'unlockedAchievementBadge'

export function AchievementBadge(props) {
    return (
        <div
            data-testid={`${props.achievement.isUnlocked ? unlockedAchievementBadgeTestId : achievementBadgeTestId}`}
            className={`${props.achievement.isUnlocked ? 'unlocked' : ''} 
          ${props.achievement.achievementType} ${props.showDescription ? 'justify-start' : 'justify-center'}	
          flex group achievementBadge relative p-2 w-full`}
        >
            <div className="flex flex-col align-middle items-center md:min-w-[10rem] min-w-[40%]">
                {props.achievement.isUnlocked ? <StarIcon className="unlocked" /> : <StarIconOutline />}
                <span className="label">{props.achievement.label} </span>
            </div>
            {props.showDescription ? (
                <div>
                    <p>
                        <small>{props.achievement.description}</small>
                    </p>
                </div>
            ) : null}
        </div>
    )
}

export function AchievementsBar() {
    let unlockedAchievements = achievementsManager.getUnlockedAchievements()

    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center">
                <h2 className="flex items-center">
                    <StarIcon className="small-icon mr-2"></StarIcon> Achievements
                </h2>

                <Link to={`achievements/`}>
                    <button className="underline ">More Information</button>
                </Link>
            </div>

            <p>
                <small className="mb-5 w-full">
                    {unlockedAchievements.length} / {achievementsManager.availableAchievements.length} unlocked
                </small>
            </p>

            <div className="flex flex-col gap-2">
                <AchievementGroup
                    achievementGroup={AchievementGroups.achievedMatchedRate}
                    achievements={achievementsManager.getAchievementsByGroup({
                        achievementGroup: AchievementGroups.achievedMatchedRate,
                    })}
                />

                <AchievementGroup
                    achievementGroup={AchievementGroups.numberOfGames}
                    achievements={achievementsManager.getAchievementsByGroup({
                        achievementGroup: AchievementGroups.numberOfGames,
                    })}
                />

                <AchievementGroup
                    achievementGroup={AchievementGroups.numberOfGameEnds}
                    achievements={achievementsManager.getAchievementsByGroup({
                        achievementGroup: AchievementGroups.numberOfGameEnds,
                    })}
                />
            </div>
        </div>
    )
}
