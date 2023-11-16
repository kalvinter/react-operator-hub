import React from 'react'

import { links } from '../Config'
import Logo from '../assets/svg/github-mark-white.svg?react'

import { InformationCircleIcon } from '@heroicons/react/20/solid'

let a = 'assets/svg/github-mark-white.svg'

function About() {
    return (
        <div>
            <h2 className="flex items-center">
                <InformationCircleIcon className="small-icon mr-2" /> About
            </h2>

            <p>
                This game is an experiment to practice working with react. I always loved browser games and as such I
                wanted to learn react by creating something I would enjoy using. I hope that you have as much fun with
                this little game as I had.{' '}
            </p>

            <p>
                This app is a constant work-in-progress and things are changing. Additionally, it is currently thought
                to be used on desktop or a tablet. The mobile version is not yet optimal.
            </p>

            <a
                className="flex item-center mb-2 mt-6"
                target="_blank"
                rel="noreferrer"
                href={`${links.repositoryOnGithub}`}
            >
                <Logo className="small-icon mr-2" /> Check out the full code on Github
            </a>
        </div>
    )
}

export default About
