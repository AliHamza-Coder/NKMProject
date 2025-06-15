"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "all",
    name: "All Categories",
    image: null,
    slug: "all-categories",
    isText: true,
  },
  {
    id: "unstitched",
    name: "Unstitched",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    slug: "unstitched",
  },
  {
    id: "ready-to-wear",
    name: "Ready to Wear",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    slug: "ready-to-wear",
  },
  {
    id: "formal",
    name: "Formal",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    slug: "formal",
  },
  {
    id: "bridal",
    name: "Bridal",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    slug: "bridal",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    slug: "accessories",
  },
  {
    id: "winter",
    name: "Winter Collection",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    slug: "winter-collection",
  },
]

interface CategoryCirclesProps {
  onCategorySelect?: (categorySlug: string) => void
}

export default function CategoryCircles({ onCategorySelect }: CategoryCirclesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  const handleCategoryClick = (category: any) => {
    console.log(`Navigate to: /category/${category.slug}`)
    // Call the callback function if provided
    if (onCategorySelect) {
      onCategorySelect(category.slug)
    }
    // Navigation is now handled by Next.js Link component
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 animate-fadeInScale">Shop by Category</h2>
          <p className="text-gray-600 animate-fadeInScale delay-200">
            Discover our premium fabric collections across different categories
          </p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 border border-gray-200"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 border border-gray-200"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </button>

          {/* Categories Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 md:space-x-8 overflow-x-auto scrollbar-hide px-8 md:px-10 py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, index) => (
              <Link
                href={`/category/${category.slug}`}
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="flex-shrink-0 text-center cursor-pointer group animate-fadeInScale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-4">
                  {category.isText ? (
                    // All Categories Circle with Text - Made Larger
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-gray-300 group-hover:border-black flex items-center justify-center bg-white group-hover:bg-black transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                      <span className="text-sm md:text-base font-semibold text-gray-700 group-hover:text-white transition-colors duration-300 text-center px-2">
                        All Categories
                      </span>
                    </div>
                  ) : (
                    // Image Categories - Made Larger
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-black transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl relative">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                      />
                      {/* Reduced darkness - changed from black/25 to black/10 and reduced hover opacity */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 group-hover:opacity-20 transition-all duration-300"></div>
                    </div>
                  )}

                  {/* Hover Effect Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gray-300 group-hover:scale-125 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                </div>

                <h3 className="text-sm md:text-base font-medium text-gray-700 group-hover:text-black transition-colors duration-300 group-hover:scale-105 transform">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease-out;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  )
}
