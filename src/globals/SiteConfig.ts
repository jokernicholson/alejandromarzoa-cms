import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  label: 'Configuración del Sitio',
  admin: {
    group: 'Configuración',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      label: 'Nombre del Sitio',
      defaultValue: 'Alejandro Marzoa',
    },
    {
      name: 'siteDescription',
      type: 'text',
      required: true,
      label: 'Descripción del Sitio',
      defaultValue: 'Director y Realizador',
    },
    {
      name: 'siteUrl',
      type: 'text',
      required: true,
      label: 'URL del Sitio',
      defaultValue: 'https://alejandromarzoa.com',
    },
    {
      name: 'heroText',
      type: 'textarea',
      label: 'Texto Principal',
      defaultValue: 'Dirijo proyectos de ficción y documental, y también trabajo como realizador en televisión.',
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Email de Contacto',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Enlaces Sociales',
      fields: [
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn',
        },
        {
          name: 'vimeo',
          type: 'text',
          label: 'Vimeo',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen Meta',
          admin: {
            description: 'Imagen por defecto para redes sociales',
          },
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          label: 'Favicon',
        },
      ],
    },
  ],
}
