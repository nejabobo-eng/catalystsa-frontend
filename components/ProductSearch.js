"use client"

import React, { useState, useEffect, useRef } from 'react'
import ProductCard from './ProductCard'

export default function ProductSearch({ initialProducts = [] }) {
  const [query, setQuery] = useState('')
  // Do not show full product list by default - only show results after a search
  const [results, setResults] = useState([])
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const blurTimer = useRef(null)

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
      setResults([])
      setHasSearched(false)
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
    setHasSearched(true)
    saveToHistory(trimmed)
  }

  function handleClear() {
    setQuery('')
    setResults([])
    setHasSearched(false)
  }

  function handleFocus() {
    if (blurTimer.current) {
      clearTimeout(blurTimer.current)
      blurTimer.current = null
    }
    setShowHistory(true)
  }

  function handleBlur() {
    // Delay hiding to allow clicks on history buttons
    blurTimer.current = setTimeout(() => setShowHistory(false), 150)
  }

  return (
    <div className="mb-8">
      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') runSearch(query) }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search products..."
          className="w-full border rounded px-3 py-2"
        />
        <button onClick={() => runSearch(query)} className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        <button onClick={() => { setQuery(''); setResults(initialProducts) }} className="bg-gray-200 px-4 py-2 rounded">Clear</button>
      </div>

      {showHistory && history.length > 0 && query.trim() === '' && (
        <div className="mb-4 text-sm text-gray-600">Recent searches: {history.map((h) => (
          <button key={h} onMouseDown={(e) => { e.preventDefault(); setQuery(h); runSearch(h); setShowHistory(false) }} className="underline mr-2">{h}</button>
        ))}</div>
      )}

      {hasSearched && results.length === 0 && (
        <div className="col-span-full text-center text-gray-500 py-8">No products found</div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  )
}
