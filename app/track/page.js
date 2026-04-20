'use client'

import { useState } from 'react'
import Link from 'next/link'

const API_URL = 'https://catalystsa.onrender.com'

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [orderData, setOrderData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleTrackOrder(e) {
    e.preventDefault()
    setError('')
    setOrderData(null)
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/orders/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_number: parseInt(orderNumber),
          email: email.trim().toLowerCase(),
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        if (errorData.detail === 'ORDER_NOT_FOUND') {
          setError('Order not found or email does not match our records.')
        } else {
          setError('Unable to track order. Please try again.')
        }
        return
      }

      const data = await res.json()
      setOrderData(data)
    } catch (err) {
      console.error('Track order error:', err)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'delivered':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300'
    }
  }

  function getStatusIcon(status) {
    switch (status) {
      case 'paid':
        return '💳'
      case 'processing':
        return '⚙️'
      case 'shipped':
        return '📦'
      case 'delivered':
        return '✅'
      default:
        return '📋'
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your order details to see the current status</p>
        </div>

        {/* Lookup Form */}
        {!orderData && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Order Number
                </label>
                <input
                  type="number"
                  placeholder="e.g., 10001"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Use the email address you provided during checkout
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                {loading ? 'Tracking...' : 'Track Order'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                ← Back to Store
              </Link>
            </div>
          </div>
        )}

        {/* Order Details */}
        {orderData && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Order #{orderData.order_number}
                </h2>
                <span className={`px-4 py-2 rounded-full border-2 font-semibold text-sm ${getStatusColor(orderData.status)}`}>
                  {getStatusIcon(orderData.status)} {orderData.status.toUpperCase()}
                </span>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Timeline</h3>
                <div className="space-y-3">
                  {orderData.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`mt-1 w-3 h-3 rounded-full ${
                        index === orderData.timeline.length - 1 ? 'bg-blue-600' : 'bg-gray-400'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-800 capitalize">{event.status}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(event.timestamp).toLocaleString('en-ZA', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking Number */}
              {orderData.tracking_number && (
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-6">
                  <p className="text-sm font-semibold text-purple-800 mb-1">Tracking Number</p>
                  <p className="text-lg font-mono font-bold text-purple-900">{orderData.tracking_number}</p>
                </div>
              )}

              {/* Delivery Address */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Delivery Address</h3>
                <div className="text-gray-800">
                  <p>{orderData.customer_name}</p>
                  <p>{orderData.delivery_address.address}</p>
                  <p>{orderData.delivery_address.city}, {orderData.delivery_address.postal_code}</p>
                </div>
              </div>
            </div>

            {/* Items & Summary */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>

              <div className="space-y-3 mb-6">
                {orderData.items && orderData.items.length > 0 ? (
                  orderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-800">
                        R{((item.price / 100) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No items information available</p>
                )}
              </div>

              {/* Order Summary */}
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R{orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>R{orderData.delivery_fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-300">
                  <span>Total</span>
                  <span className="text-blue-600">R{orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="text-center">
              <button
                onClick={() => {
                  setOrderData(null)
                  setOrderNumber('')
                  setEmail('')
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Track Another Order
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
