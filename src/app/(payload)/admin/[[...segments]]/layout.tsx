import { UploadHandlersProvider } from '@payloadcms/next/providers'
import { VercelBlobClientUploadHandler } from '@payloadcms/storage-vercel-blob'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UploadHandlersProvider
      handlers={[
        VercelBlobClientUploadHandler({
          token: process.env.BLOB_READ_WRITE_TOKEN || '',
        }),
      ]}
    >
      {children}
    </UploadHandlersProvider>
  )
}
