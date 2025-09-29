'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AddressSidebar = () => {
  const accountSections = [
    {
      title: 'Manage My Account',
      items: [
        { name: 'My Profile', href: '/account/profile' },
        { name: 'Address Book', href: '/address', isActive: true },
        { name: 'My Payment Options', href: '/account/payment' },
      ]
    },
    {
      title: 'My Orders',
      items: [
        { name: 'My Returns', href: '/account/returns' },
        { name: 'My Cancellations', href: '/account/cancellations' },
        { name: 'My WishList', href: '/wishlist' },
      ]
    }
  ];

  return (
    <motion.div 
      className="bg-white rounded-lg p-6 text-gray-900 shadow-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {accountSections.map((section, sectionIndex) => (
        <div key={section.title} className={sectionIndex > 0 ? 'mt-8' : ''}>
          <h3 className="font-bold text-lg mb-4 text-black">
            {section.title}
          </h3>
          <ul className="space-y-3">
            {section.items.map((item) => (
              <li key={item.name}>
                <motion.a
                  href={item.href}
                  className={`block py-2 px-3 rounded-md transition-colors duration-200 ${
                    item.isActive 
                      ? 'text-[#98FF98] font-medium bg-[#98FF98] bg-opacity-10' 
                      : 'text-black hover:bg-gray-100'
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
};

export default AddressSidebar; 