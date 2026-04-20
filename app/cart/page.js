'use client'

import { useEffect, useState } from 'react'
import { getCart, removeFromCart, updateQuantity, getCartTotal } from '../../lib/cart'
import { createCheckout } from '../../lib/api'
import { getCustomerMemory, saveCustomerMemory, saveAddress, getLastUsedAddress } from '../../lib/customerMemory'
import Link from 'next/link'

const DELIVERY_FEE = 99  // Flat R99 delivery (MVP - simple and predictable)

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(DELIVERY_FEE)
  const [loading, setLoading] = useState(false)

  // Customer information
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')

  // Memory state
  const [savedAddress, setSavedAddress] = useState(null)
  const [showSaveAddressPrompt, setShowSaveAddressPrompt] = useState(false)

  useEffect(() => {
    loadCart()
    loadCustomerMemory()
  }, [])

  function loadCart() {
    const cartItems = getCart()
    setCart(cartItems)
    const cartTotal = getCartTotal()
    setSubtotal(cartTotal)
    // Delivery is flat R99 - no calculations needed
  }

  function loadCustomerMemory() {
    try {
      const memory = getCustomerMemory()

      if (memory) {
        // Autofill form with stored data
        setEmail(memory.email || '')
        setName(memory.name || '')
        setPhone(memory.phone || '')

        // Load last used address
        const lastAddr = getLastUsedAddress()
        if (lastAddr) {
          setAddress(lastAddr.address || '')
          setCity(lastAddr.city || '')
          setPostalCode(lastAddr.postalCode || '')
          setSavedAddress(lastAddr)
        }
      }
    } catch (error) {
      console.error('Error loading customer memory:', error)
    }
  }

  function handleUseSavedAddress() {
    if (savedAddress) {
      setAddress(savedAddress.address)
      setCity(savedAddress.city)
      setPostalCode(savedAddress.postalCode)
      setShowSaveAddressPrompt(false)
    }
  }

  function handleRemove(id) {
    removeFromCart(id)
    loadCart()
  }

  function handleQuantityChange(id, newQuantity) {
    updateQuantity(id, newQuantity)
    loadCart()
  }

  function validateForm() {
    const errors = []
    if (!name.trim()) errors.push('Name is required')
    if (!email.trim()) errors.push('Email is required')
    if (!phone.trim()) errors.push('Phone is required')
    if (!address.trim()) errors.push('Street address is required')
    if (!city.trim()) errors.push('City is required')
    if (!postalCode.trim()) errors.push('Postal code is required')

    if (errors.length > 0) {
      alert('Please fill in all required fields:\n' + errors.join('\n'))
      return false
    }
    return true
  }

  async function handleCheckout() {
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const baseUrl = window.location.origin
      const total = subtotal + deliveryFee

      const checkoutData = await createCheckout(
        total,
        `${baseUrl}/success?email=${encodeURIComponent(email)}`,
        `${baseUrl}/cart`,
        email,
        {
          name,
          phone,
          address,
          city,
          postal_code: postalCode,
          items: cart
        },
        deliveryFee
      )

      // Save customer memory BEFORE redirecting
      // (customer will see success page if payment succeeds)
      saveCustomerMemory({
        email: email.trim().toLowerCase(),
        name,
        phone,
        addresses: [
          {
            address,
            city,
            postalCode,
            isDefault: true
          }
        ]
      })

      // Redirect to Yoco payment page
      if (checkoutData.redirectUrl) {
        window.location.href = checkoutData.redirectUrl
      } else {
        alert('Error: Could not create checkout')
        setLoading(false)
      }
    } catch (error) {
      alert(`Checkout failed: ${error.message}`)
      setLoading(false)
    }
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

  const total = subtotal + deliveryFee

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border-b last:border-b-0">
                <img
                  src={item.image_url || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-lg font-bold text-green-600 mt-1">
                    {item.price_display || `R${(item.price / 100).toFixed(2)}`}
                  </p>
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
                  <p className="font-bold text-gray-800">
                    R{((item.price / 100) * item.quantity).toFixed(2)}
                  </p>
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
        </div>

        {/* Checkout Form */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Delivery Details</h2>

            {/* Saved Address Banner */}
            {savedAddress && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded-r">
                <p className="text-sm text-blue-900 font-semibold mb-2">👋 Welcome back!</p>
                <p className="text-xs text-blue-800 mb-3">
                  {savedAddress.address}, {savedAddress.city}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleUseSavedAddress}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-3 rounded"
                  >
                    Use Saved
                  </button>
                  <button
                    onClick={() => setSavedAddress(null)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold py-2 px-3 rounded"
                  >
                    Enter New
                  </button>
                </div>
              </div>
            )}

            {/* Customer Info */}
            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07xx xxx xxxx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Street Address *</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main Street"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Cape Town"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Postal Code *</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="8000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-4">Estimated delivery: 3-7 business days</p>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span className="font-semibold">R{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery:</span>
                <span className="font-semibold">R{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-green-600">R{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg text-base mt-4 transition"
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            <Link href="/" className="block text-center text-blue-600 hover:text-blue-800 text-sm mt-3">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
