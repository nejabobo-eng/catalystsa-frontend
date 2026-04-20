import { getProducts } from '../lib/api'
import ProductCard from '../components/ProductCard'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await getProducts()

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Quality Products Delivered <br className="hidden md:block" />
              Across South Africa
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Fast, secure shopping with R99 nationwide delivery.
            </p>

            <div className="flex gap-4 mb-8">
              <a 
                href="#products" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Shop Now
              </a>
              <a 
                href="/track" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Track Order
              </a>
            </div>

            {/* Trust Badges - Below buttons for cleaner hierarchy */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 text-blue-100">
                <span className="text-xl">🔒</span>
                <span className="text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <span className="text-xl">🚚</span>
                <span className="text-sm">R99 Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <span className="text-xl">⚡</span>
                <span className="text-sm">24hr Processing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Products</h2>
          <p className="text-gray-600 text-lg">Browse our collection of quality products</p>
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

      {/* Why Shop With Us Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Shop With CatalystSA?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Trust Point 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Protected by Yoco secure payment system. Shop with complete confidence.
              </p>
            </div>

            {/* Trust Point 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                R99 nationwide delivery with tracking. Orders processed within 24 hours.
              </p>
            </div>

            {/* Trust Point 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Instant WhatsApp support when you need help. We're here for you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
