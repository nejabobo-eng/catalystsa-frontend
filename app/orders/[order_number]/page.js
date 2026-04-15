'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const API_URL = "https://catalystsa.onrender.com"

export default function OrderDetailPage() {
  const params = useParams()
  const orderNumber = params.order_number
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!orderNumber) return

    async function fetchOrder() {
      try {
        const res = await fetch(`${API_URL}/yoco/orders/number/${orderNumber}`)
        if (!res.ok) {
          if (res.status === 404) {
            setError('Order not found')
          } else {
            setError('Failed to load order')
          }
          return
        }
        const data = await res.json()
        setOrder(data)
      } catch (err) {
        setError('Error loading order: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderNumber])

  const getStatusColor = (status) => {
    const colors = {
      paid: 'bg-green-100 text-green-800 border-green-300',
      processing: 'bg-blue-100 text-blue-800 border-blue-300',
      shipped: 'bg-purple-100 text-purple-800 border-purple-300',
      delivered: 'bg-green-100 text-green-800 border-green-300',
      failed: 'bg-red-100 text-red-800 border-red-300',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    }
    return colors[status] || colors.pending
  }

  const getStatusBadge = (status) => {
    const badges = {
      paid: '✅ Paid',
      processing: '⏳ Processing',
      shipped: '📦 Shipped',
      delivered: '✔ Delivered',
      failed: '❌ Failed',
      pending: '⏳ Pending',
    }
    return badges[status] || status
  }

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Order Details</h1>
        <div className="bg-red-50 border border-red-300 rounded-lg p-6">
          <p className="text-red-700">{error || 'Order not found'}</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            ← Back to Shop
          </Link>
        </div>
      </main>
    )
  }

  const subtotal = order.amount ? order.amount / 100 : 0
  const deliveryFee = (order.delivery_fee || 0) / 100
  const total = subtotal + deliveryFee

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
          ← Back to Shop
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order #{order.order_number}</h1>
            <p className="text-gray-600">
              Ordered on {order.created_at ? new Date(order.created_at).toLocaleDateString('en-ZA', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }) : 'Date unavailable'}
            </p>
          </div>
          <div className={`px-4 py-2 border-2 rounded-lg font-bold ${getStatusColor(order.status)}`}>
            {getStatusBadge(order.status)}
          </div>
        </div>

        <hr className="my-6" />

        {/* Customer Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-bold mb-4">Customer Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{order.customer_name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{order.customer_email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold">{order.phone || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Delivery Address</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Street Address</p>
                <p className="font-semibold">{order.address || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p className="font-semibold">{order.city || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Postal Code</p>
                <p className="font-semibold">{order.postal_code || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6" />

        {/* Order Summary */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-base">
              <span>Subtotal:</span>
              <span className="font-semibold">R{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Delivery:</span>
              <span className="font-semibold">R{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t-2 pt-3 flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-green-600">R{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <hr className="my-6" />

        {/* Delivery Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-3 text-blue-900">📦 Delivery Information</h2>
          <div className="space-y-2 text-blue-900">
            <p>
              <strong>Estimated Delivery Time:</strong> 3-7 business days
            </p>
            <p>
              <strong>Payment Status:</strong> {order.status === 'paid' ? '✅ Payment Received' : 'Pending'}
            </p>
            <p>
              <strong>Delivery Status:</strong> {
                order.status === 'shipped' ? '📦 On the way' :
                order.status === 'delivered' ? '✔ Delivered' :
                order.status === 'processing' ? '⏳ Preparing for shipment' :
                '⏳ Order received'
              }
            </p>
          </div>
        </div>

        {/* Help */}
        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-gray-600 mb-4">
            Have questions about your order?
          </p>
          <a
            href="mailto:catalystsastore@gmail.com"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Contact Support
          </a>
        </div>
      </div>
    </main>
  )
}
