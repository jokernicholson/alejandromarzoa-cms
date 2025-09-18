import { put } from '@vercel/blob'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

async function uploadVideos() {
  try {
    console.log('🚀 Iniciando subida de videos a Vercel Blob Storage...')
    console.log('☁️  BLOB_READ_WRITE_TOKEN:', process.env.BLOB_READ_WRITE_TOKEN ? 'Set' : 'Not set')
    
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN no está configurado')
    }
    
    // Directorio de archivos locales
    const mediaDir = path.join(process.cwd(), 'media')
    
    if (!fs.existsSync(mediaDir)) {
      throw new Error(`Directorio media no encontrado: ${mediaDir}`)
    }
    
    // Listar archivos en el directorio media
    const files = fs.readdirSync(mediaDir)
    const videoFiles = files.filter(file => file.endsWith('.webm'))
    
    console.log(`📁 Encontrados ${videoFiles.length} archivos de video`)
    
    const results = []
    
    for (const filename of videoFiles) {
      const localPath = path.join(mediaDir, filename)
      
      console.log(`📤 Subiendo ${filename}...`)
      
      try {
        // Leer el archivo local
        const fileBuffer = fs.readFileSync(localPath)
        
        // Subir a Vercel Blob Storage
        const blob = await put(filename, fileBuffer, {
          access: 'public',
        })
        
        results.push({
          filename,
          url: blob.url,
          size: fileBuffer.length
        })
        
        console.log(`✅ ${filename} subido exitosamente: ${blob.url}`)
      } catch (error) {
        console.error(`❌ Error subiendo ${filename}:`, error)
      }
    }
    
    console.log('\n🎉 Subida completada!')
    console.log('\n📋 Resumen:')
    results.forEach(result => {
      console.log(`  - ${result.filename}: ${result.url}`)
    })
    
    // Guardar resultados en un archivo JSON
    fs.writeFileSync('upload-results.json', JSON.stringify(results, null, 2))
    console.log('\n💾 Resultados guardados en upload-results.json')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error en la subida:', error)
    process.exit(1)
  }
}

uploadVideos()
