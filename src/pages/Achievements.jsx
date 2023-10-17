import { Link } from "react-router-dom"
import { AchievementBadgeFull } from "../components/Achievements"
import { AchievementGroups } from '../game/Achievements'

import { ArrowLeftIcon } from "@heroicons/react/20/solid"

import Card from "../components/common/Card"

export default function AchievementsPage(props){
    let unlockedAchievements = props.achievementsManager.getUnlockedAchievements()
  
    return (
            <div className='w-full'>
                <Card className="align-center flex">
                    <Link to={`/react-reactor-game/`}>
                        <button 
                        className='underline hover:text-gray-300 flex items-center gap-2'
                        ><ArrowLeftIcon className="small-icon"></ArrowLeftIcon>Go Back</button>
                    </Link>
                </Card>

                <Card>
                <h4>Achievements</h4>
                <p className='mb-6'><small className='w-full'>{unlockedAchievements.length} / {props.achievementsManager.availableAchievements.length} unlocked</small></p>
                
                <h4>Achievements related to the Achieved Mathed Rate</h4>
                <div className='mb-6 flex gap-2 flex-col'>
                {props.achievementsManager.getAchievementsByGroup({achievementGroup: AchievementGroups.achievedMatchedRate}).map((achievement) => {
                    return <AchievementBadgeFull
                        key={achievement.label} 
                        achievement={achievement}         
                        showDescription={true}
                    />
                })}
                </div>
        
                <h4>Achievements related to finished Shifts</h4>
                <div className='mb-6 flex gap-2 flex-col'>
                {props.achievementsManager.getAchievementsByGroup({achievementGroup: AchievementGroups.numberOfGames}).map((achievement) => {
                    return <AchievementBadgeFull
                        key={achievement.label}   
                        achievement={achievement}         
                        showDescription={true}
                    />
                })}
                </div>
        
                <h4>Other Achievements</h4>
                <div className='mb-1 flex gap-2 flex-col'>
                {props.achievementsManager.getAchievementsByGroup({achievementGroup: AchievementGroups.numberOfGameEnds}).map((achievement) => {
                    return <AchievementBadgeFull
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