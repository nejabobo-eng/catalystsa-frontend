import './globals.css'

export const metadata = {
  title: 'CatalystSA - Online Store',
  description: 'South African eCommerce Store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex flex-col min-h-screen">
        {/* Header with Logo & Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-shadow">
                  C
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    CatalystSA
                  </div>
                  <div className="text-xs text-gray-500">Quality Products, Delivered</div>
                </div>
              </a>

              {/* Navigation */}
              <div className="flex gap-4 items-center">
                <a 
                  href="https://wa.me/27622475462?text=Hi%2C%20I%20need%20help%20with%20my%20order" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  <span className="text-xl">💬</span>
                  <span>WhatsApp Support</span>
                </a>
                <a href="/track" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  📦 Track Order
                </a>
                <a href="/cart" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
                  🛒 Cart
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    C
                  </div>
                  <h3 className="text-white font-bold text-lg">CatalystSA</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Your trusted South African online store for quality products delivered nationwide.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:text-white transition-colors">Shop</a></li>
                  <li><a href="/track" className="hover:text-white transition-colors">Track Order</a></li>
                  <li><a href="/cart" className="hover:text-white transition-colors">Cart</a></li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h4 className="text-white font-semibold mb-4">Customer Service</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a 
                      href="https://wa.me/27622475462" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span>💬</span> WhatsApp Support
                    </a>
                  </li>
                  <li className="text-gray-400">📞 062 247 5462</li>
                  <li className="text-gray-400">📧 support@catalystsa.co.za</li>
                </ul>
              </div>

              {/* Trust & Security */}
              <div>
                <h4 className="text-white font-semibold mb-4">Secure Shopping</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Secure Payments via Yoco</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Nationwide Delivery: R99</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Track Your Order 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-gray-500">
                © {new Date().getFullYear()} CatalystSA. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="/returns" className="hover:text-white transition-colors">Returns</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
