import './globals.css'

export const metadata = {
  title: 'CatalystSA - Online Store',
  description: 'South African eCommerce Store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-black hover:text-gray-700">
              CatalystSA
            </a>
            <div className="flex gap-4 items-center">
              <a href="/track" className="text-gray-600 hover:text-gray-900 font-medium">
                📦 Track Order
              </a>
              <a href="/cart" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">
                🛒 Cart
              </a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
