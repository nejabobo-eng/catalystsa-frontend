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
            <h1 className="text-2xl font-bold text-black">CatalystSA</h1>
            <a href="/admin" className="text-blue-600 hover:text-blue-800">
              Admin
            </a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
