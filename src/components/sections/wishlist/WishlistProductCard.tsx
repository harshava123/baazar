'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, Star, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';

interface WishlistProductCardProps {
  product: Product;
  onRemove?: (productId: string) => void;
  className?: string;
}

const WishlistProductCard = ({ product, onRemove, className = '' }: WishlistProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 ${className}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/product/${product.id}`}>
        {/* Product Image Container */}
        <div className="relative bg-gray-100 overflow-hidden w-full h-40 sm:h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover object-center transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}

          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-medium">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          {/* Product Name */}
          <h3 className="text-gray-800 font-medium text-xs sm:text-sm line-clamp-2 group-hover:text-gray-900 transition-colors min-h-[2rem] sm:min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              ₹ {product.price.toLocaleString()}
            </span>
            {product.discount && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                ₹ {Math.round(product.price * (1 + product.discount / 100)).toLocaleString()}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-1">
              {renderStars(product.rating || 0)}
            </div>
            <span className="text-xs sm:text-sm text-gray-600">
              {product.rating?.toFixed(1)} ({product.reviews || 0})
            </span>
          </div>
        </div>
      </Link>

      {/* Wishlist Heart Icon - Always filled red */}
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md">
        <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-red-500 text-red-500" />
      </div>

      {/* Remove Button */}
      {onRemove && (
        <motion.button
          onClick={() => onRemove(product.id)}
          className="absolute top-2 sm:top-3 left-2 sm:left-3 w-6 h-6 sm:w-8 sm:h-8 bg-white/90 hover:bg-red-500 rounded-full flex items-center justify-center shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-white transition-colors" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default WishlistProductCard; 