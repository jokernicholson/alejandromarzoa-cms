import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    cookies: {
      sameSite: 'Lax',
      secure: false,
    },
    lockTime: 600000, // 10 minutos
    maxLoginAttempts: 5,
    tokenExpiration: 7200, // 2 horas
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'password',
      type: 'text',
      required: true,
      minLength: 6,
    },
  ],
}
