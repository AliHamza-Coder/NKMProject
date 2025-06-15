"use client"

import Link from "next/link"

export default function AdditionalBanner() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-2">
              <p className="text-gray-600 font-medium text-sm uppercase tracking-wider animate-fade-in-up">
                Premium Quality
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight animate-slide-in-left">
                Discover Our
                <br />
                <span className="text-gray-700">Exclusive Collection</span>
              </h2>
            </div>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed animate-fade-in-up delay-200">
              Experience the finest fabrics crafted with precision and elegance. Our exclusive collection features
              premium materials perfect for creating stunning outfits that make a statement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-bounce-in delay-400">
              <Link href="/category/ready-to-wear" className="bg-black hover:bg-gray-800 text-white px-5 md:px-6 py-2 md:py-3 text-base md:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 w-auto inline-flex items-center justify-center">
                Shop Collection
              </Link>
              <Link href="/category/all-categories" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-5 md:px-6 py-2 md:py-3 text-base md:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 w-auto inline-flex items-center justify-center">
                View Catalog
              </Link>
            </div>
          </div>

          {/* Right Images Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 order-1 lg:order-2">
            <div className="space-y-3 md:space-y-4">
              <div className="group aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Premium Fabric 1"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-75 group-hover:scale-100">
                    Premium Silk
                  </span>
                </div>
              </div>
              <div className="group aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Premium Fabric 2"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-75 group-hover:scale-100">
                    Cotton Blend
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3 md:space-y-4 mt-6 md:mt-8">
              <div className="group aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                <img
                  src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Premium Fabric 3"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-75 group-hover:scale-100">
                    Bridal Collection
                  </span>
                </div>
              </div>
              <div className="group aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Premium Fabric 4"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-75 group-hover:scale-100">
                    Designer Fabric
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
