import React from 'react';
import Header from '@/components/layout/Header';
import { PaymentLayout } from '@/components/sections/payment';
import Footer from '@/components/sections/Footer';

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-20 sm:mt-24">
        <PaymentLayout />
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage; 