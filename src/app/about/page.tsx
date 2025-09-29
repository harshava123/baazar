'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const AboutUsPage = () => {
  const bazarImages = [
    '/cityBazars/hyderabad.png',
    '/cityBazars/mumbai.png', 
    '/cityBazars/agra.png',
    '/cityBazars/kolkata.png',
    '/categories/clothing.png',
    '/categories/jewellery.jpg',
    '/categories/bags.png',
    '/categories/sneakers.png',
    '/categories/Electronics.png',
    '/categories/Accessories.png',
    '/categories/Perfumes.png',
    '/categories/makeup.png'
  ]

  const speechBubbles = [
    {
      text: "Get exclusive STREET-STYLE collections, one-of-a-kind handmade products, and LIMITED-EDITION pieces directly from local sellers.",
      boldWords: ["STREET-STYLE", "LIMITED-EDITION"]
    },
    {
      text: "Get EXCLUSIVE street-style collections, one-of-a-kind handmade products, and LIMITED-EDITION pieces directly from local sellers.",
      boldWords: ["EXCLUSIVE", "LIMITED-EDITION"]
    },
    {
      text: "Get exclusive street-style collections, ONE-OF-A-KIND handmade products, and limited-edition pieces directly from LOCAL SELLERS.",
      boldWords: ["ONE-OF-A-KIND", "LOCAL SELLERS"]
    }
  ]

  const formatText = (text: string, boldWords: string[]) => {
    let formattedText = text
    boldWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g')
      formattedText = formattedText.replace(regex, `**${word}**`)
    })
    
    return formattedText.split('**').map((part, index) => {
      if (boldWords.includes(part)) {
        return <strong key={index} className="font-bold">{part}</strong>
      }
      return part
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top green border */}
      <div className="h-1 bg-[#98FF98]"></div>
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-center py-6 px-4"
      >
        <Link 
          href="/"
          className="absolute left-4 p-2 hover:bg-[#98FF98] hover:bg-opacity-10 rounded-lg transition-colors duration-200"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-[#FF6B6B] leading-none font-staatliches" style={{ letterSpacing: '0.2px' }}>ABOUT US</h1>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Creative Image Gallery Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white bg-opacity-5 rounded-2xl p-6 md:p-8 border border-[#98FF98] border-opacity-20">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {bazarImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="relative aspect-square rounded-lg overflow-hidden group"
                >
                  <Image
                    src={image}
                    alt={`Bazar scene ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm md:text-base">
                Discover the vibrant world of local bazars and artisanal craftsmanship
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tagline Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal leading-none font-staatliches" style={{ letterSpacing: '0.2px' }}>
            <span className="text-[#FF6B6B]">SHOP. STYLE. STORY.</span>
            <br />
            <span className="text-white">MAKE IT YOURS</span>
          </h2>
        </motion.div>

        {/* Speech Bubbles Section - Staggered Left-Right */}
        <div className="relative mb-16 space-y-8">
          {speechBubbles.map((bubble, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              className={`w-full max-w-2xl lg:max-w-3xl ${
                index === 0 ? 'ml-auto mr-8' : 
                index === 1 ? 'mr-auto ml-8' : 
                'ml-auto mr-8'
              }`}
            >
              <div className="relative">
                <svg 
                  width="100%" 
                  height="auto" 
                  viewBox="0 0 684 256" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full max-w-2xl lg:max-w-3xl"
                >
                  <rect width="683.794" height="213.557" rx="20" fill="#98FF98"/>
                  <path d="M549.158 254.908L493.009 189.985C491.328 188.042 492.708 185.023 495.278 185.023H551.427C553.084 185.023 554.427 186.366 554.427 188.023V252.945C554.427 255.724 550.975 257.009 549.158 254.908Z" fill="#98FF98"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10">
                  <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-medium text-black">
                    {formatText(bubble.text, bubble.boldWords)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
      
        </motion.div>
      </div>
    </div>
  )
}

export default AboutUsPage 