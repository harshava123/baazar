'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';
import Image from 'next/image';

const Footer = memo(() => {
  return (
    <footer className="w-full bg-black text-white">
      {/* Top Section - Horizontal Line */}
      <div className="container mx-auto px-4 sm:px-6">
        {/* Horizontal Line */}
        <div className="w-full h-px bg-gray-600" />
        
        {/* Logo - Below the line */}
        <div className="flex items-center justify-start mt-4">
          <Image  
            src="/logo.png" 
            alt="Bazar Story Logo" 
            className="h-28 w-auto"
            width={100}
            height={100}
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Company Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:justify-self-start"
          >
            <h3 className="text-xl font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact us
                </a>
              </li>
              <li>
                <a href="/team" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Team
                </a>
              </li>
              <li>
                <a href="/live-streams" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Live streams
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Right Column - Downloads and Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8 md:justify-self-end md:text-right"
          >
            {/* Download Section */}
            {/* <div>
              <h3 className="text-xl font-semibold mb-6">Download now</h3>
              <div className="flex flex-col sm:flex-row gap-4 md:justify-end"> */}
                {/* App Store Button */}
                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5878 12.3011C15.5986 11.4664 15.8203 10.648 16.2323 9.92207C16.6443 9.19611 17.2333 8.58618 17.9444 8.149C17.4927 7.50384 16.8967 6.9729 16.2039 6.59835C15.5111 6.2238 14.7404 6.01595 13.9532 5.99132C12.274 5.81506 10.6461 6.99615 9.79034 6.99615C8.91807 6.99615 7.60057 6.00882 6.18184 6.03801C5.26417 6.06766 4.36982 6.33451 3.58594 6.81257C2.80206 7.29063 2.15539 7.96359 1.70892 8.76588C-0.22508 12.1143 1.21751 17.0354 3.07012 19.742C3.99702 21.0673 5.0803 22.5478 6.49775 22.4953C7.88481 22.4377 8.40285 21.6108 10.0772 21.6108C11.7359 21.6108 12.2219 22.4953 13.6681 22.4619C15.1565 22.4377 16.0943 21.1306 16.9887 19.7927C17.6546 18.8484 18.1671 17.8047 18.5071 16.7002C17.6424 16.3345 16.9045 15.7223 16.3853 14.94C15.8662 14.1577 15.5889 13.2399 15.5878 12.3011Z" fill="black"/>
                    <path d="M12.8562 4.21132C13.6677 3.23711 14.0675 1.98494 13.9707 0.720703C12.7309 0.850924 11.5856 1.44348 10.7631 2.38031C10.361 2.83798 10.053 3.37041 9.85673 3.94718C9.66049 4.52395 9.57984 5.13375 9.61941 5.7417C10.2395 5.74809 10.853 5.61368 11.4137 5.34859C11.9744 5.0835 12.4676 4.69465 12.8562 4.21132Z" fill="black"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </motion.button> */}

                {/* Google Play Button */}
                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.203 12.4199L0.552979 23.7199C0.669321 24.1473 0.882353 24.5423 1.17562 24.8742C1.46888 25.2062 1.83453 25.4663 2.24432 25.6345C2.6541 25.8026 3.09707 25.8744 3.53898 25.8441C3.9809 25.8138 4.40994 25.6824 4.79298 25.4599L16.793 18.5399L11.203 12.4199Z" fill="#EA4335"/>
                    <path d="M21.9729 10.5L16.7929 7.5L10.9729 12.69L16.8129 18.54L21.9629 15.54C22.4207 15.2948 22.8034 14.93 23.0702 14.4845C23.337 14.0389 23.4779 13.5293 23.4779 13.01C23.4779 12.4907 23.337 11.9811 23.0702 11.5355C22.8034 11.09 22.4207 10.7252 21.9629 10.48L21.9729 10.5Z" fill="#FBBC04"/>
                    <path d="M0.552959 2.28027C0.500076 2.51648 0.476565 2.75831 0.48296 3.00027V23.0003C0.484705 23.2502 0.51831 23.4989 0.58296 23.7403L11.583 12.7403L0.552959 2.28027Z" fill="#4285F4"/>
                    <path d="M11.2829 12.9996L16.7929 7.48965L4.79295 0.549648C4.34212 0.281649 3.82742 0.140022 3.30295 0.139648C2.67031 0.141461 2.05574 0.350817 1.55356 0.735584C1.05137 1.12035 0.689316 1.65927 0.522949 2.26965L11.2829 12.9996Z" fill="#34A853"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </motion.button> */}
              {/* </div>
            </div> */}

            {/* Social Media Section */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Join Us</h3>
              <div className="flex gap-4 md:justify-end">
                {/* YouTube */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </motion.a>

                {/* Facebook */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>

                {/* Twitter */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </motion.a>

                {/* Instagram */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.796-1.418-1.947-1.418-3.244s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z"/>
                  </svg>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Horizontal Line */}
        <div className="w-full h-px bg-gray-600 mb-6" />
        
        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-gray-400"
        >
          <p>&copy; 2025 All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer; 