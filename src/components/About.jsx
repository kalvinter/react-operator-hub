import React from 'react'

import { links } from '../Config'

function About() {
  return (
    <div>

    <h2>About</h2>
    
    <p>This game is an experiment to practice working with react. I always loved browser games and as such I wanted to learn 
    react by creating something I would enjoy using. I hope that you have as much fun with this little game as I had. </p>
    
    <p>This app is a constant work-in-progress and things are changing. Additionally, it is currently thought to be used on desktop or a tablet. The mobile version is not yet optimal.</p>
    
    <p>You can also check out the <a target='_blank' href={`${links.repositoryOnGithub}`}>full code on Github</a></p>

</div>

  )
}

export default About
