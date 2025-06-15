"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { heroSlides } from "../data/slider-data"

function HeroSliderComponent() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsAnimating(false)
      }, 400)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsAnimating(false)
      }, 400)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
        setIsAnimating(false)
      }, 400)
    }
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] xl:h-[90vh] overflow-hidden bg-gray-900">
      {/* Background Image with Smooth Scale Animation */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
          isAnimating ? "scale-105" : "scale-100"
        }`}
        style={{ backgroundImage: `url(${currentSlideData.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Content Container with Proper Spacing */}
      <div className="relative z-10 flex items-center h-full text-white px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Left and Right Padding for Arrows */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center md:text-left max-w-4xl">
            {/* Subtitle with Smooth Fade Animation */}
            <div
              className={`flex items-center justify-center md:justify-start mb-3 md:mb-4 transition-all duration-800 ease-out ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 animate-pulse">✨</div>
              <h2 className="text-xs sm:text-sm md:text-base uppercase tracking-wider font-medium text-yellow-400">
                {currentSlideData.subtitle}
              </h2>
            </div>

            {/* Main Title with Elegant Scale Animation */}
            <h1
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 leading-tight text-white transition-all duration-1000 ease-out delay-100 ${
                isAnimating ? "opacity-0 scale-95 translate-y-6" : "opacity-100 scale-100 translate-y-0"
              }`}
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.7)",
              }}
            >
              <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default">
                {currentSlideData.title.split(" ")[0]}
              </span>{" "}
              <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default">
                {currentSlideData.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            {/* Description with Fade Animation */}
            <p
              className={`text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-2xl opacity-90 leading-relaxed text-gray-100 transition-all duration-1000 ease-out delay-200 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              {currentSlideData.description}
            </p>

            {/* Buttons with Smooth Scale Animation */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4 transition-all duration-1000 ease-out delay-300 ${
                isAnimating ? "opacity-0 scale-95 translate-y-6" : "opacity-100 scale-100 translate-y-0"
              }`}
            >
              <Link
                href={currentSlideData.ctaLink || "/shop"}
                className="group bg-black/80 hover:bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-600 transform hover:-translate-y-1 cursor-pointer backdrop-blur-sm"
              >
                <span className="group-hover:scale-105 transition-transform duration-300 inline-block">
                  {currentSlideData.cta}
                </span>
              </Link>
              <Link
                href={currentSlideData.learnMoreLink || "/about"}
                className="group border border-white/50 text-white bg-white/10 hover:bg-white/20 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-md cursor-pointer"
              >
                <span className="group-hover:scale-105 transition-transform duration-300 inline-block">Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows with Proper Z-index and Cursor */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 hover:border-white/60 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-30 hover:scale-110 cursor-pointer"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 hover:border-white/60 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-30 hover:scale-110 cursor-pointer"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator with Cursor Pointer */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setTimeout(() => {
                  setCurrentSlide(index)
                  setIsAnimating(false)
                }, 400)
              }
            }}
            className={`transition-all duration-300 rounded-full hover:scale-125 cursor-pointer ${
              index === currentSlide
                ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-white shadow-lg"
                : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes gentleBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-slide-up {
          animation: slideInUp 0.8s ease-out;
        }
        
        .animate-fade-scale {
          animation: fadeInScale 1s ease-out;
        }
        
        .animate-gentle-bounce {
          animation: gentleBounce 2s ease-in-out infinite;
        }
        
        /* Smooth transitions for all interactive elements */
        button, a {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Ensure proper cursor for all clickable elements */
        button, a, [role="button"] {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

// Dynamic import with responsive loading state
const HeroSlider = dynamic(() => Promise.resolve(HeroSliderComponent), {
  ssr: false,
  loading: () => (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] xl:h-[90vh] overflow-hidden bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl w-full">
          <div className="w-32 sm:w-48 h-4 sm:h-6 bg-gray-300 rounded mb-3 sm:mb-4 mx-auto animate-pulse"></div>
          <div className="w-64 sm:w-80 md:w-96 h-6 sm:h-8 md:h-10 bg-gray-300 rounded mb-4 sm:mb-6 mx-auto animate-pulse"></div>
          <div className="w-48 sm:w-64 md:w-80 h-3 sm:h-4 md:h-5 bg-gray-300 rounded mb-6 sm:mb-8 mx-auto animate-pulse"></div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
            <div className="w-24 sm:w-32 h-8 sm:h-10 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-24 sm:w-32 h-8 sm:h-10 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  ),
})

export default HeroSlider
