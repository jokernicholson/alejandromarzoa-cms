import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'Basic endpoint working',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    platform: process.platform
  })
}
