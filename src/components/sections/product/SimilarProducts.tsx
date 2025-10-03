'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { apiClient } from '@/lib/api';
import { Product, BackendProduct } from '@/types';

interface SimilarProductsProps {
  categoryId?: string;
  categoryName?: string;
  currentProductId: string;
}

const SimilarProducts = ({ categoryId, categoryName, currentProductId }: SimilarProductsProps) => {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!categoryId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch products from the same category
        const result = await apiClient.getProducts({ category: categoryId });
        
        if (result.success && result.data) {
          // Filter out the current product and limit to 6
          const filtered = result.data
            .filter((product: any) => product.id !== currentProductId)
            .slice(0, 6);
          
          setSimilarProducts(filtered);
        }
      } catch (error) {
        console.error('Error fetching similar products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [categoryId, currentProductId]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
        />
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-12 h-12 border-4 border-[#98FF98] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (similarProducts.length === 0) {
    return null; // Don't show section if no similar products
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-staatliches text-white">
          SIMILAR PRODUCTS
        </h2>
        {categoryName && (
          <Link href={`/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`}>
            <motion.button
              className="text-white hover:text-[#98FF98] transition-colors duration-200 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All
            </motion.button>
          </Link>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {similarProducts.map((product: any, index: number) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative bg-gray-100 overflow-hidden aspect-square">
                <Image
                  src={product.images && product.images.length > 0 && product.images[0] ? product.images[0] : '/individual-category/1.png'}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-all duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                />
                
                {/* Wishlist Heart Icon */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-2 sm:p-4 space-y-1 sm:space-y-2">
                <h3 className="text-gray-800 font-medium text-xs sm:text-sm line-clamp-2 group-hover:text-gray-900 transition-colors min-h-[2rem] sm:min-h-[2.5rem]">
                  {product.name}
                </h3>

                <div className="space-y-1">
                  {product.discount_price ? (
                    <>
                      <div className="text-sm sm:text-lg font-bold text-green-600">
                        ₹ {product.discount_price.toLocaleString()}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 line-through">
                        ₹ {product.price.toLocaleString()}
                      </div>
                    </>
                  ) : (
                    <div className="text-sm sm:text-lg font-bold text-gray-900">
                      ₹ {product.price.toLocaleString()}
                    </div>
                  )}
                </div>

                {product.rating && (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {product.rating.toFixed(1)} ({product.review_count || 0})
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SimilarProducts; 