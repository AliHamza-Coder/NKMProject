"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { WishlistItem } from '@/data/wishlist-data';
import { toastSuccess, toastError, toastInfo } from '@/hooks/use-toast';

interface CartItem extends Product {
  quantity: number;
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  brand: string;
  inStock: boolean;
  slug: string;
  color: string;
  size: string;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (product: Product, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  increaseCartQuantity: (productId: string, color?: string, size?: string) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: (showToast?: boolean) => void;
  clearWishlist: () => void;
  isInCart: (productId: string, color?: string, size?: string) => boolean;
  isInWishlist: (productId: string) => boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, color?: string, size?: string) => {
    const selectedColor = color || product.colors[0];
    const selectedSize = size || product.sizes[0];
    const cartItemId = `${product.id}-${selectedColor}-${selectedSize}`;
    
    const existingItem = cart.find(item => 
      item.id === product.id && item.color === selectedColor && item.size === selectedSize
    );
    
    if (existingItem) {
      // Don't update quantity, just show message that it's already in cart
      setTimeout(() => toastInfo(`${product.name} (${selectedColor}, ${selectedSize}) is already in cart`), 0);
    } else {
      setCart(prevCart => [...prevCart, { 
        ...product, 
        quantity: 1, 
        color: selectedColor, 
        size: selectedSize 
      }]);
      setTimeout(() => toastSuccess(`${product.name} (${selectedColor}, ${selectedSize}) added to cart`), 0);
    }
  };

  const removeFromCart = (productId: string, color?: string, size?: string) => {
    const item = cart.find(item => 
      item.id === productId && 
      (color ? item.color === color : true) && 
      (size ? item.size === size : true)
    );
    setCart(prevCart => prevCart.filter(item => 
      !(item.id === productId && 
        (color ? item.color === color : true) && 
        (size ? item.size === size : true))
    ));
    if (item) {
      setTimeout(() => toastSuccess(`${item.name} (${item.color}, ${item.size}) removed from cart`), 0);
    }
  };

  const updateCartItemQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    if (quantity < 1) {
      removeFromCart(productId, color, size);
      return;
    }
    const item = cart.find(item => 
      item.id === productId && 
      (color ? item.color === color : true) && 
      (size ? item.size === size : true)
    );
    setCart(prevCart => prevCart.map(cartItem =>
      cartItem.id === productId && 
      (color ? cartItem.color === color : true) && 
      (size ? cartItem.size === size : true)
        ? { ...cartItem, quantity: Math.max(1, quantity) }
        : cartItem
    ));
    if (item) {
      setTimeout(() => toastInfo(`${item.name} (${item.color}, ${item.size}) quantity updated`), 0);
    }
  };

  const increaseCartQuantity = (productId: string, color?: string, size?: string) => {
    const item = cart.find(item => 
      item.id === productId && 
      (color ? item.color === color : true) && 
      (size ? item.size === size : true)
    );
    if (item) {
      setCart(prevCart => prevCart.map(cartItem =>
        cartItem.id === productId && 
        (color ? cartItem.color === color : true) && 
        (size ? cartItem.size === size : true)
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
      setTimeout(() => toastInfo(`${item.name} (${item.color}, ${item.size}) quantity updated in cart`), 0);
    }
  };

  const addToWishlist = (product: Product, showToast: boolean = true) => {
    const isAlreadyInWishlist = wishlist.some(item => item.id === product.id);
    
    if (isAlreadyInWishlist) {
      // If already in wishlist, remove it instead of showing "already in wishlist"
      removeFromWishlist(product.id, showToast);
      return;
    }

    setWishlist(prevWishlist => [
      ...prevWishlist,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        brand: product.brand,
        inStock: product.inStock,
        slug: product.slug
      }
    ]);

    if (showToast) {
      setTimeout(() => toastSuccess(`${product.name} added to wishlist`), 0);
    }
  };

  const removeFromWishlist = (productId: string, showToast: boolean = true) => {
    const item = wishlist.find(item => item.id === productId);
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
    if (showToast && item) {
      setTimeout(() => toastSuccess(`${item.name} removed from wishlist`), 0);
    }
  };

  const toggleWishlist = (product: Product) => {
    // Just use addToWishlist since it now handles the toggle logic
    addToWishlist(product, true);
  };

  const clearCart = (showToast: boolean = true) => {
    setCart([]);
    if (showToast) {
      setTimeout(() => toastSuccess('Cart cleared'), 0);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    setTimeout(() => toastSuccess('Wishlist cleared'), 0);
  };

  const isInCart = (productId: string, color?: string, size?: string) => {
    return cart.some(item => 
      item.id === productId && 
      (color ? item.color === color : true) && 
      (size ? item.size === size : true)
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <ShopContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      increaseCartQuantity,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearCart,
      clearWishlist,
      isInCart,
      isInWishlist
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
} 