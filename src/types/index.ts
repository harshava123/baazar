// Product Types
export interface Product {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  description?: string
  category: ProductCategory
  isNew?: boolean
  isFeatured?: boolean
  discount?: number
  rating?: number
  reviews?: number
  sizes?: string[]
  colors?: string[]
  story?: string
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  image?: string
  description?: string
}

// Navigation Types
export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: string
  label?: string
  description?: string
}

export interface NavConfig {
  mainNav: NavItem[]
  sidebarNav: NavItem[]
}

// Blog Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: {
    name: string
    image: string
    bio?: string
  }
  publishedAt: string
  readingTime: number
  tags: string[]
  featured?: boolean
  views?: number
}

// City Bazar Types
export interface CityBazar {
  id: string
  name: string
  location: string
  image: string
  description: string
  specialties: string[]
  featured?: boolean
}

// Livestream Types
export interface LivestreamEvent {
  id: string
  title: string
  description: string
  thumbnail: string
  streamer: {
    name: string
    image: string
    verified?: boolean
  }
  isLive: boolean
  viewers?: number
  startTime: string
  category: string
  products?: Product[]
}

// Animation Types
export interface AnimationProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

// Common UI Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

// Form Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Search Types
export interface SearchFilters {
  category?: string
  priceRange?: {
    min: number
    max: number
  }
  rating?: number
  sortBy?: 'price' | 'rating' | 'newest' | 'popular'
  sortOrder?: 'asc' | 'desc'
}

export interface SearchResult {
  query: string
  products: Product[]
  total: number
  filters: SearchFilters
  suggestions?: string[]
}

// User Types (for future implementation)
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin'
  preferences?: {
    theme?: 'light' | 'dark'
    notifications?: boolean
    currency?: string
  }
}

// Cart Types (for future implementation)
export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface Cart {
  items: CartItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
}

// Backend API Types
export interface BackendCategory {
  id: string
  name: string
  image?: string
  description?: string
}

export interface BackendProduct {
  id: string
  name: string
  price: number
  discount_price?: number
  discount_percentage?: number
  images?: string[]
  description?: string
  categories?: {
    id: string
    name: string
  }
  category_id?: string
  sizes?: string[]
  colors?: string[]
  rating?: number
  review_count?: number
  stock?: number
  is_featured?: boolean
  slug?: string
}

export interface LivestreamCard {
  id: string
  title: string
  thumbnail: string
  streamer: {
    name: string
    image: string
  }
  isLive: boolean
  viewers: number
  comments: Array<{
    id: string
    username: string
    message: string
  }>
} 