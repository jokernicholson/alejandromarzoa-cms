import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function GET() {
  try {
    // Intentar conectar a MongoDB
    const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URI
    
    if (!mongoUri) {
      return NextResponse.json({ 
        error: 'MongoDB URI not configured',
        env: {
          MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'NOT SET',
          DATABASE_URI: process.env.DATABASE_URI ? 'SET' : 'NOT SET'
        }
      }, { status: 500 })
    }

    // Conectar a MongoDB
    await mongoose.connect(mongoUri)
    
    return NextResponse.json({ 
      message: 'MongoDB connection successful',
      timestamp: new Date().toISOString(),
      status: 'connected'
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'MongoDB connection failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
