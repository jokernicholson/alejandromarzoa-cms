#!/usr/bin/env tsx

import mongoose from 'mongoose'
import { config } from 'dotenv'

config()

async function updateStatusField() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('La variable MONGODB_URI no está definida')
    }

    console.log('🚀 Conectando a MongoDB...')

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Conectado a MongoDB')

    const db = mongoose.connection.db
    
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
    await mongoose.disconnect().catch(() => {
      /* ignoramos errores al desconectar */
    })
    process.exit(0)
  }
}

updateStatusField()
