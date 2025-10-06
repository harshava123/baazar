'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface ProductImagesProps {
  images: string[];
  colors: string[];
  selectedColor: string;
}

const ProductImages = ({ images, colors, selectedColor }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const placeholder = '/livestream/placeholder.png';

  const normalizeUrl = (url?: string): string => {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (!trimmed) return '';
    // Drop obviously bad values
    if (trimmed.endsWith('undefined') || trimmed.includes('/uploads/undefined')) return '';
    // Force https for bazarapi domain to avoid mixed content
    if (trimmed.startsWith('http://bazarapi.elitceler.com')) {
      return trimmed.replace('http://', 'https://');
    }
    return trimmed;
  };

  const validImages = (images || [])
    .map((u) => normalizeUrl(u))
    .filter((u) => !!u);
  if (typeof window !== 'undefined') {
    try {
      console.log('[UI] ProductImages received images:', images);
      console.log('[UI] ProductImages valid images:', validImages);
    } catch {}
  }

  // When color changes, switch to the corresponding image
  // Images map to colors in order: image[0] -> color[0], image[1] -> color[1], etc.
  useEffect(() => {
    if (colors.length > 0 && selectedColor) {
      const colorIndex = colors.indexOf(selectedColor);
      if (colorIndex !== -1 && colorIndex < validImages.length) {
        setSelectedImage(colorIndex);
      }
    }
  }, [selectedColor, colors, validImages.length]);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Image */}
      <motion.div 
        className="relative bg-white rounded-lg overflow-hidden aspect-square"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {validImages.length > 0 ? (
          <Image
            src={validImages[Math.min(selectedImage, validImages.length - 1)]}
            alt="Product main image"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <Image
            src={placeholder}
            alt="No image available"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        
        {/* Wishlist Heart Icon */}
        <motion.button
          onClick={toggleWishlist}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 ${
              isWishlisted
                ? 'fill-red-500 text-red-500'
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </motion.button>
      </motion.div>

      {/* Thumbnail Images */}
      <div className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide">
        {validImages.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative bg-white rounded-lg overflow-hidden aspect-square w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border-2 transition-all duration-200 ${
              selectedImage === index
                ? 'border-[#98FF98] shadow-lg'
                : 'border-transparent hover:border-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 64px, 80px"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages; 