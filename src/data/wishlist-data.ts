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

export const initialWishlistItems: WishlistItem[] = [
  {
    id: "1",
    name: "Tulips Linen Fabric",
    price: 19.95,
    originalPrice: 24.95,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    brand: "Harris Tweed",
    inStock: true,
    slug: "tulips-linen-fabric",
  },
  {
    id: "2",
    name: "Bohem Velvet Fabric",
    price: 22.95,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    brand: "Opulent Velvets",
    inStock: true,
    slug: "bohem-velvet-fabric",
  },
  {
    id: "3",
    name: "Premium Silk Collection",
    price: 35.95,
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    brand: "Multyork",
    inStock: false,
    slug: "premium-silk-collection",
  },
  {
    id: "4",
    name: "Lafan Velvet Fabric",
    price: 22.95,
    originalPrice: 29.95,
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    brand: "Olivia Florence",
    inStock: true,
    slug: "lafan-velvet-fabric",
  },
  {
    id: "5",
    name: "Fawsley Herringbone Fabric",
    price: 29.95,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    brand: "Yarn Textiles",
    inStock: true,
    slug: "fawsley-herringbone-fabric",
  },
  {
    id: "6",
    name: "Winter Wool Fabric",
    price: 24.95,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    brand: "The Millshop Online",
    inStock: true,
    slug: "winter-wool-fabric",
  },
]
