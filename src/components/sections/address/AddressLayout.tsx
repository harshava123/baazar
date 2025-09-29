'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronDown, MapPin, Trash2, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AddAddressModal from './AddAddressModal';

interface Address {
  id: string;
  fullName: string;
  phoneNumber: string;
  state: string;
  pincode: string;
  apartmentDetails: string;
  areaStreet: string;
  isDefault?: boolean;
}

const AddressLayout = () => {
  const router = useRouter();
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([
    // Sample addresses for demonstration - in future, these will come from database
    {
      id: '1',
      fullName: 'John Doe',
      phoneNumber: '+91 98765 43210',
      state: 'Maharashtra',
      pincode: '400001',
      apartmentDetails: 'Apartment 4B, Building A',
      areaStreet: 'Marine Drive, Colaba',
      isDefault: true
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      phoneNumber: '+91 87654 32109',
      state: 'Delhi',
      pincode: '110001',
      apartmentDetails: 'Flat 12, Tower 3',
      areaStreet: 'Connaught Place, New Delhi',
      isDefault: false
    }
  ]);
  const [selectedAddress, setSelectedAddress] = useState<string>('1'); // Default to first address

  const handleSaveAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...addressData,
      id: Date.now().toString(), // In future, this will come from database
    };

    // If this is the first address, make it default
    if (savedAddresses.length === 0) {
      newAddress.isDefault = true;
      setSelectedAddress(newAddress.id);
    }

    setSavedAddresses(prev => [...prev, newAddress]);
    setShowAddAddressModal(false);
    
    // Show success notification
    setShowSuccessNotification(true);
    setTimeout(() => setShowSuccessNotification(false), 3000);
  };

  const handleDeleteAddress = (addressId: string) => {
    setSavedAddresses(prev => {
      const updated = prev.filter(addr => addr.id !== addressId);
      
      // If we deleted the selected address, select the first available one
      if (selectedAddress === addressId && updated.length > 0) {
        setSelectedAddress(updated[0].id);
      }
      
      return updated;
    });
  };

  const handleSetDefault = (addressId: string) => {
    setSavedAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    );
    setSelectedAddress(addressId);
  };

  const handleContinueToPayment = () => {
    if (selectedAddress) {
      router.push('/payment');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* BILLING DETAILS Heading */}
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
        BILLING DETAILS
      </motion.h1>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Section - Address Management */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Add Delivery Address Button */}
          <motion.div 
            className="bg-white rounded-lg p-6 sm:p-8 text-gray-900 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => setShowAddAddressModal(true)}
          >
            <div className="flex items-center justify-between">
              <span 
                className="text-lg sm:text-xl font-medium"
                style={{
                  fontFamily: 'Roboto',
                  fontWeight: 500,
                  fontSize: 'clamp(14px, 4vw, 16px)',
                  lineHeight: '24px'
                }}
              >
                Add Delivery Address
              </span>
              <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
          </motion.div>

          {/* Saved Addresses */}
          {savedAddresses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 
                className="text-lg sm:text-xl font-medium text-white"
                style={{
                  fontFamily: 'Roboto',
                  fontWeight: 500,
                  fontSize: 'clamp(14px, 4vw, 16px)',
                  lineHeight: '24px'
                }}
              >
                Saved Addresses ({savedAddresses.length})
              </h3>
              
              <div className="space-y-4">
                {savedAddresses.map((address) => (
                  <motion.div
                    key={address.id}
                    className={`bg-white rounded-lg p-4 sm:p-6 text-gray-900 shadow-lg border-2 transition-all duration-200 ${
                      selectedAddress === address.id 
                        ? 'border-[#FF6F61] shadow-xl' 
                        : 'border-transparent hover:border-gray-200'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6F61]" />
                          <h4 className="font-semibold text-base sm:text-lg">{address.fullName}</h4>
                          {address.isDefault && (
                            <span className="bg-[#FF6F61] text-white px-2 py-1 rounded-full text-xs font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-gray-600 text-sm sm:text-base">
                          <p>{address.apartmentDetails && `${address.apartmentDetails}, `}{address.areaStreet}</p>
                          <p>{address.state} - {address.pincode}</p>
                          <p>Phone: {address.phoneNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {!address.isDefault && (
                          <motion.button
                            onClick={() => handleSetDefault(address.id)}
                            className="text-[#98FF98] hover:text-green-600 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Set as default"
                          >
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          </motion.button>
                        )}
                        
                        <motion.button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-500 hover:text-red-600 transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Delete address"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <motion.button
                        onClick={() => setSelectedAddress(address.id)}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base ${
                          selectedAddress === address.id
                            ? 'bg-[#FF6F61] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {selectedAddress === address.id ? 'Selected' : 'Select This Address'}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
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
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm sm:text-base">Subtotal</span>
                <span className="font-medium text-sm sm:text-base">₹ 900</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm sm:text-base">Discount (-20%)</span>
                <span className="text-red-500 font-medium text-sm sm:text-base">-₹ 180</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm sm:text-base">Delivery Fee</span>
                <span className="font-medium text-sm sm:text-base">₹ 180</span>
              </div>
              <div className="border-t pt-2 sm:pt-3 flex justify-between">
                <span className="font-bold text-base sm:text-lg">Total</span>
                <span className="font-bold text-base sm:text-lg">₹ 900</span>
              </div>
            </div>

            {/* Continue to Payment Button */}
            {selectedAddress && (
              <motion.button
                onClick={handleContinueToPayment}
                className="w-full bg-[#98FF98] hover:bg-green-600 text-black py-3 px-4 rounded-lg font-semibold mt-4 sm:mt-6 transition-colors duration-200 text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to Payment
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <AddAddressModal 
          isOpen={showAddAddressModal}
          onClose={() => setShowAddAddressModal(false)}
          onSave={handleSaveAddress}
        />
      )}

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccessNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg z-50 flex items-center gap-2 sm:gap-3"
          >
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Address saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressLayout; 