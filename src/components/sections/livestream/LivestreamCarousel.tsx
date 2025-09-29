'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Eye, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Swiper as SwiperType } from 'swiper'
import Image from 'next/image'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface LivestreamItem {
  id: string
  title: string
  streamerName: string
  streamerAvatar: string
  viewers: string
  isLive: boolean
  thumbnail: string
  videoSrc: string
  category: string
}

interface LivestreamCarouselProps {
  title: string
  items: LivestreamItem[]
  category: string
}

const SmallLivestreamCard: React.FC<{ item: LivestreamItem }> = ({ item }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = React.useState(false)

  // Handle video loading
  const handleVideoLoaded = () => {
    setVideoLoaded(true)
    // Try to play once loaded
    if (videoRef.current) {
      playVideo()
    }
  }

  // Handle when video can start playing
  const handleCanPlay = () => {
    if (videoRef.current && !videoLoaded) {
      setVideoLoaded(true)
      playVideo()
    }
  }

  // Handle when video can play through
  const handleCanPlayThrough = () => {
    if (videoRef.current) {
      playVideo()
    }
  }

  // Robust video play function with multiple retry attempts
  const playVideo = React.useCallback(() => {
    if (videoRef.current && videoLoaded) {
      const attemptPlay = (attempts = 0) => {
        if (attempts >= 5) return // Max 5 attempts

        const playPromise = videoRef.current?.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Video started playing successfully
            })
            .catch(() => {
              // If autoplay fails, try again with increasing delay
              const delay = Math.min(500 + (attempts * 300), 2000)
              setTimeout(() => {
                if (videoRef.current) {
                  attemptPlay(attempts + 1)
                }
              }, delay)
            })
        }
      }

      // Start the first attempt immediately
      attemptPlay()
    }
  }, [videoLoaded])

  // Always try to play when loaded or on mount
  React.useEffect(() => {
    if (videoRef.current) {
      playVideo()
    }
  }, [videoLoaded, playVideo])

  // No hover gating; videos should always run

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-br from-gray-900 to-black rounded-lg sm:rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col"
      style={{ border: '1px solid #98FF98' }}
    >
      {/* Video */}
      <div className="relative h-28 sm:h-36 md:h-32 overflow-hidden flex-shrink-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover transition-transform duration-300"
          poster={item.thumbnail}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoaded}
          onCanPlay={handleCanPlay}
          onCanPlayThrough={handleCanPlayThrough}
          onLoadedMetadata={() => {
            // Also try to play when metadata is loaded
            setTimeout(() => playVideo(), 100)
          }}
          style={{ zIndex: 1 }}
        >
          <source src={item.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Removed hover overlay to keep videos unobstructed */}
        
        {/* Live Badge */}
        {item.isLive && (
          <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-semibold flex items-center gap-1">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-pulse" />
            <span className="text-xs">PREV LIVE</span>
          </div>
        )}
        
        {/* Viewers */}
        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-black bg-opacity-60 backdrop-blur-sm text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs flex items-center gap-1">
          <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className="text-xs">{item.viewers}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-2 sm:p-3 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
          <Image
            width={100}
            height={100}
            src={item.streamerAvatar}
            alt={item.streamerName}
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#98FF98]"
          />
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs sm:text-sm font-medium truncate">{item.streamerName}</p>
          </div>
        </div>
        
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-1.5 sm:mb-2 flex-1">
          {item.title}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[#98FF98] text-xs font-medium uppercase tracking-wide">
            {item.category}
          </span>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className="text-xs">Live</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const LivestreamCarousel: React.FC<LivestreamCarouselProps> = ({ title, items }) => {
  const swiperRef = useRef<SwiperType | null>(null)
  const navigationPrevRef = useRef<HTMLButtonElement>(null)
  const navigationNextRef = useRef<HTMLButtonElement>(null)

  // Filter items by category if needed (for demo, we'll show all)
  const filteredItems = items

  return (
    <section className="mb-12 sm:mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
        >
          {title}
        </motion.h2>
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            ref={navigationPrevRef}
            className="bg-gray-800 hover:bg-[#98FF98] hover:text-black text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            ref={navigationNextRef}
            className="bg-gray-800 hover:bg-[#98FF98] hover:text-black text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper

            // Set up navigation after swiper initialization
            if (navigationPrevRef.current && navigationNextRef.current) {
              // @ts-expect-error - Swiper navigation setup
              swiper.params.navigation.prevEl = navigationPrevRef.current
              // @ts-expect-error - Swiper navigation setup
              swiper.params.navigation.nextEl = navigationNextRef.current
              swiper.navigation.init()
              swiper.navigation.update()
            }
          }}
          // We no longer need active slide gating for playback
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={1.5}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1.8,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5.5,
              spaceBetween: 24,
            },
          }}
          className="livestream-small-carousel"
        >
          {filteredItems.map((item, index) => (
            <SwiperSlide key={`${item.id}-${index}`}>
              <SmallLivestreamCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <style jsx global>{`
        .livestream-small-carousel .swiper-pagination {
          position: relative;
          margin-top: 16px;
        }
        
        .livestream-small-carousel .swiper-pagination-bullet {
          background: #98FF98;
          opacity: 0.3;
          width: 6px;
          height: 6px;
          transition: all 0.3s ease;
        }
        
        .livestream-small-carousel .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.2);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Ensure cards have consistent height on small screens */
        .livestream-small-carousel .swiper-slide {
          height: auto;
        }
        
        .livestream-small-carousel .swiper-slide > div {
          height: 100%;
          min-height: 200px;
        }
        
        @media (min-width: 640px) {
          .livestream-small-carousel .swiper-pagination {
            margin-top: 24px;
          }
          
          .livestream-small-carousel .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
          }
          
          .livestream-small-carousel .swiper-slide > div {
            min-height: 220px;
          }
        }
      `}</style>
    </section>
  )
}

export default LivestreamCarousel
