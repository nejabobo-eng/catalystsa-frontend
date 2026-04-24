import { getProducts } from '../lib/api'
import ProductCard from '../components/ProductCard'
import ProductSearch from '../components/ProductSearch'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await getProducts()

  // Product grouping logic (no backend changes needed)
  // New Arrivals = latest 5 products (hook section)
  const newArrivals = products
    .slice() // copy
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, 5)

  // Top Selling - placeholder logic until sales_count exists
  // Use low stock (fast-selling) then recent as a fallback
  const topSelling = products
    .slice()
    .sort((a, b) => {
      const aStock = a.stock ?? 0
      const bStock = b.stock ?? 0
      if (aStock !== bStock) return aStock - bStock
      return new Date(b.created_at || 0) - new Date(a.created_at || 0)
    })
    .slice(0, 5)

  // All products - main catalog sorted by newest first
  const allProducts = products.slice().sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))

  return (
    <main>
      {/* Hero Section - Clean & Focused */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            {/* Single Line Headline */}
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Quality Products Delivered Across South Africa
            </h1>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mb-6">
              <a 
                href="#products" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                Shop Now
              </a>
              <a 
                href="/track" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Track Order
              </a>
            </div>

            {/* Horizontal Trust Strip - Customer Control Focused */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <span>Secure payments</span>
              </div>
              <span className="hidden sm:inline text-blue-300">·</span>
              <div className="flex items-center gap-2">
                <span>🚚</span>
                <span>Delivery from R99</span>
              </div>
              <span className="hidden sm:inline text-blue-300">·</span>
              <div className="flex items-center gap-2">
                <span>📦</span>
                <span>Track your order anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Grouped for Better Discovery */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-12">

        {/* Search component (client-side) */}
        <ProductSearch initialProducts={products} />

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-lg font-medium">No products available yet</p>
            <p className="text-gray-400 mt-2">Check back soon for exciting new arrivals!</p>
          </div>
        ) : (
          <>
            {/* New Arrivals (hook) */}
            {newArrivals.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <span>🆕</span> New Arrivals
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">Latest products just added</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {newArrivals.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Top Selling (placeholder logic) */}
            {topSelling.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <span>🔥</span> Top Selling
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">Best sellers & popular picks</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {topSelling.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* All Products */}
            <div className="mb-16">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold">All Products</h2>
                <p className="text-gray-600 text-sm mt-1">Browse our full catalog</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {allProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      {/* Trust Section - Simplified & Below Products */}
      <section className="bg-gray-50 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Trust Point 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">
                Protected by Yoco secure payment system
              </p>
            </div>

            {/* Trust Point 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">
                Delivery from R99 with tracking. Orders processed within 24 hours
              </p>
            </div>

            {/* Trust Point 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Expert Support</h3>
              <p className="text-sm text-gray-600">
                Instant WhatsApp support when you need help
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
