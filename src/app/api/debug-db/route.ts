import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  try {
    return NextResponse.json({ 
      status: 'OK',
      mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
      payloadSecret: process.env.PAYLOAD_SECRET ? 'Set' : 'Not set',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ 
      error: String(error),
      mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not set'
    }, { status: 500 })
  }
}
