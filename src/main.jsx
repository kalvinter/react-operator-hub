import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from './pages/error-page';
import NotFoundPage from './pages/404-page';
import AchievementsPage from './pages/Achievements';

import { AchievementsManager } from './game/Achievements';
import { GameHistoryStorage } from './game/Storage';

import ScrollToTop from './components/ScrollToTop';

const gameHistoryStorage = new GameHistoryStorage()
const achievementsManager = new AchievementsManager()

const router = createBrowserRouter([
  {
    path: "/react-reactor-game/*",
    element: <App 
      achievementsManager={achievementsManager}
      gameHistoryStorage={gameHistoryStorage}
    />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/react-reactor-game/achievements/",
    element: <AchievementsPage
      achievementsManager={achievementsManager}
     />
  },
  {
    path: "*",
    element: <div ><h1>Hello</h1><NotFoundPage /></div>,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
