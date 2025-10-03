'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { BackendProduct } from '@/types';

interface ProductInfoProps {
  product: BackendProduct;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const ProductInfo = ({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  onQuantityChange
}: ProductInfoProps) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const sizes = product.sizes || [];
  
  // Map color names to visual colors
  const getColorClass = (colorName: string) => {
    const colorMap: Record<string, string> = {
      'Red': 'bg-red-500',
      'Purple': 'bg-purple-500',
      'Black': 'bg-black',
      'White': 'bg-white',
      'Blue': 'bg-blue-500',
      'Green': 'bg-green-500',
      'Yellow': 'bg-yellow-500',
      'Pink': 'bg-pink-500',
      'Orange': 'bg-orange-500',
      'Gray': 'bg-gray-500',
      'Brown': 'bg-amber-700',
    };
    return colorMap[colorName] || 'bg-gray-400';
  };

  const colors = (product.colors || []).map((color: string) => ({
    name: color,
    color: getColorClass(color)
  }));

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

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      price: product.discount_price || product.price,
      originalPrice: product.price, // Store original price for discount calculation
      image: product.images && product.images.length > 0 && product.images[0] ? product.images[0] : '/individual-category/1.png',
      quantity: quantity,
      selectedSize: selectedSize,
      selectedColor: selectedColor
    });
    
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      router.push('/cart');
    }, 1000);
  };

  const handleBuyNow = () => {
    addToCart({
      name: product.name,
      price: product.discount_price || product.price,
      originalPrice: product.price, // Store original price for discount calculation
      image: product.images && product.images.length > 0 && product.images[0] ? product.images[0] : '/individual-category/1.png',
      quantity: quantity,
      selectedSize: selectedSize,
      selectedColor: selectedColor
    });
    
    router.push('/cart');
  };

  return (
    <motion.div 
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Product Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-staatliches text-white mb-3 sm:mb-4">
          {product.name}
        </h1>
        
        {/* Rating - Optional if you have ratings */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-white text-sm sm:text-base">
              {product.rating} ({product.review_count || 0} Review)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="space-y-1">
          {product.discount_price ? (
            <>
              <div className="text-3xl sm:text-4xl font-bold text-[#98FF98]">
                ₹ {product.discount_price}
              </div>
              <div className="text-xl text-white/60 line-through">
                ₹ {product.price}
              </div>
              {product.discount_percentage && (
                <div className="text-sm text-[#98FF98]">
                  Save {product.discount_percentage}%
                </div>
              )}
            </>
          ) : (
            <div className="text-3xl sm:text-4xl font-bold text-white">
              ₹ {product.price}
            </div>
          )}
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="mt-2">
            {product.stock > 0 ? (
              <span className="text-green-400 text-sm">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-400 text-sm">Out of Stock</span>
            )}
          </div>
        )}

        {/* Description */}
        {product.description && (
          <p className="text-white/80 text-sm sm:text-base mt-4">
            {product.description}
          </p>
        )}
      </div>

      {/* Size Selection */}
      {sizes.length > 0 && (
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-medium text-white">Select Size</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {sizes.map((size: string) => (
              <motion.button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 font-medium transition-all duration-200 text-sm sm:text-base ${
                  selectedSize === size
                    ? 'bg-[#98FF98] border-[#98FF98] text-black'
                    : 'border-white text-white hover:bg-white hover:text-black'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {colors.length > 0 && (
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-medium text-white">
            Select Color: {selectedColor}
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {colors.map((color: any) => (
              <motion.button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-200 ${
                  color.color
                } ${
                  color.name === 'White' ? 'border-gray-300' : ''
                } ${
                  selectedColor === color.name
                    ? 'border-[#98FF98] shadow-lg ring-2 ring-[#98FF98] ring-offset-2 ring-offset-black'
                    : 'border-transparent hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-medium text-white">Quantity</h3>
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.button
            onClick={() => onQuantityChange(quantity - 1)}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.button>
          
          <span className="text-xl sm:text-2xl font-bold text-white min-w-[2.5rem] sm:min-w-[3rem] text-center">
            {quantity}
          </span>
          
          <motion.button
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
        <motion.button
          onClick={handleAddToCart}
          className="flex-1 bg-[#98FF98] hover:bg-green-600 text-black py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors duration-200 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showSuccessMessage ? (
            <>
              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              Added!
            </>
          ) : (
            'Add to Cart'
          )}
        </motion.button>
        
        <motion.button
          onClick={handleBuyNow}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Buy Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductInfo; 