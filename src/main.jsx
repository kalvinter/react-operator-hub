import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './index.css'

import {
  createBrowserRouter,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ErrorPage from './pages/error-page';
import NotFoundPage from './pages/404-page';
import AchievementsPage from './pages/Achievements';

import { AchievementsManager } from './game/Achievements';
import { GameHistoryStorage } from './game/Storage';

import ScrollToTop from './components/ScrollToTop';
import MainLayout from './pages/MainLayout';

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
    <BrowserRouter>
      <Routes>
        
        <Route path="/react-reactor-game/" element={<MainLayout />} errorElement={<ErrorPage />}>
          {/* Your individual routes */}
          <Route index element={<App 
            achievementsManager={achievementsManager}
            gameHistoryStorage={gameHistoryStorage}
          />} />
          <Route path="achievements" element={<AchievementsPage 
            achievementsManager={achievementsManager}
          />} />
          <Route path='*' element={<App 
            achievementsManager={achievementsManager}
            gameHistoryStorage={gameHistoryStorage}
          />} />
          {/* ... other routes ... */}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
