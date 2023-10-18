import React from 'react'
import { Outlet } from 'react-router-dom'

import ScrollToTop from '../components/ScrollToTop'

function MainLayout() {
  return (
    <div className="min-h-[100vh] md:max-w-[70rem] md:p-[4rem] md:m-auto p-0">
        <div className="min-h-[60vh] h-full w-full p-4 rounded mt-1 border-[2px] border-solid border-slate-500 dark-bg">
            <ScrollToTop />

            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout