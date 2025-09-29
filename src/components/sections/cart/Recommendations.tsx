'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';

interface RecommendationItem {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
}

const recommendations: RecommendationItem[] = [
  {
    id: 1,
    name: "Lee Women's Ultra Lux Comfort",
    image: "/products/jeans-1.svg",
    currentPrice: 200,
    originalPrice: 500,
    rating: 4.8,
    reviews: 80
  },
  {
    id: 2,
    name: "Mechanical Gaming Keyboard",
    image: "/products/keyboard-1.svg",
    currentPrice: 200,
    rating: 4.8,
    reviews: 120
  },
  {
    id: 3,
    name: "Portable Neck Fan Hands Free Fan",
    image: "/products/fan-1.svg",
    currentPrice: 200,
    rating: 4.8,
    reviews: 95
  },
  {
    id: 4,
    name: "Matein Business Laptop Backpack",
    image: "/products/backpack-1.svg",
    currentPrice: 200,
    rating: 4.8,
    reviews: 110
  },
  {
    id: 5,
    name: "Pink Round Neck Striped Dress",
    image: "/products/dress-1.svg",
    currentPrice: 200,
    rating: 4.8,
    reviews: 85
  },
  {
    id: 6,
    name: "adidas Women's Grand Court",
    image: "/products/shoes-1.svg",
    currentPrice: 200,
    rating: 4.8,
    reviews: 100
  }
];

const Recommendations = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-6" style={{ fontFamily: 'Roboto' }}>
      <h2 className="text-2xl font-bold mb-6">YOU MIGHT ALSO LIKE:</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {recommendations.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-lg p-3 relative group">
            {/* Wishlist Button */}
            <button
              className="absolute top-2 right-2 p-1 bg-gray-900 bg-opacity-50 hover:bg-opacity-75 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label={`Add ${item.name} to wishlist`}
            >
              <Heart className="w-4 h-4 text-white" />
            </button>

            {/* Product Image */}
            <div className="w-full h-32 bg-gray-700 rounded-lg overflow-hidden mb-3">
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white line-clamp-2">
                {item.name}
              </h3>
              
              <div className="flex items-center space-x-1">
                <span className="text-lg font-bold text-white">₹ {item.currentPrice}</span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">₹ {item.originalPrice}</span>
                )}
              </div>

              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-300 ml-1">{item.rating}</span>
                </div>
                <span className="text-xs text-gray-400">({item.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations; 