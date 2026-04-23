"use client"

import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

export default function ProductSearch({ initialProducts = [] }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(initialProducts)
  const [history, setHistory] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('searchHistory')
      if (raw) setHistory(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  function saveToHistory(q) {
    if (!q) return
    const next = [q, ...history.filter((h) => h !== q)].slice(0, 5)
    setHistory(next)
    try {
      localStorage.setItem('searchHistory', JSON.stringify(next))
    } catch (e) {
      // ignore
    }
  }

  function runSearch(q) {
    const trimmed = (q || '').trim()
    if (!trimmed) {
      setResults(initialProducts)
      return
    }
    const ql = trimmed.toLowerCase()
    const filtered = initialProducts.filter((p) => {
      return (
        (p.name && p.name.toLowerCase().includes(ql)) ||
        (p.description && p.description.toLowerCase().includes(ql))
      )
    })
    setResults(filtered)
    saveToHistory(trimmed)
  }

  return (
    <div className="mb-8">
      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') runSearch(query) }}
          placeholder="Search products..."
          className="w-full border rounded px-3 py-2"
        />
        <button onClick={() => runSearch(query)} className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        <button onClick={() => { setQuery(''); setResults(initialProducts) }} className="bg-gray-200 px-4 py-2 rounded">Clear</button>
      </div>

      {history.length > 0 && (
        <div className="mb-4 text-sm text-gray-600">Recent searches: {history.map((h) => (
          <button key={h} onClick={() => { setQuery(h); runSearch(h) }} className="underline mr-2">{h}</button>
        ))}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No products found</div>
        ) : (
          results.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </div>
  )
}
