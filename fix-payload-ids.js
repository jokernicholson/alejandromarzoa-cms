import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

async function fixPayloadIds() {
  console.log('🔧 Arreglando mapeo de IDs de Payload...\n')

  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('✅ Conectado a MongoDB')
    
    const db = client.db('alejandromarzoa')
    
    // 1. Verificar colecciones existentes
    console.log('📋 Colecciones disponibles:')
    const collections = await db.listCollections().toArray()
    collections.forEach(col => {
      console.log(`   - ${col.name}`)
    })
    
    // 2. Verificar documentos en proyectos
    console.log('\n📋 Documentos en colección "proyectos":')
    const proyectos = await db.collection('proyectos').find({}).toArray()
    console.log(`   Total: ${proyectos.length}`)
    
    proyectos.forEach((doc, index) => {
      console.log(`   ${index + 1}. ID: ${doc._id}`)
      console.log(`      Título: ${doc.titulo || 'Sin título'}`)
      console.log(`      Creado: ${doc.createdAt}`)
      console.log(`      Estado: ${doc._status || 'Sin estado'}`)
      console.log('')
    })
    
    // 3. Verificar versiones de proyectos
    console.log('📋 Documentos en colección "_proyectos_versions":')
    const versions = await db.collection('_proyectos_versions').find({}).toArray()
    console.log(`   Total: ${versions.length}`)
    
    versions.forEach((version, index) => {
      console.log(`   ${index + 1}. ID: ${version._id}`)
      console.log(`      Parent: ${version.parent}`)
      console.log(`      Versión: ${version.version}`)
      console.log(`      Título: ${version.titulo || 'Sin título'}`)
      console.log('')
    })
    
    // 4. Verificar si hay IDs problemáticos
    console.log('🔍 Verificando IDs problemáticos...')
    
    // Buscar documentos con IDs que no son ObjectId válidos
    const invalidIds = await db.collection('proyectos').find({
      _id: { $not: { $type: "objectId" } }
    }).toArray()
    
    if (invalidIds.length > 0) {
      console.log(`   ⚠️  Encontrados ${invalidIds.length} documentos con IDs inválidos:`)
      invalidIds.forEach((doc, index) => {
        console.log(`   ${index + 1}. ID: ${doc._id} (tipo: ${typeof doc._id})`)
        console.log(`      Título: ${doc.titulo || 'Sin título'}`)
      })
    } else {
      console.log('   ✅ Todos los IDs son válidos')
    }
    
    // 5. Verificar referencias rotas
    console.log('\n🔍 Verificando referencias rotas...')
    
    for (const proyecto of proyectos) {
      if (proyecto.media && Array.isArray(proyecto.media)) {
        for (const mediaId of proyecto.media) {
          const mediaDoc = await db.collection('media').findOne({ _id: mediaId })
          if (!mediaDoc) {
            console.log(`   ⚠️  Referencia rota en proyecto ${proyecto.titulo}:`)
            console.log(`      Media ID: ${mediaId} no existe`)
          }
        }
      }
    }
    
    // 6. Limpiar versiones huérfanas
    console.log('\n🧹 Limpiando versiones huérfanas...')
    
    const orphanedVersions = []
    for (const version of versions) {
      const parentExists = await db.collection('proyectos').findOne({ _id: version.parent })
      if (!parentExists) {
        orphanedVersions.push(version._id)
      }
    }
    
    if (orphanedVersions.length > 0) {
      console.log(`   🗑️  Eliminando ${orphanedVersions.length} versiones huérfanas...`)
      await db.collection('_proyectos_versions').deleteMany({
        _id: { $in: orphanedVersions }
      })
      console.log('   ✅ Versiones huérfanas eliminadas')
    } else {
      console.log('   ✅ No hay versiones huérfanas')
    }
    
    // 7. Regenerar índices si es necesario
    console.log('\n🔧 Regenerando índices...')
    
    try {
      await db.collection('proyectos').createIndex({ titulo: 1 })
      await db.collection('proyectos').createIndex({ createdAt: -1 })
      await db.collection('proyectos').createIndex({ _status: 1 })
      console.log('   ✅ Índices regenerados')
    } catch (error) {
      console.log(`   ⚠️  Error regenerando índices: ${error.message}`)
    }
    
    console.log('\n🎉 Proceso de limpieza completado!')

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await client.close()
  }
}

fixPayloadIds()
