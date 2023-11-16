import React from 'react'
import { useWindowWidth } from '@react-hook/window-size'

export default function useDevice() {
    const windowWidth = useWindowWidth()

    return {
        isMobile: windowWidth <= 640,
        isTablet: (640 < windowWidth) && (windowWidth <= 1024),
        isDesktop: 1024 < windowWidth,
    }
}