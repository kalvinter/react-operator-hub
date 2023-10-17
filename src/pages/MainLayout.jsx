import React from 'react'
import { Outlet } from 'react-router-dom'

import ScrollToTop from '../components/ScrollToTop'

function MainLayout() {
  return (
    <div className="App container">
        <div className="main-card">
            <ScrollToTop />

            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout