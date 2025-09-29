import React from 'react';
import ProductDetail from '@/components/sections/product/ProductDetail';
import Footer from '@/components/sections/Footer';
import Header from '@/components/layout/Header';
import ScrollToTop from '@/components/sections/product/ScrollToTop';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ScrollToTop />
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 mt-20 sm:mt-24">
        <ProductDetail productId={id} />
      </div>
      <Footer />
    </div>
  );
} 