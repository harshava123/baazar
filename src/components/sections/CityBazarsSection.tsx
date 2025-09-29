'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { memo, useRef, useCallback, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { cityBazars } from '@/data';

interface CityBazarCardProps {
  bazar: {
    id: string;
    name: string;
    location: string;
    image: string;
    description: string;
    specialties: string[];
    featured?: boolean;
  };
}

const CityBazarCard = memo(({ bazar }: CityBazarCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer group flex-shrink-0"
      style={{
        width: '280px',
        height: '360px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bazar.image}
          alt={bazar.name}
          fill
          className="object-cover"
          sizes="280px"
        />
      </div>

      {/* Hover Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#00000099] flex items-center justify-center z-10"
          >
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-[#98FF98] font-staatliches text-center px-2"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(1.5rem, 4vw, 4rem)',
                lineHeight: '100%',
                letterSpacing: '0.2px'
              }}
            >
              {bazar.name}
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

CityBazarCard.displayName = 'CityBazarCard';

const CityBazarsSection = memo(() => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    }
  }, []);

  const getScrollDistance = useCallback(() => {
    // Adaptive scroll distance based on screen size
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 280; // Mobile: smaller cards
      if (width < 768) return 300; // Small tablet
      if (width < 1024) return 320; // Tablet
      return 360; // Desktop: larger cards
    }
    return 320; // Default
  }, []);

  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      const distance = getScrollDistance();
      scrollRef.current.scrollBy({
        left: -distance,
        behavior: 'smooth'
      });
      // Update progress after scroll animation
      setTimeout(updateScrollProgress, 200);
    }
  }, [updateScrollProgress, getScrollDistance]);

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      const distance = getScrollDistance();
      scrollRef.current.scrollBy({
        left: distance,
        behavior: 'smooth'
      });
      // Update progress after scroll animation
      setTimeout(updateScrollProgress, 200);
    }
  }, [updateScrollProgress, getScrollDistance]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', updateScrollProgress);
      // Initial calculation
      updateScrollProgress();
      
      return () => {
        scrollElement.removeEventListener('scroll', updateScrollProgress);
      };
    }
  }, [updateScrollProgress]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(updateScrollProgress, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateScrollProgress]);

  return (
    <section id="city-bazars" className="w-full bg-black py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 
            className="font-staatliches text-[#FF6F61] text-center"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 6vw, 5.25rem)',
              lineHeight: '100%',
              letterSpacing: '0.2px'
            }}
          >
            CITY BAZARS
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10">
            <motion.button
              onClick={scrollLeft}
              className="bg-[#98FF98] hover:bg-[#98FF98]/80 text-black p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </motion.button>
          </div>

          <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10">
            <motion.button
              onClick={scrollRight}
              className="bg-[#98FF98] hover:bg-[#98FF98]/80 text-black p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </motion.button>
          </div>

          {/* City Bazars Carousel */}
          <motion.div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide py-4 px-12 sm:px-16"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {cityBazars.map((bazar, index) => (
              <motion.div
                key={bazar.id}
                className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[360px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
                viewport={{ once: true }}
              >
                <CityBazarCard bazar={bazar} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="flex items-center gap-2">
            <div 
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                scrollProgress <= 10 ? 'bg-[#98FF98]' : 'bg-gray-700'
              }`}
            />
            <div className="w-12 sm:w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#98FF98] rounded-full"
                style={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div 
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                scrollProgress >= 90 ? 'bg-[#98FF98]' : 'bg-gray-700'
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

CityBazarsSection.displayName = 'CityBazarsSection';

export default CityBazarsSection; 