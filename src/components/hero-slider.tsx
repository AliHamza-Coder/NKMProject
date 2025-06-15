"use client"

import { useState, useEffect } from "react"
import { heroSlides } from "../data/slider-data"
import Link from "next/link"

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsAnimating(false)
      }, 300)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
        setIsAnimating(false)
      }, 300)
    }
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <div className="relative h-screen md:h-[120vh] overflow-hidden bg-gray-900">
      {/* Background Image with Enhanced Scale Animation */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          isAnimating ? "scale-125 rotate-1" : "scale-110"
        }`}
        style={{ backgroundImage: `url(${currentSlideData.image})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content with Amazing Scale Animations */}
      <div className="relative z-10 flex items-center justify-center md:justify-start h-full text-white px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl text-center md:text-left">
          {/* Subtitle with Scale Up Animation */}
          <div
            className={`flex items-center justify-center md:justify-start mb-4 md:mb-6 transition-all duration-1000 ${
              isAnimating ? "opacity-0 scale-75 translate-y-8" : "opacity-100 scale-100 translate-y-0"
            }`}
          >
            <div className="w-6 h-6 mr-3 text-yellow-400 animate-pulse hover:scale-125 transition-transform duration-300">
              ✨
            </div>
            <h2 className="text-sm md:text-lg uppercase tracking-wider font-semibold text-yellow-400 animate-fade-in">
              {currentSlideData.subtitle}
            </h2>
          </div>

          {/* Main Title with Enhanced Scale and Bounce Animation */}
          <h1
            className={`text-4xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight text-white transition-all duration-1000 delay-200 ${
              isAnimating
                ? "opacity-0 scale-75 translate-y-12 rotate-2"
                : "opacity-100 scale-100 translate-y-0 rotate-0"
            }`}
          >
            <span className="inline-block animate-slide-in-left hover:scale-110 transition-transform duration-300">
              {currentSlideData.title.split(" ")[0]}
            </span>{" "}
            <span className="inline-block animate-slide-in-right hover:scale-110 transition-transform duration-300 delay-300">
              {currentSlideData.title.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          {/* Description with Scale Fade Animation */}
          <p
            className={`text-lg md:text-xl mb-8 md:mb-10 max-w-2xl opacity-90 leading-relaxed text-gray-200 transition-all duration-1000 delay-400 ${
              isAnimating ? "opacity-0 scale-90 translate-y-8" : "opacity-100 scale-100 translate-y-0"
            }`}
          >
            {currentSlideData.description}
          </p>

          {/* Buttons with Enhanced Scale Bounce Animation */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-1000 delay-600 ${
              isAnimating ? "opacity-0 scale-75 translate-y-12" : "opacity-100 scale-100 translate-y-0"
            }`}
          >
            <Link href={currentSlideData.ctaLink || "/shop"} className="group bg-black hover:bg-gray-800 text-white px-8 md:px-12 py-3 md:py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-125 hover:shadow-2xl border border-gray-700 transform hover:-translate-y-2 animate-bounce-in hover:rotate-1 inline-block">
              <span className="group-hover:animate-pulse group-hover:scale-110 transition-transform duration-300 inline-block">
                {currentSlideData.cta}
              </span>
            </Link>
            <Link href={currentSlideData.learnMoreLink || "/about"} className="group border border-white/40 text-white bg-white/20 hover:bg-white/40 px-8 md:px-12 py-3 md:py-4 text-lg rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-md inline-block">
              <span className="group-hover:animate-pulse group-hover:scale-110 transition-transform duration-300 inline-block">
                Learn More
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows with Scale Effects */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2
          bg-white/30 backdrop-blur-md border border-white/60
          text-black p-3 md:p-4 rounded-full shadow-lg
          transition-all duration-300 z-20
          hover:bg-white/60 hover:border-white hover:scale-110 hover:shadow-2xl"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2
          bg-white/30 backdrop-blur-md border border-white/60
          text-black p-3 md:p-4 rounded-full shadow-lg
          transition-all duration-300 z-20
          hover:bg-white/60 hover:border-white hover:scale-110 hover:shadow-2xl"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Enhanced Dots Indicator with Scale */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 md:space-x-4 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setTimeout(() => {
                  setCurrentSlide(index)
                  setIsAnimating(false)
                }, 300)
              }
            }}
            className={`transition-all duration-300 rounded-full hover:scale-150 ${
              index === currentSlide
                ? "w-8 md:w-12 h-3 bg-white shadow-lg scale-110"
                : "w-3 h-3 bg-white bg-opacity-50 hover:bg-opacity-70"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
