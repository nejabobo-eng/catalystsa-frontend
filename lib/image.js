export function optimizeImage(url, width = 800) {
  if (!url) return url
  try {
    // Only transform Cloudinary delivery URLs
    const parsed = new URL(url)
    if (!parsed.hostname.includes('res.cloudinary.com')) return url

    const marker = '/upload/'
    const idx = url.indexOf(marker)
    if (idx === -1) return url

    const before = url.slice(0, idx + marker.length)
    const after = url.slice(idx + marker.length)

    // Insert optimization parameters (auto format + auto quality + resize)
    return `${before}f_auto,q_auto,w_${width}/${after}`
  } catch (e) {
    return url
  }
}
