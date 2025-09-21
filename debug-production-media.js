import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

async function debugProductionMedia() {
  console.log('🔍 Debuggeando archivos media en PRODUCCIÓN...\n')

  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('✅ Conectado a MongoDB de producción')
    
    const db = client.db('alejandromarzoa')
    
    // Verificar configuración de Vercel Blob en producción
    console.log('🔧 Verificando configuración de Vercel Blob:')
    console.log(`   BLOB_READ_WRITE_TOKEN: ${process.env.BLOB_READ_WRITE_TOKEN ? 'Configurado' : 'No configurado'}`)
    console.log(`   NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN: ${process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN ? 'Configurado' : 'No configurado'}`)
    
    // Verificar archivos media
    console.log('\n📋 Archivos media en producción:')
    const mediaDocs = await db.collection('media').find({}).toArray()
    console.log(`   Total: ${mediaDocs.length}`)
    
    // Verificar si tienen URLs de Vercel Blob
    const blobUrls = mediaDocs.filter(doc => doc.url && doc.url.includes('blob.vercel-storage.com'))
    const localUrls = mediaDocs.filter(doc => doc.url && !doc.url.includes('blob.vercel-storage.com'))
    
    console.log(`   URLs de Vercel Blob: ${blobUrls.length}`)
    console.log(`   URLs locales: ${localUrls.length}`)
    
    // Mostrar algunos ejemplos
    console.log('\n📄 Ejemplos de URLs:')
    mediaDocs.slice(0, 3).forEach((doc, index) => {
      console.log(`   ${index + 1}. ${doc.filename}`)
      console.log(`      URL: ${doc.url}`)
      console.log(`      Alt: ${doc.alt}`)
      console.log('')
    })
    
    // Verificar si hay problemas de acceso
    console.log('🔍 Verificando campos de acceso:')
    const accessIssues = mediaDocs.filter(doc => 
      !doc.url || 
      !doc.filename || 
      !doc.alt ||
      doc.url === '' ||
      doc.filename === ''
    )
    
    if (accessIssues.length > 0) {
      console.log(`   ⚠️  Archivos con problemas: ${accessIssues.length}`)
      accessIssues.forEach((doc, index) => {
        console.log(`   ${index + 1}. ID: ${doc._id}`)
        console.log(`      Filename: "${doc.filename}"`)
        console.log(`      URL: "${doc.url}"`)
        console.log(`      Alt: "${doc.alt}"`)
        console.log('')
      })
    } else {
      console.log('   ✅ Todos los archivos tienen campos completos')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await client.close()
  }
}

debugProductionMedia()
