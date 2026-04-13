export function getCart() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveCart(cart) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

export function updateQuantity(id, quantity) {
  const cart = getCart();
  const item = cart.find((item) => item.id === id);
  
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
  }
}

export function clearCart() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cart');
}

export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
