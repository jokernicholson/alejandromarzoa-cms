import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

async function removeStatusFromMedia() {
  console.log('🗑️ Eliminando campo _status de archivos media...\n')

  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('✅ Conectado a MongoDB')
    
    const db = client.db('alejandromarzoa')
    
    // Obtener archivos media
    const mediaDocs = await db.collection('media').find({}).toArray()
    console.log(`📋 Encontrados ${mediaDocs.length} archivos media`)
    
    // Eliminar campo _status de todos los archivos media
    const result = await db.collection('media').updateMany(
      { _status: { $exists: true } },
      { $unset: { _status: "" } }
    )
    
    console.log(`✅ Campo _status eliminado de ${result.modifiedCount} archivos media`)
    
    // Verificar resultado
    const mediaAfter = await db.collection('media').find({}).toArray()
    const withStatus = mediaAfter.filter(doc => doc._status)
    const withoutStatus = mediaAfter.filter(doc => !doc._status)
    
    console.log(`\n📊 Resultado:`)
    console.log(`   Con _status: ${withStatus.length}`)
    console.log(`   Sin _status: ${withoutStatus.length}`)
    
    if (withStatus.length === 0) {
      console.log('   ✅ Todos los archivos media sin campo _status')
    } else {
      console.log('   ⚠️  Algunos archivos aún tienen _status')
    }
    
    // Mostrar algunos ejemplos
    console.log('\n📄 Primeros 3 archivos actualizados:')
    mediaAfter.slice(0, 3).forEach((doc, index) => {
      console.log(`   ${index + 1}. ${doc.filename}`)
      console.log(`      URL: ${doc.url}`)
      console.log(`      Alt: ${doc.alt}`)
      console.log(`      Estado: ${doc._status || 'Sin estado (correcto)'}`)
      console.log('')
    })

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await client.close()
  }
}

removeStatusFromMedia()
