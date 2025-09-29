'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface StaggeredFadeInProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  duration?: number
  triggerOnce?: boolean
  threshold?: number
}

const StaggeredFadeIn: React.FC<StaggeredFadeInProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up',
  distance = 60,
  duration = 0.6,
  triggerOnce = true,
  threshold = 0.1,
}) => {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
  })

  // Define direction variants
  const getDirectionOffset = () => {
    const directions = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { y: 0, x: distance },
      right: { y: 0, x: -distance },
    }
    return directions[direction]
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default StaggeredFadeIn 