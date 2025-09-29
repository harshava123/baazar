import React from 'react';
import Header from '@/components/layout/Header';
import { SelectedItems, OrderSummary, Recommendations } from '@/components/sections/cart';
import StandardBreadcrumbs from '@/components/sections/StandardBreadcrumbs';
import Footer from '@/components/sections/Footer';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-20 sm:mt-24">
        <StandardBreadcrumbs currentStep="cart" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
          {/* Selected Items - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <SelectedItems />
          </div>
          
          {/* Order Summary - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
        
        {/* Recommendations Section */}
        <div className="mt-12 sm:mt-16">
          <Recommendations />
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 