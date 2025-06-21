import { NextResponse } from 'next/server'
import { getRestaurants } from '../../../lib/database'

export async function GET() {
  try {
    const restaurants = await getRestaurants()
    return NextResponse.json(restaurants)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch restaurants' },
      { status: 500 }
    )
  }
}
