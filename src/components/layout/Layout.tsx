'use client'

import React, { useEffect } from 'react'
import Header from './Header'
import { smoothScroll } from '@/lib/lenis'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Initialize smooth scroll
    return () => {
      // Cleanup on unmount
      smoothScroll.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      <main className="pt-16 md:pt-16">
        {children}
      </main>
    </div>
  )
}

export default Layout 