'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, User, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/data'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'

// Search Icon Component
const SearchIcon = ({ className }: { className?: string }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_172_994)">
      <path 
        d="M17.5 17.5L22 22" 
        stroke="#98FF98" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" 
        stroke="#98FF98" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_172_994">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

// Navigation Item Component
const NavItem = React.memo(({ item, isActive }: { item: typeof navItems[0]; isActive: boolean }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (item.href.includes('#')) {
      e.preventDefault()
      const targetId = item.href.split('#')[1]
      
      // If we're not on the home page, navigate to home first
      if (window.location.pathname !== '/') {
        window.location.href = item.href
        return
      }
      
      // If we're on the home page, scroll to the section and update URL
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        // Update the URL hash to reflect the current section
        window.history.pushState(null, '', item.href)
      }
    }
  }

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-opacity-80",
        isActive ? "text-[#98FF98]" : "text-[#98FF98]"
      )}
    >
      <motion.span
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10"
      >
        {item.title}
      </motion.span>
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#98FF98]"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  )
})

NavItem.displayName = 'NavItem'

// Search Component
const SearchBox = React.memo(() => {
  const [searchValue, setSearchValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchValue)
    }
  }, [searchValue])

  return (
    <form onSubmit={handleSubmit} className="relative">
      <motion.div
        className={cn(
          "relative flex items-center bg-transparent border-2 rounded-lg transition-all duration-300",
          isFocused ? "border-[#98FF98] shadow-md" : "border-[#98FF98]"
        )}
        whileFocus={{ scale: 1.02 }}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 py-2 pl-4 pr-12 text-white bg-transparent placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute right-2 p-1 hover:bg-[#98FF98] hover:bg-opacity-10 rounded-md transition-colors duration-200"
          aria-label="Search"
        >
          <SearchIcon className="w-6 h-6" />
        </button>
      </motion.div>
    </form>
  )
})

SearchBox.displayName = 'SearchBox'

// Action Icons Component
const ActionIcons = React.memo(() => {
  const { state } = useCart();
  const cartCount = state.itemCount;
  const [wishlistCount] = useState(0)

  const iconClass = "w-6 h-6 text-[#98FF98] hover:text-opacity-80 transition-colors duration-200"

  return (
    <div className="flex items-center space-x-4">
             <Link href="/cart">
               <motion.button
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 className="relative p-2 rounded-lg hover:bg-[#325a32] hover:bg-opacity-10 transition-colors duration-200"
                 aria-label="Shopping Cart"
                 title="Shopping Cart"
               >
                 <ShoppingCart className={iconClass} />
                 {cartCount > 0 && (
                   <span className="absolute -top-1 -right-1 bg-[#98FF98] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                     {cartCount}
                   </span>
                 )}
               </motion.button>
             </Link>

       <Link href="/wishlist">
         <motion.button
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           className="relative p-2 rounded-lg hover:bg-[#325a32] hover:bg-opacity-10 transition-colors duration-200"
           aria-label="Wishlist"
           title="Wishlist"
         >
           <Heart className={iconClass} />
           {wishlistCount > 0 && (
             <span className="absolute -top-1 -right-1 bg-[#98FF98] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
               {wishlistCount}
             </span>
           )}
         </motion.button>
       </Link>

       <motion.button
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.9 }}
         className="p-2 rounded-lg hover:bg-[#325a32] hover:bg-opacity-10 transition-colors duration-200"
         aria-label="Profile"
         title="Profile"
       >
         <User className={iconClass} />
       </motion.button>
    </div>
  )
})

ActionIcons.displayName = 'ActionIcons'

