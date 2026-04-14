'use client'

import { Suspense } from 'react'
import SuccessContent from './SuccessContent'

export const dynamic = 'force-dynamic'

function SuccessLoading() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg p-12">
        <div className="text-center">
          <div className="text-7xl mb-4">✅</div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">Processing Your Order...</h1>
        </div>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessLoading />}>
      <SuccessContent />
    </Suspense>
  )
}
