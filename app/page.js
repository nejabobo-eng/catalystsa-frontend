import { getProducts } from '../lib/api'
import ProductCard from '../components/ProductCard'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await getProducts()

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

            {/* Horizontal Trust Strip - Single Line */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <span>Secure Payments</span>
              </div>
              <span className="hidden sm:inline text-blue-300">|</span>
              <div className="flex items-center gap-2">
                <span>🚚</span>
                <span>Delivery from R99</span>
              </div>
              <span className="hidden sm:inline text-blue-300">|</span>
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>24hr Processing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Main Focus */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Our Products</h2>
          <p className="text-gray-600">Browse our collection of quality products</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-lg font-medium">No products available yet</p>
            <p className="text-gray-400 mt-2">Check back soon for exciting new arrivals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
