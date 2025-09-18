/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'
import { UploadHandlersProvider } from '@payloadcms/next/layouts'
import { VercelBlobClientUploadHandler } from '@payloadcms/storage-vercel-blob/client'

import config from '@payload-config'
import { generatePageMetadata } from '@payloadcms/next/views'

type Args = {
  children: React.ReactNode
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Layout = ({ children, params, searchParams }: Args) => (
  <UploadHandlersProvider
    handlers={[
      {
        handler: VercelBlobClientUploadHandler,
      },
    ]}
  >
    {children}
  </UploadHandlersProvider>
)

export default Layout
