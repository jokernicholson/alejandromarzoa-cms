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
    read: ({ req }) => {
      if (req.user) {
        return true; // Usuarios autenticados ven todos los documentos
      }
      return {
        _status: {
          equals: 'published', // Usuarios no autenticados solo ven publicados
        },
      };
    },
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
