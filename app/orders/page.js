'use client'

import { Suspense } from 'react'
import OrdersContent from './OrdersContent'

export const dynamic = 'force-dynamic'

export default function OrdersPage() {
  return (
    <Suspense fallback={<OrdersLoading />}>
      <OrdersContent />
    </Suspense>
  )
}

function OrdersLoading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    </main>
  )
}
