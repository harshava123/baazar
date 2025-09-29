'use client';

import { motion } from 'framer-motion';
import { memo, useState } from 'react';

const CraftedSection = memo(() => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full bg-black py-8 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#98FF98]/20 via-transparent to-[#FF6F61]/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="font-staatliches text-white text-center cursor-pointer select-none relative z-10"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(1.5rem, 8vw, 5.25rem)',
              lineHeight: '100%',
              letterSpacing: '0.2px',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ 
              scale: 1.02,
            }}
            animate={{
              textShadow: isHovered 
                ? '0 0 50px rgba(152, 255, 152, 0.6)' 
                : '0 0 30px rgba(152, 255, 152, 0.3)',
              color: isHovered ? '#98FF98' : '#ffffff',
            }}
            transition={{ 
              duration: 0.6,
              ease: 'easeInOut'
            }}
          >
            CRAFTED WITH CULTURE, CURATED FOR YOU
          </motion.h2>

          {/* Animated Underline */}
          <motion.div
            className="mt-6 sm:mt-8 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="h-1 bg-gradient-to-r from-[#98FF98] via-[#FF6F61] to-[#98FF98] rounded-full"
              animate={{
                scaleX: isHovered ? 1.5 : 1,
                opacity: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#98FF98] rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-1 h-1 bg-[#FF6F61] rounded-full"
              animate={{
                y: [0, -15, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#98FF98] rounded-full"
              animate={{
                y: [0, -25, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

CraftedSection.displayName = 'CraftedSection';

export default CraftedSection; 