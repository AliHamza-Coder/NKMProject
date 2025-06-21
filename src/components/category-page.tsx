"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart, ShoppingCart, Eye, X, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react"
import { products, type Product, categories, brands, suitabilityOptions } from "../data/products"
import Breadcrumb from "./breadcrumb"
import { useShop } from "@/context/ShopContext"
import { NKMLoader } from "./amazing-loader"
import { usePageLoading } from "@/hooks/use-loading"
import { useNavigationWithLoader } from "@/hooks/use-navigation"

interface CategoryPageProps {
  categorySlug?: string
  onProductSelect?: (productSlug: string) => void
}

export default function CategoryPage({ categorySlug = "all-categories", onProductSelect }: CategoryPageProps) {
  const { addToCart, toggleWishlist, isInCart, isInWishlist } = useShop()
  const { isLoading, stopLoading } = usePageLoading()
  const { navigateTo } = useNavigationWithLoader()

  // State for filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSuitability, setSelectedSuitability] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    brands: true,
    suitability: true,
  })

  // Simulate loading when component mounts or category changes
  useEffect(() => {
    const loadCategory = async () => {
      // Simulate API call or data loading
      await new Promise(resolve => setTimeout(resolve, 600))
      stopLoading()
    }
    
    loadCategory()
  }, [categorySlug, stopLoading])

  // Get category name
  const category = categories.find((c) => c.id === categorySlug) || categories[0]

  // Filter products based on category and other filters
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (selectedCategory !== "all-categories" && product.category !== selectedCategory) {
        return false
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false
      }

      // Suitability filter
      if (selectedSuitability.length > 0 && !product.suitability.some((s) => selectedSuitability.includes(s))) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort products
      switch (sortBy) {
        case "price-low-high":
          return a.price - b.price
        case "price-high-low":
          return b.price - a.price
        case "name-a-z":
          return a.name.localeCompare(b.name)
        case "name-z-a":
          return b.name.localeCompare(a.name)
        default:
          // Keep original order for relevance
          return 0
      }
    })

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    // In a real app, you might want to update the URL
    // window.history.pushState({}, '', `/category/${categoryId}`)
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: category.name, current: true },
  ]

  // Toggle filter section
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  // Handle product click
  const handleProductClick = (product: Product) => {
    console.log(`Navigate to: /product/${product.slug}`)
    if (onProductSelect) {
      onProductSelect(product.slug)
    } else {
      // Navigate to product detail page using slug with loader
      navigateTo(`/product/${product.slug}`)
    }
  }

  // Handle action buttons
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleQuickView = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    // Navigate to product detail page
    console.log(`Navigate to: /product/${product.slug}`)
    if (onProductSelect) {
      onProductSelect(product.slug)
    } else {
      // Navigate to product detail page using slug with loader
      navigateTo(`/product/${product.slug}`)
    }
  }

  const handleCompare = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`Add to compare: ${product.name}`)
  }

  const handleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  // Handle price range change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = Number.parseInt(e.target.value)
    const newRange = [...priceRange] as [number, number]
    newRange[index] = value
    setPriceRange(newRange)
  }

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    } else {
      setSelectedBrands([...selectedBrands, brand])
    }
  }

  // Toggle suitability selection
  const toggleSuitability = (suitability: string) => {
    if (selectedSuitability.includes(suitability)) {
      setSelectedSuitability(selectedSuitability.filter((s) => s !== suitability))
    } else {
      setSelectedSuitability([...selectedSuitability, suitability])
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 50])
    setSelectedBrands([])
    setSelectedSuitability([])
    setSelectedCategory("all-categories")
  }

  // Show loader while loading
  if (isLoading) {
    return <NKMLoader fullScreen={true} size="lg" />
  }

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center space-x-2 bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300"
          >
            {showFilters ? (
              <>
                <X className="w-4 h-4" />
                <span>Hide Filters</span>
              </>
            ) : (
              <>
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <span>Filters</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? "block" : "hidden"} lg:block animate-fadeInScale`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-black">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  Clear All
                </button>
              </div>

              {/* Categories Filter */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <div
                  className="flex items-center justify-between cursor-pointer mb-4"
                  onClick={() => toggleSection("categories")}
                >
                  <h3 className="font-medium text-gray-900">Categories</h3>
                  {expandedSections.categories ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </div>

                {expandedSections.categories && (
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat.id} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${cat.id}`}
                          name="category"
                          checked={selectedCategory === cat.id}
                          onChange={() => handleCategoryChange(cat.id)}
                          className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                        />
                        <label htmlFor={`category-${cat.id}`} className="ml-2 text-sm text-gray-600 cursor-pointer">
                          {cat.name} ({cat.count})
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <div
                  className="flex items-center justify-between cursor-pointer mb-4"
                  onClick={() => toggleSection("price")}
                >
                  <h3 className="font-medium text-gray-900">Price Range</h3>
                  {expandedSections.price ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </div>

                {expandedSections.price && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">£{priceRange[0]}</span>
                      <span className="text-sm text-gray-600">£{priceRange[1]}</span>
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max="50"
                          step="1"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(e, 0)}
                          className="w-full accent-black cursor-pointer"
                        />
                        <label className="text-xs text-gray-500">Min</label>
                      </div>

                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max="50"
                          step="1"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                          className="w-full accent-black cursor-pointer"
                        />
                        <label className="text-xs text-gray-500">Max</label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Brands Filter */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <div
                  className="flex items-center justify-between cursor-pointer mb-4"
                  onClick={() => toggleSection("brands")}
                >
                  <h3 className="font-medium text-gray-900">Brands</h3>
                  {expandedSections.brands ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </div>

                {expandedSections.brands && (
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`brand-${brand.id}`}
                          checked={selectedBrands.includes(brand.name)}
                          onChange={() => toggleBrand(brand.name)}
                          className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <label htmlFor={`brand-${brand.id}`} className="ml-2 text-sm text-gray-600 cursor-pointer">
                          {brand.name} ({brand.count})
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Suitability Filter */}
              <div className="mb-6">
                <div
                  className="flex items-center justify-between cursor-pointer mb-4"
                  onClick={() => toggleSection("suitability")}
                >
                  <h3 className="font-medium text-gray-900">Suitability</h3>
                  {expandedSections.suitability ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </div>

                {expandedSections.suitability && (
                  <div className="space-y-2">
                    {suitabilityOptions.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`suitability-${option.id}`}
                          checked={selectedSuitability.includes(option.name)}
                          onChange={() => toggleSuitability(option.name)}
                          className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <label
                          htmlFor={`suitability-${option.id}`}
                          className="ml-2 text-sm text-gray-600 cursor-pointer"
                        >
                          {option.name} ({option.count})
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Products Controls Bar - Items Count, View Toggle, Sort */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-gray-200">
              {/* Items Count */}
              <span className="text-gray-600 font-medium">{filteredProducts.length} items</span>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "grid" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  aria-label="Grid view"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "list" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  aria-label="List view"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="relevance">Best selling</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {filteredProducts.map((product, index) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="group cursor-pointer animate-fadeInScale"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-3 md:mb-4">
                          {/* Main Image */}
                          <img
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                          />

                          {/* Second Image on Hover */}
                          {product.images[1] && (
                            <img
                              src={product.images[1] || "/placeholder.svg"}
                              alt={product.name}
                              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                            />
                          )}

                          {/* Wishlist Button */}
                          <button
                            onClick={(e) => handleWishlist(e, product)}
                            className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 transform hover:bg-red-50"
                          >
                            <Heart 
                              className={`w-3 h-3 md:w-4 md:h-4 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'} hover:text-red-500 transition-colors duration-300`} 
                            />
                          </button>

                          {/* Action Buttons - Bottom Right */}
                          <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 flex flex-col space-y-1 md:space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            {/* Add to Cart */}
                            <button
                              onClick={(e) => handleAddToCart(e, product)}
                              className={`bg-white hover:bg-black hover:text-white rounded-full p-1.5 md:p-2 shadow-lg transition-all duration-300 hover:scale-110 transform group/btn ${isInCart(product.id) ? 'bg-black text-white' : ''}`}
                              title="Add to Cart"
                            >
                              <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 text-gray-600 group-hover/btn:text-white transition-colors duration-300" />
                            </button>

                            {/* Quick View */}
                            <button
                              onClick={(e) => handleQuickView(e, product)}
                              className="bg-white hover:bg-black hover:text-white rounded-full p-1.5 md:p-2 shadow-lg transition-all duration-300 hover:scale-110 transform group/btn"
                              title="Quick View"
                            >
                              <Eye className="w-3 h-3 md:w-4 md:h-4 text-gray-600 group-hover/btn:text-white transition-colors duration-300" />
                            </button>
                          </div>

                          {/* Sale Badge (if product has originalPrice) */}
                          {product.originalPrice && (
                            <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                              SALE
                            </div>
                          )}
                        </div>

                        <div className="space-y-1 md:space-y-2">
                          <h3 className="font-medium text-gray-900 group-hover:text-black transition-colors duration-300 group-hover:scale-105 transform text-sm md:text-base line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600">{product.brand}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm md:text-lg font-semibold text-black">£{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-xs md:text-sm text-gray-500 line-through">
                                  £{product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Color Swatches - Show on hover */}
                          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            {product.colors.slice(0, 3).map((color, colorIndex) => (
                              <div
                                key={colorIndex}
                                className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.toLowerCase() }}
                                title={color}
                              />
                            ))}
                            {product.colors.length > 3 && (
                              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300 bg-gray-200 flex items-center justify-center">
                                <span className="text-xs text-gray-600">+{product.colors.length - 3}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredProducts.map((product, index) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="group cursor-pointer animate-fadeInScale bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Product Image */}
                          <div className="relative md:w-1/4">
                            <div className="aspect-square overflow-hidden">
                              <img
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                              />
                            </div>

                            {/* Sale Badge */}
                            {product.originalPrice && (
                              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                SALE
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="p-4 md:p-6 md:w-3/4 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-gray-900 group-hover:text-black transition-colors duration-300 text-base md:text-lg mb-1">
                                    {product.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg font-semibold text-black">£{product.price}</span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through">£{product.originalPrice}</span>
                                  )}
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                              {/* Color Swatches */}
                              <div className="flex space-x-2 mb-4">
                                {product.colors.slice(0, 4).map((color, colorIndex) => (
                                  <div
                                    key={colorIndex}
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: color.toLowerCase() }}
                                    title={color}
                                  />
                                ))}
                                {product.colors.length > 4 && (
                                  <div className="w-4 h-4 rounded-full border border-gray-300 bg-gray-200 flex items-center justify-center">
                                    <span className="text-xs text-gray-600">+{product.colors.length - 4}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 transform flex items-center"
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </button>
                              <button
                                onClick={(e) => handleQuickView(e, product)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-110 transform"
                                title="Quick View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => handleWishlist(e, product)}
                                className="bg-gray-100 hover:bg-red-50 text-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-110 transform"
                                title="Add to Wishlist"
                              >
                                <Heart 
                                  className={`w-4 h-4 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'} hover:text-red-500 transition-colors duration-300`} 
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom range slider styling */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: #e5e7eb;
          border-radius: 4px;
          outline: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: #000;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #000;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  )
}
