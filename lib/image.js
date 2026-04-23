export function optimizeImage(url, width = 800) {
  if (!url) return ""

  // Treat known testing placeholder services as missing images so
  // frontend uses local fallback instead of attempting external calls.
  if (url.includes('via.placeholder.com') || url.includes('placehold.co')) {
    return ""
  }

  try {
    // Only transform Cloudinary URLs
    if (!url.includes('res.cloudinary.com')) return url

    // If already optimized, don't double-apply
    if (url.includes('f_auto') || url.includes('q_auto')) return url

    // Safe replace - only if /upload/ exists
    const marker = '/upload/'
    if (url.includes(marker)) {
      return url.replace(
        marker,
        `${marker}f_auto,q_auto,w_${width}/`
      )
    }

    // fallback - do not break image URL
    return url
  } catch (e) {
    return url
  }
}
