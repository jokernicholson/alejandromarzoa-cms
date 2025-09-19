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
      // Para usuarios autenticados, mostrar todos los documentos
      if (req.user) {
        return true;
      }
      // Para usuarios no autenticados, solo mostrar documentos publicados
      return {
        _status: {
          equals: 'published',
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
