/**
 * Customer Memory Service
 * Manages localStorage for customer details (checkout form autofill)
 * 
 * Schema versioning: catalystsa_customer_v1
 * This allows future migrations without breaking existing data
 */

const MEMORY_KEY = 'catalystsa_customer_v1'

/**
 * Get stored customer memory
 * Returns null if not found or invalid
 */
export function getCustomerMemory() {
  try {
    if (typeof window === 'undefined') return null

    const stored = localStorage.getItem(MEMORY_KEY)
    if (!stored) return null

    const data = JSON.parse(stored)
    
    // Validate basic structure
    if (!data.email) return null

    return data
  } catch (error) {
    console.error('Error reading customer memory:', error)
    return null
  }
}

/**
 * Save customer memory
 * Structure:
 * {
 *   email: string,
 *   name: string,
 *   phone: string,
 *   addresses: [{ address, city, postalCode, isDefault }],
 *   lastUsed: timestamp
 * }
 */
export function saveCustomerMemory(customerData) {
  try {
    if (typeof window === 'undefined') return false

    const memory = {
      email: customerData.email || '',
      name: customerData.name || '',
      phone: customerData.phone || '',
      addresses: customerData.addresses || [],
      lastUsed: Date.now()
    }

    // Validate we have at least email
    if (!memory.email.trim()) {
      console.warn('Cannot save customer memory without email')
      return false
    }

    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory))
    return true
  } catch (error) {
    console.error('Error saving customer memory:', error)
    return false
  }
}

/**
 * Save or update an address
 */
export function saveAddress(addressData, setAsDefault = false) {
  try {
    if (typeof window === 'undefined') return false

    const memory = getCustomerMemory()
    if (!memory) return false

    // Create new address object
    const newAddress = {
      address: addressData.address || '',
      city: addressData.city || '',
      postalCode: addressData.postalCode || '',
      isDefault: setAsDefault
    }

    // Remove default flag from other addresses if setting new default
    if (setAsDefault) {
      memory.addresses = memory.addresses.map(addr => ({
        ...addr,
        isDefault: false
      }))
    }

    // Add new address
    memory.addresses.push(newAddress)

    // Keep only last 5 addresses
    if (memory.addresses.length > 5) {
      memory.addresses = memory.addresses.slice(-5)
    }

    memory.lastUsed = Date.now()
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory))
    return true
  } catch (error) {
    console.error('Error saving address:', error)
    return false
  }
}

/**
 * Get the default (last used) address
 */
export function getLastUsedAddress() {
  try {
    const memory = getCustomerMemory()
    if (!memory || !memory.addresses || memory.addresses.length === 0) {
      return null
    }

    // Return address marked as default, or the last one used
    const defaultAddr = memory.addresses.find(addr => addr.isDefault)
    return defaultAddr || memory.addresses[memory.addresses.length - 1]
  } catch (error) {
    console.error('Error getting last used address:', error)
    return null
  }
}

/**
 * Get all saved addresses
 */
export function getSavedAddresses() {
  try {
    const memory = getCustomerMemory()
    if (!memory || !memory.addresses) return []
    return memory.addresses
  } catch (error) {
    console.error('Error getting saved addresses:', error)
    return []
  }
}

/**
 * Clear all customer memory
 * (user request, privacy)
 */
export function clearCustomerMemory() {
  try {
    if (typeof window === 'undefined') return false
    localStorage.removeItem(MEMORY_KEY)
    return true
  } catch (error) {
    console.error('Error clearing customer memory:', error)
    return false
  }
}

/**
 * Check if customer has saved memory
 */
export function hasCustomerMemory() {
  return getCustomerMemory() !== null
}

/**
 * Update last used timestamp
 */
export function updateLastUsed() {
  try {
    const memory = getCustomerMemory()
    if (!memory) return false

    memory.lastUsed = Date.now()
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory))
    return true
  } catch (error) {
    console.error('Error updating last used:', error)
    return false
  }
}
