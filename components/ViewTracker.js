"use client"

import { useEffect } from 'react'

export default function ViewTracker({ productId }) {
  useEffect(() => {
    if (!productId) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/view`, {
      method: 'POST',
    }).catch(() => {})
  }, [productId])

  return null
}
