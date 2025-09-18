import { getPayload } from 'payload'
// import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { put } from '@vercel/blob'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

async function migrateToBlob() {
  try {
    console.log('🚀 Iniciando migración a Vercel Blob Storage...')
    console.log('🔑 PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? `Set (${process.env.PAYLOAD_SECRET.length} chars)` : 'Not set')
    console.log('🗄️  MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set')
    console.log('☁️  BLOB_READ_WRITE_TOKEN:', process.env.BLOB_READ_WRITE_TOKEN ? 'Set' : 'Not set')
    
    // Inicializar Payload
    const payload = await getPayload({
      config: (await import('../payload.config')).default,
    })

    // Obtener todos los archivos de media
    const mediaFiles = await payload.find({
      collection: 'media',
      limit: 1000,
    })

    console.log(`📁 Encontrados ${mediaFiles.docs.length} archivos de media`)

    // Directorio de archivos locales
    const mediaDir = path.join(process.cwd(), 'media')
    
    for (const media of mediaFiles.docs) {
      if (media.filename) {
        const localPath = path.join(mediaDir, media.filename)
        
        if (fs.existsSync(localPath)) {
          console.log(`📤 Subiendo ${media.filename}...`)
          
          try {
            // Leer el archivo local
            const fileBuffer = fs.readFileSync(localPath)
            
            // Subir a Vercel Blob Storage
            const blob = await put(media.filename, fileBuffer, {
              access: 'public',
            })
            
            // Actualizar el registro en la base de datos
            await payload.update({
              collection: 'media',
              id: media.id,
              data: {
                url: blob.url,
              },
            })
            
            console.log(`✅ ${media.filename} subido exitosamente: ${blob.url}`)
          } catch (error) {
            console.error(`❌ Error subiendo ${media.filename}:`, error)
          }
        } else {
          console.log(`⚠️  Archivo no encontrado: ${localPath}`)
        }
      }
    }
    
    console.log('🎉 Migración completada!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error en la migración:', error)
    process.exit(1)
  }
}

migrateToBlob()
