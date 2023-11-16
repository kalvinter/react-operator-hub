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
    constructor({ label, description, order, achievementGroup, targetMetric, targetValue, achievementType }) {
        this.label = label
        this.description = description || ''

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
            label: 'Recrut',
            order: 1,
            description:
                'Achieve a matched rate of 10 %. Not really impressive but at least you did not blow anything up ...',
            achievementGroup: AchievementGroups.achievedMatchedRate,
            targetMetric: AchievementMetricTypes.achievedMatchedRate,
            targetValue: 0.1,
        }),
        new Achievement({
            label: 'Solid Worker',
            order: 2,
            description: 'Achieve a matched rate of 50 % and prove that you are somewhat capable for this job ...',
            achievementGroup: AchievementGroups.achievedMatchedRate,
            targetMetric: AchievementMetricTypes.achievedMatchedRate,
            targetValue: 0.5,
        }),
        new Achievement({
            label: 'Expert',
            order: 3,
            description: 'Achieve a matched rate of 70 % and prove that you are an expert in your field!',
            achievementGroup: AchievementGroups.achievedMatchedRate,
            targetMetric: AchievementMetricTypes.achievedMatchedRate,
            targetValue: 0.7,
        }),
        new Achievement({
            label: 'Hero',
            order: 4,
            description: 'Achieve a matched rate of 80 % and become the hero of the grid!',
            achievementGroup: AchievementGroups.achievedMatchedRate,
            targetMetric: AchievementMetricTypes.achievedMatchedRate,
            targetValue: 0.8,
        }),
        new Achievement({
            label: 'God',
            order: 5,
            description:
                'Achieve a matched rate of 90 % and become the GOD of the grid! We thought this was impossible ... ',
            achievementGroup: AchievementGroups.achievedMatchedRate,
            targetMetric: AchievementMetricTypes.achievedMatchedRate,
            targetValue: 0.9,
        }),
        new GameHistoryNumberAchievement({
            label: 'First Day',
            order: 1,
            description: 'Finish your first shift!',
            achievementGroup: AchievementGroups.numberOfGames,
            targetMetric: AchievementMetricTypes.numberOfGames,
            targetValue: 1,
        }),
        new GameHistoryNumberAchievement({
            label: 'Regular',
            order: 2,
            description: 'Finish your second shift and show that you are a member of our operator team!',
            achievementGroup: AchievementGroups.numberOfGames,
            targetMetric: AchievementMetricTypes.numberOfGames,
            targetValue: 2,
        }),
        new GameHistoryNumberAchievement({
            label: 'Senior',
            order: 3,
            description: 'Finish five shifts and become a senior member the team!',
            achievementGroup: AchievementGroups.numberOfGames,
            targetMetric: AchievementMetricTypes.numberOfGames,
            targetValue: 5,
        }),
        new GameHistoryNumberAchievement({
            label: 'Veteram',
            order: 3,
            description: 'Finish ten shifts and show your dedication to our power grid!',
            achievementGroup: AchievementGroups.numberOfGames,
            targetMetric: AchievementMetricTypes.numberOfGames,
            targetValue: 10,
        }),
        new GameHistoryNumberAchievement({
            label: 'Bad Day',
            order: 1,
            description: "We said, just do your best but don't blow anything up ...",
            achievementGroup: AchievementGroups.numberOfGameEnds,
            targetMetric: AchievementMetricTypes.lostGames,
            targetValue: 1,
            achievementType: AchievementTypes.negative,
        }),
        new GameHistoryNumberAchievement({
            label: 'Quitter',
            order: 2,
            description: 'You are leaving already?',
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
