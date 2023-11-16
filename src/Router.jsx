
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
          path: "/react-reactor-game/",
          element: <App />
        },
        {
          path: "/react-reactor-game/game-history/",
          element: <GameHistoryPage />
        },
        {
          path: "/react-reactor-game/achievements/",
          element: <AchievementsPage />
        },
        {
          path: "*",
          element: <NotFoundPage />
        }
      ]
    }
]