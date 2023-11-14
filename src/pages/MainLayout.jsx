import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import ScrollToTop from '../components/ScrollToTop'
import { MotionWrapper } from '../hocs/MotionWrapper'
import HubBanner from '../components/HubBanner'

function MainLayout() {
  const location = useLocation()
/*border-solid border-color-back bg-back rounded border-[2px] shadow-xl */
  return (
    <MotionWrapper location={location}>
      <div className="min-h-[100vh] md:max-w-[70rem] md:p-[4rem] md:m-auto p-0">
          <div className="min-h-[60vh] h-full w-full p-4 bg-back rounded shadow-2xl">
              <ScrollToTop />
              
              <HubBanner />
              
              <Outlet />
          </div>
      </div>
    </MotionWrapper>
  )
}

export default MainLayout