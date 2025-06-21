import { NextResponse } from 'next/server'
import { getRestaurantsByNeighborhood } from '../../../../lib/database'

export async function GET(request, { params }) {
  try {
    const { neighborhood } = params
    const restaurants = await getRestaurantsByNeighborhood(neighborhood)
    return NextResponse.json(restaurants)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch restaurants' },
      { status: 500 }
    )
  }
}