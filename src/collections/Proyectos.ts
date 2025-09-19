import type { CollectionConfig } from 'payload'

export const Proyectos: CollectionConfig = {
  slug: 'proyectos',
  versions: {
    drafts: true, // Habilitar draft mode
  },
  admin: {
    useAsTitle: 'titulo',
    description: 'Gestiona los proyectos del portfolio',
    defaultColumns: ['titulo', 'tipo', 'plataforma', 'fecha', 'categoria', '_status'],
    group: 'Contenido',
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
      name: 'titulo',
      type: 'text',
      required: true,
      label: 'Título del Proyecto',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        width: '50%',
        description: 'URL amigable para el proyecto (ej: mi-proyecto)',
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            if (!value && data?.titulo) {
              return data.titulo
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'tipo',
      type: 'text',
      label: 'Tipo de Proyecto',
      admin: {
        description: 'Ej: Cortometraje, Serie documental, Publicidad',
      },
    },
    {
      name: 'plataforma',
      type: 'text',
      label: 'Plataforma/Cliente',
      admin: {
        description: 'Ej: Netflix, TV3, Boogaloo Films',
      },
    },
    {
      name: 'fecha',
      type: 'date',
      required: true,
      label: 'Fecha del Proyecto',
      admin: {
        description: 'Fecha de estreno o finalización',
      },
    },
    {
      name: 'categoria',
      type: 'select',
      hasMany: true,
      required: true,
      label: 'Categorías',
      options: [
        {
          label: 'Series y Cine',
          value: 'series-y-cine',
        },
        {
          label: 'Publicidad',
          value: 'publicidad',
        },
        {
          label: 'Documental',
          value: 'documental',
        },
      ],
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen Principal',
      admin: {
        description: 'Imagen de portada del proyecto',
      },
    },
    {
      name: 'videoloop',
      type: 'upload',
      relationTo: 'media',
      label: 'Video Loop',
      admin: {
        description: 'Video en loop para la tarjeta del proyecto',
      },
    },
    {
      name: 'video',
      type: 'text',
      label: 'URL del Video Principal',
      admin: {
        description: 'URL de YouTube o Vimeo del proyecto',
      },
    },
    {
      name: 'duracion',
      type: 'text',
      label: 'Duración',
      admin: {
        description: 'Ej: 8 episodios, 90 minutos, 30 segundos',
      },
    },
    {
      name: 'pais',
      type: 'text',
      label: 'País',
      admin: {
        description: 'País de producción (ej: España)',
      },
    },
    {
      name: 'director',
      type: 'array',
      label: 'Dirección',
      admin: {
        description: 'Director(es) del proyecto',
      },
      fields: [
        {
          name: 'nombre',
          type: 'text',
          required: true,
          label: 'Nombre del Director',
        },
      ],
    },
    // Campos personalizados dinámicos (movido antes de productoras)
    {
      name: 'camposPersonalizados',
      type: 'array',
      label: 'Campos Personalizados',
      admin: {
        description: 'Campos adicionales específicos del proyecto (ej: Guión, Música, Montaje, etc.)',
      },
      fields: [
        {
          name: 'etiqueta',
          type: 'text',
          required: true,
          label: 'Etiqueta del Campo',
          admin: {
            description: 'Ej: Guión, Música, Montaje, etc.',
          },
        },
        {
          name: 'valores',
          type: 'array',
          label: 'Valores del Campo',
          admin: {
            description: 'Múltiples valores para este campo (ej: varios guionistas)',
          },
          fields: [
            {
              name: 'valor',
              type: 'text',
              required: true,
              label: 'Valor',
              admin: {
                description: 'Un valor específico',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'productoras',
      type: 'array',
      label: 'Productoras',
      admin: {
        description: 'Lista de productoras del proyecto',
      },
      fields: [
        {
          name: 'nombre',
          type: 'text',
          required: true,
          label: 'Nombre de la Productora',
        },
      ],
    },
    {
      name: 'genero',
      type: 'text',
      label: 'Género',
      admin: {
        description: 'Género del proyecto (ej: Series documentales y deportes)',
        condition: (data) => !data.categoria?.includes('publicidad'),
      },
    },
    {
      name: 'sinopsis',
      type: 'textarea',
      label: 'Sinopsis',
      admin: {
        description: 'Descripción del proyecto',
        condition: (data) => !data.categoria?.includes('publicidad'),
      },
    },
    // Campos específicos para Publicidad
    {
      name: 'directorFotografia',
      type: 'array',
      label: 'Director de fotografía',
      admin: {
        description: 'Director(es) de fotografía del proyecto',
        condition: (data) => data.categoria?.includes('publicidad'),
      },
      fields: [
        {
          name: 'nombre',
          type: 'text',
          required: true,
          label: 'Nombre del director de fotografía',
        },
      ],
    },
    {
      name: 'sonido',
      type: 'array',
      label: 'Sonido',
      admin: {
        description: 'Responsable(s) de sonido del proyecto',
        condition: (data) => data.categoria?.includes('publicidad'),
      },
      fields: [
        {
          name: 'nombre',
          type: 'text',
          required: true,
          label: 'Nombre del Responsable de Sonido',
        },
      ],
    },
    {
      name: 'direccionArtistica',
      type: 'array',
      label: 'Dirección Artística',
      admin: {
        description: 'Director(es) artístico(s) del proyecto',
        condition: (data) => data.categoria?.includes('publicidad'),
      },
      fields: [
        {
          name: 'nombre',
          type: 'text',
          required: true,
          label: 'Nombre del Director Artístico',
        },
      ],
    },
    {
      name: 'destacado',
      type: 'checkbox',
      label: 'Proyecto Destacado',
      admin: {
        description: 'Marcar para mostrar en la página principal',
      },
      defaultValue: false,
    },
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Título',
      admin: {
        description: 'Título para SEO (opcional, usa el título si está vacío)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Descripción',
      admin: {
        description: 'Descripción para SEO',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generar meta título si no existe
        if (!data.metaTitle && data.titulo) {
          data.metaTitle = `${data.titulo} - Alejandro Marzoa`
        }

        // Auto-generar meta descripción si no existe
        if (!data.metaDescription && data.tipo && data.plataforma) {
          data.metaDescription = `${data.tipo} dirigido por Alejandro Marzoa para ${data.plataforma}`
        }

        return data
      },
    ],
  },
}
