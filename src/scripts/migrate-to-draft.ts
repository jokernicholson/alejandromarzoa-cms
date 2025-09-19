import { getPayload } from 'payload'
import config from '../payload.config'

async function migrateToDraft() {
  console.log('🚀 Iniciando migración a draft mode...')
  
  const payload = await getPayload({ config })
  
  try {
    // Migrar proyectos
    console.log('📝 Migrando proyectos...')
    const proyectos = await payload.find({
      collection: 'proyectos',
      limit: 1000,
    })
    
    console.log(`Encontrados ${proyectos.docs.length} proyectos`)
    
    for (const proyecto of proyectos.docs) {
      await payload.update({
        collection: 'proyectos',
        id: proyecto.id,
        data: {
          _status: 'published'
        }
      })
      console.log(`✅ Proyecto "${proyecto.titulo}" marcado como publicado`)
    }
    
    // Migrar media
    console.log('🎬 Migrando archivos multimedia...')
    const media = await payload.find({
      collection: 'media',
      limit: 1000,
    })
    
    console.log(`Encontrados ${media.docs.length} archivos multimedia`)
    
    for (const archivo of media.docs) {
      await payload.update({
        collection: 'media',
        id: archivo.id,
        data: {
          _status: 'published'
        }
      })
      console.log(`✅ Archivo "${archivo.filename || archivo.alt}" marcado como publicado`)
    }
    
    console.log('🎉 ¡Migración completada exitosamente!')
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error)
  } finally {
    process.exit(0)
  }
}

migrateToDraft()
