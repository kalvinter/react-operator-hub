import { Link } from "react-router-dom"
import { AchievementBadge } from "../components/Achievements"
import { AchievementGroups } from '../game/Achievements'
import {StarIcon} from '@heroicons/react/20/solid'
import {StarIcon as StarIconOutline} from '@heroicons/react/24/outline'

import { ArrowLeftIcon } from "@heroicons/react/20/solid"

import { achievementsManager } from "../game/Achievements"

import Card from "../components/common/Card"

export default function AchievementsPage(){
    let unlockedAchievements = achievementsManager.getUnlockedAchievements()
    
    return (
        <div className='w-full'>
            <Card className="align-center flex">
                <Link to={`/react-reactor-game/`} className='flex items-center gap-2 no-underline'>
                    <ArrowLeftIcon className="small-icon"></ArrowLeftIcon>Go Back
                </Link>
            </Card>

            <Card>
                <h2 className='flex items-center'>
                    <StarIcon className='small-icon mr-2'></StarIcon> Achievements
                </h2>

                <p className='mb-6'><small className='w-full'>{unlockedAchievements.length} / {achievementsManager.availableAchievements.length} unlocked</small></p>
                
                <h4>Achievements related to the Achieved Mathed Rate</h4>
                <div className='mb-6 flex gap-2 flex-col'>
                {achievementsManager.getAchievementsByGroup({achievementGroup: AchievementGroups.achievedMatchedRate}).map((achievement) => {
                    return <AchievementBadge
                        key={achievement.label} 
                        achievement={achievement}         
                        showDescription={true}
                    />
                })}
                </div>
        
                <h4>Achievements related to finished Shifts</h4>
                <div className='mb-6 flex gap-2 flex-col'>
                {achievementsManager.getAchievementsByGroup({achievementGroup: AchievementGroups.numberOfGames}).map((achievement) => {
                    return <AchievementBadge
                        key={achievement.label}   
                        achievement={achievement}         
                        showDescription={true}
                    />
                })}
                </div>
        
                <h4>Other Achievements</h4>
                <div className='mb-1 flex gap-2 flex-col'>
                {achievementsManager.getAchievementsByGroup({achievementGroup: AchievementGroups.numberOfGameEnds}).map((achievement) => {
                    return <AchievementBadge
                        key={achievement.label} 
                        achievement={achievement}         
                        showDescription={true}
                    />
                })}
                </div>
            </Card>

        </div>
    )
  }