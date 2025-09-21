import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

async function convertIdsToObjectId() {
  console.log('🔧 Convirtiendo IDs de string a ObjectId...\n')

  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('✅ Conectado a MongoDB')
    
    const db = client.db('alejandromarzoa')
    
    // 1. Convertir IDs en colección proyectos
    console.log('🔄 Convirtiendo IDs en colección "proyectos"...')
    
    const proyectos = await db.collection('proyectos').find({}).toArray()
    console.log(`   Encontrados ${proyectos.length} documentos`)
    
    for (const doc of proyectos) {
      if (typeof doc._id === 'string') {
        try {
          const newId = new ObjectId(doc._id)
          
          // Crear nuevo documento con ObjectId
          const newDoc = { ...doc, _id: newId }
          
          // Eliminar documento antiguo
          await db.collection('proyectos').deleteOne({ _id: doc._id })
          
          // Insertar documento con nuevo ID
          await db.collection('proyectos').insertOne(newDoc)
          
          console.log(`   ✅ Convertido: ${doc.titulo} (${doc._id} → ${newId})`)
        } catch (error) {
          console.log(`   ❌ Error convirtiendo ${doc.titulo}: ${error.message}`)
        }
      }
    }
    
    // 2. Convertir IDs en colección media
    console.log('\n🔄 Convirtiendo IDs en colección "media"...')
    
    const media = await db.collection('media').find({}).toArray()
    console.log(`   Encontrados ${media.length} documentos`)
    
    for (const doc of media) {
      if (typeof doc._id === 'string') {
        try {
          const newId = new ObjectId(doc._id)
          
          // Crear nuevo documento con ObjectId
          const newDoc = { ...doc, _id: newId }
          
          // Eliminar documento antiguo
          await db.collection('media').deleteOne({ _id: doc._id })
          
          // Insertar documento con nuevo ID
          await db.collection('media').insertOne(newDoc)
          
          console.log(`   ✅ Convertido: ${doc.filename} (${doc._id} → ${newId})`)
        } catch (error) {
          console.log(`   ❌ Error convirtiendo ${doc.filename}: ${error.message}`)
        }
      }
    }
    
    // 3. Convertir IDs en colección users
    console.log('\n🔄 Convirtiendo IDs en colección "users"...')
    
    const users = await db.collection('users').find({}).toArray()
    console.log(`   Encontrados ${users.length} documentos`)
    
    for (const doc of users) {
      if (typeof doc._id === 'string') {
        try {
          const newId = new ObjectId(doc._id)
          
          // Crear nuevo documento con ObjectId
          const newDoc = { ...doc, _id: newId }
          
          // Eliminar documento antiguo
          await db.collection('users').deleteOne({ _id: doc._id })
          
          // Insertar documento con nuevo ID
          await db.collection('users').insertOne(newDoc)
          
          console.log(`   ✅ Convertido: ${doc.email} (${doc._id} → ${newId})`)
        } catch (error) {
          console.log(`   ❌ Error convirtiendo ${doc.email}: ${error.message}`)
        }
      }
    }
    
    // 4. Actualizar referencias en documentos
    console.log('\n🔄 Actualizando referencias en documentos...')
    
    // Actualizar referencias de media en proyectos
    const proyectosActualizados = await db.collection('proyectos').find({}).toArray()
    for (const proyecto of proyectosActualizados) {
      if (proyecto.media && Array.isArray(proyecto.media)) {
        let needsUpdate = false
        const updatedMedia = []
        
        for (const mediaId of proyecto.media) {
          if (typeof mediaId === 'string') {
            try {
              const newMediaId = new ObjectId(mediaId)
              updatedMedia.push(newMediaId)
              needsUpdate = true
            } catch (error) {
              console.log(`   ⚠️  No se pudo convertir media ID: ${mediaId}`)
              updatedMedia.push(mediaId)
            }
          } else {
            updatedMedia.push(mediaId)
          }
        }
        
        if (needsUpdate) {
          await db.collection('proyectos').updateOne(
            { _id: proyecto._id },
            { $set: { media: updatedMedia } }
          )
          console.log(`   ✅ Actualizadas referencias en: ${proyecto.titulo}`)
        }
      }
    }
    
    console.log('\n🎉 Conversión de IDs completada!')
    
    // 5. Verificar resultado
    console.log('\n📋 Verificando resultado...')
    
    const proyectosFinales = await db.collection('proyectos').find({}).toArray()
    const mediaFinales = await db.collection('media').find({}).toArray()
    const usersFinales = await db.collection('users').find({}).toArray()
    
    console.log(`   Proyectos: ${proyectosFinales.length}`)
    console.log(`   Media: ${mediaFinales.length}`)
    console.log(`   Users: ${usersFinales.length}`)
    
    // Verificar que todos los IDs son ObjectIds
    const stringIds = proyectosFinales.filter(doc => typeof doc._id === 'string').length
    console.log(`   IDs como string: ${stringIds}`)
    
    if (stringIds === 0) {
      console.log('   ✅ Todos los IDs son ObjectIds válidos')
    } else {
      console.log('   ⚠️  Aún hay IDs como string')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await client.close()
  }
}

convertIdsToObjectId()
