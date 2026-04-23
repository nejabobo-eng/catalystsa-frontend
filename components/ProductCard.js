"use client"

import { useState } from 'react'
import Link from 'next/link'
import { addToCart } from '../lib/cart'
import { optimizeImage } from '../lib/image'

export default function ProductCard({ product, featured = false }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const inStock = product.stock > 0

  function handleAddToCart(e) {
    // Prevent Link navigation when clicking Add to Cart
    if (e && e.stopPropagation) e.stopPropagation()
    addToCart(product)
    alert(`✅ ${product.name} added to cart!`)
  }

  const placeholderImage = '/no-image.svg'
  const rawImage = (product.image_url && !imageError) ? product.image_url : placeholderImage
  const displayImage = optimizeImage(rawImage, 400)

  return (
    <Link href={`/product/${product.id}`} className="no-underline">
      <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border overflow-hidden group ${
        featured ? 'border-orange-300 ring-2 ring-orange-100' : 'border-gray-100'
      }`}>
      {/* Image Section with Enhanced Styling */}
      <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        )}

        <img
          src={displayImage || '/no-image.svg'}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageError(true)
            setImageLoading(false)
          }}
        />

        {featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              ⭐ Featured
            </span>
          </div>
        )}

        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold text-lg px-4 py-2 bg-red-600 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}

        {inStock && product.stock <= 5 && (
          <div className="absolute top-3 right-3">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Only {product.stock} left!
            </span>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description || 'Quality product available now'}
        </p>

        {/* Product-Level Trust Signals */}
        {inStock && (
          <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <span className="text-green-500">✓</span> In stock
            </span>
            <span className="text-gray-400">·</span>
            <span className="flex items-center gap-1">
              <span>🚚</span> Delivery 2-5 days
            </span>
          </div>
        )}

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-green-600">
              {product.price_display || `R${(product.price / 100).toFixed(2)}`}
            </span>
          </div>

          <button
            onClick={(e) => handleAddToCart(e)}
            disabled={!inStock}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:shadow-none"
          >
            {inStock ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
      </div>
    </Link>
  )
}
