"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter Section with Unsplash Background */}
      <div
        className="relative bg-cover bg-center py-16 md:py-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in-scale">Subscribe to our newsletter and</h2>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-scale delay-200">receive exclusive offers every week</p>
          {mounted ? (
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-l-xl rounded-r-none bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-30 transition-all duration-300 hover:shadow-md"
              />
              <button className="bg-black text-white font-bold px-8 py-3 rounded-r-xl rounded-l-none transition-all duration-300 hover:bg-gray-800 hover:scale-105 transform">
                SUBSCRIBE
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2 sm:gap-0">
              <div className="flex-1 px-4 py-3 rounded-lg sm:rounded-r-none bg-white text-gray-900 border">
                Enter your email address
              </div>
              <div className="bg-black px-6 md:px-8 py-3 rounded-lg sm:rounded-l-none font-semibold text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform">
                SUBSCRIBE
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Shop Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <Link href="/">
                <img
                  src="/logo.jpg"
                  alt="NKM Fabrics"
                  className="h-16 md:h-20 w-auto hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe shopping is a right, not a luxury, so we strive to deliver the best products for the best
              prices.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              {/* Modern Simple Icons - Black & White Theme */}
              <Link
                href="/twitter"
                className="group text-gray-400 hover:text-black transition-all duration-300 transform hover:scale-125"
              >
                <div className="w-10 h-10 border-2 border-gray-300 group-hover:border-black rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:bg-black">
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </div>
              </Link>
              <Link
                href="/instagram"
                className="group text-gray-400 hover:text-black transition-all duration-300 transform hover:scale-125"
              >
                <div className="w-10 h-10 border-2 border-gray-300 group-hover:border-black rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:bg-black">
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </Link>
              <Link
                href="/linkedin"
                className="group text-gray-400 hover:text-black transition-all duration-300 transform hover:scale-125"
              >
                <div className="w-10 h-10 border-2 border-gray-300 group-hover:border-black rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:bg-black">
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
              </Link>
              <Link
                href="/facebook"
                className="group text-gray-400 hover:text-black transition-all duration-300 transform hover:scale-125"
              >
                <div className="w-10 h-10 border-2 border-gray-300 group-hover:border-black rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:bg-black">
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Shopping Online */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Shopping online</h3>
            <ul className="space-y-3">
              {["Order Status", "Shipping and Delivery", "Returns", "Payment Options", "Contact Us"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-600 hover:text-black transition-all duration-300 hover:translate-x-2 hover:scale-105 transform inline-block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Information</h3>
            <ul className="space-y-3">
              {["Gift Cards", "Find a Store", "Newsletter", "Become a member", "Site feedback"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-600 hover:text-black transition-all duration-300 hover:translate-x-2 hover:scale-105 transform inline-block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start group">
                <div className="w-8 h-8 border-2 border-gray-300 group-hover:border-black rounded-lg flex items-center justify-center mr-3 group-hover:bg-black transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 group-hover:text-black transition-colors duration-300">
                  store@nkmfabrics.com
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start group">
                <div className="w-8 h-8 border-2 border-gray-300 group-hover:border-black rounded-lg flex items-center justify-center mr-3 group-hover:bg-black transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 group-hover:text-black transition-colors duration-300">
                  Hotline: +92 300 0606664
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">© 2025 NKM Fabrics. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
