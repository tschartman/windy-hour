import { NextResponse } from 'next/server'
import { getNeighborhoods } from '../../../lib/database'

export async function GET() {
  try {
    const neighborhoods = await getNeighborhoods()
    return NextResponse.json(neighborhoods)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch neighborhoods' },
      { status: 500 }
    )
  }
}