import React from 'react'

import { pages } from '../App'
import { AchievementGroups } from '../game/Achievements'
import {StarIcon} from '@heroicons/react/20/solid'
import {StarIcon as StarIconOutlin} from '@heroicons/react/24/outline'


export function AchievementGroup(props) {
  let achievements = props.achievements.sort((a, b) => a.order - b.order);

  return (
    <div className='w-full flex gap-2 md:mb-5 justify-around md:flex-row flex-col' key={props.achievementGroup}>
          {achievements.map((achievement) => {
              return <AchievementBadge key={achievement.label} achievement={achievement} />
          })}
    </div>
  )
}

export function AchievementBadge(props){
  return (
    <div 
        className={`${props.achievement.isUnlocked ? 'unlocked flex' : 'md:flex hidden'} 
                    ${props.achievement.achievementType} group achievementBadge 
                    relative bg-gray-800 p-2 w-full flex-col align-middle items-center`}>
        {(props.achievement.isUnlocked ? <StarIcon className='unlocked' /> : <StarIconOutlin />)}
        <span className='label'>{props.achievement.label} </span>
    </div>
  )
}

export function AchievementBadgeFull(props){
  return (
    <div className={`${props.achievement.isUnlocked ? 'unlocked' : ''} ${props.achievement.achievementType} flex group achievementBadge relative bg-gray-800 p-2 w-full`}>
      <div className='flex flex-col align-middle items-center md:min-w-[10rem] min-w-[40%]'>
        {(props.achievement.isUnlocked ? <StarIcon className='unlocked' /> : <StarIconOutlin />)}
        <span className='label'>{props.achievement.label} </span>
      </div>
      {(props.showDescription) ? <p><small>{props.achievement.description}</small></p> : null}
    </div>
  )
}


export function AchievementsBar(props) {
  let unlockedAchievements = props.achievementsManager.availableAchievements.filter((achievement) => {
    return achievement.isUnlocked
  })

  return (
    <div className='w-full'>
        <div className='w-full flex justify-between items-center'>
          <h2>Achievements</h2>
          <button 
            className='underline hover:text-gray-300'
            onClick={() => props.goToPage(pages.achievementsDetailPage)}
            >More Information</button>
        </div>
        
        <p><small className='mb-5 w-full'>{unlockedAchievements.length} / {props.achievementsManager.availableAchievements.length} unlocked</small></p>
        <AchievementGroup 
            achievementGroup={AchievementGroups.achievedMatchedRate}
            achievements={props.achievementsManager.getAchievementsByGroup({achievementGroup: AchievementGroups.achievedMatchedRate})}
        />

        <AchievementGroup 
            achievementGroup={AchievementGroups.numberOfGames}
            achievements={props.achievementsManager.getAchievementsByGroup({achievementGroup: AchievementGroups.numberOfGames})}
        />

        <AchievementGroup 
            achievementGroup={AchievementGroups.numberOfGameEnds}
            achievements={props.achievementsManager.getAchievementsByGroup({achievementGroup: AchievementGroups.numberOfGameEnds})}
        />
    </div>
  )
}

export function AchievementsListDetailled(props){
  let unlockedAchievements = props.achievementsManager.getUnlockedAchievements()

  return (
    <div className='w-full'>
      <button 
            className='underline hover:text-gray-300 mb-5'
            onClick={() => props.goToPage(pages.landingPage)}
      >Go Back</button>
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
      <div className='mb-6 flex gap-2 flex-col'>
        {props.achievementsManager.getAchievementsByGroup({achievementGroup: AchievementGroups.numberOfGameEnds}).map((achievement) => {
          return <AchievementBadgeFull
              key={achievement.label} 
              achievement={achievement}         
              showDescription={true}
          />
        })}
      </div>

    </div>  
  )
}