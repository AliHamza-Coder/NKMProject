"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, User, Mail, Lock, LogOut, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { loginUser, signupUser, logoutUser, loginWithGoogle, useAuth } from "@/lib/services/auth-service"
import { useSession } from "next-auth/react"

interface AccountPageProps {
  onGoBack?: () => void
}

export default function AccountPage({ onGoBack }: AccountPageProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  
  // Use null as initial state to prevent hydration mismatch
  const [activeTab, setActiveTab] = useState<"login" | "signup" | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isGoogleOAuthError, setIsGoogleOAuthError] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
  })
  
  // Set initial state after component mounts to prevent hydration mismatch
  useEffect(() => {
    setActiveTab("login")
    setIsMounted(true)
  }, [])

  // Auto-hide Google OAuth error after 10 seconds
  useEffect(() => {
    if (isGoogleOAuthError) {
      const timer = setTimeout(() => {
        setError(null)
        setIsGoogleOAuthError(false)
      }, 10000) // 10 seconds

      return () => clearTimeout(timer)
    }
  }, [isGoogleOAuthError])

  const handleCloseError = () => {
    setError(null)
    setIsGoogleOAuthError(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setIsGoogleOAuthError(false)
    
    try {
      const result = await loginUser({
        email: formData.email,
        password: formData.password
      })
      
      if (result.success) {
        setSuccess("Login successful!")
        
        // Redirect to home page after successful login
        setTimeout(() => {
          router.push('/')
        }, 1500)
      } else {
        const errorMessage = result.error || "Login failed. Please try again."
        setError(errorMessage)
        
        // Check if this is a Google OAuth error
        if (errorMessage.includes("created using Google")) {
          setIsGoogleOAuthError(true)
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Login error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const result = await signupUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        address: formData.address
      })
      
      if (result.success) {
        setSuccess("Account created successfully! You can now log in.")
        setActiveTab("login")
        setFormData({
          ...formData,
          password: ""
        })
      } else {
        setError(result.error || "Signup failed. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Signup error:", err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await loginWithGoogle()
    } catch (err) {
      setError("Google login failed. Please try again.")
      console.error("Google login error:", err)
      setLoading(false)
    }
  }
  
  const handleLogout = async () => {
    setLoading(true)
    try {
      await logoutUser()
      setSuccess("You have been logged out successfully.")
    } catch (err) {
      setError("Logout failed. Please try again.")
      console.error("Logout error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Account Section - Full Width */}
        <div className={isMounted ? "animate-fadeInScale" : "opacity-0"}>
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <User className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-black mb-1 md:mb-2">Welcome to NKM Fabrics</h1>
            {!isAuthenticated && (
              <p className="text-sm md:text-base text-gray-600">Sign in to your account or create a new one</p>
            )}
            {isAuthenticated && user && (
              <p className="text-sm md:text-base text-gray-600">
                Welcome back, {user.firstName} {user.lastName}
              </p>
            )}
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="max-w-xl mx-auto mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative">
              {/* Close Button */}
              <button
                onClick={handleCloseError}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors duration-200"
                aria-label="Close error message"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="pr-6">
                <p className="mb-2">{error}</p>
                {isGoogleOAuthError && (
                  <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                    <button
                      onClick={handleGoogleLogin}
                      disabled={loading}
                      className={`inline-flex items-center justify-center bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-sm font-medium ${
                        loading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      {loading ? 'Signing in...' : 'Sign in with Google'}
                    </button>
                    <span className="text-xs text-red-500 opacity-75">
                      This message will auto-hide in 10 seconds
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {success && (
            <div className="max-w-xl mx-auto mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          {/* User Profile when logged in */}
          {isMounted && isAuthenticated && user && (
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Your Profile</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">First Name</p>
                    <p className="font-medium">{user.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Name</p>
                    <p className="font-medium">{user.lastName}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                
                {user.address && (
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{user.address}</p>
                  </div>
                )}
                
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className={`mt-4 inline-flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>{loading ? 'Logging out...' : 'Logout'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab Navigation when not logged in */}
          {isMounted && !isAuthenticated && (
            <div className="max-w-md mx-auto flex bg-gray-100 rounded-lg p-1 mb-6 md:mb-8">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2 px-3 md:px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === "login" ? "bg-white text-black shadow-sm" : "text-gray-600 hover:text-black"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-2 px-3 md:px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === "signup" ? "bg-white text-black shadow-sm" : "text-gray-600 hover:text-black"
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Login Form */}
          {isMounted && !isAuthenticated && activeTab === "login" && (
            <form onSubmit={handleLogin} className="max-w-xl mx-auto space-y-4 md:space-y-6 px-2 sm:px-0">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 text-sm md:text-base"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-9 md:pl-10 pr-10 md:pr-12 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 text-sm md:text-base"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" />
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-xs sm:text-sm text-black hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className={`w-full bg-black text-white py-2.5 md:py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform hover:shadow-lg text-sm md:text-base mt-2 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {isMounted && !isAuthenticated && activeTab === "signup" && (
            <form onSubmit={handleSignup} className="max-w-xl mx-auto space-y-4 md:space-y-6 px-2 sm:px-0">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 text-sm md:text-base"
                    placeholder="First name"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 text-sm md:text-base"
                    placeholder="Last name"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 text-sm md:text-base"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-9 md:pl-10 pr-10 md:pr-12 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 text-sm md:text-base"
                    placeholder="Create password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Address (Optional)</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 text-sm md:text-base"
                  placeholder="Your address"
                  rows={3}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black mt-0.5"
                    required
                    disabled={loading}
                  />
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-black hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-black hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className={`w-full bg-black text-white py-2.5 md:py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform hover:shadow-lg text-sm md:text-base mt-2 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Social Login */}
          {isMounted && !isAuthenticated && (
            <div className="mt-6 md:mt-8 max-w-md mx-auto px-2 sm:px-0">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 md:mt-6">
                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full inline-flex justify-center items-center py-2.5 md:py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:scale-105 transform hover:shadow-lg"
                  disabled={loading}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-2">{loading ? 'Connecting...' : 'Continue with Google'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
