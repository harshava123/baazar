'use client';

import React from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const SelectedItems = () => {
  const { state, updateQuantity, removeFromCart } = useCart();
  const { items } = state;

  // Map product names to actual images from the products folder
  const getProductImage = (productName: string) => {
    const imageMap: { [key: string]: string } = {
      'Pink Round Neck Striped Dress': '/products/product1.png',
      'Blue Denim Jeans': '/products/jeans-1.svg',
      'Leather Backpack': '/products/backpack-1.svg',
      'Running Shoes': '/products/shoes-1.svg',
      'Mechanical Keyboard': '/products/keyboard-1.svg',
      'Table Fan': '/products/fan-1.svg',
      'Summer Dress': '/products/dress-1.svg',
    };
    
    return imageMap[productName] || '/products/product1.png';
  };

  return (
    <div className="space-y-4">
      {/* Title with same styling as BILLING DETAILS */}
      <h2 
        className="font-staatliches"
        style={{
          color: '#FAE5E5',
          fontSize: 'clamp(28px, 6vw, 36px)',
          lineHeight: '30px',
          letterSpacing: '4%'
        }}
      >
        SELECTED ITEMS
      </h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-lg relative shadow-sm border border-gray-100">
            {/* Product Image - Smaller size */}
            <div className="flex-shrink-0">
              <div className="w-20 h-24 sm:w-24 sm:h-32 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={getProductImage(item.name)}
                  alt={item.name}
                  width={96}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 pr-16 sm:pr-20">
              <h3 className="font-semibold text-black text-sm sm:text-base mb-2 line-clamp-2">{item.name}</h3>
              <div className="text-xs sm:text-sm space-y-1 mb-2 sm:mb-3">
                {item.selectedSize && (
                  <p>
                    <span className="text-black">Size: </span>
                    <span className="text-gray-600">{item.selectedSize}</span>
                  </p>
                )}
                {item.selectedColor && (
                  <p>
                    <span className="text-black">Color: </span>
                    <span className="text-gray-600">{item.selectedColor}</span>
                  </p>
                )}
              </div>
              <p className="text-base sm:text-lg font-bold text-black">₹ {item.price}</p>
            </div>

            {/* Delete Button - Top Right */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-1 text-red-500 hover:text-red-600 transition-colors bg-white/80 hover:bg-white rounded-full shadow-sm"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>

            {/* Quantity Controls - Bottom Right Corner */}
            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3">
              <div className="flex items-center border border-[#98FF98] rounded-lg bg-white shadow-sm">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-black hover:bg-gray-50 rounded-l-lg transition-colors"
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
                <span className="w-8 sm:w-10 text-center font-medium text-black text-xs sm:text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-black hover:bg-gray-50 rounded-r-lg transition-colors"
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-gray-500 text-base sm:text-lg">Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default SelectedItems; 