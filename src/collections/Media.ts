import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  // versions: {
  //   drafts: true, // Temporalmente deshabilitado para migrar datos
  // },
  admin: {
    defaultColumns: ['alt', 'filename', 'mimeType', 'filesize'],
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
