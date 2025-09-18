import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Proyectos } from './collections/Proyectos'
import { SiteConfig } from './globals/SiteConfig'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    uploadHandlers: [
      {
        handler: 'vercel-blob',
        token: process.env.BLOB_READ_WRITE_TOKEN || '',
      },
    ],
  },
  collections: [Users, Media, Proyectos],
  globals: [SiteConfig],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    // 👇 Asegúrate en Vercel de tener MONGODB_URI con la DB correcta
    // ej: mongodb+srv://user:pass@cluster.mongodb.net/alejandromarzoa?retryWrites=true&w=majority&appName=Cluster0
    url: process.env.MONGODB_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
    seoPlugin({
      collections: ['proyectos'], // Aplicar SEO a la colección de proyectos
    }),
  ],
})