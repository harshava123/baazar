'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CreditCard, DollarSign, Smartphone, Wallet, Tag, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import StandardBreadcrumbs from '@/components/sections/StandardBreadcrumbs';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const PaymentLayout = () => {
  const router = useRouter();
  const { state, clearCart } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('cash');
  const [promoCode, setPromoCode] = useState<string>('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    { id: 'bank', name: 'Bank', icon: CreditCard },
    { id: 'cash', name: 'Cash on delivery', icon: DollarSign },
    { id: 'upi', name: 'UPI', icon: Smartphone },
    { id: 'wallet', name: 'Wallet', icon: Wallet }
  ];

  // Calculate order summary from cart
  const originalSubtotal = state.items.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.price;
    return sum + (originalPrice * item.quantity);
  }, 0);

  const discountedTotal = state.total;
  const discount = originalSubtotal - discountedTotal;
  const discountPercentage = originalSubtotal > 0 
    ? Math.round((discount / originalSubtotal) * 100) 
    : 0;

  const handlePaymentMethodChange = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleApplyPromoCode = () => {
    // In future, this will validate and apply promo codes
    console.log('Applying promo code:', promoCode);
    // You can add promo code validation logic here
  };

  const handleCheckout = async () => {
    if (state.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // In future, this will send order to backend
      const orderData = {
        items: state.items,
        paymentMethod: selectedPaymentMethod,
        total: discountedTotal,
        originalTotal: originalSubtotal,
        discount: discount,
        timestamp: new Date().toISOString()
      };

      console.log('Order placed:', orderData);

      // Show success notification
      setShowSuccessNotification(true);
      setIsProcessing(false);

      // Clear cart and redirect after 2 seconds
      setTimeout(() => {
        clearCart();
        localStorage.removeItem('savedAddresses'); // Optional: clear addresses
        router.push('/'); // Redirect to home
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Payment Breadcrumbs */}
      <StandardBreadcrumbs currentStep="payment" />

      {/* CHOOSE PAYMENT MODE Heading */}
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-5xl font-staatliches"
        style={{
          color: '#FAE5E5',
          fontSize: 'clamp(28px, 6vw, 36px)',
          lineHeight: '30px',
          letterSpacing: '4%'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        CHOOSE PAYMENT MODE
      </motion.h1>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Section - Payment Methods */}
        <div className="lg:col-span-2">
          <motion.div 
            className="bg-white rounded-lg p-6 sm:p-8 text-gray-900 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4 sm:space-y-6">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:border-gray-300"
                  style={{
                    borderColor: selectedPaymentMethod === method.id ? '#FF6F61' : 'transparent',
                    backgroundColor: selectedPaymentMethod === method.id ? '#FFF5F5' : 'transparent'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  onClick={() => handlePaymentMethodChange(method.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    id={method.id}
                    checked={selectedPaymentMethod === method.id}
                    onChange={() => handlePaymentMethodChange(method.id)}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6F61] border-gray-300 focus:ring-[#FF6F61]"
                  />
                  <label htmlFor={method.id} className="flex items-center space-x-2 sm:space-x-3 cursor-pointer flex-1">
                    <method.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6F61]" />
                    <span className="font-medium text-base sm:text-lg">{method.name}</span>
                  </label>
                </motion.div>
              ))}
            </div>

            {/* Payment Method Logos */}
            <motion.div 
              className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                <div className="flex items-center space-x-1">
                  <Image 
                    src="/payment/visa.png" 
                    alt="VISA" 
                    width={32} 
                    height={20} 
                    className="object-contain sm:w-10 sm:h-6"
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <Image 
                    src="/payment/mastercard.png" 
                    alt="Mastercard" 
                    width={32} 
                    height={20} 
                    className="object-contain sm:w-10 sm:h-6"
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-orange-500 font-bold text-sm sm:text-lg">নগদ</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image 
                    src="/payment/gpay.png" 
                    alt="Google Pay" 
                    width={32} 
                    height={20} 
                    className="object-contain sm:w-10 sm:h-6"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="lg:col-span-1">
          <motion.div 
            className="bg-white rounded-lg p-4 sm:p-6 text-gray-900 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold">Order Summary</h3>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </div>
            
            {/* Order Summary Content */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {state.items.length > 0 ? (
                <>
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
                  <div className="border-t pt-2 sm:pt-3 flex justify-between">
                    <span className="font-bold text-base sm:text-lg">Total</span>
                    <span className="font-bold text-base sm:text-lg">₹ {discountedTotal}</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Your cart is empty
                </div>
              )}
            </div>

            {/* Promo Code Section */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Promo Code</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent text-sm sm:text-base"
                />
                <motion.button
                  onClick={handleApplyPromoCode}
                  className="bg-[#98FF98] hover:bg-green-600 text-black px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply
                </motion.button>
              </div>
            </div>

            {/* Checkout Button */}
            <motion.button
              onClick={handleCheckout}
              disabled={state.items.length === 0 || isProcessing}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base ${
                state.items.length === 0 || isProcessing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#FF6F61] hover:bg-red-600 text-white'
              }`}
              whileHover={state.items.length > 0 && !isProcessing ? { scale: 1.02 } : {}}
              whileTap={state.items.length > 0 && !isProcessing ? { scale: 0.98 } : {}}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Place Order</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccessNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold text-lg">Order Placed Successfully!</p>
              <p className="text-sm text-white/90">Redirecting to home...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentLayout; 