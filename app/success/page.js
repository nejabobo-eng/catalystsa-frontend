'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { clearCart } from '../../lib/cart'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

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
          Thank you for your order. You will receive a confirmation email shortly at <strong>{email}</strong>.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href={email ? `/orders?email=${encodeURIComponent(email)}` : '/orders'}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium inline-block"
          >
            View My Orders
          </Link>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}
