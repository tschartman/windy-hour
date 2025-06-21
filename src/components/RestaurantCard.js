'use client'

import { useState } from 'react'
import { ClockIcon, MapPinIcon, DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline'

export default function RestaurantCard({ restaurant }) {
  const [imageError, setImageError] = useState(false)
  const [pdfError, setPdfError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const handlePdfError = () => {
    setPdfError(true)
  }

  const openPdf = () => {
    if (restaurant.menuPdfUrl && !pdfError) {
      window.open(restaurant.menuPdfUrl, '_blank')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[600px] flex flex-col">
      {/* Restaurant Header - Compact */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 flex-shrink-0">
        <h3 className="text-lg font-bold text-white truncate">{restaurant.name}</h3>
      </div>

      {/* Menu Display - Takes up most space */}
      <div className="flex-1 p-3">
        {restaurant.hasHappyHour ? (
          <div className="h-full flex flex-col">
            {/* PDF/Image Display */}
            {restaurant.menuPdfUrl && !pdfError ? (
              <div className="flex-1 flex flex-col">
                {isMobile ? (
                  // Mobile: Show PDF preview and prominent "View Menu" button
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 bg-gray-100 rounded-lg border flex items-center justify-center p-8">
                      <div className="text-center">
                        <DocumentIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                        <h4 className="font-semibold text-gray-900 mb-2">Happy Hour Menu</h4>
                        <p className="text-sm text-gray-600 mb-4">Tap below to view the full menu</p>
                      </div>
                    </div>
                    <button
                      onClick={openPdf}
                      className="mt-3 w-full bg-blue-600 text-white py-4 px-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold flex items-center justify-center shadow-lg"
                    >
                      <DocumentIcon className="h-5 w-5 mr-2" />
                      View Menu PDF
                    </button>
                  </div>
                ) : (
                  // Desktop: Show embedded PDF
                  <div className="flex-1 flex flex-col">
                    <iframe
                      src={`${restaurant.menuPdfUrl}#zoom=75&scrollbar=0&toolbar=0&navpanes=0`}
                      className="w-full flex-1 rounded-lg border"
                      title={`${restaurant.name} Menu`}
                      onError={handlePdfError}
                      style={{
                        minHeight: '400px'
                      }}
                    />
                    <button
                      onClick={openPdf}
                      className="mt-3 w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                    >
                      <ExternalLinkIcon className="h-4 w-4 mr-1" />
                      Open Full Menu
                    </button>
                  </div>
                )}
              </div>
            ) : restaurant.menuImageUrl && !imageError ? (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg border overflow-hidden">
                  <img
                    src={restaurant.menuImageUrl}
                    alt={`${restaurant.name} Menu`}
                    className="max-w-full max-h-full object-contain"
                    onError={() => setImageError(true)}
                  />
                </div>
                <a
                  href={restaurant.menuImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full bg-green-600 text-white py-3 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <PhotoIcon className="h-4 w-4 mr-1" />
                  View Full Image
                </a>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-lg border">
                <DocumentIcon className="h-16 w-16 text-gray-400 mb-3" />
                <p className="text-gray-500 text-sm text-center mb-4">Menu not available</p>
                <a
                  href={restaurant.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
                >
                  <ExternalLinkIcon className="h-4 w-4 mr-1" />
                  View on HHRevolution
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg border">
            <div className="text-4xl mb-3">⏰</div>
            <p className="text-gray-500 text-sm text-center mb-4">No current happy hour</p>
            <a
              href={restaurant.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
            >
              <ExternalLinkIcon className="h-4 w-4 mr-1" />
              Check for Updates
            </a>
          </div>
        )}
      </div>
    </div>
  )
}