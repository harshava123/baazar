'use client';

import { motion } from 'framer-motion';
import { memo, useState, useEffect } from 'react';
import { products } from '@/data';
import { apiClient } from '@/lib/api';
// import { ProductCategory, BackendCategory } from '@/types';

const CategoriesScrollSection = memo(() => {
  const [productNames, setProductNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.getProducts({ limit: '20' });
        
        if (response.success && response.data) {
          const names = response.data.map((product: any) => product.name);
          setProductNames(names);
        } else {
          // Fallback to static data
          setProductNames(products.map(product => product.name));
        }
      } catch (error) {
        console.error('Error fetching products for scroll:', error);
        // Fallback to static data
        setProductNames(products.map(product => product.name));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Duplicate product names for seamless infinite scroll
  const duplicatedProducts = loading ? [] : [...productNames, ...productNames];

  return (
    <section className="w-full overflow-hidden bg-white py-6 md:py-6 lg:py-8 xl:py-10">
      <div className="relative w-full">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 z-10 h-full w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-l from-white to-transparent" />
        
        {/* Scrolling container */}
        <motion.div
          className="flex items-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20"
          animate={{
            x: [0, -50 + '%']
          }}
          transition={{
            duration: 25,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop'
          }}
          style={{
            width: 'max-content',
            maxWidth: 'none'
          }}
        >
          {duplicatedProducts.map((product, index) => (
            <div
              key={`${product}-${index}`}
              className="flex items-center gap-1 sm:gap-2 md:gap-4 whitespace-nowrap"
            >
              {/* Pulsating dot */}
              <motion.div
                className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-3 md:w-3 lg:h-4 lg:w-4 rounded-full bg-[#98FF98]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                  delay: index * 0.2
                }}
              />

              {/* Product text */}
              <motion.span
                className="text-black font-staatliches text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl cursor-pointer"
                style={{
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0.2px'
                }}
                whileHover={{
                  scale: 1.05
                }}
                transition={{ duration: 0.3 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#98FF98';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'black';
                }}
              >
                {product}
              </motion.span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

CategoriesScrollSection.displayName = 'CategoriesScrollSection';

export default CategoriesScrollSection; 