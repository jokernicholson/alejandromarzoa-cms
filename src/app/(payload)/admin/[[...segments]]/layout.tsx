'use client'

import { UploadHandlersProvider } from '@payloadcms/next/layouts'
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
          token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN || '',
        }),
      ]}
    >
      {children}
    </UploadHandlersProvider>
  )
}
