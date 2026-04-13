'use client'

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200">
      <div className="relative w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/200?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description || 'No description'}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">R{product.price}</span>
          <button
            disabled={!product.in_stock}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded font-medium transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
