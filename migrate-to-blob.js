import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

async function migrateToBlob() {
  console.log('🔄 Migrando archivos media a Vercel Blob Storage...\n')

  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('✅ Conectado a MongoDB')
    
    const db = client.db('alejandromarzoa')
    
    // Obtener archivos media
    const mediaDocs = await db.collection('media').find({}).toArray()
    console.log(`📋 Encontrados ${mediaDocs.length} archivos para migrar`)
    
    // Actualizar URLs a Vercel Blob Storage
    for (const doc of mediaDocs) {
      if (doc.url && doc.url.startsWith('/videos/')) {
        const filename = doc.url.replace('/videos/', '')
        const blobUrl = `https://blob.vercel-storage.com/${filename}`
        
        console.log(`🔄 Migrando: ${doc.filename}`)
        console.log(`   De: ${doc.url}`)
        console.log(`   A: ${blobUrl}`)
        
        await db.collection('media').updateOne(
          { _id: doc._id },
          { 
            $set: { 
              url: blobUrl,
              updatedAt: new Date()
            }
          }
        )
        
        console.log('   ✅ Migrado exitosamente\n')
      }
    }
    
    console.log('🎉 Migración completada!')

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await client.close()
  }
}

migrateToBlob()
