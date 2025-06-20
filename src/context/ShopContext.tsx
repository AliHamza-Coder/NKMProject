"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { WishlistItem } from '@/data/wishlist-data';
import toast from 'react-hot-toast';

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
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearCart: () => void;
  clearWishlist: () => void;
  isInCart: (productId: string) => boolean;
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

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast.success('Item added to cart');
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.success('Item removed from cart');
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prevCart => prevCart.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ));
    toast.success('Cart updated');
  };

  const addToWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.some(item => item.id === product.id)) {
        toast.error('Item already in wishlist');
        return prevWishlist;
      }
      return [
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
      ];
    });
    toast.success('Item added to wishlist');
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
    toast.success('Item removed from wishlist');
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.success('Wishlist cleared');
  };

  const isInCart = (productId: string) => {
    return cart.some(item => item.id === productId);
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
      addToWishlist,
      removeFromWishlist,
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