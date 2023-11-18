import i18n from '../i18n.js'

import { GameEndTypes } from './Config'

export const AchievementGroups = {
    achievedMatchedRate: 'Achieved Matched Rate',
    numberOfGames: 'numberOfGames',
    numberOfGameEnds: 'numberOfGameEnds',
}

const AchievementMetricTypes = {
    achievedMatchedRate: 'achievedMatchedRate',
    numberOfGames: 'numberOfGames',
    lostGames: 'lostGames',
    abortedGames: 'abortedGames',
}

const AchievementTypes = {
    positive: 'positive',
    negative: 'negative',
    neutral: 'neutral',
}

class Achievement {
    constructor({ labelKey, descriptionKey, order, achievementGroup, targetMetric, targetValue, achievementType }) {
        this.labelKey = labelKey
        this.descriptionKey = descriptionKey

        /* This is used to group achievements together. Achievement within the same group 
        will be displayed together. 
        All achievements within a group have the same condition (e.g. increase mathedRate) 
        and get more and more difficult to achieve */
        this.achievementGroup = achievementGroup

        /* the order in which the achievements should be looked at withing this achievementGroup
         1 is the first achievement */
        this.order = order

        /* The metric which is checked for achievement unlocking. e.g. matchedRate */
        this.targetMetric = targetMetric

        /* The target value that has to be reached for this metric to unlock this achievement */
        this.targetValue = targetValue

        this.isUnlocked = false

        /* This is used to render the appropriate achievement badge */
        this.achievementType = achievementType || ''
    }

    getLabel(){
        return i18n.t(this.labelKey, { ns: "achievements" })
    }

    getDescription(){
        console.log(i18n.t(this.descriptionKey, { ns: "achievements" }))
        console.log(this.descriptionKey)
        return i18n.t(this.descriptionKey, { ns: "achievements" })
    }

    unlock({ gameHistoryEntries }) {
        this.isUnlocked = this.canBeUnlocked({ gameHistoryEntries: gameHistoryEntries })
    }

    canBeUnlocked({ gameHistoryEntries }) {
        for (let gameHistoryEntry of gameHistoryEntries) {
            if (gameHistoryEntry.gameStatus !== GameEndTypes.shiftWasFinished) {
                return false
            }

            if (gameHistoryEntry.hasOwnProperty(this.targetMetric)) {
                return gameHistoryEntry[this.targetMetric] > this.targetValue
            } else {
                console.error(`ERROR: gameHistoryEntry is missing targetMetric: '${this.targetMetric}'`)
                return false
            }
        }

        return false
    }
}

class GameHistoryNumberAchievement extends Achievement {
    canBeUnlocked({ gameHistoryEntries }) {
        let filteredGameHistory

        switch (this.targetMetric) {
            case AchievementMetricTypes.numberOfGames:
                filteredGameHistory = gameHistoryEntries.filter((gameHistoryEntry) => {
                    return gameHistoryEntry.gameStatus === GameEndTypes.shiftWasFinished
                })
                break

            case AchievementMetricTypes.lostGames:
                filteredGameHistory = gameHistoryEntries.filter((gameHistoryEntry) => {
                    return gameHistoryEntry.gameStatus === GameEndTypes.lost
                })
                break

            case AchievementMetricTypes.abortedGames:
                filteredGameHistory = gameHistoryEntries.filter((gameHistoryEntry) => {
                    return gameHistoryEntry.gameStatus === GameEndTypes.aborted
                })
                break

            default:
                console.error(`ERROR: Encountered unexpected targetMetric '${this.targetMetric}'`)
                return false
        }

        return filteredGameHistory.length >= this.targetValue
    }
}

