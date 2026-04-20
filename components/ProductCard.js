'use client'

import { useState } from 'react'
import { addToCart } from '../lib/cart'

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const inStock = product.stock > 0

  function handleAddToCart() {
    addToCart(product)
    alert(`✅ ${product.name} added to cart!`)
  }

  const placeholderImage = 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=No+Image'
  const displayImage = (product.image_url && !imageError) ? product.image_url : placeholderImage

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      {/* Image Section with Enhanced Styling */}
      <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        )}

        <img
          src={displayImage}
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

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
          {product.description || 'Quality product available now'}
        </p>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-green-600">
              {product.price_display || `R${(product.price / 100).toFixed(2)}`}
            </span>
            {inStock && (
              <p className="text-xs text-gray-500 mt-1">In stock</p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:shadow-none"
          >
            {inStock ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  )
}
