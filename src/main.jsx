import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './index.css'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ErrorPage from './pages/error-page';
import NotFoundPage from './pages/404-page';
import AchievementsPage from './pages/Achievements';
import GameHistoryPage from './pages/GameHistoryPage';

import { AchievementsManager } from './game/Achievements';
import { GameHistoryStorage, PreferencesStorage } from './game/Storage';
import ThemeManager from './game/ThemeManager';

import MainLayout from './pages/MainLayout';

const gameHistoryStorage = new GameHistoryStorage()
const achievementsManager = new AchievementsManager()
const preferencesStorage = new PreferencesStorage()

const themeManager = new ThemeManager({preferencesStorage: preferencesStorage})
console.log("themeManager ", themeManager)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>            
    <BrowserRouter>
      <Routes>
        
        <Route path="/react-reactor-game/" element={<MainLayout />} errorElement={<ErrorPage />}>
          {/* Your individual routes */}
          <Route index element={<App 
            achievementsManager={achievementsManager}
            gameHistoryStorage={gameHistoryStorage}
            themeManager={themeManager}
          />} /> 
          <Route path="achievements" element={<AchievementsPage 
            achievementsManager={achievementsManager}
          />} />
          <Route path="game-history" element={<GameHistoryPage 
            gameHistoryStorage={gameHistoryStorage}
          />} />
          <Route path='*' element={<App 
            achievementsManager={achievementsManager}
            gameHistoryStorage={gameHistoryStorage}
            themeManager={themeManager}
          />} />
          {/* ... other routes ... */}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
