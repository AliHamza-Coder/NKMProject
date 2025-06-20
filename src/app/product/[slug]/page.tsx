"use client"

import { useState, useEffect } from "react"
import { Heart, ShoppingCart, Share2, ChevronLeft } from "lucide-react"
import Breadcrumb from "@/components/breadcrumb"
import Link from "next/link"
import { useShop } from "@/context/ShopContext"
import { Product, products } from "@/data/products"
import { useParams } from "next/navigation"

export default function ProductDetail() {
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useShop()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [showShareTooltip, setShowShareTooltip] = useState(false)
  const params = useParams()
  
  useEffect(() => {
    // Get the slug from the URL params
    const slug = params?.slug as string
    
    if (slug) {
      // Find the product with the matching slug
      const foundProduct = products.find(p => p.slug === slug)
      setProduct(foundProduct || null)
    }
    
    setLoading(false)
  }, [params])
  
  // Show loading state while fetching product
  if (loading) {
    return <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">Loading...</div>
  }
  
  // Show error if product not found
  if (!product) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/category/all-categories" className="text-blue-600 hover:underline">
          Return to Products
        </Link>
      </div>
    )
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/category/all-categories" },
    { label: product.name, current: true },
  ]

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
    }
  }

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product)
    }
  }
  
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      // Get the current URL
      const currentUrl = window.location.href
      
      // Copy to clipboard
      navigator.clipboard.writeText(currentUrl)
        .then(() => {
          // Show tooltip
          setShowShareTooltip(true)
          
          // Hide tooltip after 2 seconds
          setTimeout(() => {
            setShowShareTooltip(false)
          }, 2000)
        })
        .catch(err => {
          console.error('Failed to copy URL: ', err)
        })
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back to products link */}
        <Link
          href="/category/all-categories"
          className="flex items-center text-gray-600 hover:text-black transition-all duration-300 hover:scale-105 transform group mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to products</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-black" : ""
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.brand}</p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-2xl lg:text-3xl font-semibold text-black">£{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">£{product.originalPrice}</span>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {product.features.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Suitability</h2>
              <div className="flex flex-wrap gap-2">
                {product.suitability.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Colors</h2>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Sizes</h2>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quantity Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  +
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isInCart(product.id)
                      ? "bg-gray-800 text-white"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{isInCart(product.id) ? "In Cart" : "Add to Cart"}</span>
                </button>

                <button
                  onClick={handleAddToWishlist}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isInWishlist(product.id)
                      ? "text-red-500 bg-red-50"
                      : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`}
                  />
                </button>

                <div className="relative">
                  <button 
                    onClick={handleShare}
                    className="p-2 text-gray-600 hover:text-black rounded-lg hover:bg-gray-100 transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  
                  {/* Copied tooltip */}
                  {showShareTooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded-md whitespace-nowrap">
                      Link copied!
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* You May Also Like Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 mt-8 mb-12">
        <h2 className="text-3xl font-bold text-center mb-10 relative">
          <span className="relative z-10">You May Also Like</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-yellow-400 opacity-70 rounded-full"></span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => p.id !== product.id).slice(0, 4).map((relatedProduct) => (
            <Link 
              href={`/product/${relatedProduct.slug}`} 
              key={relatedProduct.id}
              className="group transition-all duration-300 hover:shadow-lg rounded-lg p-3 hover:-translate-y-1"
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
              <p className="text-sm text-gray-600 mb-1">{relatedProduct.brand}</p>
              <p className="font-semibold text-black">£{relatedProduct.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}