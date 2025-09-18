import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  draft: true, // Habilitar modo borrador
  admin: {
    defaultColumns: ['alt', 'filename', 'mimeType', 'filesize', '_status'],
  },
  access: {
    read: () => true,
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