// Mobile Navigation Component
const MobileNavigation = React.memo(({ isOpen, onClose, pathname, activeItem }: { isOpen: boolean; onClose: () => void; pathname: string; activeItem: string }) => {
  const { state } = useCart();
  const cartCount = state.itemCount;
  const [wishlistCount] = useState(0);

  const handleMobileNavClick = (e: React.MouseEvent, href: string) => {
    if (href.includes('#')) {
      e.preventDefault()
      const targetId = href.split('#')[1]
      
      // If we're not on the home page, navigate to home first
      if (window.location.pathname !== '/') {
        window.location.href = href
        onClose()
        return
      }
      
      // If we're on the home page, scroll to the section and update URL
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        // Update the URL hash to reflect the current section
        window.history.pushState(null, '', href)
      }
    }
    onClose()
  }

  const iconClass = "w-6 h-6 text-[#98FF98] hover:text-opacity-80 transition-colors duration-200"

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? '0%' : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-black border-l border-[#98FF98] shadow-xl lg:hidden"
    >
      <div className="flex items-center justify-between p-4 border-b border-[#98FF98]">
        <h2 className="text-lg font-semibold text-[#98FF98]">Menu</h2>
        <button
          onClick={onClose}
          className="p-2 text-[#98FF98] hover:bg-[#98FF98] hover:bg-opacity-10 rounded-lg transition-colors duration-200"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* Action Icons for Mobile */}
      <div className="flex items-center justify-center space-x-6 p-4 border-b border-[#98FF98]">
        <Link href="/cart" onClick={onClose}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 rounded-lg hover:bg-[#325a32] hover:bg-opacity-10 transition-colors duration-200"
            aria-label="Shopping Cart"
            title="Shopping Cart"
          >
            <ShoppingCart className={iconClass} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#98FF98] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </motion.button>
        </Link>

        <Link href="/wishlist" onClick={onClose}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 rounded-lg hover:bg-[#325a32] hover:bg-opacity-10 transition-colors duration-200"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart className={iconClass} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#98FF98] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </motion.button>
        </Link>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg hover:bg-[#325a32] hover:bg-opacity-10 transition-colors duration-200"
          aria-label="Profile"
          title="Profile"
          onClick={onClose}
        >
          <User className={iconClass} />
        </motion.button>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          // Determine if this item is active (same logic as desktop)
          const isActive = (() => {
            if (item.href.includes('#')) {
              // For anchor links, check if we're on home page and hash matches
              if (pathname === '/' && activeItem === item.href) {
                return true
              }
              return false
            } else {
              // For regular page links, check if pathname matches
              return pathname === item.href
            }
          })()
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleMobileNavClick(e, item.href)}
              className={cn(
                "block px-4 py-3 text-[#98FF98] hover:bg-[#98FF98] hover:bg-opacity-10 rounded-lg transition-colors duration-200",
                isActive && "bg-[#98FF98] bg-opacity-10"
              )}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
    </motion.div>
  )
})

MobileNavigation.displayName = 'MobileNavigation'

// Main Header Component
const Header = () => {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState('/')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Update active item based on current pathname
  React.useEffect(() => {
    const updateActiveItem = () => {
      const hash = window.location.hash
      
      if (pathname === '/' && hash) {
        setActiveItem(`/${hash}`)
      } else if (pathname === '/') {
        setActiveItem('/#home')
      } else {
        setActiveItem(pathname)
      }
    }

    updateActiveItem()

    // Listen for hash changes when on home page
    if (pathname === '/') {
      const handleHashChange = () => {
        updateActiveItem()
      }
      
      window.addEventListener('hashchange', handleHashChange)
      return () => window.removeEventListener('hashchange', handleHashChange)
    }
  }, [pathname])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-[#98FF98] backdrop-blur-md"
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-18 lg:h-20">
            {/* Logo / Brand */}
            <Link 
              href="/#home" 
              className="hover:opacity-80 transition-opacity duration-200 flex-shrink-0"
            >
              <Image  
                src="/logo.png" 
                alt="Bazar Story Logo" 
                className="h-20 md:h-22 lg:h-28 w-auto"
                width={100}
                height={100}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 ml-8">
              {navItems.map((item) => {
                // Determine if this item is active
                const isActive = (() => {
                  if (item.href.includes('#')) {
                    // For anchor links, check if we're on home page and hash matches
                    if (pathname === '/' && activeItem === item.href) {
                      return true
                    }
                    return false
                  } else {
                    // For regular page links, check if pathname matches
                    return pathname === item.href
                  }
                })()
                
                return (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={isActive}
                  />
                )
              })}
            </nav>

            {/* Search Box - Responsive sizing */}
            <div className="hidden md:block flex-1 max-w-md lg:max-w-lg xl:max-w-xl mx-4">
              <SearchBox />
            </div>

            {/* Action Icons */}
            <div className="hidden md:flex">
              <ActionIcons />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-[#98FF98] hover:bg-[#98FF98] hover:bg-opacity-10 rounded-lg transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Search - Shows below header on mobile and tablet */}
          <div className="lg:hidden pb-4">
            <SearchBox />
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Navigation */}
      <MobileNavigation isOpen={isMobileMenuOpen} onClose={closeMobileMenu} pathname={pathname} activeItem={activeItem} />
    </>
  )
}

export default Header 