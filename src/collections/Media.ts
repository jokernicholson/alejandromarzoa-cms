import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  // versions: {
  //   drafts: true, // Temporalmente deshabilitado para debug
  // },
  admin: {
    defaultColumns: ['alt', 'filename', 'mimeType', 'filesize'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Si hay usuario autenticado, puede ver todos los documentos
      if (user) return true
      // Si no hay usuario, solo puede ver documentos publicados
      return {
        _status: {
          equals: 'published'
        }
      }
    },
    create: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden crear
    update: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden actualizar
    delete: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden eliminar
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
