'use client';

import { motion } from 'framer-motion';
import { memo, useRef, useCallback, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlogCard from '@/components/ui/BlogCard';
import { blogPosts } from '@/data';

const BlogsSection = memo(() => {
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
      if (width < 640) return 300; // Mobile: smaller cards
      if (width < 768) return 320; // Small tablet
      if (width < 1024) return 340; // Tablet
      return 380; // Desktop: larger cards
    }
    return 340; // Default
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
    <section id="blog" className="w-full bg-black py-8 md:py-12 lg:py-16">
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
            Behind the Live 
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

          {/* Blogs Carousel */}
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
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="flex-shrink-0 w-[300px] sm:w-[320px] md:w-[340px] lg:w-[380px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
                viewport={{ once: true }}
              >
                <BlogCard post={post} />
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

BlogsSection.displayName = 'BlogsSection';

export default BlogsSection; 