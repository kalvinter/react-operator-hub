import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './index.css'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/404Page';

import MainLayout from './pages/MainLayout';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>            
    <BrowserRouter>
      <Routes>
        <Route path="/react-reactor-game/*" element={<MainLayout />} errorElement={<ErrorPage />}>
          {/* Your individual routes */}
          <Route path='*' element={<App />} />
          {/* ... other routes ... */}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
