import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

async function checkEnvVars() {
  console.log('🔍 Verificando variables de entorno...\n')

  console.log('📋 Variables de entorno locales:')
  console.log(`   BLOB_READ_WRITE_TOKEN: ${process.env.BLOB_READ_WRITE_TOKEN ? 'Configurado' : 'No configurado'}`)
  console.log(`   NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN: ${process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN ? 'Configurado' : 'No configurado'}`)
  console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? 'Configurado' : 'No configurado'}`)
  console.log(`   PAYLOAD_SECRET: ${process.env.PAYLOAD_SECRET ? 'Configurado' : 'No configurado'}`)

  // Verificar archivos media en la base de datos
  console.log('\n📋 Verificando archivos media en la base de datos:')
  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('✅ Conectado a MongoDB')
    
    const db = client.db('alejandromarzoa')
    
    // Verificar archivos media
    const mediaDocs = await db.collection('media').find({}).toArray()
    console.log(`   Total archivos media: ${mediaDocs.length}`)
    
    if (mediaDocs.length > 0) {
      console.log('\n📄 Primeros 3 archivos:')
      mediaDocs.slice(0, 3).forEach((doc, index) => {
        console.log(`   ${index + 1}. ${doc.filename}`)
        console.log(`      URL: ${doc.url}`)
        console.log(`      Alt: ${doc.alt}`)
        console.log(`      Creado: ${doc.createdAt}`)
        console.log('')
      })
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await client.close()
  }
}

checkEnvVars()
