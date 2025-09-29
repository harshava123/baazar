import { Product, ProductCategory, BlogPost, CityBazar, LivestreamEvent, NavItem } from '@/types'

// Navigation Data
export const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/#home',
  },
  {
    title: 'Livestream',
    href: '/livestream',
  },
  {
    title: 'Browse By Vibe',
    href: '/#categories',
  },
  {
    title: 'HOT Picks From Live Drops',
    href: '/#top-selling',
  },
  {
    title: 'Bazar Blogs',
    href: '/#blog',
  },
  {
    title: 'About Us',
    href: '/about',
  },
]

// Product Categories
export const productCategories: ProductCategory[] = [
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    image: '/images/categories/fashion.jpg',
    description: 'Discover unique fashion pieces with cultural stories'
  },
  {
    id: 'jewelry',
    name: 'Jewelry & Accessories',
    slug: 'jewelry-accessories',
    image: '/images/categories/jewelry.jpg',
    description: 'Handcrafted jewelry and accessories'
  },
  {
    id: 'beauty',
    name: 'Beauty/Kitchen',
    slug: 'beauty-kitchen',
    image: '/images/categories/beauty.jpg',
    description: 'Beauty products and kitchen essentials'
  },
  {
    id: 'wardrobe',
    name: 'Wardrobe Essentials',
    slug: 'wardrobe-essentials',
    image: '/images/categories/wardrobe.jpg',
    description: 'Essential wardrobe pieces for every occasion'
  },
  {
    id: 'perfumes',
    name: 'Perfumes',
    slug: 'perfumes',
    image: '/images/categories/perfumes.jpg',
    description: 'Exotic fragrances from around the world'
  },
]

// Sample Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Lee Women\'s Ultra Lux Comfort',
    price: 200,
    image: '/categories/clothing.png',
    category: productCategories[0],
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviews: 80,
    story: 'Crafted with modern design and comfort in mind'
  },
  {
    id: '2',
    name: 'adidas Women\'s Grand Court',
    price: 200,
    image: '/categories/sneakers.png',
    category: productCategories[0],
    rating: 4.8,
    reviews: 120,
    isFeatured: true,
    story: 'Essential sportswear for active lifestyle'
  },
  {
    id: '3',
    name: 'Portable Neck Fan Hands Free Fan',
    price: 200,
    image: '/categories/Electronics.png',
    category: productCategories[1],
    rating: 4.8,
    reviews: 120,
    isFeatured: true,
    story: 'Durable and stylish for everyday adventures'
  },
  {
    id: '4',
    name: 'Matein Business Laptop Backpack',
    price: 200,
    image: '/categories/bags.png',
    category: productCategories[1],
    rating: 4.8,
    reviews: 120,
    isFeatured: true,
    story: 'Classic design with modern UV protection'
  },
  {
    id: '5',
    name: 'Pink Round Neck Striped Dress',
    price: 200,
    image: '/categories/clothing.png',
    category: productCategories[1],
    isFeatured: true,
    rating: 4.8,
    reviews: 120,
    story: 'Artisan-made with traditional techniques'
  },
  {
    id: '6',
    name: 'Premium Leather Boots',
    price: 3200,
    image: '/categories/sneakers.png',
    category: productCategories[3],
    rating: 4.6,
    reviews: 203,
    isFeatured: true,
    story: 'Premium leather boots for all seasons'
  },
  {
    id: '7',
    name: 'Handcrafted Jewelry Set',
    price: 1500,
    image: '/categories/jewellery.jpg',
    category: productCategories[1],
    isFeatured: true,
    rating: 4.9,
    reviews: 180,
    story: 'Traditional craftsmanship meets modern design'
  },
  {
    id: '8',
    name: 'Luxury Perfume Collection',
    price: 800,
    image: '/categories/Perfumes.png',
    category: productCategories[4],
    isFeatured: true,
    rating: 4.7,
    reviews: 95,
    story: 'Exotic fragrances from around the world'
  },
  {
    id: '9',
    name: 'Premium Makeup Kit',
    price: 1200,
    image: '/categories/makeup.png',
    category: productCategories[2],
    isFeatured: true,
    rating: 4.6,
    reviews: 142,
    story: 'Professional quality makeup for every occasion'
  },
  {
    id: '10',
    name: 'Designer Accessories',
    price: 600,
    image: '/categories/Accessories.png',
    category: productCategories[1],
    isFeatured: true,
    rating: 4.5,
    reviews: 89,
    story: 'Stylish accessories to complete your look'
  },
]

// Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Handcrafted Jewelry',
    slug: 'art-of-handcrafted-jewelry',
    excerpt: 'Discover the intricate process behind our handcrafted jewelry pieces and the stories they tell.',
    content: 'Full content here...',
    image: '/bazarBlogs/1.png',
    author: {
      name: 'Sarah Johnson',
      image: '/images/authors/sarah.jpg',
      bio: 'Jewelry designer and cultural historian'
    },
    publishedAt: '2024-01-15',
    readingTime: 5,
    tags: ['jewelry', 'craftsmanship', 'culture'],
    featured: true,
    views: 2453
  },
  {
    id: '2',
    title: 'Fashion Trends from City Bazars',
    slug: 'fashion-trends-city-bazars',
    excerpt: 'Explore the latest fashion trends emerging from traditional city bazars around the world.',
    content: 'Full content here...',
    image: '/bazarBlogs/2.png',
    author: {
      name: 'Michael Chen',
      image: '/images/authors/michael.jpg',
      bio: 'Fashion journalist and trend analyst'
    },
    publishedAt: '2024-01-10',
    readingTime: 7,
    tags: ['fashion', 'trends', 'bazars'],
    featured: false,
    views: 1876
  },
  {
    id: '3',
    title: 'Traditional Crafts Revival',
    slug: 'traditional-crafts-revival',
    excerpt: 'How modern artisans are breathing new life into age-old craft traditions.',
    content: 'Full content here...',
    image: '/bazarBlogs/3.png',
    author: {
      name: 'Priya Sharma',
      image: '/images/authors/priya.jpg',
      bio: 'Traditional crafts specialist'
    },
    publishedAt: '2024-01-05',
    readingTime: 6,
    tags: ['crafts', 'tradition', 'revival'],
    featured: true,
    views: 3421
  },
  {
    id: '4',
    title: 'Sustainable Fashion Movement',
    slug: 'sustainable-fashion-movement',
    excerpt: 'Exploring the rise of eco-conscious fashion and its impact on global bazars.',
    content: 'Full content here...',
    image: '/bazarBlogs/4.png',
    author: {
      name: 'Alex Kumar',
      image: '/images/authors/alex.jpg',
      bio: 'Sustainability advocate'
    },
    publishedAt: '2024-01-02',
    readingTime: 8,
    tags: ['sustainability', 'fashion', 'environment'],
    featured: false,
    views: 1945
  },
  {
    id: '5',
    title: 'Culinary Treasures of Street Markets',
    slug: 'culinary-treasures-street-markets',
    excerpt: 'A gastronomic journey through the flavors of traditional street markets.',
    content: 'Full content here...',
    image: '/bazarBlogs/5.png',
    author: {
      name: 'Chef Maria Lopez',
      image: '/images/authors/maria.jpg',
      bio: 'Food critic and cultural explorer'
    },
    publishedAt: '2024-01-01',
    readingTime: 4,
    tags: ['food', 'culture', 'markets'],
    featured: true,
    views: 2897
  },
]

