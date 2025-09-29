'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  className?: string
  triggerOnce?: boolean
  threshold?: number
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 60,
  className = '',
  triggerOnce = true,
  threshold = 0.1,
}) => {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
  })

  // Define animation variants based on direction
  const getVariants = () => {
    const directions = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { y: 0, x: distance },
      right: { y: 0, x: -distance },
    }

    return {
      hidden: {
        opacity: 0,
        ...directions[direction],
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] as const, // Custom easing
        },
      },
    } as const
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn 