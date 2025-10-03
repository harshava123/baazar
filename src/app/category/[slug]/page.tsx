'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { memo, useState, useEffect } from 'react';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { apiClient } from '@/lib/api';


// Static product data for demonstration
const sneakerProducts = {
  "sneakers-for-all": [
    { id: "samba-og-adidas", name: "SAMBA OG - ADIDAS", price: 13500, image: "/individual-category/1.png" },
    { id: "air-force-1-nike", name: "AIR FORCE 1 - NIKE", price: 12999, image: "/individual-category/2.png" },
    { id: "chuck-taylor-converse", name: "CHUCK TAYLOR - CONVERSE", price: 8500, image: "/individual-category/3.png" },
    { id: "old-skool-vans", name: "OLD SKOOL - VANS", price: 7200, image: "/individual-category/4.png" },
    { id: "stan-smith-adidas", name: "STAN SMITH - ADIDAS", price: 9800, image: "/individual-category/5.png" },
  ],
  "trending": [
    { id: "yeezy-boost-350", name: "YEEZY BOOST 350", price: 25000, image: "/individual-category/6.png" },
    { id: "jordan-1-retro", name: "JORDAN 1 RETRO", price: 18500, image: "/individual-category/7.png" },
    { id: "ultraboost-22", name: "ULTRABOOST 22", price: 16800, image: "/individual-category/8.png" },
    { id: "air-max-270", name: "AIR MAX 270", price: 14200, image: "/individual-category/9.png" },
    { id: "dunk-low-nike", name: "DUNK LOW - NIKE", price: 11500, image: "/individual-category/10.png" },
  ],
  "new-arrivals": [
    { id: "adidas-air-jordan-i", name: "ADIDAS", model: "AIR JORDAN-I", price: 13500, image: "/individual-category/11.png" },
    { id: "nike-dunk-low", name: "NIKE", model: "DUNK LOW", price: 11800, image: "/individual-category/12.png" },
    { id: "puma-rs-x", name: "PUMA", model: "RS-X", price: 9500, image: "/individual-category/13.png" },
    { id: "new-balance-574", name: "NEW BALANCE", model: "574", price: 12500, image: "/individual-category/14.png" },
    { id: "asics-gel-kayano", name: "ASICS", model: "GEL-KAYANO", price: 15800, image: "/individual-category/15.png" },
  ],
  "best-rated": [
    { id: "new-balance-574-rated", name: "NEW BALANCE 574", price: 12500, image: "/individual-category/1.png" },
    { id: "asics-gel-kayano-rated", name: "ASICS GEL-KAYANO", price: 15800, image: "/individual-category/2.png" },
    { id: "saucony-ride", name: "SAUCONY RIDE", price: 13200, image: "/individual-category/3.png" },
    { id: "brooks-ghost", name: "BROOKS GHOST", price: 14500, image: "/individual-category/4.png" },
    { id: "hoka-clifton", name: "HOKA CLIFTON", price: 16200, image: "/individual-category/5.png" },
  ],
};

