![Automated Testing](https://github.com/kalvinter/react-operator-hub/actions/workflows/test.yml/badge.svg)
![Depyloment](https://github.com/kalvinter/react-operator-hub/actions/workflows/deploy.yml/badge.svg)

# Welcome to the Grid

Step into the role of a reactor operator at the heart of the nation's power grid. Your mission?
Keep the country powered up! But remember, it's all about balance: match the country's electricity demand without overloading the system.

### Gameplay Essentials

- More Fuel = Higher Heat: Increasing fuel levels boosts power but also heats up the reactor.
- Monitor the Demand: Demand fluctuates! Events like other reactors going offline will be highlighted at the top of your screen.
- Manage the Heat: If your reactor gets too hot, increase cooling levels to prevent overloading.

# Features

- Simple yet slightly addictive gameplay for quick sessions.
- <strong>20</strong> unique events affecting power demand.
- <strong>11</strong> challenging achievements.
- Available in <strong>English</strong> and <strong>German</strong>.
- <strong>Dark</strong> and <strong>light</strong> mode.

# Coming Soon

- Switching reactors for players who are looking for a challenge.
- Additional themes for personalized gameplay.
- Saving / Loading of individual sessions.
- Even more events to challenge you!

# Play the Game

Dive into the world of reactor management here: <a target="_blank" href="https://kalvinter.github.io/react-operator-hub/">Play Operator-Hub</a>

<img src="https://github.com/kalvinter/react-operator-hub/blob/4190b95d04007a07cff477acce6a0315beafe6e5/docs/20231126_Home.png" width="500" />

<hr>

<img src="https://github.com/kalvinter/react-operator-hub/blob/4190b95d04007a07cff477acce6a0315beafe6e5/docs/20231126_Game.png" width="500" />

<hr>

# About the Repository

As someone who's always been fascinated by the interactive nature and accessibility of browser games, I embarked on this project to delve deeper into React and create something both fun and educational. This game represents not just a learning curve, but also a passion for combining technology with entertainment. I sincerely hope you find as much joy and intrigue in playing it as I did in creating it.
 
# Technology Stack

- Vite
- Vitest
- React
- React-Router
- i18next
- framer-motion
- ChartJS
- TailwindCSS

# Continuous Integration and Deployment

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

This repository leverages GitHub Actions to ensures a high standard of code quality and seamless deployment:

- <strong>Test Automation</strong>: Pushing code to the develop branch automatically triggers a series of tests, ensuring each feature meets our quality benchmarks.
- <strong>Release Process</strong>: Merging changes from develop to main initiates the deployment pipeline. The main branch is automatically deployed to GitHub Pages, making the latest version of the game readily available to players.

# Usage

```shell
# Clone the repository
git clone https://github.com/kalvinter/react-operator-hub.git

# Navigate to the project directory
cd react-operator-hub

# Install dependencies
npm install

# Start the vite development server
npm run dev

# Run tests
npm run test

# Identify issues with ESLint
npm run lint

# Build the project
npm run build
```
