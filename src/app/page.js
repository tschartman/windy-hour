import { getNeighborhoods, getRestaurants } from '../lib/database'
import HappyHourExplorer from '../components/HappyHourExplorer'

export default async function HomePage() {
  try {
    const [neighborhoods, restaurants] = await Promise.all([
      getNeighborhoods(),
      getRestaurants()
    ])

    return (
      <HappyHourExplorer 
        neighborhoods={neighborhoods} 
        restaurants={restaurants} 
      />
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Unable to load data
        </h2>
        <p className="text-gray-600">
          Please check your database connection and try again.
        </p>
      </div>
    )
  }
}