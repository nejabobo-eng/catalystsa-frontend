'use client'

import { useState } from 'react'
import { createProduct } from '../../lib/api'

export default function Admin() {
  const [form, setForm] = useState({
    name: '',
    cost: '',
    description: '',
    image: '',
    category: 'general',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (!form.name || !form.cost) {
        setMessage('Name and cost are required')
        setLoading(false)
        return
      }

      const res = await createProduct({
        name: form.name,
        cost: Number(form.cost),
        description: form.description || '',
        image: form.image || '',
        category: form.category,
      })

      if (res.id) {
        setMessage(`✅ Product created! Price: R${res.price}`)
        setForm({
          name: '',
          cost: '',
          description: '',
          image: '',
          category: 'general',
        })
      } else {
        setMessage('❌ Error creating product')
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    }

    setLoading(false)
  }

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
      <p className="text-gray-600 mb-6">Add new products to your store</p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Running Shoes"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost Price (R) *
            </label>
            <input
              type="number"
              placeholder="e.g., 100"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.cost}
              onChange={(e) => setForm({ ...form, cost: e.target.value })}
              required
            />
            {form.cost && (
              <p className="text-sm text-green-600 mt-1">
                Selling Price: R{Math.round((Number(form.cost) * 1.6) / 10) * 10}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Product description"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              placeholder="https://..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="general">General</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="shoes">Shoes</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {message && (
            <div className={`p-3 rounded text-sm ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </main>
  )
}
