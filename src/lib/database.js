import clientPromise from './mongodb'

export async function getRestaurants() {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DATABASE)
    
    const restaurants = await db
      .collection('restaurants')
      .find({})
      .sort({ neighborhood: 1, name: 1 })
      .toArray()
    
    // Convert MongoDB ObjectIds to strings for JSON serialization
    return restaurants.map(restaurant => ({
      ...restaurant,
      _id: restaurant._id.toString(),
      createdAt: restaurant.createdAt?.toISOString() || null,
      lastUpdated: restaurant.lastUpdated?.toISOString() || null,
    }))
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch restaurants')
  }
}

export async function getRestaurantsByNeighborhood(neighborhood) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DATABASE)
    
    const restaurants = await db
      .collection('restaurants')
      .find({ neighborhood })
      .sort({ name: 1 })
      .toArray()
    
    return restaurants.map(restaurant => ({
      ...restaurant,
      _id: restaurant._id.toString(),
      createdAt: restaurant.createdAt?.toISOString() || null,
      lastUpdated: restaurant.lastUpdated?.toISOString() || null,
    }))
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch restaurants')
  }
}

export async function getNeighborhoods() {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DATABASE)
    
    const neighborhoods = await db
      .collection('restaurants')
      .distinct('neighborhood')
    
    return neighborhoods.sort()
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch neighborhoods')
  }
}