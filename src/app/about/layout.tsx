import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Bazar Story',
  description: 'Discover the story behind Bazar Story. We connect traditional artisans with modern consumers, bringing authentic local bazar experiences to your doorstep.',
  keywords: 'about us, bazar story, local sellers, handmade products, street style, limited edition',
  openGraph: {
    title: 'About Us - Bazar Story',
    description: 'Discover the story behind Bazar Story. We connect traditional artisans with modern consumers.',
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 