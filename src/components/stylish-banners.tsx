"use client"

import { banners } from "../data/banner-data"
import Link from "next/link"

export default function StylishBanners() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center mb-12 md:mb-20 gap-8 lg:gap-12`}
          >
            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="max-w-lg mx-auto lg:mx-0">
                <h3 className="text-sm uppercase tracking-wider text-gray-600 mb-2 font-semibold animate-fadeInScale">
                  {banner.subtitle}
                </h3>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6 leading-tight animate-scaleInLeft">
                  {banner.title}
                </h2>
                <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed animate-fadeInScale delay-200">
                  {banner.description}
                </p>
                <Link href={banner.ctaLink || "/category/all-categories"} className="group bg-black hover:bg-gray-800 text-white px-5 md:px-6 py-2 md:py-3 text-base md:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl inline-flex items-center mx-auto lg:mx-0 transform hover:-translate-y-1 animate-bounceInScale delay-400 hover:rotate-1 w-auto">
                  <span className="group-hover:scale-110 transition-transform duration-300">{banner.cta}</span>
                  <svg
                    className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Image Gallery with Enhanced Scale Hover Effects */}
            <div className="w-full lg:w-1/2 flex space-x-4 md:space-x-6">
              <div className="relative group flex-1">
                <div className="overflow-hidden rounded-xl shadow-2xl transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 group-hover:-translate-y-2">
                  <img
                    src={banner.image1 || "/placeholder.svg"}
                    alt={`${banner.title} 1`}
                    className="w-full h-64 md:h-80 object-cover transition-all duration-1000 group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-all duration-700"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-75 group-hover:scale-100">
                    <h4 className="font-semibold text-lg mb-1">Premium Quality</h4>
                    <p className="text-sm opacity-90">Crafted with Excellence</p>
                  </div>
                </div>

                {/* Enhanced Floating Elements */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 animate-pulse group-hover:scale-125"></div>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-400 animate-pulse group-hover:scale-125"></div>
              </div>

              <div className="relative group flex-1 mt-6 md:mt-8">
                <div className="overflow-hidden rounded-xl shadow-2xl transform transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2 group-hover:-translate-y-2">
                  <img
                    src={banner.image2 || "/placeholder.svg"}
                    alt={`${banner.title} 2`}
                    className="w-full h-64 md:h-80 object-cover transition-all duration-1000 group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-all duration-700"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-75 group-hover:scale-100">
                    <h4 className="font-semibold text-lg mb-1">Elegant Design</h4>
                    <p className="text-sm opacity-90">Timeless Beauty</p>
                  </div>
                </div>

                {/* Enhanced Floating Elements */}
                <div className="absolute -top-3 -left-3 w-7 h-7 bg-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 animate-pulse group-hover:scale-125"></div>
                <div className="absolute -bottom-3 -right-3 w-5 h-5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-500 animate-pulse group-hover:scale-125"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Custom CSS for Scale Animations */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes scaleInLeft {
          from {
            opacity: 0;
            transform: scale(0.6) translateX(-80px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
        }
        
        @keyframes bounceInScale {
          0% {
            opacity: 0;
            transform: scale(0.2) translateY(100px);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 1s ease-out;
        }
        
        .animate-scaleInLeft {
          animation: scaleInLeft 1.2s ease-out;
        }
        
        .animate-bounceInScale {
          animation: bounceInScale 1.5s ease-out;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  )
}
