'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { memo, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { apiClient } from '@/lib/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Default category images mapping
const defaultCategoryImages: { [key: string]: string } = {
  'sneakers': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center',
  'toys': 'https://images.unsplash.com/photo-1558060370-539c7d0c5f4e?w=400&h=400&fit=crop&crop=center',
  'furniture': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center',
  'clothing': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&crop=center',
  'makeup': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center',
  'perfumes': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&crop=center',
  'jewelry': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
  'jewellery': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
  'home decor': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center',
  'accessories': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center',
  'gifts': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center',
  'bags': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center',
  'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&crop=center',
  'fashion & clothing': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&crop=center',
  'automotive': 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop&crop=center',
  'beauty & personal care': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center',
  'books & stationery': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&crop=center',
  'health & wellness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
  'home & garden': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center',
  'sports & fitness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
};

interface CategoryCardProps {
  category: { name: string; image: string };
}

const CategoryCard = memo(({ category }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <motion.div
        className="relative overflow-hidden cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
      {/* Window-like container with rounded top */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[440px] bg-gray-900 rounded-t-[60px] sm:rounded-t-[80px] md:rounded-t-[100px] lg:rounded-t-[120px] overflow-hidden" style={{ maxWidth: '320px' }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Category Label - Always visible */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <motion.h3
            className="text-[#98FF98] font-staatliches text-center px-4 py-2"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
              lineHeight: '100%',
              letterSpacing: '0.2px',
              textShadow: '0 0 10px rgba(152, 255, 152, 0.5)'
            }}
            whileHover={{ 
              scale: 1.05,
              textShadow: '0 0 20px rgba(152, 255, 152, 0.8)'
            }}
            transition={{ duration: 0.3 }}
          >
            {category.name}
          </motion.h3>
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center z-10"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-center"
              >
                <motion.h3
                  className="text-[#98FF98] font-staatliches mb-2"
                  style={{
                    fontWeight: 400,
                    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                    lineHeight: '100%',
                    letterSpacing: '0.2px'
                  }}
                >
                  {category.name}
                </motion.h3>
                <motion.p
                  className="text-white/80 text-sm sm:text-base"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  Explore Collection
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </motion.div>
    </Link>
  );
});

CategoryCard.displayName = 'CategoryCard';

const CategoriesSection = memo(() => {
  const swiperRef = useRef<SwiperRef>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Fetching categories from API...', new Date().toISOString());
        console.log('🔗 API Base URL:', apiClient.baseURL);
        
        const response = await apiClient.getCategories();
        console.log('📡 API Response:', response);
        
        if (response && response.success && response.data && response.data.length > 0) {
          // Transform backend categories to match frontend format
          const transformedCategories = response.data.map((category: any) => ({
            name: category.name.toUpperCase(),
            image: category.image || defaultCategoryImages[category.name.toLowerCase()] || 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&crop=center',
            slug: category.name.toLowerCase().replace(/\s+/g, '-'), // Generate slug from name
            id: category.id
          }));
          
          console.log('✅ Successfully loaded', transformedCategories.length, 'categories from API');
          console.log('📋 Categories:', transformedCategories.map(c => c.name));
          setCategories(transformedCategories);
        } else {
          console.log('❌ API response invalid or empty:', response);
          throw new Error('Invalid API response');
        }
      } catch (error) {
        console.error('❌ Error fetching categories:', error);
        setError('Failed to load categories');
        
        // Use hardcoded categories as fallback
        const defaultCategories = [
          { name: 'ACCESSORIES', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center' },
          { name: 'BAGS', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center' },
          { name: 'FURNITURE', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center' },
          { name: 'GIFTS', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center' },
        ];
        console.log('🔄 Using fallback categories:', defaultCategories.length);
        setCategories(defaultCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="categories" className="w-full bg-black pt-4 sm:pt-6 md:pt-8 lg:pt-12 xl:pt-16 pb-8 md:pb-12 lg:pb-16 xl:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 
            className="font-staatliches text-center"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(2rem, 6vw, 5.25rem)',
              lineHeight: '100%',
              letterSpacing: '0.2px'
            }}
          >
            <span className="text-white">BROWSE BY VIBE</span>
          </h2>
        </motion.div>

        {/* Categories Carousel */}
        <div className="relative">
          {/* Left Navigation Arrow */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-8 z-20">
            <motion.button
              onClick={() => swiperRef.current?.swiper?.slidePrev()}
              className="bg-transparent hover:bg-white/10 text-white p-2 sm:p-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} className="sm:w-6 sm:h-6" />
            </motion.button>
          </div>

          {/* Right Navigation Arrow */}
          <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-8 z-20">
            <motion.button
              onClick={() => swiperRef.current?.swiper?.slideNext()}
              className="bg-transparent hover:bg-white/10 text-white p-2 sm:p-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} className="sm:w-6 sm:h-6" />
            </motion.button>
          </div>

          {/* Swiper Container */}
          <div className="flex justify-center px-4 sm:px-0">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 12,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 16,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
                centeredSlides: false,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
                centeredSlides: false,
              },
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            className="categories-swiper w-full max-w-[280px] sm:max-w-none"
            style={{
              paddingBottom: '60px', // Space for pagination
            }}
          >
            {loading ? (
              // Loading state
              Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[440px] bg-gray-800 rounded-t-[60px] sm:rounded-t-[80px] md:rounded-t-[100px] lg:rounded-t-[120px] animate-pulse" style={{ maxWidth: '320px' }}>
                    <div className="absolute inset-0 bg-gray-700 rounded-t-[60px] sm:rounded-t-[80px] md:rounded-t-[100px] lg:rounded-t-[120px]" />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              categories.map((category, index) => (
                <SwiperSlide key={category.id || index}>
                  <CategoryCard category={category} />
                </SwiperSlide>
              ))
            )}
            </Swiper>
          </div>

          {/* Custom Pagination */}
          <div className="swiper-pagination !bottom-0 !relative mt-8" />
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <Link href="/categories">
            <motion.button
              className="bg-[#98FF98] hover:bg-[#98FF98]/80 text-black px-8 py-4 rounded-full font-staatliches text-lg sm:text-xl transition-colors duration-200"
              style={{
                fontWeight: 400,
                letterSpacing: '0.2px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW ALL CATEGORIES
            </motion.button>
          </Link>
        </motion.div>
      </div>


    </section>
  );
});

CategoriesSection.displayName = 'CategoriesSection';

export default CategoriesSection; 