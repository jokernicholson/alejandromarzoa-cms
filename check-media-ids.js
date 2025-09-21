import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

async function checkMediaIds() {
  console.log('🔍 Verificando IDs de archivos media...\n')

  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('✅ Conectado a MongoDB')
    
    const db = client.db('alejandromarzoa')
    
    // Verificar archivos media
    console.log('📋 Archivos media en la base de datos:')
    const mediaDocs = await db.collection('media').find({}).toArray()
    console.log(`   Total: ${mediaDocs.length}`)
    
    // Verificar tipos de ID
    const stringIds = mediaDocs.filter(doc => typeof doc._id === 'string')
    const objectIds = mediaDocs.filter(doc => doc._id instanceof ObjectId)
    
    console.log(`\n📊 Tipos de ID:`)
    console.log(`   IDs como string: ${stringIds.length}`)
    console.log(`   IDs como ObjectId: ${objectIds.length}`)
    
    if (stringIds.length > 0) {
      console.log('\n⚠️  Archivos con IDs como string:')
      stringIds.forEach((doc, index) => {
        console.log(`   ${index + 1}. ${doc.filename}`)
        console.log(`      ID: ${doc._id} (tipo: ${typeof doc._id})`)
        console.log(`      URL: ${doc.url}`)
        console.log('')
      })
    }
    
    // Verificar referencias en proyectos
    console.log('🔍 Verificando referencias de media en proyectos...')
    const proyectos = await db.collection('proyectos').find({}).toArray()
    
    let brokenReferences = 0
    for (const proyecto of proyectos) {
      if (proyecto.media && Array.isArray(proyecto.media)) {
        for (const mediaId of proyecto.media) {
          const mediaDoc = await db.collection('media').findOne({ _id: mediaId })
          if (!mediaDoc) {
            brokenReferences++
            console.log(`   ❌ Referencia rota en proyecto "${proyecto.titulo}":`)
            console.log(`      Media ID: ${mediaId} no existe`)
          }
        }
      }
    }
    
    if (brokenReferences === 0) {
      console.log('   ✅ No hay referencias rotas')
    } else {
      console.log(`   ⚠️  Total referencias rotas: ${brokenReferences}`)
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await client.close()
  }
}

checkMediaIds()
