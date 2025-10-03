'use client';

import { motion } from 'framer-motion';
import { memo, useCallback, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { bestSellingProducts } from '@/data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { apiClient } from '@/lib/api';
import { Product, BackendProduct } from '@/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BestSellingSection = memo(() => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getProducts({ limit: '10' });
        
        if (response.success && response.data) {
          // Transform backend products to match frontend format
          const transformedProducts = response.data.map((product: BackendProduct) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image: (() => {
              const imageUrl = product.images && product.images.length > 0 && product.images[0] ? product.images[0] : null;
              if (!imageUrl || imageUrl.includes('undefined')) {
                return 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&crop=center';
              }
              return imageUrl;
            })(),
            category: {
              id: product.categories?.id || '1',
              name: product.categories?.name || 'General',
              slug: product.slug || 'general'
            },
            isNew: false,
            isFeatured: product.is_featured || false,
            rating: 4.5,
            reviews: Math.floor(Math.random() * 100) + 50,
            story: product.description || 'Discover this amazing product'
          }));
          
          setProducts(transformedProducts);
        } else {
          // Fallback to static data if API fails
          setProducts(bestSellingProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        // Fallback to static data
        setProducts(bestSellingProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = useCallback(() => {
    if (swiper) {
      swiper.slidePrev();
    }
  }, [swiper]);

  const scrollRight = useCallback(() => {
    if (swiper) {
      swiper.slideNext();
    }
  }, [swiper]);

  return (
    <section id="top-selling" className="w-full bg-black py-8 md:py-12 lg:py-16">
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
            HOT PICKS FROM LIVE DROPS
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

          {/* Swiper Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="px-12 sm:px-16"
          >
            <Swiper
              onSwiper={setSwiper}
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView="auto"
              navigation={false}
              centeredSlides={true}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active',
              }}
              breakpoints={{
                320: {
                  spaceBetween: 12,
                  centeredSlides: true,
                },
                480: {
                  spaceBetween: 16,
                  centeredSlides: true,
                },
                640: {
                  spaceBetween: 20,
                  centeredSlides: true,
                },
                768: {
                  spaceBetween: 24,
                  centeredSlides: false,
                },
                1024: {
                  spaceBetween: 28,
                  centeredSlides: false,
                },
                1280: {
                  spaceBetween: 32,
                  centeredSlides: false,
                },
                1536: {
                  spaceBetween: 36,
                  centeredSlides: false,
                },
              }}
              className="best-selling-swiper"
            >
              {loading ? (
                // Loading state
                Array.from({ length: 4 }).map((_, index) => (
                  <SwiperSlide key={index} style={{ width: 'auto', minWidth: '240px', maxWidth: '280px' }}>
                    <div className="flex justify-center px-2">
                      <div className="w-full h-80 bg-gray-800 rounded-lg animate-pulse">
                        <div className="w-full h-48 bg-gray-700 rounded-t-lg"></div>
                        <div className="p-4">
                          <div className="h-4 bg-gray-700 rounded mb-2"></div>
                          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                products.map((product, index) => (
                  <SwiperSlide key={product.id} style={{ width: 'auto', minWidth: '240px', maxWidth: '280px' }}>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: 'easeOut'
                      }}
                      viewport={{ once: true }}
                      className="flex justify-center px-2"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </motion.div>
        </div>

        {/* Custom Pagination */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
});

BestSellingSection.displayName = 'BestSellingSection';

export default BestSellingSection; 