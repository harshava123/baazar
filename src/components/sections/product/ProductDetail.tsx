'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { BackendProduct } from '@/types';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import SimilarProducts from './SimilarProducts';

interface ProductDetailProps {
  productId: string;
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const router = useRouter();
  const [product, setProduct] = useState<BackendProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await apiClient.getProduct(productId);
        if (result.success && result.data) {
          setProduct(result.data);
          // Set default selections
          if (result.data.sizes && result.data.sizes.length > 0) {
            setSelectedSize(result.data.sizes[0]);
          }
          if (result.data.colors && result.data.colors.length > 0) {
            setSelectedColor(result.data.colors[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBack = () => {
    router.back();
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-[#98FF98] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-white text-lg">Product not found</p>
        <motion.button
          onClick={handleBack}
          className="mt-4 text-[#98FF98] hover:underline"
          whileHover={{ scale: 1.05 }}
        >
          Go Back
        </motion.button>
      </div>
    );
  }

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
        <ProductImages 
          images={product.images || ['/individual-category/1.png']}
          colors={product.colors || []}
          selectedColor={selectedColor}
        />

        {/* Product Information */}
        <ProductInfo
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
        />
      </div>

      {/* Similar Products Section */}
      <SimilarProducts 
        categoryId={product.category_id} 
        categoryName={product.categories?.name}
        currentProductId={productId} 
      />
    </div>
  );
};

export default ProductDetail; 