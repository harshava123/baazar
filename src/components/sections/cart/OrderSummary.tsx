'use client';

import React, { useState } from 'react';
import { ChevronUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

const OrderSummary = () => {
  const [promoCode, setPromoCode] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const { state } = useCart();

  // Calculate subtotal from original prices
  const originalSubtotal = state.items.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.price;
    return sum + (originalPrice * item.quantity);
  }, 0);
  
  // Calculate discount (difference between original and discounted)
  const discountedTotal = state.total;
  const discount = originalSubtotal - discountedTotal;
  
  // Calculate discount percentage
  const discountPercentage = originalSubtotal > 0 
    ? Math.round((discount / originalSubtotal) * 100) 
    : 0;
  
  const total = discountedTotal;

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 text-gray-900 shadow-sm border border-gray-100 mt-11 min-h-[400px]" style={{ fontFamily: 'Roboto' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 
          style={{
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontStyle: 'Bold',
            fontSize: 'clamp(18px, 5vw, 24px)',
            lineHeight: '100%',
            letterSpacing: '0%',
            verticalAlign: 'middle'
          }}
        >
          ORDER SUMMARY
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-50 rounded transition-colors"
          aria-label={isExpanded ? 'Collapse order summary' : 'Expand order summary'}
        >
          <ChevronUp className={`w-4 h-4 transition-transform ${!isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Price Breakdown */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Subtotal</span>
              <span className="font-medium text-sm sm:text-base">₹ {originalSubtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm sm:text-base">
                  Discount (-{discountPercentage}%)
                </span>
                <span className="text-red-500 font-medium text-sm sm:text-base">-₹ {discount}</span>
              </div>
            )}
            <div className="border-t pt-3 sm:pt-4 flex justify-between">
              <span className="font-bold text-base sm:text-lg">Total</span>
              <span className="font-bold text-base sm:text-lg">₹ {total}</span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <span className="flex items-center bg-gray-100 rounded-full px-3 sm:px-4 py-2 sm:py-3 flex-1">
                <svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 sm:mr-3 flex-shrink-0">
                  <path d="M21.0766 10.4856L11.7653 1.17438C11.5917 0.999635 11.3851 0.861091 11.1576 0.766785C10.93 0.67248 10.686 0.624289 10.4397 0.625008H1.75001C1.45164 0.625008 1.16549 0.743534 0.954513 0.954513C0.743534 1.16549 0.625008 1.45164 0.625008 1.75001V10.4397C0.624289 10.686 0.67248 10.93 0.766785 11.1576C0.861091 11.3851 0.999635 11.5917 1.17438 11.7653L10.4856 21.0766C10.8372 21.4281 11.3141 21.6255 11.8113 21.6255C12.3084 21.6255 12.7853 21.4281 13.1369 21.0766L21.0766 13.1369C21.4281 12.7853 21.6255 12.3084 21.6255 11.8113C21.6255 11.3141 21.4281 10.8372 21.0766 10.4856ZM11.8113 19.2203L2.87501 10.2813V2.87501H10.2813L19.2175 11.8113L11.8113 19.2203ZM7.37501 5.87501C7.37501 6.17168 7.28703 6.46169 7.12221 6.70836C6.95739 6.95504 6.72312 7.1473 6.44903 7.26083C6.17494 7.37436 5.87334 7.40406 5.58237 7.34619C5.2914 7.28831 5.02413 7.14545 4.81435 6.93567C4.60457 6.72589 4.46171 6.45861 4.40383 6.16764C4.34595 5.87667 4.37566 5.57507 4.48919 5.30098C4.60272 5.02689 4.79498 4.79263 5.04165 4.6278C5.28833 4.46298 5.57834 4.37501 5.87501 4.37501C6.27283 4.37501 6.65436 4.53304 6.93567 4.81435C7.21697 5.09565 7.37501 5.47718 7.37501 5.87501Z" fill="black" fillOpacity="0.4"/>
                </svg>
                <input
                  type="text"
                  placeholder="Add promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm sm:text-base min-w-0"
                  style={{ fontFamily: 'Roboto' }}
                />
              </span>
              <button className="bg-[#98FF98] hover:bg-green-600 text-black px-4 sm:px-6 py-2 sm:py-3 rounded font-medium transition-colors text-sm sm:text-base flex-shrink-0">
                Apply
              </button>
            </div>
          </div>

          {/* Checkout Button */}
          <Link href="/address">
            <button className="w-full bg-[#FF6F61] hover:bg-red-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors text-sm sm:text-base">
              <span>Go to Checkout</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default OrderSummary; 