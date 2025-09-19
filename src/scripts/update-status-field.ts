#!/usr/bin/env tsx

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { config } from 'dotenv'

config()

async function updateStatusField() {
  try {
    console.log('🚀 Conectando a MongoDB...')
    
    const adapter = mongooseAdapter({
      url: process.env.MONGODB_URI || '',
    })
    
    await adapter.connect()
    console.log('✅ Conectado a MongoDB')

    const db = adapter.connection.db
    
    // Actualizar proyectos que no tienen _status
    console.log('📝 Actualizando proyectos...')
    const proyectosResult = await db.collection('proyectos').updateMany(
      { _status: { $exists: false } },
      { $set: { _status: 'published' } }
    )
    console.log(`✅ ${proyectosResult.modifiedCount} proyectos actualizados`)

    // Actualizar media que no tienen _status
    console.log('🎬 Actualizando archivos multimedia...')
    const mediaResult = await db.collection('media').updateMany(
      { _status: { $exists: false } },
      { $set: { _status: 'published' } }
    )
    console.log(`✅ ${mediaResult.modifiedCount} archivos multimedia actualizados`)

    console.log('🎉 Migración completada exitosamente!')
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error)
  } finally {
    process.exit(0)
  }
}

updateStatusField()
