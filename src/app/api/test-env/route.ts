import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const env = {
      NODE_ENV: process.env.NODE_ENV,
      PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? 'SET' : 'NOT SET',
      MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'NOT SET',
      DATABASE_URI: process.env.DATABASE_URI ? 'SET' : 'NOT SET',
    }
    
    return NextResponse.json({ 
      message: 'Environment variables check',
      env,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to check environment variables',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
