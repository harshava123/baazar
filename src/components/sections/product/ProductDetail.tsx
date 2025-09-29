'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import SimilarProducts from './SimilarProducts';

interface ProductDetailProps {
  productId: string;
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  // TODO: Use productId to fetch product data
  console.log('Product ID:', productId);
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);

  const handleBack = () => {
    router.back();
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Back Button */}
      <motion.button
        onClick={handleBack}
        className="flex items-center gap-2 text-white hover:text-[#98FF98] transition-colors duration-200 text-sm sm:text-base"
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Back</span>
      </motion.button>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Product Images */}
        <ProductImages />

        {/* Product Information */}
        <ProductInfo
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
        />
      </div>

      {/* Similar Products Section */}
      <SimilarProducts />
    </div>
  );
};

export default ProductDetail; 