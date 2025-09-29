'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

interface ProductInfoProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const ProductInfo = ({
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
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Red', value: 'red', color: 'bg-red-500' },
    { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
    { name: 'Black', value: 'Black', color: 'bg-black' },
    { name: 'White', value: 'white', color: 'bg-white' },
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Gradient', value: 'gradient', color: 'bg-gradient-to-r from-green-400 to-pink-400' }
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

  const handleAddToCart = () => {
    addToCart({
      name: "Women's Rayon Fit and Flare Below The Knee Formal Dress",
      price: 400,
      image: "/products/product1.png",
      quantity: quantity,
      selectedSize: selectedSize,
      selectedColor: selectedColor
    });
    
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({
      name: "Women's Rayon Fit and Flare Below The Knee Formal Dress",
      price: 400,
      image: "/products/product1.png",
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
          Women&apos;s Rayon Fit and Flare Below The Knee Formal Dress
        </h1>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="flex items-center gap-1">
            {renderStars(4.3)}
          </div>
          <span className="text-white text-sm sm:text-base">
            4.3 (16 Review)
          </span>
        </div>

        {/* Price */}
        <div className="text-3xl sm:text-4xl font-bold text-white">
          ₹ 400
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-medium text-white">Select Size</h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {sizes.map((size) => (
            <motion.button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 font-medium transition-all duration-200 text-sm sm:text-base ${
                selectedSize === size
                  ? 'bg-red-500 border-red-500 text-white'
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

      {/* Color Selection */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-medium text-white">
          Select Color: {selectedColor}
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {colors.map((color) => (
            <motion.button
              key={color.value}
              onClick={() => setSelectedColor(color.name)}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-200 ${
                color.color
              } ${
                selectedColor === color.name
                  ? 'border-white shadow-lg'
                  : 'border-transparent hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={color.name}
            />
          ))}
        </div>
      </div>

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