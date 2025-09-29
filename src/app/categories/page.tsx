'use client';

import { motion } from 'framer-motion';
import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { apiClient } from '@/lib/api';

interface CategoryCardProps {
  category: { name: string; image: string };
}

const CategoryCard = memo(({ category }: CategoryCardProps) => {
  return (
    <Link href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <motion.div
        className="relative overflow-hidden cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
      {/* Window-like container with rounded top */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[380px] lg:h-[450px] xl:h-[500px] bg-gray-900 rounded-t-[60px] sm:rounded-t-[80px] md:rounded-t-[120px] lg:rounded-t-[160px] overflow-hidden" style={{ maxWidth: '100%' }}>
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
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <motion.h3
            className="text-[#98FF98] font-staatliches text-center px-2 sm:px-4 py-1 sm:py-2"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(1rem, 2.5vw, 2rem)',
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
        <motion.div
          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-center"
          >
            <motion.h3
              className="text-[#98FF98] font-staatliches mb-1 sm:mb-2"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                lineHeight: '100%',
                letterSpacing: '0.2px'
              }}
            >
              {category.name}
            </motion.h3>
            <motion.p
              className="text-white/80 text-xs sm:text-sm md:text-base"
              initial={{ y: 10, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Explore Collection
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
      </motion.div>
    </Link>
  );
});

CategoryCard.displayName = 'CategoryCard';

const AllCategoriesPage = memo(() => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Fetching categories for /categories page...');
        
        const response = await apiClient.getCategories();
        console.log('📡 Categories page API Response:', response);
        
        if (response && response.success && response.data && response.data.length > 0) {
          // Transform backend categories to match frontend format
          const transformedCategories = response.data.map((category: any) => ({
            name: category.name.toUpperCase(),
            image: category.image || 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&crop=center',
            slug: category.name.toLowerCase().replace(/\s+/g, '-'),
            id: category.id
          }));
          
          console.log('✅ Categories page loaded', transformedCategories.length, 'categories from API');
          setCategories(transformedCategories);
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error) {
        console.error('❌ Error fetching categories for /categories page:', error);
        setError('Failed to load categories');
        
        // Fallback to default categories if API fails
        const defaultCategories = [
          { name: 'ACCESSORIES', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center' },
          { name: 'BAGS', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center' },
          { name: 'FURNITURE', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center' },
          { name: 'GIFTS', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center' },
        ];
        console.log('🔄 Categories page using fallback categories:', defaultCategories.length);
        setCategories(defaultCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-[#98FF98] transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span className="font-staatliches text-lg">Back to Home</span>
          </Link>
        </motion.div>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
        >
          <h1 
            className="font-staatliches text-center"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              lineHeight: '100%',
              letterSpacing: '0.2px'
            }}
          >
            <span className="text-[#FF6F61]">ALL CATEGORIES</span>
          </h1>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-[#98FF98] font-staatliches text-xl">Loading categories...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-400 font-staatliches text-xl">Error: {error}</div>
          </div>
        )}

        {/* Categories Grid */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
});

AllCategoriesPage.displayName = 'AllCategoriesPage';

export default AllCategoriesPage;