// Category configuration
const categoryConfig = {
  sneakers: {
    title: "SNEAKERS",
    heroImage: "/individual-category/top.png",
    sections: [
      { id: "sneakers-for-all", title: "SNEAKERS FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  },
  toys: {
    title: "TOYS",
    heroImage: "/categories/toys.png",
    sections: [
      { id: "toys-for-all", title: "TOYS FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  },
  furniture: {
    title: "FURNITURE",
    heroImage: "/categories/furniture.png",
    sections: [
      { id: "furniture-for-all", title: "FURNITURE FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  },
  clothing: {
    title: "APPAREL",
    heroImage: "/categories/clothing.png",
    sections: [
      { id: "apparel-for-all", title: "APPAREL FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  },
  apparel: {
    title: "APPAREL",
    heroImage: "/categories/clothing.png",
    sections: [
      { id: "apparel-for-all", title: "APPAREL FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  },
  accessories: {
    title: "ACCESSORIES",
    heroImage: "/categories/Accessories.png",
    sections: [
      { id: "accessories-for-all", title: "ACCESSORIES FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  },
  electronics: {
    title: "ELECTRONICS",
    heroImage: "/categories/Electronics.png",
    sections: [
      { id: "electronics-for-all", title: "ELECTRONICS FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  },
  "home-decor": {
    title: "HOME DECOR",
    heroImage: "/categories/HomeDecor.png",
    sections: [
      { id: "home-decor-for-all", title: "HOME DECOR FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  },
  lifestyle: {
    title: "LIFESTYLE",
    heroImage: "/categories/makeup.png",
    sections: [
      { id: "lifestyle-for-all", title: "LIFESTYLE FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  },
  books: {
    title: "BOOKS",
    heroImage: "/categories/Gifts.png",
    sections: [
      { id: "books-for-all", title: "BOOKS FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  },
  jewellery: {
    title: "JEWELLERY",
    heroImage: "/categories/jewellery.jpg",
    sections: [
      { id: "jewellery-for-all", title: "JEWELLERY FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  },
  bags: {
    title: "BAGS",
    heroImage: "/categories/bags.png",
    sections: [
      { id: "bags-for-all", title: "BAGS FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  },
  perfumes: {
    title: "PERFUMES",
    heroImage: "/categories/Perfumes.png",
    sections: [
      { id: "perfumes-for-all", title: "PERFUMES FOR ALL", products: sneakerProducts["sneakers-for-all"] },
      { id: "trending", title: "TRENDING OF THE WEEK", products: sneakerProducts["trending"] },
      { id: "new-arrivals", title: "NEW ARRIVALS", products: sneakerProducts["new-arrivals"], specialLayout: true },
      { id: "best-rated", title: "BEST RATED", products: sneakerProducts["best-rated"] },
    ]
  }
};

interface ProductCardProps {
  product: { id: string; name: string; price: number; image: string; model?: string };
  specialLayout?: boolean;
}

const CategoryProductCard = memo(({ product, specialLayout = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (specialLayout) {
    return (
      <motion.div
        className="relative overflow-hidden cursor-pointer group bg-white rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/product/${product.id}`} className="block h-full">
          <div className="flex h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px]">
            {/* Left side - Product Image */}
            <div className="w-1/2 relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
            
            {/* Right side - Product Info */}
            <div className="w-1/2 bg-[#98FF98] p-2 sm:p-3 md:p-4 flex flex-col justify-center">
              <div className="text-black">
                <h3 className="font-staatliches text-sm sm:text-base md:text-lg font-bold mb-1">
                  {product.name}
                </h3>
                {product.model && (
                  <p className="text-xs sm:text-sm mb-1 sm:mb-2 opacity-80">
                    {product.model}
                  </p>
                )}
                <p className="font-staatliches text-sm sm:text-base md:text-lg font-bold text-[#FF6F61]">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block h-full">
        {/* Window-like container with rounded top */}
        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] xl:h-[360px] bg-gray-900 rounded-t-[60px] sm:rounded-t-[80px] md:rounded-t-[100px] lg:rounded-t-[120px] xl:rounded-t-[140px] overflow-hidden" style={{ maxWidth: '100%' }}>
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>

          {/* Product Info - Always visible */}
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 z-10">
            <div className="bg-white rounded-lg px-3 py-2 shadow-lg">
              <motion.h3
                className="text-black font-staatliches text-sm sm:text-base md:text-lg lg:text-xl mb-1"
                style={{
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0.2px'
                }}
              >
                {product.name}
              </motion.h3>
              <motion.p
                className="text-[#FF6F61] font-staatliches text-sm sm:text-base md:text-lg lg:text-xl font-bold"
                style={{
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0.2px'
                }}
              >
                ₹{product.price.toLocaleString()}
              </motion.p>
            </div>
          </div>

          {/* Hover overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/60 flex items-center justify-center z-20"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-center"
                >
                  <motion.button
                    className="bg-[#98FF98] text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-staatliches text-xs sm:text-sm md:text-base transition-colors duration-200"
                    style={{
                      fontWeight: 400,
                      letterSpacing: '0.2px'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ADD TO CART
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </motion.div>
  );
});

CategoryProductCard.displayName = 'CategoryProductCard';

interface ProductSectionProps {
  title: string;
  products: Array<{ id: string; name: string; price: number; image: string; model?: string }>;
  specialLayout?: boolean;
}

const ProductSection = memo(({ title, products, specialLayout = false }: ProductSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-12 md:mb-16 lg:mb-20"
    >
              {/* Section Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
          <motion.h2
            className="text-white font-staatliches text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
            style={{
              fontWeight: 400,
              lineHeight: '100%',
              letterSpacing: '0.2px'
            }}
          >
            {title}
          </motion.h2>
          
          {title !== "NEW ARRIVALS" && (
            <motion.button
              className="bg-[#98FF98] hover:bg-[#98FF98]/80 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-staatliches text-xs sm:text-sm md:text-base transition-colors duration-200"
              style={{
                fontWeight: 400,
                letterSpacing: '0.2px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW ALL
            </motion.button>
          )}
        </div>

      {/* Products Grid */}
      <div className={`grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 ${
        specialLayout 
          ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3' 
          : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
      }`}>
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <CategoryProductCard product={product} specialLayout={specialLayout} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
});

ProductSection.displayName = 'ProductSection';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = memo(({ params }: CategoryPageProps) => {
  const resolvedParams = use(params) as { slug: string };
  
  // Try to find category with flexible matching
  let category = categoryConfig[resolvedParams.slug as keyof typeof categoryConfig];
  
  // If not found, try alternative slugs (e.g., "apparel" -> "clothing")
  if (!category) {
    const slugMap: Record<string, keyof typeof categoryConfig> = {
      'clothing': 'apparel',
      'apparel': 'clothing',
    };
    const alternativeSlug = slugMap[resolvedParams.slug];
    if (alternativeSlug) {
      category = categoryConfig[alternativeSlug];
    }
  }
  
  const [realProducts, setRealProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState<string>(category?.title || '');
  
  // Fetch real products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Get all categories to find the ID matching the slug
        const categoriesResult = await apiClient.getCategories();
        if (categoriesResult.success && categoriesResult.data) {
          // Find category by name matching slug (case-insensitive, with various formats)
          const matchedCategory = categoriesResult.data.find((cat: any) => {
            const catNameSlug = cat.name.toLowerCase().replace(/\s+/g, '-');
            const catNameSpaced = cat.name.toLowerCase();
            const paramSlug = resolvedParams.slug.toLowerCase();
            const paramSpaced = resolvedParams.slug.replace(/-/g, ' ').toLowerCase();
            
            return catNameSlug === paramSlug || 
                   catNameSpaced === paramSpaced ||
                   catNameSpaced === paramSlug ||
                   catNameSlug === paramSpaced;
          });
          
          if (matchedCategory) {
            setCategoryName(matchedCategory.name.toUpperCase());
            // Fetch products for this category
            const productsResult = await apiClient.getProducts({ category: matchedCategory.id });
            if (productsResult.success && productsResult.data) {
              setRealProducts(productsResult.data);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [resolvedParams.slug]);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-staatliches text-2xl mb-4">Category Not Found</h1>
          <p className="text-white/60 mb-4">The category &quot;{resolvedParams.slug}&quot; could not be found.</p>
          <Link href="/categories" className="text-[#98FF98] hover:underline">
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }
  
  // Transform real products to match component interface
  const transformedProducts = realProducts.map(product => ({
    id: product.id,
    name: product.name,
    price: product.discount_price || product.price,
    image: product.images && product.images.length > 0 ? product.images[0] : '/individual-category/1.png'
  }));

  return (
    <div className="min-h-screen bg-black">
      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Category Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h1 
            className="font-staatliches text-center"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              lineHeight: '100%',
              letterSpacing: '0.2px'
            }}
          >
            <span className="text-[#FF6F61]">{categoryName || category.title}</span>
          </h1>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-6 md:mb-8 mx-2 sm:mx-4 md:mx-6 lg:mx-8 mt-6 sm:mt-8 md:mt-12 lg:mt-16"
          style={{
            background: '#FFFFFF2B',
            border: '1px solid #858585',
            boxShadow: '0px 4px 16px 0px #FFFFFF40',
            borderRadius: '13.36px',
            height: 'clamp(180px, 30vh, 250px)',
            maxWidth: '1241px',
            margin: '0 auto'
          }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-3 sm:gap-4 lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
            {/* Hero Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <div className="relative h-[80px] sm:h-[100px] md:h-[120px] lg:h-[140px] xl:h-[180px] w-full max-w-xs">
                {/* Glow effect container */}
                <div className="absolute inset-0 rounded-full blur-[80px] bg-gradient-to-t from-[#98FF98]/30 via-[#98FF98]/20 to-transparent" />
                
                <Image
                  src={category.heroImage}
                  alt={category.title}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Hero Text */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.h2
                className="text-white font-staatliches mb-2 uppercase"
                style={{
                  fontFamily: 'Staatliches',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: 'clamp(24px, 4vw, 42px)',
                  lineHeight: '100%',
                  letterSpacing: '0.2px'
                }}
              >
                EXPLORE THE LATEST DROPS & CLASSICS
              </motion.h2>
              <motion.p
                className="text-[#98FF98] font-staatliches uppercase"
                style={{
                  fontFamily: 'Staatliches',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: 'clamp(18px, 3vw, 32px)',
                  lineHeight: '100%',
                  letterSpacing: '0.2px'
                }}
              >
                EXPLORE BELOW
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 mb-6 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <nav className="flex items-center space-x-2 text-xs sm:text-sm">
            <Link href="/" className="text-white/60 hover:text-white transition-colors duration-200 uppercase tracking-wide">
              HOME
            </Link>
            <span className="text-white/40">/</span>
            <Link href="/categories" className="text-white/60 hover:text-white transition-colors duration-200 uppercase tracking-wide">
              CATEGORIES
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium uppercase tracking-wide">{category.title}</span>
          </nav>
        </motion.div>

        {/* Product Sections */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-[#98FF98] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading products...</p>
          </div>
        ) : transformedProducts.length > 0 ? (
          <ProductSection
            key="real-products"
            title={`${categoryName || category.title} PRODUCTS`}
            products={transformedProducts}
            specialLayout={false}
          />
        ) : (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg mb-4">No products available in this category yet.</p>
            <p className="text-white/40">Check back soon for new arrivals!</p>
          </div>
        )}
      </div>
    </div>
  );
});

CategoryPage.displayName = 'CategoryPage';

export default CategoryPage;
