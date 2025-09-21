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
    staticDir: 'media',
    staticURL: '/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*'],
  },
}
