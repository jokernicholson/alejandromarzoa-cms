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
    read: ({ req, user }) => {
      // Para usuarios autenticados (admin panel), mostrar todos los documentos
      if (user) {
        return true;
      }
      // Para API pública, solo mostrar documentos publicados
      if (!req.user) {
        return {
          _status: {
            equals: 'published',
          },
        };
      }
      return true;
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
