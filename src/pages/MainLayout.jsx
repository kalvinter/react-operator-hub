import React, {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'

import ScrollToTop from '../components/ScrollToTop'
import { MotionWrapper } from '../hocs/MotionWrapper'

function MainLayout() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // When the component first mounts, set isInitialLoad to false
  // This is done to prevent the animation to run when the app is first launched
  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  return (
    <MotionWrapper skipAnimation={isInitialLoad}>
      <div className="min-h-[100vh] md:max-w-[70rem] md:p-[4rem] md:m-auto p-0">
          <div className="min-h-[60vh] h-full w-full p-4 rounded mt-1 border-[2px] shadow-xl border-solid border-color-back bg-back">
              <ScrollToTop />

              <Outlet />
          </div>
      </div>
    </MotionWrapper>
  )
}

export default MainLayout