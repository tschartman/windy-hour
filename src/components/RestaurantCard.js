'use client'

import { useState } from 'react'
import { ClockIcon, MapPinIcon, DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline'

export default function RestaurantCard({ restaurant }) {
  const [imageError, setImageError] = useState(false)
  const [pdfError, setPdfError] = useState(false)

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
                <iframe
                  src={restaurant.menuPdfUrl}
                  className="w-full flex-1 rounded-lg border"
                  title={`${restaurant.name} Menu`}
                  onError={handlePdfError}
                />
                <button
                  onClick={openPdf}
                  className="mt-2 w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  Open Full Menu
                </button>
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
                  className="mt-2 w-full bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <PhotoIcon className="h-4 w-4 mr-1" />
                  View Full Image
                </a>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-lg border">
                <DocumentIcon className="h-16 w-16 text-gray-400 mb-3" />
                <p className="text-gray-500 text-sm text-center mb-3">Menu not available</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg border">
            <div className="text-4xl mb-3">⏰</div>
            <p className="text-gray-500 text-sm text-center mb-3">No current happy hour</p>
            <a
              href={restaurant.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
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