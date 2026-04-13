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
