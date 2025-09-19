import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  versions: {
    drafts: true, // Habilitar draft mode
  },
  admin: {
    defaultColumns: ['alt', 'filename', 'mimeType', 'filesize', '_status'],
  },
  access: {
    read: () => true, // Público para el frontend
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
