'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const API_URL = 'https://catalystsa.onrender.com'

export default function OrdersContent() {
  const searchParams = useSearchParams()
  const initialEmail = searchParams.get('email') || ''

  const [email, setEmail] = useState(initialEmail)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (initialEmail) {
      fetchOrders(initialEmail)
    }
  }, [initialEmail])

  async function fetchOrders(emailToFetch) {
    setLoading(true)
    setError('')
    setSearched(true)

    try {
      const res = await fetch(`${API_URL}/yoco/orders/${emailToFetch}`, {
        cache: 'no-store',
        next: { revalidate: 0 }
      })
      
      if (!res.ok) {
        throw new Error('Failed to fetch orders')
      }

      const data = await res.json()
      setOrders(data)
    } catch (err) {
      setError(`Could not find orders: ${err.message}`)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  function handleSearch() {
    if (!email.trim()) {
      setError('Please enter an email address')
      return
    }
    fetchOrders(email)
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Enter your email to view orders
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="your.email@example.com"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Orders List */}
      {searched && orders.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-100 p-4 font-semibold text-gray-700">
            <div>Order #</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Date</div>
            <div>Action</div>
          </div>

          {orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50 transition items-center"
            >
              <div className="font-mono font-bold text-lg">#{order.order_number || order.id}</div>
              <div className="font-bold text-green-600">R{((order.amount + (order.delivery_fee || 0)) / 100).toFixed(2)}</div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'processing'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'shipped'
                      ? 'bg-purple-100 text-purple-800'
                      : order.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {order.status === 'paid' && '✅'}
                  {order.status === 'processing' && '⏳'}
                  {order.status === 'shipped' && '📦'}
                  {order.status === 'delivered' && '✔'}
                  {order.status === 'pending' && '⏳'}
                  {' ' + order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {new Date(order.created_at).toLocaleDateString('en-ZA', {
                  year: '2-digit',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <Link
                href={`/orders/${order.order_number || order.id}`}
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
              >
                View →
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* No Orders Message */}
      {searched && orders.length === 0 && !error && (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">No orders found for this email.</p>
          <p className="text-gray-500 mb-6">Try checking back later or with a different email.</p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {/* Initial State */}
      {!searched && (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Enter your email above to view your orders.</p>
        </div>
      )}

      {/* Back to Shopping */}
      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Shopping
        </Link>
      </div>
    </main>
  )
}
