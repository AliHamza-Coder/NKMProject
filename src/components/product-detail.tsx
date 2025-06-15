"use client"

import { useState } from "react"
import { Heart, Minus, Plus, ShoppingCart, Eye } from "lucide-react"
import { products } from "../data/products"
import Breadcrumb from "./breadcrumb"

interface ProductDetailProps {
  productSlug?: string
  onGoBack?: () => void
}

export default function ProductDetail({ productSlug = "tulips-linen-fabric", onGoBack }: ProductDetailProps) {
  const product = products.find((p) => p.slug === productSlug) || products[0]
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)

  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  const breadcrumbItems = [
    { label: "Products", href: "/category/all-categories" },
    { label: product.name, current: true },
  ]

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      product: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb items={breadcrumbItems} />

      {/* Go Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <button
          onClick={() => {
            console.log("Go back to previous page")
            // In a real app, you would use router.back() or handle navigation
            if (onGoBack) {
              onGoBack()
            } else {
              window.history.back()
            }
          }}
          className="flex items-center text-gray-600 hover:text-black transition-all duration-300 hover:scale-105 transform group mb-4"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                    selectedImage === index ? "border-black" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2 animate-fadeInScale">{product.name}</h1>
              <p className="text-lg text-gray-600 animate-fadeInScale delay-100">£{product.price} GBP</p>
              <p className="text-sm text-gray-500 mt-1 animate-fadeInScale delay-200">
                DESIGNER: <span className="font-medium">{product.brand}</span>
              </p>
            </div>

            {/* Color Selection */}
            <div className="animate-fadeInScale delay-300">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                COLOUR: <span className="font-normal">{selectedColor}</span>
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                      selectedColor === color ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="animate-fadeInScale delay-400">
              <h3 className="text-sm font-medium text-gray-900 mb-3">SIZE</h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 animate-fadeInScale delay-500">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors duration-300"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors duration-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform"
              >
                ADD TO CART
              </button>

              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 transform">
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors duration-300" />
              </button>
            </div>

            {/* Product Description */}
            <div className="animate-fadeInScale delay-600">
              <h3 className="text-sm font-medium text-gray-900 mb-3">DESCRIPTION</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>

              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Share This */}
            <div className="animate-fadeInScale delay-700">
              <h3 className="text-sm font-medium text-gray-900 mb-3">SHARE THIS</h3>
              <div className="flex space-x-3">
                {["Facebook", "Twitter", "Pinterest"].map((platform) => (
                  <button
                    key={platform}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 hover:scale-110 transform"
                  >
                    <span className="text-xs font-bold text-gray-600">{platform[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 animate-fadeInScale">Matching with</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  className="group cursor-pointer animate-fadeInScale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => window.location.href = `/product/${relatedProduct.slug}`}
                >
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                    <img
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-black transition-colors duration-300">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-sm text-gray-600">{relatedProduct.brand}</p>
                  <p className="font-semibold text-black">£{relatedProduct.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* You May Also Like */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 animate-fadeInScale">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.id !== product.id).slice(0, 4).map((suggestedProduct, index) => (
              <div
                key={suggestedProduct.id}
                onClick={() => window.location.href = `/product/${suggestedProduct.slug}`}
                className="group cursor-pointer animate-fadeInScale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-3 md:mb-4">
                  {/* Main Image */}
                  <img
                    src={suggestedProduct.images[0] || "/placeholder.svg"}
                    alt={suggestedProduct.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />

                  {/* Second Image on Hover */}
                  {suggestedProduct.images[1] && (
                    <img
                      src={suggestedProduct.images[1] || "/placeholder.svg"}
                      alt={suggestedProduct.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                    />
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Add to wishlist: ${suggestedProduct.name}`);
                    }}
                    className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 transform hover:bg-red-50"
                  >
                    <Heart className="w-3 h-3 md:w-4 md:h-4 text-gray-600 hover:text-red-500 transition-colors duration-300" />
                  </button>

                  {/* Action Buttons - Bottom Right */}
                  <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 flex flex-col space-y-1 md:space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {/* Add to Cart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Add to cart: ${suggestedProduct.name}`);
                      }}
                      className="bg-white hover:bg-black hover:text-white rounded-full p-1.5 md:p-2 shadow-lg transition-all duration-300 hover:scale-110 transform group/btn"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 text-gray-600 group-hover/btn:text-white transition-colors duration-300" />
                    </button>

                    {/* Quick View */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Quick view: ${suggestedProduct.name}`);
                      }}
                      className="bg-white hover:bg-blue-500 hover:text-white rounded-full p-1.5 md:p-2 shadow-lg transition-all duration-300 hover:scale-110 transform group/btn"
                      title="Quick View"
                    >
                      <Eye className="w-3 h-3 md:w-4 md:h-4 text-gray-600 group-hover/btn:text-white transition-colors duration-300" />
                    </button>


                  </div>

                  {/* Sale Badge (if product has originalPrice) */}
                  {suggestedProduct.originalPrice && (
                    <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                </div>

                <div className="space-y-1 md:space-y-2">
                  <h3 className="font-medium text-gray-900 group-hover:text-black transition-colors duration-300 group-hover:scale-105 transform text-sm md:text-base line-clamp-2">
                    {suggestedProduct.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">{suggestedProduct.brand}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm md:text-lg font-semibold text-black">£{suggestedProduct.price}</span>
                      {suggestedProduct.originalPrice && (
                        <span className="text-xs md:text-sm text-gray-500 line-through">£{suggestedProduct.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Color Swatches - Show on hover */}
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {suggestedProduct.colors.slice(0, 3).map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                    {suggestedProduct.colors.length > 3 && (
                      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300 bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{suggestedProduct.colors.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
          animation: fadeInScale 0.8s ease-out;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
