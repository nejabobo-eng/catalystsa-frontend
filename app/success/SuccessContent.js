'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { clearCart } from '../../lib/cart'
import Link from 'next/link'

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    clearCart()

    // Try to fetch order info by email
    if (email) {
      fetchLatestOrder()
    } else {
      setLoading(false)
    }
  }, [email])

  async function fetchLatestOrder() {
    try {
      // Normalize email for API call
      const normalizedEmail = email.trim().toLowerCase()

      const res = await fetch(`https://catalystsa.onrender.com/public/orders/${normalizedEmail}`, {
        cache: 'no-store',
        next: { revalidate: 0 }
      })
      if (res.ok) {
        const response = await res.json()
        // New response shape: {email, orders: [...]}
        const orders = response.orders || []
        if (orders.length > 0) {
          // Get the most recent order
          setOrderData(orders[0])
        }
      }
    } catch (err) {
      console.error('Error fetching order:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg p-12 mb-6">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-bounce">✅</div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">Payment Successful!</h1>
          <p className="text-xl text-green-700">Your order has been confirmed and is being processed.</p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading order details...</p>
          </div>
        ) : orderData ? (
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-1">Order Number</p>
              <h2 className="text-3xl font-bold text-green-600">#{orderData.order_number}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-center mb-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="text-2xl font-bold text-purple-600">✓ Paid</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Delivery</p>
                <p className="text-2xl font-bold text-orange-600">3-7 days</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-blue-800">
                📧 A confirmation email has been sent to <strong>{email}</strong> with your complete order details, total amount, and tracking link.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-6">
            <p className="text-sm text-blue-800">
              📧 A confirmation email has been sent to <strong>{email}</strong> with your order number and tracking details.
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center flex-wrap">
          {orderData && (
            <Link
              href={`/orders/${orderData.order_number}`}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold inline-block transition"
            >
              📦 Track Order #{orderData.order_number}
            </Link>
          )}
          <Link
            href={email ? `/orders?email=${encodeURIComponent(email)}` : '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-block transition"
          >
            View My Orders
          </Link>
          <Link
            href="/"
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold inline-block transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="text-3xl">📧</div>
            <div>
              <p className="font-bold">Order Confirmation</p>
              <p className="text-gray-600">Check your email for order confirmation and tracking details</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">⏳</div>
            <div>
              <p className="font-bold">Processing</p>
              <p className="text-gray-600">Your order is being prepared for shipment (usually within 24 hours)</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">🚚</div>
            <div>
              <p className="font-bold">Delivery</p>
              <p className="text-gray-600">Estimated delivery in 3-7 business days. You'll receive tracking updates.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">❓</div>
            <div>
              <p className="font-bold">Need Help?</p>
              <p className="text-gray-600">
                <a href="mailto:catalystsastore@gmail.com" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Contact us
                </a> if you have any questions about your order
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
