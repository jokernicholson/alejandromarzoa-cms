import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'Hello from Payload CMS!',
    timestamp: new Date().toISOString(),
    status: 'working'
  })
}
