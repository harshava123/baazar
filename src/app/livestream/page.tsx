import { Metadata } from 'next'
import LivestreamSectionWebRTC from '@/components/sections/livestream/LivestreamSection-webrtc'

export const metadata: Metadata = {
  title: 'Livestream - Bazar Story',
  description: 'Watch live product showcases and discover unique items from our featured streamers.',
  keywords: ['livestream', 'live shopping', 'products', 'fashion', 'jewelry'],
}

export default function LivestreamPage() {
  return (
    <main className="min-h-screen bg-black">
      <LivestreamSectionWebRTC />
    </main>
  )
}