const getInitialAvailabelAchievements = () => {
    return [
        new Achievement({
            labelKey: 'Recrut',
            order: 1,
            descriptionKey: 'Recrut-Description',
            achievementGroup: AchievementGroups.achievedMatchedRate,
            targetMetric: AchievementMetricTypes.achievedMatchedRate,
            targetValue: 0.1,
        }),
        new Achievement({
            labelKey: 'Solid Worker',
            order: 2,
            descriptionKey: 'Solid Worker-Description',
            achievementGroup: AchievementGroups.achievedMatchedRate,
            targetMetric: AchievementMetricTypes.achievedMatchedRate,
            targetValue: 0.5,
        }),
        new Achievement({
            labelKey: 'Expert',
            order: 3,
            descriptionKey: 'Expert-Description',
            achievementGroup: AchievementGroups.achievedMatchedRate,
            targetMetric: AchievementMetricTypes.achievedMatchedRate,
            targetValue: 0.7,
        }),
        new Achievement({
            labelKey: 'Hero',
            order: 4,
            descriptionKey: 'Hero-Description',
            achievementGroup: AchievementGroups.achievedMatchedRate,
            targetMetric: AchievementMetricTypes.achievedMatchedRate,
            targetValue: 0.8,
        }),
        new Achievement({
            labelKey: 'God',
            order: 5,
            descriptionKey:
                'God-Description',
            achievementGroup: AchievementGroups.achievedMatchedRate,
            targetMetric: AchievementMetricTypes.achievedMatchedRate,
            targetValue: 0.9,
        }),
        new GameHistoryNumberAchievement({
            labelKey: 'First Day',
            order: 1,
            descriptionKey: 'First Day-Description',
            achievementGroup: AchievementGroups.numberOfGames,
            targetMetric: AchievementMetricTypes.numberOfGames,
            targetValue: 1,
        }),
        new GameHistoryNumberAchievement({
            labelKey: 'Regular',
            order: 2,
            descriptionKey: 'Regular-Description',
            achievementGroup: AchievementGroups.numberOfGames,
            targetMetric: AchievementMetricTypes.numberOfGames,
            targetValue: 2,
        }),
        new GameHistoryNumberAchievement({
            labelKey: 'Senior',
            order: 3,
            descriptionKey: 'Senior-Description',
            achievementGroup: AchievementGroups.numberOfGames,
            targetMetric: AchievementMetricTypes.numberOfGames,
            targetValue: 5,
        }),
        new GameHistoryNumberAchievement({
            labelKey: 'Veteran',
            order: 3,
            descriptionKey: 'Veteran-Description',
            achievementGroup: AchievementGroups.numberOfGames,
            targetMetric: AchievementMetricTypes.numberOfGames,
            targetValue: 10,
        }),
        new GameHistoryNumberAchievement({
            labelKey: 'Bad Day',
            order: 1,
            descriptionKey: "Bad Day-Description",
            achievementGroup: AchievementGroups.numberOfGameEnds,
            targetMetric: AchievementMetricTypes.lostGames,
            targetValue: 1,
            achievementType: AchievementTypes.negative,
        }),
        new GameHistoryNumberAchievement({
            labelKey: 'Quitter',
            order: 2,
            descriptionKey: 'Quitter-Description',
            achievementGroup: AchievementGroups.numberOfGameEnds,
            targetMetric: AchievementMetricTypes.abortedGames,
            targetValue: 1,
            achievementType: AchievementTypes.neutral,
        }),
    ]
}

export class AchievementsManager {
    constructor() {
        this.resetAchievements()
    }

    resetAchievements() {
        this.availableAchievements = getInitialAvailabelAchievements()
    }

    getAchievementsByGroup({ achievementGroup }) {
        return this.availableAchievements.filter((achievement) => {
            return achievement.achievementGroup === achievementGroup
        })
    }

    getUnlockedAchievements() {
        return this.availableAchievements.filter((achievement) => {
            return achievement.isUnlocked
        })
    }

    checkGameHistoryEntries({ gameHistoryEntries, unlockAchievements }) {
        let newUnlockedAchievements = []

        for (let achievement of this.availableAchievements) {
            if (!achievement.isUnlocked && achievement.canBeUnlocked({ gameHistoryEntries: gameHistoryEntries })) {
                if (unlockAchievements) {
                    achievement.unlock({ gameHistoryEntries: gameHistoryEntries })
                }

                newUnlockedAchievements.push(achievement)
            }
        }

        this.newUnlockedAchievements = newUnlockedAchievements
        return this.newUnlockedAchievements
    }
}

export const achievementsManager = new AchievementsManager()
