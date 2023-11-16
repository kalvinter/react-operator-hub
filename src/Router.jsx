import { createHashRouter } from 'react-router-dom'

import MainLayout from './pages/MainLayout'
import App from './pages/App'
import GameHistoryPage from './pages/GameHistoryPage'
import AchievementsPage from './pages/Achievements'
import ErrorPage from './pages/ErrorPage'
import NotFoundPage from './pages/404Page'

export const routerConfiguration = [
    {
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: '/game-history/',
                element: <GameHistoryPage />,
            },
            {
                path: '/achievements/',
                element: <AchievementsPage />,
            },
            {
                path: '/*',
                element: <NotFoundPage />,
            },
        ],
    },
]

export const router = createHashRouter(routerConfiguration)
