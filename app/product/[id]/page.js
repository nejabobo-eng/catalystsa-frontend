import { getProduct } from '@/lib/api'
import { optimizeImage } from '@/lib/image'
import ProductCard from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id)
  if (!product) return <div className="p-8">Product not found</div>

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={optimizeImage(product.image_url, 800)} alt={product.name} className="w-full rounded-lg object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="text-2xl font-semibold text-green-600 mb-4">{product.price_display || `R${(product.price/100).toFixed(2)}`}</div>

          <div className="flex gap-2">
            <button className="bg-black text-white px-6 py-2 rounded-lg">Add to Cart</button>
          </div>

        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">You may also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* placeholder: render first 3 products as simple recommendations */}
          {/* TODO: replace with real related products endpoint */}
        </div>
      </section>
    </main>
  )
}
