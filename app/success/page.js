'use client'

import { useEffect } from 'react'
import { clearCart } from '../../lib/cart'
import Link from 'next/link'

export default function SuccessPage() {
  useEffect(() => {
    // Clear cart after successful payment
    clearCart()
  }, [])

  return (
    <main className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-green-50 rounded-lg p-12">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-green-800 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-8">
          Thank you for your order. You will receive a confirmation email shortly.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}
