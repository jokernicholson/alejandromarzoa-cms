/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { generatePageMetadata } from '@payloadcms/next/views'

type LayoutProps = {
  children: React.ReactNode
}

type MetadataArgs = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: MetadataArgs): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Layout = ({ children }: LayoutProps) => children

export default Layout
