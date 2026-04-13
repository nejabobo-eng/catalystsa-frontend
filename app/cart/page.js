'use client'

import { useEffect, useState } from 'react'
import { getCart, removeFromCart, updateQuantity, getCartTotal } from '../../lib/cart'
import Link from 'next/link'

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    loadCart()
  }, [])

  function loadCart() {
    const cartItems = getCart()
    setCart(cartItems)
    setTotal(getCartTotal())
  }

  function handleRemove(id) {
    removeFromCart(id)
    loadCart()
  }

  function handleQuantityChange(id, newQuantity) {
    updateQuantity(id, newQuantity)
    loadCart()
  }

  if (cart.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="bg-gray-100 rounded-lg p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium inline-block">
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="bg-white rounded-lg shadow">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border-b last:border-b-0">
            <img
              src={item.image || 'https://via.placeholder.com/100'}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-lg font-bold text-green-600 mt-1">R{item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded font-bold"
              >
                -
              </button>
              <span className="w-12 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded font-bold"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-800">R{item.price * item.quantity}</p>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:text-red-800 text-sm mt-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow mt-6 p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-3xl font-bold text-green-600">R{total}</span>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
          Proceed to Checkout
        </button>

        <Link href="/" className="block text-center text-blue-600 hover:text-blue-800 mt-4">
          ← Continue Shopping
        </Link>
      </div>
    </main>
  )
}