// City Bazars
export const cityBazars: CityBazar[] = [
  {
    id: '1',
    name: 'Hyderabad',
    location: 'Hyderabad, India',
    image: '/cityBazars/hyderabad.png',
    description: 'Famous for its pearls, textiles, and traditional crafts',
    specialties: ['Pearls', 'Textiles', 'Handicrafts'],
    featured: true
  },
  {
    id: '2',
    name: 'Mumbai',
    location: 'Mumbai, India',
    image: '/cityBazars/mumbai.png',
    description: 'The commercial capital with vibrant street markets',
    specialties: ['Textiles', 'Jewelry', 'Street Food'],
    featured: true
  },
  {
    id: '3',
    name: 'Agra',
    location: 'Agra, India',
    image: '/cityBazars/agra.png',
    description: 'City of the Taj Mahal with rich cultural heritage',
    specialties: ['Marble Work', 'Leather', 'Carpets'],
    featured: true
  },
  {
    id: '4',
    name: 'Kolkata',
    location: 'Kolkata, India',
    image: '/cityBazars/kolkata.png',
    description: 'Cultural capital with traditional arts and crafts',
    specialties: ['Handloom', 'Sweets', 'Art'],
    featured: true
  },
]

// Livestream Events
export const livestreamEvents: LivestreamEvent[] = [
  {
    id: '1',
    title: 'Fashion Week Highlights',
    description: 'Live showcase of the latest fashion collections from our featured designers',
    thumbnail: '/images/livestream/fashion-week.jpg',
    streamer: {
      name: 'Emma Rodriguez',
      image: '/images/streamers/emma.jpg',
      verified: true
    },
    isLive: true,
    viewers: 2847,
    startTime: '2024-01-20T14:00:00Z',
    category: 'Fashion',
    products: products.slice(0, 3)
  },
  {
    id: '2',
    title: 'Jewelry Making Workshop',
    description: 'Learn the art of traditional jewelry making with master craftsman',
    thumbnail: '/images/livestream/jewelry-workshop.jpg',
    streamer: {
      name: 'Master Patel',
      image: '/images/streamers/patel.jpg',
      verified: true
    },
    isLive: false,
    viewers: 1234,
    startTime: '2024-01-21T16:00:00Z',
    category: 'Jewelry',
    products: products.slice(2, 5)
  },
]

// Best Selling Products (featured products)
export const bestSellingProducts: Product[] = [
  {
    id: 'bestselling-1',
    name: 'COLA CAP',
    price: 6500,
    image: '/bestselling/cola.png',
    category: productCategories[1], // Accessories
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    reviews: 120,
    story: 'Stylish trucker cap with Aries design'
  },
  {
    id: 'bestselling-2',
    name: 'ESSENTIAL BAGS',
    price: 3500,
    image: '/bestselling/essential-bag.png',
    category: productCategories[1], // Bags
    isNew: false,
    isFeatured: true,
    rating: 4.7,
    reviews: 89,
    story: 'Essential canvas shoulder bag for everyday use'
  },
  {
    id: 'bestselling-3',
    name: 'NEW BALANCE',
    price: 14500,
    image: '/bestselling/new b.png',
    category: productCategories[0], // Sneakers
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    reviews: 156,
    story: 'Premium New Balance sneakers in teal and white'
  },
  {
    id: 'bestselling-4',
    name: 'SHADES - MARGIELA',
    price: 5500,
    image: '/bestselling/sades.png',
    category: productCategories[1], // Accessories
    isNew: false,
    isFeatured: true,
    rating: 4.6,
    reviews: 78,
    story: 'Futuristic green sunglasses with reflective lenses'
  },
  {
    id: 'bestselling-5',
    name: 'SAME',
    price: 13500,
    image: '/bestselling/shoes.png',
    category: productCategories[0], // Sneakers
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    reviews: 134,
    story: 'Premium footwear collection'
  }
]

// New Products
export const newProducts = products.filter(product => product.isNew)

// Featured Blog Posts
export const featuredBlogPosts = blogPosts.filter(post => post.featured)

// Featured City Bazars
export const featuredCityBazars = cityBazars.filter(bazar => bazar.featured) 