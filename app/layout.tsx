import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { aeonikBold, aeonikBoldItalic, aeonikLight, aeonikLightItalic, aeonikRegular, aeonikRegularItalic } from './fonts'
import './globals.css'
import Favicons from '../components/header/Favicons'
import RichSchemaOrganization from '../components/header/RichSchemaOrganization'

// SEO metadata using Next.js Metadata API
export const metadata: Metadata = {
  metadataBase: new URL('https://wmtx.worldmobile.club/'), // Add your metadata base here
  title: 'World Mobile Club',
  description: 'Connecting everyone, everywhere with the first blockchain-powered mobile network World Mobile Chain. Join the movement to bridge the digital divide.',
  openGraph: {
    url: 'https://wmtx.worldmobile.club/', // Updated website URL
    title: 'World Mobile Club',
    description: 'Connecting everyone, everywhere with the first blockchain-powered mobile network World Mobile Chain.',
    images: [
      {
        url: '/images/world_mobile_club.png',
        alt: 'World Mobile Club Logo',
        type: 'image/png',
      },
    ],
    siteName: 'World Mobile Club',
  },
  twitter: {
    site: '@worldmobileclub', // Twitter site handle
    creator: '@coffee_wmtx', // Optional: Content creator's Twitter handle (if applicable)
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`
      ${aeonikBold.variable} 
      ${aeonikBoldItalic.variable} 
      ${aeonikLight.variable} 
      ${aeonikLightItalic.variable} 
      ${aeonikRegular.variable} 
      ${aeonikRegularItalic.variable}
    `}>
      <body>
        {/* SEO metadata */}
        <Favicons />
        <RichSchemaOrganization />
        {children}
        <GoogleAnalytics gaId="G-GGBKYMDYL1" />
      </body>
    </html>
  )
}
