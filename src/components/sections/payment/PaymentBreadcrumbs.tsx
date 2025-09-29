'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home, ShoppingCart, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';

const PaymentBreadcrumbs = () => {
  const steps = [
    { name: 'Home', icon: Home, href: '/', completed: true },
    { name: 'Cart', icon: ShoppingCart, href: '/cart', completed: true },
    { name: 'Address', icon: MapPin, href: '/address', completed: true },
    { name: 'Payment', icon: CreditCard, href: '/payment', completed: false, current: true }
  ];

  return (
    <div className="mb-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.name}>
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  step.current 
                    ? 'border-[#FF6F61] bg-[#FF6F61] text-white' 
                    : step.completed 
                      ? 'border-[#98FF98] bg-[#98FF98] text-black'
                      : 'border-gray-400 bg-gray-800 text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                  step.current ? 'text-[#FF6F61]' : step.completed ? 'text-[#98FF98]' : 'text-gray-400'
                }`}>
                  {step.name}
                </span>
              </motion.div>
              
              {index < steps.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-600"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-white transition-colors duration-200">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/cart" className="hover:text-white transition-colors duration-200">
          Cart
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/address" className="hover:text-white transition-colors duration-200">
          Address
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#FF6F61] font-medium">Payment</span>
      </div>
    </div>
  );
};

export default PaymentBreadcrumbs; 