'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AddressData {
  fullName: string;
  phoneNumber: string;
  state: string;
  pincode: string;
  apartmentDetails: string;
  areaStreet: string;
}

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (addressData: AddressData) => void;
}

const AddAddressModal = ({ isOpen, onClose, onSave }: AddAddressModalProps) => {
  const [formData, setFormData] = useState<AddressData>({
    fullName: '',
    state: '',
    phoneNumber: '',
    pincode: '',
    apartmentDetails: '',
    areaStreet: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.areaStreet.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Call the onSave callback with the address data
    onSave(formData);
    
    // Reset form data
    setFormData({
      fullName: '',
      state: '',
      phoneNumber: '',
      pincode: '',
      apartmentDetails: '',
      areaStreet: ''
    });
  };

  const handleAutofill = () => {
    // Handle autofill functionality
    console.log('Autofill clicked');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 
                  className="text-3xl font-staatliches text-black"
                  style={{
                    fontSize: '36px',
                    lineHeight: '30px',
                    letterSpacing: '4%'
                  }}
                >
                  ADD ADDRESS
                </h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-3 border border-[#98FF98] rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#98FF98] focus:border-transparent"
                      style={{
                        fontFamily: 'Roboto',
                        fontWeight: 500,
                        fontSize: '16px',
                        lineHeight: '24px'
                      }}
                    />
                  </div>

                  {/* State */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="Enter your state"
                      className="w-full px-4 py-3 border border-[#98FF98] rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#98FF98] focus:border-transparent"
                      style={{
                        fontFamily: 'Roboto',
                        fontWeight: 500,
                        fontSize: '16px',
                        lineHeight: '24px'
                      }}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="Enter your phone number"
                      required
                      className="w-full px-4 py-3 border border-[#98FF98] rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#98FF98] focus:border-transparent"
                      style={{
                        fontFamily: 'Roboto',
                        fontWeight: 500,
                        fontSize: '16px',
                        lineHeight: '24px'
                      }}
                    />
                  </div>

                  {/* Pincode */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="Enter pincode"
                      className="w-full px-4 py-3 border border-[#98FF98] rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#98FF98] focus:border-transparent"
                      style={{
                        fontFamily: 'Roboto',
                        fontWeight: 500,
                        fontSize: '16px',
                        lineHeight: '24px'
                      }}
                    />
                  </div>
                </div>

                {/* Flat, House no., Apartment, floor, etc. */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Flat, House no., Apartment, floor, etc. (optional)*
                  </label>
                  <input
                    type="text"
                    value={formData.apartmentDetails}
                    onChange={(e) => handleInputChange('apartmentDetails', e.target.value)}
                    placeholder="Enter apartment details"
                    className="w-full px-4 py-3 border border-[#98FF98] rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#98FF98] focus:border-transparent"
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '24px'
                    }}
                  />
                </div>

                {/* Area, Street */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Area, Street*
                  </label>
                  <input
                    type="text"
                    value={formData.areaStreet}
                    onChange={(e) => handleInputChange('areaStreet', e.target.value)}
                    placeholder="Enter area and street name"
                    required
                    className="w-full px-4 py-3 border border-[#98FF98] rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#98FF98] focus:border-transparent"
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '24px'
                    }}
                  />
                </div>

                {/* Autofill Section */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700" style={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '24px'
                  }}>
                    Save time. Autofill your current location.
                  </span>
                  <motion.button
                    type="button"
                    onClick={handleAutofill}
                    className="bg-[#98FF98] hover:bg-green-600 text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '24px'
                    }}
                  >
                    Autofill
                  </motion.button>
                </div>

                {/* Save Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-[#FF6F61] hover:bg-red-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-200 mt-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '24px'
                  }}
                >
                  Save
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddAddressModal; 