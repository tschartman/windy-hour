'use client'

import { useState, useEffect } from 'react'
import NeighborhoodTabs from './NeighborhoodTabs'
import RestaurantCard from './RestaurantCard'

export default function HappyHourExplorer({ neighborhoods, restaurants }) {
  const [currentNeighborhood, setCurrentNeighborhood] = useState(0)
  const [displayedRestaurants, setDisplayedRestaurants] = useState([])

  // Filter restaurants by selected neighborhood
  useEffect(() => {
    if (neighborhoods.length > 0) {
      const selectedNeighborhood = neighborhoods[currentNeighborhood]
      const filtered = restaurants.filter(
        restaurant => restaurant.neighborhood === selectedNeighborhood
      )
      setDisplayedRestaurants(filtered)
    }
  }, [currentNeighborhood, neighborhoods, restaurants])

  const handleNeighborhoodChange = (index) => {
    setCurrentNeighborhood(index)
  }

  return (
    <div>
      {/* Neighborhood Tabs */}
      <NeighborhoodTabs
        neighborhoods={neighborhoods}
        onNeighborhoodChange={handleNeighborhoodChange}
      />

      {/* Restaurant Cards Grid */}
      {displayedRestaurants.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {displayedRestaurants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏴‍☠️</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-600">
            Try selecting a different neighborhood or check back later.
          </p>
        </div>
      )}
    </div>
  )
}