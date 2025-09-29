'use client';

import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = memo(({ post }: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer group flex-shrink-0 bg-[#1a1a1a] border border-[#333] rounded-lg"
      style={{
        width: '320px',
        height: '400px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="320px"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Views Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-[#98FF98]/20 backdrop-blur-sm px-3 py-1 rounded-full border border-[#98FF98]/30">
            <Eye className="w-3 h-3 text-[#98FF98]" />
            <span className="text-xs text-[#98FF98] font-medium">
              {post.views ? (post.views > 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views) : 0}
            </span>
          </div>
        </div>

        {/* Title */}
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-white font-semibold text-lg leading-tight mb-2 line-clamp-2"
        >
          {post.title}
        </motion.h3>

        {/* Excerpt */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-gray-300 text-sm line-clamp-2 leading-relaxed"
        >
          {post.excerpt}
        </motion.p>
      </div>

      {/* Hover Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#00000099] flex items-center justify-center z-10"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center px-4"
            >
              <h3 className="text-[#98FF98] font-staatliches text-center mb-3"
                style={{
                  fontWeight: 400,
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  lineHeight: '120%',
                  letterSpacing: '0.2px'
                }}
              >
                {post.title}
              </h3>
            
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

BlogCard.displayName = 'BlogCard';

export default BlogCard; 