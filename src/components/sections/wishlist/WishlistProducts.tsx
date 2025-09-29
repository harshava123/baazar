'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WishlistProductCard from './WishlistProductCard';
import { products } from '@/data';

const WishlistProducts = () => {
  // For demo purposes, using first 8 products as wishlist items
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 8));

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 sm:space-y-6"
    >
      {/* Wishlist Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-roboto text-white">
          My WishList ({wishlistItems.length} items)
        </h2>
        {wishlistItems.length > 0 && (
          <motion.button
            className="text-[#98FF98] hover:text-opacity-80 transition-colors duration-200 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear All
          </motion.button>
        )}
      </div>

      {/* Products Grid */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {wishlistItems.map((product) => (
            <WishlistProductCard
              key={product.id}
              product={product}
              onRemove={handleRemoveFromWishlist}
              className="w-full"
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-8 sm:p-12 text-center"
        >
          <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Start adding products to your wishlist to see them here
          </p>
          <motion.button
            className="bg-[#98FF98] hover:bg-green-600 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Shopping
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WishlistProducts; 