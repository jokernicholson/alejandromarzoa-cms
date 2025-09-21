import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

async function debugMedia() {
  console.log('🔍 Debuggeando archivos media...\n')

  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('✅ Conectado a MongoDB')
    
    const db = client.db('alejandromarzoa')
    
    // Verificar colecciones de media
    console.log('📊 Colecciones de media disponibles:')
    const collections = await db.listCollections().toArray()
    const mediaCollections = collections.filter(col => 
      col.name.includes('media') || col.name.includes('Media')
    )
    mediaCollections.forEach(col => {
      console.log(`   - ${col.name}`)
    })
    
    // Verificar documentos en colección media
    console.log('\n📋 Documentos en "media":')
    const mediaDocs = await db.collection('media').find({}).toArray()
    console.log(`   Total: ${mediaDocs.length}`)
    
    mediaDocs.forEach((doc, index) => {
      console.log(`   ${index + 1}. ID: ${doc._id}`)
      console.log(`      Filename: ${doc.filename || 'sin filename'}`)
      console.log(`      Alt: ${doc.alt || 'sin alt'}`)
      console.log(`      URL: ${doc.url || 'sin url'}`)
      console.log(`      Creado: ${doc.createdAt}`)
      console.log('')
    })
    
    // Verificar versiones de media
    console.log('📋 Documentos en "_media_versions":')
    const mediaVersions = await db.collection('_media_versions').find({}).toArray()
    console.log(`   Total: ${mediaVersions.length}`)
    
    mediaVersions.forEach((version, index) => {
      console.log(`   ${index + 1}. ID: ${version._id}`)
      console.log(`      Parent: ${version.parent}`)
      console.log(`      Versión: ${version.version}`)
      console.log(`      Filename: ${version.filename || 'sin filename'}`)
      console.log('')
    })
    
    // Verificar configuración de Vercel Blob
    console.log('🔧 Verificando configuración de Vercel Blob:')
    console.log(`   BLOB_READ_WRITE_TOKEN: ${process.env.BLOB_READ_WRITE_TOKEN ? 'Configurado' : 'No configurado'}`)
    console.log(`   NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN: ${process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN ? 'Configurado' : 'No configurado'}`)

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await client.close()
  }
}

debugMedia()
