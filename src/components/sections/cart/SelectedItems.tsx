'use client';

import React from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const SelectedItems = () => {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();
  const { items } = state;

  return (
    <div className="space-y-4">
      {/* Title with Clear Cart Button */}
      <div className="flex items-center justify-between">
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
        {items.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear your cart?')) {
                clearCart();
              }
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear Cart</span>
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-lg relative shadow-sm border border-gray-100">
            {/* Product Image - Smaller size */}
            <div className="flex-shrink-0">
              <div className="w-20 h-24 sm:w-24 sm:h-32 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={item.image || '/individual-category/1.png'}
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
        <div className="text-center py-12 sm:py-16">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 text-base sm:text-lg mb-2">Your cart is empty</p>
          <p className="text-gray-400 text-sm">Add some products to get started!</p>
        </div>
      )}
    </div>
  );
};

export default SelectedItems; 