'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AccountSidebar from './AccountSidebar';
import WishlistProducts from './WishlistProducts';

const WishlistLayout = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* DETAILS Heading */}
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-5xl font-staatliches text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        DETAILS
      </motion.h1>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Account Sidebar */}
        <div className="lg:col-span-1">
          <AccountSidebar />
        </div>

        {/* Wishlist Products */}
        <div className="lg:col-span-3">
          <WishlistProducts />
        </div>
      </div>
    </div>
  );
};

export default WishlistLayout; 