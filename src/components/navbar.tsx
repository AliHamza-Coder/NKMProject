"use client"

import { useState } from "react"
import { User, UserCheck, Search, ShoppingCart, Menu, X, Heart } from "lucide-react"
import { getActiveMarqueeMessages } from "../data/marquee-data"
import Link from "next/link"
import { useAuth } from "@/lib/services/auth-service"
import { useShop } from "@/context/ShopContext"

const megaMenuData = {
  "Upholstery Fabric": {
    "Fabric Types": ["Velvet Fabric", "Linen Fabric", "Cotton Fabric", "Silk Fabric"],
    "By Style": ["Modern", "Traditional", "Contemporary", "Vintage"],
    "By Color": ["Blue Fabric", "Green Fabric", "Red Fabric", "Neutral Tones"],
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  "Curtain Fabric": {
    "Fabric Types": ["Sheer Fabric", "Blackout Fabric", "Thermal Fabric", "Decorative Fabric"],
    "By Style": ["Elegant", "Casual", "Formal", "Minimalist"],
    "By Color": ["Light Colors", "Dark Colors", "Patterned", "Solid Colors"],
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  "By Brand": {
    "Premium Brands": ["Harris Tweed", "Multyork", "Olivia Florence", "Opulent Velvets"],
    "Popular Brands": ["The Millshop Online", "Yarn Textiles", "Designer Collection", "Luxury Line"],
    "New Brands": ["Artisan Fabrics", "Eco Textiles", "Modern Weave", "Classic Touch"],
    image:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  "By Style": {
    Modern: ["Contemporary", "Minimalist", "Scandinavian", "Industrial"],
    Traditional: ["Classic", "Vintage", "Antique", "Heritage"],
    Luxury: ["Premium", "Designer", "Exclusive", "High-End"],
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  "By Colour": {
    "Warm Colors": ["Red & Orange Fabric", "Yellow & Gold Fabric", "Pink & Mauve Fabric", "Brown & Beige Fabric"],
    "Cool Colors": ["Blue Fabric", "Green Fabric", "Purple & Wine Fabric", "Grey & Silver Fabric"],
    Neutrals: ["White & Cream", "Black Fabric", "Natural Fabric", "Multicoloured Fabric"],
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  "Made to Measure": {
    Services: ["Custom Curtains", "Bespoke Upholstery", "Tailored Blinds", "Personal Consultation"],
    Process: ["Measurement", "Design", "Creation", "Installation"],
    Options: ["Fabric Selection", "Style Choice", "Size Customization", "Finishing Details"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
}

interface NavbarProps {
  onHomeClick?: () => void
  onAccountClick?: () => void
  onCartClick?: () => void
  onWishlistClick?: () => void
  onSearchClick?: () => void
}

export default function Navbar({
  onHomeClick,
  onAccountClick,
  onCartClick,
  onWishlistClick,
  onSearchClick,
}: NavbarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuHovered, setMegaMenuHovered] = useState(false)
  const { isAuthenticated } = useAuth()
  const { cart, wishlist } = useShop()

  // Get marquee messages from JSON data
  const marqueeText = getActiveMarqueeMessages()

  // Helper functions for mega menu hover behavior
  const handleMouseEnter = (item: string) => {
    setHoveredItem(item)
    setMegaMenuHovered(true)
  }

  const handleMouseLeave = () => {
    setMegaMenuHovered(false)
    setHoveredItem(null)
  }

  // Handle clicks on nav items to maintain active state
  const handleNavItemClick = (item: string) => {
    setActiveItem(item)
  }

  // Handle clicks inside mega menu to maintain active state
  const handleMegaMenuClick = () => {
    if (hoveredItem) {
      setActiveItem(hoveredItem)
    }
  }

  // Reset active state when navigating to non-category pages
  const resetActiveState = () => {
    setActiveItem(null)
  }

  return (
    <div className="w-full relative">
      {/* Top Banner with Improved Marquee */}
      <div className="bg-black text-white py-2 text-xs md:text-sm overflow-hidden relative">
        <div className="marquee-wrapper">
          <div className="marquee-content">
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200 relative z-50">
        {/* Left side - Hamburger for mobile */}
        <div className="flex-1 flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300 hover:scale-110 transform"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Center Logo - Made Clickable with Next.js Link */}
        <div className="flex-1 flex justify-center">
          <Link href="/"
            onClick={resetActiveState}
            className="hover:scale-105 transition-transform duration-300 focus:outline-none"
          >
            <img src="/logo.jpg" alt="NKM Fabrics" className="h-20 md:h-24 w-auto object-contain" />
          </Link>
        </div>

        {/* Right side icons */}
        <div className="flex-1 flex justify-end items-center space-x-3 md:space-x-4">
          <Link href="/search"
            onClick={resetActiveState}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110 transform group"
          >
            <Search className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-300" />
          </Link>

          <Link href="/wishlist"
            onClick={resetActiveState}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110 transform group relative"
          >
            <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {wishlist.length}
            </span>
          </Link>

          <Link href="/account"
            onClick={resetActiveState}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110 transform group"
          >
            {isAuthenticated ? (
              <UserCheck className="w-5 h-5 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
            ) : (
              <User className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-300" />
            )}
          </Link>

          <Link href="/cart"
            onClick={resetActiveState}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110 transform group relative"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-300" />
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)}
            </span>
          </Link>
        </div>
      </div>

      {/* Desktop Navigation Menu with Enhanced Hover Effects */}
      <div className="hidden lg:block relative">
        {/* Single hover area that encompasses both nav and mega menu */}
        <div 
          className="relative"
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Bar */}
          <div className="bg-white px-2 md:px-4 py-3 border-b border-gray-100 relative z-40">
            <nav className="flex items-center justify-center space-x-2 md:space-x-8">
              {Object.keys(megaMenuData).map((item) => {
                const typedItem = item as keyof typeof megaMenuData;
                // Show active state for: hovered item OR (clicked item if nothing is hovered)
                const isActive = hoveredItem === typedItem || (hoveredItem === null && activeItem === typedItem);
                return (
                  <div
                    key={item}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(typedItem)}
                  >
                    <Link
                      href={`/category/${encodeURIComponent(item.toLowerCase().replace(/ /g, '-'))}`}
                      onClick={() => handleNavItemClick(typedItem)}
                      className={`text-sm font-medium transition-all duration-300 px-2 py-3 block relative ${
                        isActive
                          ? "text-red-400"
                          : "text-gray-700 hover:text-red-400"
                      }`}
                    >
                      {item}
                      {/* Bottom line animation */}
                      <span 
                        className={`absolute bottom-0 left-0 h-0.5 bg-red-400 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </Link>
                  </div>
                )
              })}
              <div 
                className="relative group"
                onMouseEnter={() => setHoveredItem("Sale")}
              >
                <Link
                  href="/sale"
                  onClick={() => handleNavItemClick("Sale")}
                  className={`text-sm font-medium transition-all duration-300 whitespace-nowrap inline-block relative px-2 py-3 ${
                    hoveredItem === "Sale" || (hoveredItem === null && activeItem === "Sale")
                      ? "text-red-400"
                      : "text-red-400 hover:text-red-500"
                  }`}
                >
                  Sale
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                      hoveredItem === "Sale" || (hoveredItem === null && activeItem === "Sale") ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Mega Menu - positioned within the same hover area */}
          {hoveredItem && megaMenuData[hoveredItem as keyof typeof megaMenuData] && (
            <div 
              className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-[9999] animate-fadeInScale"
              onClick={handleMegaMenuClick}
            >
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-4 gap-8">
                  {/* Categories - 3 columns */}
                  <div className="col-span-3 grid grid-cols-3 gap-8">
                    {Object.entries(megaMenuData[hoveredItem as keyof typeof megaMenuData]).map(([category, items]) => {
                      if (category === "image") return null
                      return (
                        <div key={category} className="animate-slideInUp">
                          <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wider hover:text-red-400 transition-colors duration-300 border-b border-gray-200 pb-2">
                            {category}
                          </h3>
                          <ul className="space-y-2">
                            {Array.isArray(items) &&
                              items.map((subItem) => (
                                <li key={subItem}>
                                  <Link
                                    href={`/category/${encodeURIComponent(hoveredItem.toLowerCase().replace(/ /g, '-'))}/${encodeURIComponent(subItem.toLowerCase().replace(/ /g, '-'))}`}
                                    onClick={handleMegaMenuClick}
                                    className="text-sm text-gray-600 hover:text-red-400 hover:translate-x-1 transform transition-all duration-300 inline-block"
                                  >
                                    {subItem}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>

                  {/* Image Section - 1 column */}
                  <div className="col-span-1 animate-slideInUp delay-200">
                    <div className="relative group">
                      <img
                        src={megaMenuData[hoveredItem as keyof typeof megaMenuData].image || "/placeholder.svg"}
                        alt={hoveredItem}
                        className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Default opacity overlay with modern Tailwind syntax */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300 rounded-lg"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white font-semibold text-lg mb-2 opacity-100 transition-opacity duration-300 transform translate-y-0 group-hover:translate-y-0">
                          {hoveredItem}
                        </h4>
                        <Link 
                          href={`/category/${encodeURIComponent(hoveredItem.toLowerCase().replace(/ /g, '-'))}`} 
                          onClick={handleMegaMenuClick}
                          className="bg-white text-black px-4 py-2 rounded-lg font-medium opacity-100 transition-all duration-300 transform translate-y-0 group-hover:translate-y-0 hover:bg-gray-100 inline-block"
                        >
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-50 animate-slideDown">
          <div className="px-4 py-6">
            {Object.keys(megaMenuData).map((item) => (
              <div key={item} className="mb-4">
                <Link
                  href={`/category/${encodeURIComponent(item.toLowerCase().replace(/ /g, '-'))}`}
                  onClick={() => {
                    handleNavItemClick(item)
                    setMobileMenuOpen(false)
                  }}
                  className={`block text-lg font-medium py-2 transition-colors duration-300 ${
                    item === "Sale" ? "text-red-400" : "text-gray-700 hover:text-black"
                  }`}
                >
                  {item}
                </Link>
                {megaMenuData[item as keyof typeof megaMenuData] && (
                  <div className="ml-4 mt-2">
                    {Object.entries(megaMenuData[item as keyof typeof megaMenuData]).map(([category, items]) => {
                      if (category === "image") return null
                      return (
                        <div key={category} className="mb-3">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">{category}</h4>
                          <div className="ml-2">
                            {Array.isArray(items) &&
                              items.map((subItem) => (
                                <Link
                                  key={subItem}
                                  href={`/category/${encodeURIComponent(item.toLowerCase().replace(/ /g, '-'))}/${encodeURIComponent(subItem.toLowerCase().replace(/ /g, '-'))}`}
                                  onClick={() => {
                                    handleNavItemClick(item)
                                    setMobileMenuOpen(false)
                                  }}
                                  className="block text-sm text-gray-600 hover:text-black py-1 transition-colors duration-300"
                                >
                                  {subItem}
                                </Link>
                              ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
            <Link 
              href="/sale" 
              onClick={() => {
                handleNavItemClick("Sale")
                setMobileMenuOpen(false)
              }}
              className="block text-lg font-medium text-red-400 py-2"
            >
              Sale
            </Link>
          </div>
        </div>
      )}



      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.4s ease-out;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }

        /* Improved Marquee Animation */
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
        }

        .marquee-content {
          display: inline-block;
          animation: marquee 40s linear infinite;
          will-change: transform;
        }

        .marquee-text {
          display: inline-block;
          padding-right: 2rem;
          white-space: nowrap;
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        /* Responsive marquee speed */
        @media (max-width: 768px) {
          .marquee-content {
            animation-duration: 30s;
          }
        }
      `}</style>
    </div>
  )
}
