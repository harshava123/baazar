import React from 'react';
import WishlistLayout from '@/components/sections/wishlist/WishlistLayout';
import Footer from '@/components/sections/Footer';

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-20 sm:mt-24">
        <WishlistLayout />
      </div>
      <Footer />
    </div>
  );
} 