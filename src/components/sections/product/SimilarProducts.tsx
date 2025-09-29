'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const SimilarProducts = () => {
  const similarProducts = [
    {
      id: '1',
      name: 'Pink Round Neck Striped Midi Dress',
      price: 200,
      image: '/products/similar1.png',
      rating: 4.8,
      reviews: 120
    },
    {
      id: '2',
      name: 'Printed Shoulder Straps High Slit Satin Dress',
      price: 200,
      image: '/products/similar2.png',
      rating: 4.8,
      reviews: 120
    },
    {
      id: '3',
      name: 'Pink Round Neck Striped Dress',
      price: 200,
      image: '/products/similar3.png',
      rating: 4.8,
      reviews: 120
    },
    {
      id: '4',
      name: 'AGPTEK Smart Watch for Women',
      price: 200,
      image: '/products/similar4.png',
      rating: 4.8,
      reviews: 120
    },
    {
      id: '5',
      name: 'Printed Shoulder Straps High Slit Satin Dress',
      price: 200,
      image: '/products/similar5.png',
      rating: 4.8,
      reviews: 120
    },
    {
      id: '6',
      name: 'Pink Round Neck Striped Dress',
      price: 200,
      image: '/products/similar6.png',
      rating: 4.8,
      reviews: 120
    }
  ];

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-staatliches text-white">
          SIMILAR
        </h2>
        <motion.button
          className="text-white hover:text-[#98FF98] transition-colors duration-200 text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All
        </motion.button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {similarProducts.map((product, index) => (
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
                  src={product.image}
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

                <div className="text-sm sm:text-lg font-bold text-gray-900">
                  ₹ {product.price.toLocaleString()}
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviews})
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SimilarProducts; 