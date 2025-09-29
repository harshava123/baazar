'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';

interface AddressManagementProps {
  showAddAddressModal: boolean;
  setShowAddAddressModal: (show: boolean) => void;
}

const AddressManagement = ({ setShowAddAddressModal }: AddressManagementProps) => {
  const [selectedAddress, setSelectedAddress] = useState('');

  // Sample addresses - in a real app, these would come from user data
  const savedAddresses = [
    {
      id: '1',
      name: 'Home Address',
      fullAddress: '123 Main Street, Apartment 4B, New York, NY 10001'
    },
    {
      id: '2',
      name: 'Office Address',
      fullAddress: '456 Business Ave, Suite 200, New York, NY 10002'
    }
  ];

  return (
    <motion.div 
      className="bg-white rounded-lg p-8 text-gray-900 shadow-lg"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Delivery Address Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-roboto text-black font-medium">
          Delivery Address
        </h2>
        
        {/* Address Selection Dropdown */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Select Address
          </label>
          <div className="relative">
            <select
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#98FF98] focus:border-transparent appearance-none"
              style={{
                fontFamily: 'Roboto',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '24px'
              }}
              aria-label="Select delivery address"
            >
              <option value="">Select Address</option>
              {savedAddresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.name} - {address.fullAddress}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Add New Address Button */}
        <motion.button
          onClick={() => setShowAddAddressModal(true)}
          className="flex items-center gap-2 bg-[#98FF98] hover:bg-green-600 text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px'
          }}
        >
          <Plus className="w-5 h-5" />
          Add New Address
        </motion.button>
      </div>

      {/* Add Address Form Section */}
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-roboto text-black font-medium">
          Add Address
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name*
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
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
              placeholder="Enter your phone number"
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
            placeholder="Enter area and street name"
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
          className="w-full bg-[#FF6F61] hover:bg-red-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
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
      </div>
    </motion.div>
  );
};

export default AddressManagement; 