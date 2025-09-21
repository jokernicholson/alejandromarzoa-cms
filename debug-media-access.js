import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

async function debugMediaAccess() {
  console.log('🔍 Debuggeando acceso a archivos media...\n')

  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('✅ Conectado a MongoDB')
    
    const db = client.db('alejandromarzoa')
    
    // Verificar archivos media
    console.log('📋 Archivos media en la base de datos:')
    const mediaDocs = await db.collection('media').find({}).toArray()
    console.log(`   Total: ${mediaDocs.length}`)
    
    // Verificar campos importantes
    console.log('\n📊 Análisis de campos:')
    
    const withStatus = mediaDocs.filter(doc => doc._status)
    const withoutStatus = mediaDocs.filter(doc => !doc._status)
    const withUrl = mediaDocs.filter(doc => doc.url)
    const withoutUrl = mediaDocs.filter(doc => !doc.url)
    const withFilename = mediaDocs.filter(doc => doc.filename)
    const withoutFilename = mediaDocs.filter(doc => !doc.filename)
    
    console.log(`   Con _status: ${withStatus.length}`)
    console.log(`   Sin _status: ${withoutStatus.length}`)
    console.log(`   Con URL: ${withUrl.length}`)
    console.log(`   Sin URL: ${withoutUrl.length}`)
    console.log(`   Con filename: ${withFilename.length}`)
    console.log(`   Sin filename: ${withoutFilename.length}`)
    
    // Mostrar algunos ejemplos
    console.log('\n📄 Primeros 3 archivos:')
    mediaDocs.slice(0, 3).forEach((doc, index) => {
      console.log(`   ${index + 1}. ${doc.filename}`)
      console.log(`      ID: ${doc._id}`)
      console.log(`      URL: ${doc.url}`)
      console.log(`      Alt: ${doc.alt}`)
      console.log(`      Estado: ${doc._status || 'Sin estado'}`)
      console.log(`      Creado: ${doc.createdAt}`)
      console.log(`      Actualizado: ${doc.updatedAt || 'Sin actualizar'}`)
      console.log('')
    })
    
    // Verificar si hay problemas con Vercel Blob URLs
    const blobUrls = mediaDocs.filter(doc => doc.url && doc.url.includes('blob.vercel-storage.com'))
    const localUrls = mediaDocs.filter(doc => doc.url && !doc.url.includes('blob.vercel-storage.com'))
    
    console.log('🔗 Análisis de URLs:')
    console.log(`   URLs de Vercel Blob: ${blobUrls.length}`)
    console.log(`   URLs locales: ${localUrls.length}`)
    
    if (localUrls.length > 0) {
      console.log('\n⚠️  Archivos con URLs locales:')
      localUrls.forEach((doc, index) => {
        console.log(`   ${index + 1}. ${doc.filename}: ${doc.url}`)
      })
    }
    
    // Verificar si hay archivos sin estado pero que deberían ser visibles
    console.log('\n🔍 Archivos sin estado (podrían no ser visibles):')
    withoutStatus.forEach((doc, index) => {
      console.log(`   ${index + 1}. ${doc.filename}`)
      console.log(`      URL: ${doc.url}`)
      console.log(`      Creado: ${doc.createdAt}`)
    })

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await client.close()
  }
}

debugMediaAccess()
