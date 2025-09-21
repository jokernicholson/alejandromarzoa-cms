import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

async function debugOrphanedDoc() {
  console.log('🔍 Debuggeando documento huérfano...\n')

  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('✅ Conectado a MongoDB')
    
    const db = client.db('alejandromarzoa')
    
    // ID del documento problemático
    const problemId = '68cbf0736d46b687fb91d313'
    console.log(`🔍 Buscando documento con ID: ${problemId}`)
    
    // Buscar en todas las colecciones
    const collections = ['proyectos', '_proyectos_versions', 'media', '_media_versions', 'users']
    
    for (const collectionName of collections) {
      console.log(`\n📋 Buscando en colección: ${collectionName}`)
      
      try {
        const doc = await db.collection(collectionName).findOne({ _id: problemId })
        if (doc) {
          console.log(`   ✅ Encontrado en ${collectionName}:`)
          console.log(`      Título: ${doc.titulo || doc.filename || doc.email || 'Sin título'}`)
          console.log(`      Creado: ${doc.createdAt}`)
          console.log(`      Estado: ${doc._status || 'Sin estado'}`)
        } else {
          console.log(`   ❌ No encontrado en ${collectionName}`)
        }
      } catch (error) {
        console.log(`   ⚠️  Error buscando en ${collectionName}: ${error.message}`)
      }
    }
    
    // Buscar referencias a este ID en otros documentos
    console.log('\n🔍 Buscando referencias a este ID en otros documentos...')
    
    for (const collectionName of collections) {
      try {
        const refs = await db.collection(collectionName).find({
          $or: [
            { 'media': { $elemMatch: { $eq: problemId } } },
            { 'proyecto': problemId },
            { 'parent': problemId },
            { 'versionOf': problemId }
          ]
        }).toArray()
        
        if (refs.length > 0) {
          console.log(`\n📋 Referencias encontradas en ${collectionName}:`)
          refs.forEach((ref, index) => {
            console.log(`   ${index + 1}. ID: ${ref._id}`)
            console.log(`      Título: ${ref.titulo || ref.filename || ref.email || 'Sin título'}`)
            console.log(`      Referencia: ${JSON.stringify(ref.media || ref.proyecto || ref.parent || ref.versionOf)}`)
          })
        }
      } catch (error) {
        console.log(`   ⚠️  Error buscando referencias en ${collectionName}: ${error.message}`)
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await client.close()
  }
}

debugOrphanedDoc()
