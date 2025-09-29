'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AddressBreadcrumbs = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2">
        <Link 
          href="/" 
          className="text-[#FF6F61] hover:text-opacity-80 transition-colors"
          style={{
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '14px',
            lineHeight: '21px',
            letterSpacing: '0%'
          }}
        >
          Home
        </Link>
        <span className="text-[#FF6F61]">/</span>
        <span 
          className="text-[#FF6F61]"
          style={{
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '14px',
            lineHeight: '21px',
            letterSpacing: '0%'
          }}
        >
          Cart
        </span>
        <span className="text-[#FF6F61]">/</span>
        <span 
          className="text-[#FF6F61]"
          style={{
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '14px',
            lineHeight: '21px',
            letterSpacing: '0%'
          }}
        >
          Address
        </span>
      </div>

      {/* Progress Indicator - Centered */}
      <div className="flex items-center justify-center space-x-8">
        {/* Cart Step - Completed */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-11 h-11 flex items-center justify-center">
            <Image
              src="/carticons/cart.svg"
              alt="Cart"
              width={30}
              height={30}
              className="w-full h-full"
            />
          </div>
          <span 
            className="text-[#98FF98] font-medium"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '21px',
              letterSpacing: '0%'
            }}
          >
            Cart
          </span>
        </div>
        
        {/* Dotted Line */}
        <div className="w-16 h-0.5 bg-[#FF6F61] border-dashed border-[#FF6F61] border-t-2"></div>
        
        {/* Address Step - Active */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-11 h-11 flex items-center justify-center bg-[#FF6F61] rounded-full">
            <Image
              src="/carticons/home.svg"
              alt="Address"
              width={45}
              height={45}
              className="w-full h-full"
            />
          </div>
          <span 
            className="text-[#FF6F61] font-medium"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '21px',
              letterSpacing: '0%'
            }}
          >
            Address
          </span>
        </div>
        
        {/* Dotted Line */}
        <div className="w-16 h-0.5 bg-[#98FF98] border-dashed border-[#98FF98] border-t-2"></div>
        
        {/* Payment Step */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-11 h-11 flex items-center justify-center">
            <Image
              src="/carticons/pay.svg"
              alt="Payment"
              width={45}
              height={45}
              className="w-full h-full"
            />
          </div>
          <span 
            className="text-[#98FF98] font-medium"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '21px',
              letterSpacing: '0%'
            }}
          >
            Payment
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddressBreadcrumbs; 