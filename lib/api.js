const API_URL = "https://catalystsa.onrender.com";

export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products/`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function createProduct(data) {
  try {
    const res = await fetch(`${API_URL}/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function createCheckout(amount, successUrl, cancelUrl, email, customerData = {}, deliveryFee = 0) {
  try {
    const res = await fetch(`${API_URL}/payments/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount - deliveryFee,  // Send subtotal only, backend adds delivery
        currency: "ZAR",
        successUrl: successUrl,
        cancelUrl: cancelUrl,
        email: email,
        name: customerData.name || "",
        phone: customerData.phone || "",
        address: customerData.address || "",
        city: customerData.city || "",
        postal_code: customerData.postal_code || "",
        items: customerData.items || [],
        delivery_fee: deliveryFee,
      }),
    });
    if (!res.ok) throw new Error("Failed to create checkout");
    return res.json();
  } catch (error) {
    console.error("Error creating checkout:", error);
    throw error;
  }
}
