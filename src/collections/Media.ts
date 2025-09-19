import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  // versions: {
  //   drafts: true, // Temporalmente deshabilitado para mostrar datos sin login
  // },
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
