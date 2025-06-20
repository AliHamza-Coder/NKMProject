export interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  inStock: boolean
  slug: string
}

export const initialWishlistItems: WishlistItem[] = []
