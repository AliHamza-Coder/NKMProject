"use client"

import dynamic from 'next/dynamic'

const HeroSlider = dynamic(() => import('./hero-slider'), {
  ssr: false,
  loading: () => (
    <div className="relative h-[70vh] overflow-hidden bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-64 h-8 bg-gray-300 rounded mb-4 mx-auto"></div>
          <div className="w-96 h-12 bg-gray-300 rounded mb-6 mx-auto"></div>
          <div className="w-80 h-6 bg-gray-300 rounded mb-8 mx-auto"></div>
          <div className="w-32 h-10 bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>
    </div>
  )
})

export default HeroSlider