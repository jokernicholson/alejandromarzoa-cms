import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
  },
  admin: {
    defaultColumns: ['alt', 'filename', 'mimeType', 'filesize'],
  },
  access: {
    read: () => true, // Permitir acceso a todos los archivos media
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Vercel Blob Storage se encarga del almacenamiento
    // No necesitamos staticDir para Vercel Blob
  },
}
