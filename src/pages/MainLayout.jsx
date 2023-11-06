import React, {useState, useEffect} from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import ScrollToTop from '../components/ScrollToTop'
import { MotionWrapper } from '../hocs/MotionWrapper'

function MainLayout() {
  const location = useLocation()

  return (
    <MotionWrapper location={location}>
      <div className="min-h-[100vh] md:max-w-[70rem] md:p-[4rem] md:m-auto p-0">
          <div className="min-h-[60vh] h-full w-full p-4 rounded border-[2px] shadow-xl border-solid border-color-back bg-back">
              <ScrollToTop />

              <Outlet />
          </div>
      </div>
    </MotionWrapper>
  )
}

export default MainLayout