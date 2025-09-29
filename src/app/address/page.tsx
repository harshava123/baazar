import React from 'react';
import AddressLayout from '@/components/sections/address/AddressLayout';
import StandardBreadcrumbs from '@/components/sections/StandardBreadcrumbs';
import Footer from '@/components/sections/Footer';

export default function AddressPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-20 sm:mt-24">
        <StandardBreadcrumbs currentStep="address" />
        <AddressLayout />
      </div>
      <Footer />
    </div>
  );
} 