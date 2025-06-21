import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chicago Happy Hour Explorer',
  description: 'Discover the best happy hour deals in Chicago',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  🍻 Chicago Happy Hour Explorer
                </h1>
                <p className="text-gray-600">
                  Discover the best happy hour deals across Chicago neighborhoods
                </p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t mt-12">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="text-center text-gray-600">
                <p>
                  Data sourced from{' '}
                  <a
                    href="https://hhrevolution.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    HHRevolution.com
                  </a>
                </p>
                <p className="text-sm mt-1">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
