"use client"

import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

export default function Recommendations({ productId }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!productId) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/recommendations?product_id=${productId}`)
      .then((r) => r.json())
      .then((d) => setItems(d.products || []))
      .catch(() => setItems([]))
  }, [productId])

  if (!items || items.length === 0) return null

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">You may also like</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
