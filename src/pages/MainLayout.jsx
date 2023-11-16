import { useLocation } from 'react-router-dom'

import ScrollToTop from '../components/ScrollToTop'
import { MotionWrapper } from '../hocs/MotionWrapper'
import { AnimatePresence } from 'framer-motion'
import HubBanner from '../components/HubBanner'

import { useState } from 'react'

import { useOutlet } from 'react-router-dom'

const AnimatedOutlet = () => {
    const o = useOutlet()
    const [outlet] = useState(o)

    return <>{outlet}</>
}

function MainLayout() {
    const location = useLocation()

    return (
        <div className="min-h-[100vh] md:max-w-[70rem] md:p-[4rem] md:m-auto p-0">
            <div className="min-h-[60vh] h-full w-full p-4 bg-back rounded shadow-2xl">
                <ScrollToTop />

                <HubBanner />

                <AnimatePresence initial={false} mode="wait">
                    <MotionWrapper locationKey={location.pathname}>
                        <AnimatedOutlet />
                    </MotionWrapper>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default MainLayout
