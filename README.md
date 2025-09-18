# 🎬 Alejandro Marzoa CMS

Sistema de gestión de contenido (CMS) para el sitio web de Alejandro Marzoa, desarrollado con **Payload CMS 3.0** y desplegado en **Vercel**.

## 📋 Descripción

Este repositorio contiene el backend CMS que gestiona todo el contenido del sitio web de Alejandro Marzoa, incluyendo proyectos, medios (videos) y configuraciones del sitio. El frontend está desarrollado con **Astro** y se encuentra en un [repositorio separado](https://github.com/jokernicholson/alejandromarzoa-website).

## 🏗️ Arquitectura del Proyecto

### Repositorios
- **Backend CMS** (este repo): Payload CMS + Next.js + MongoDB + Vercel Blob
- **Frontend Website**: [Astro + Tailwind CSS](https://github.com/jokernicholson/alejandromarzoa-website) (repositorio separado)

### Stack Tecnológico

#### Backend (Este repositorio)
- **Framework**: Next.js 15.4.4
- **CMS**: Payload CMS 3.56.0
- **Base de datos**: MongoDB Atlas
- **Almacenamiento**: Vercel Blob Storage
- **Despliegue**: Vercel
- **Gestor de paquetes**: pnpm

#### Frontend (Repositorio separado)
- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Despliegue**: Vercel

## 🚀 Características

- ✅ **Gestión de contenido** completa con Payload CMS
- ✅ **Almacenamiento de videos** con Vercel Blob Storage
- ✅ **Base de datos** MongoDB Atlas
- ✅ **Despliegue automático** GitHub → Vercel
- ✅ **SEO optimizado** con plugin SEO de Payload
- ✅ **Editor de texto rico** con Lexical
- ✅ **Autenticación** de usuarios
- ✅ **API GraphQL** integrada

## 📁 Estructura del Proyecto

```
alejandromarzoa-cms/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Páginas del frontend
│   │   ├── (payload)/           # Admin panel de Payload
│   │   └── api/                 # API routes
│   ├── collections/             # Colecciones de Payload
│   │   ├── Media.ts            # Gestión de archivos multimedia
│   │   ├── Proyectos.ts        # Proyectos de Alejandro
│   │   └── Users.ts            # Usuarios del sistema
│   ├── globals/                # Configuraciones globales
│   │   └── SiteConfig.ts       # Configuración del sitio
│   └── payload.config.ts       # Configuración principal de Payload
├── media/                      # Archivos multimedia locales
├── tests/                      # Tests del proyecto
└── vercel.json                # Configuración de Vercel
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 22.x
- pnpm >= 10.0.0
- MongoDB Atlas (cuenta)
- Vercel (cuenta)

### 1. Clonar el repositorio
```bash
git clone https://github.com/jokernicholson/alejandromarzoa-cms.git
cd alejandromarzoa-cms
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Configurar variables de entorno
Copia el archivo de ejemplo y configura las variables:
```bash
cp env.production.example .env.local
```

Edita `.env.local` con tus valores:
```env
# Variables de entorno para desarrollo
NODE_ENV=development

# Payload CMS
PAYLOAD_SECRET=tu_secreto_payload_aqui

# Base de datos MongoDB
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/alejandromarzoa?retryWrites=true&w=majority&appName=Cluster0

# URLs públicas
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_PUBLIC_SITE_URL=http://localhost:3000

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=tu_token_vercel_blob_aqui
NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN=tu_token_vercel_blob_aqui
```

### 4. Ejecutar en desarrollo
```bash
pnpm dev
```

El CMS estará disponible en: http://localhost:3000/admin

## 🌐 Despliegue

### Vercel (Recomendado)

1. **Conectar repositorio a Vercel**
   - Ve a [Vercel Dashboard](https://vercel.com/dashboard)
   - Importa el repositorio desde GitHub
   - Configura las variables de entorno en Vercel

2. **Variables de entorno en Vercel**
   ```
   NODE_ENV=production
   PAYLOAD_SECRET=tu_secreto_payload_produccion
   MONGODB_URI=tu_uri_mongodb_atlas
   PAYLOAD_PUBLIC_SERVER_URL=https://alejandromarzoa-cms.vercel.app
   PAYLOAD_PUBLIC_SITE_URL=https://www.alejandromarzoa.com
   BLOB_READ_WRITE_TOKEN=tu_token_vercel_blob
   NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN=tu_token_vercel_blob
   ```

3. **Despliegue automático**
   - Cada push a `main` desplegará automáticamente
   - URL de producción: https://alejandromarzoa-cms.vercel.app

## 📊 Colecciones de Datos

### Media
- **Tipo**: Archivos multimedia (videos, imágenes)
- **Almacenamiento**: Vercel Blob Storage
- **Formatos soportados**: MP4, WebM, JPG, PNG, etc.

### Proyectos
- **Tipo**: Proyectos de Alejandro Marzoa
- **Campos**: Título, descripción, fecha, medios, SEO
- **SEO**: Optimizado automáticamente

### Users
- **Tipo**: Usuarios del sistema
- **Autenticación**: Email/password
- **Roles**: Admin, Editor

## 🔧 Scripts Disponibles

```bash
# Desarrollo
pnpm dev                 # Servidor de desarrollo
pnpm devsafe           # Desarrollo con limpieza de cache

# Construcción
pnpm build             # Build de producción
pnpm start             # Servidor de producción

# Payload CMS
pnpm payload           # CLI de Payload
pnpm generate:types    # Generar tipos TypeScript
pnpm generate:importmap # Generar mapa de importaciones

# Testing
pnpm test              # Ejecutar todos los tests
pnpm test:int          # Tests de integración
pnpm test:e2e          # Tests end-to-end

# Linting
pnpm lint              # Verificar código
```

## 🔐 Seguridad

- ✅ **Credenciales**: Todas las credenciales están en variables de entorno
- ✅ **MongoDB**: Conexión segura con MongoDB Atlas
- ✅ **Vercel Blob**: Tokens de acceso seguros
- ✅ **HTTPS**: Despliegue con certificados SSL automáticos

## 📈 Monitoreo y Logs

- **Vercel Analytics**: Métricas de rendimiento
- **MongoDB Atlas**: Monitoreo de base de datos
- **Vercel Blob**: Estadísticas de almacenamiento

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🔗 Enlaces Relacionados

- **Frontend Website**: [Repositorio Astro](https://github.com/jokernicholson/alejandromarzoa-website)
- **Sitio Web**: https://www.alejandromarzoa.com
- **CMS Admin**: https://alejandromarzoa-cms.vercel.app/admin
- **Payload CMS**: https://payloadcms.com
- **Vercel**: https://vercel.com

## 👨‍💻 Autor

**David Medina**
- GitHub: [@jokernicholson](https://github.com/jokernicholson)
- Email: david@davidmedina.es

---

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación de Payload CMS](https://payloadcms.com/docs)
2. Consulta los [issues del repositorio](https://github.com/jokernicholson/alejandromarzoa-cms/issues)
3. Contacta al desarrollador: david@davidmedina.es

---

*Desarrollado con ❤️ para Alejandro Marzoa*