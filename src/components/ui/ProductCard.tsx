'use client';

import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = memo(({ product, className = '' }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className={`bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 flex-shrink-0 ${className}`}
      style={{
        width: '100%',
        maxWidth: '273px',
        minWidth: '240px',
        height: 'auto',
        minHeight: '320px',
        maxHeight: '370px',
        borderRadius: '127.37px 127.37px 0 0'
      }}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
              {/* Product Image Container - White rounded top section */}
        <Link href={`/product/${product.id}`} className="block h-full">
          <div className="relative bg-white overflow-hidden w-full h-[60%] min-h-[220px] max-h-[264px] flex-shrink-0">
                      <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover object-center transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 640px) 240px, (max-width: 768px) 260px, 273px"
            />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>

        {/* Product Info - Light green rectangular section */}
        <div className="bg-[#98FF98] p-3 sm:p-4 h-[40%] min-h-[80px] max-h-[106px] flex flex-col justify-center">
          {/* Product Name - All caps, bold, black */}
          <h3 
            className="text-black font-staatliches font-normal text-base uppercase tracking-[0.14px] mb-1 sm:mb-2 line-clamp-1"
            style={{
              fontSize: 'clamp(20px, 4vw, 29.03px)',
              lineHeight: '100%',
              fontWeight: 400
            }}
          >
            {product.name}
          </h3>

          {/* Price - Coral/orange-red color */}
          <div 
            className="text-[#FF6F61] font-staatliches font-normal"
            style={{
              fontSize: 'clamp(19px, 3.5vw, 29.03px)',
              lineHeight: '100%',
              fontWeight: 400,
              letterSpacing: '0.14px'
            }}
          >
            ₹ {product.price.toLocaleString()}
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard; 