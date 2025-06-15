export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  brand: string
  suitability: string[]
  images: string[]
  description: string
  features: string[]
  colors: string[]
  sizes: string[]
  inStock: boolean
  slug: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Tulips Linen Fabric",
    price: 19.95,
    originalPrice: 24.95,
    category: "unstitched",
    brand: "Harris Tweed",
    suitability: ["Curtains", "Upholstery"],
    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Beautiful tulip pattern linen fabric perfect for home decor and fashion projects.",
    features: ["100% Pure Linen", "Machine Washable", "Fade Resistant", "Premium Quality"],
    colors: ["Orange", "Green", "Blue"],
    sizes: ["1 Meter", "2 Meters", "5 Meters"],
    inStock: true,
    slug: "tulips-linen-fabric",
  },
  {
    id: "2",
    name: "Bohem Velvet Fabric",
    price: 22.95,
    category: "ready-to-wear",
    brand: "Opulent Velvets",
    suitability: ["Upholstery", "Curtains"],
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Luxurious bohemian velvet fabric with intricate patterns and rich texture.",
    features: ["Premium Velvet", "Rich Texture", "Durable", "Easy Care"],
    colors: ["Teal", "Navy", "Burgundy"],
    sizes: ["1 Meter", "2 Meters", "5 Meters"],
    inStock: true,
    slug: "bohem-velvet-fabric",
  },
  {
    id: "3",
    name: "Lafan Velvet Fabric",
    price: 22.95,
    originalPrice: 29.95,
    category: "formal",
    brand: "Olivia Florence",
    suitability: ["Upholstery", "Roman Blinds"],
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Elegant velvet fabric with sophisticated patterns perfect for formal wear.",
    features: ["Luxury Velvet", "Elegant Design", "Premium Quality", "Versatile Use"],
    colors: ["Green", "Gold", "Silver"],
    sizes: ["1 Meter", "2 Meters", "5 Meters"],
    inStock: true,
    slug: "lafan-velvet-fabric",
  },
  {
    id: "4",
    name: "Fawsley Herringbone Fabric",
    price: 29.95,
    category: "bridal",
    brand: "Yarn Textiles",
    suitability: ["Curtains", "Light Use"],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Classic herringbone pattern fabric ideal for bridal and formal occasions.",
    features: ["Herringbone Weave", "Classic Pattern", "High Quality", "Elegant Finish"],
    colors: ["Beige", "Cream", "Ivory"],
    sizes: ["1 Meter", "2 Meters", "5 Meters"],
    inStock: true,
    slug: "fawsley-herringbone-fabric",
  },
  {
    id: "5",
    name: "Premium Silk Collection",
    price: 35.95,
    category: "accessories",
    brand: "Multyork",
    suitability: ["Light Use", "Curtains"],
    images: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Exquisite silk fabric collection with premium quality and elegant finish.",
    features: ["100% Pure Silk", "Luxurious Feel", "Premium Quality", "Elegant Drape"],
    colors: ["Pink", "Blue", "White"],
    sizes: ["1 Meter", "2 Meters", "5 Meters"],
    inStock: true,
    slug: "premium-silk-collection",
  },
  {
    id: "6",
    name: "Winter Wool Fabric",
    price: 24.95,
    category: "winter-collection",
    brand: "The Millshop Online",
    suitability: ["Upholstery", "Roman Blinds"],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    description: "Warm and cozy wool fabric perfect for winter clothing and home decor.",
    features: ["100% Wool", "Warm & Cozy", "Durable", "Natural Fiber"],
    colors: ["Brown", "Gray", "Black"],
    sizes: ["1 Meter", "2 Meters", "5 Meters"],
    inStock: true,
    slug: "winter-wool-fabric",
  },
]

export const categories = [
  { id: "all-categories", name: "All Categories", count: products.length },
  { id: "unstitched", name: "Unstitched", count: products.filter((p) => p.category === "unstitched").length },
  { id: "ready-to-wear", name: "Ready to Wear", count: products.filter((p) => p.category === "ready-to-wear").length },
  { id: "formal", name: "Formal", count: products.filter((p) => p.category === "formal").length },
  { id: "bridal", name: "Bridal", count: products.filter((p) => p.category === "bridal").length },
  { id: "accessories", name: "Accessories", count: products.filter((p) => p.category === "accessories").length },
  {
    id: "winter-collection",
    name: "Winter Collection",
    count: products.filter((p) => p.category === "winter-collection").length,
  },
]

export const brands = [
  { id: "harris-tweed", name: "Harris Tweed", count: 5 },
  { id: "multyork", name: "Multyork", count: 9 },
  { id: "olivia-florence", name: "Olivia Florence", count: 112 },
  { id: "opulent-velvets", name: "Opulent Velvets", count: 67 },
  { id: "the-millshop-online", name: "The Millshop Online", count: 391 },
  { id: "yarn-textiles", name: "Yarn Textiles", count: 97 },
]

export const suitabilityOptions = [
  { id: "roman-blinds", name: "Roman Blinds", count: 664 },
  { id: "upholstery", name: "Upholstery", count: 347 },
  { id: "curtains", name: "Curtains", count: 735 },
  { id: "light-use", name: "Light Use", count: 55 },
]
