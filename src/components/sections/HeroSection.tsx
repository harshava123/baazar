'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import FadeIn from '@/components/animations/FadeIn'

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen bg-black text-white flex items-center pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-16 items-center min-h-[calc(100vh-4rem)]">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-3 sm:space-y-4 lg:space-y-6 text-center sm:text-left">
            <FadeIn direction="left" delay={0.2}>
              <h1
                className="text-white"
                style={{
                  fontFamily: 'var(--font-staatliches)',
                  fontWeight: 'bold',
                  fontSize: 'clamp(22px, 4vw, 52px)',
                  lineHeight: '1.1',
                  letterSpacing: '0.2px',
                }}
              >
                EVERY LIVESTREAM IS A MOMENT.<br />
                EVERY PRODUCT, A DISCOVERY.
              </h1>
            </FadeIn>
            
            <FadeIn direction="left" delay={0.3}>
              <p
                className="text-white"
                style={{
                  fontFamily: 'var(--font-roboto)',
                  fontWeight: '400',
                  fontSize: 'clamp(18px, 3vw, 24px)',
                  lineHeight: '1.4',
                  letterSpacing: '0.1px',
                }}
              >
                JOIN CREATORS IN REAL-TIME.<br />
                SHOP AS YOU WATCH. WELCOME TO TRUULU.
              </p>
            </FadeIn>
          </div>

          {/* Right Image with Shop Now SVG */}
          <div className="flex justify-center lg:justify-end mt-3 sm:mt-4 lg:mt-0">
            <FadeIn direction="right" delay={0.6}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  width: 'clamp(280px, 35vw, 500px)',
                  height: 'clamp(350px, 50vw, 700px)',
                }}
              >
                <Image
                  src="/hero.jpg"
                  alt="Bazar Story Hero"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Shop Now SVG positioned at top right */}
                <div className="absolute top-4 right-4 z-20">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, x: 20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                    className="relative"
                    style={{
                      width: 'clamp(60px, 8vw, 120px)',
                      height: 'clamp(60px, 8vw, 120px)',
                    }}
                  >
                    <Image
                      src="/shop-now.svg"
                      alt="Shop Now"
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 sm:top-20 left-8 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-[#98FF98] rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-16 sm:bottom-20 right-8 sm:right-10 w-32 sm:w-48 h-32 sm:h-48 bg-[#98FF98] rounded-full opacity-3 blur-3xl"></div>
      </div>
    </section>
  )
}

export default HeroSection 