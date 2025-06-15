"use client"

import { useParams } from "next/navigation"
import ProductDetail from "@/components/product-detail"

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  return <ProductDetail productSlug={slug} />
}