import Lenis from 'lenis'

export class SmoothScroll {
  private lenis: Lenis | null = null
  private rafId: number | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.init()
    }
  }

  private init() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    this.raf()
  }

  private raf = (time: number = 0) => {
    if (this.lenis) {
      this.lenis.raf(time)
    }
    this.rafId = requestAnimationFrame(this.raf)
  }

  scrollTo(target: string | HTMLElement, options?: { offset?: number; duration?: number }) {
    if (this.lenis) {
      this.lenis.scrollTo(target, {
        offset: options?.offset || 0,
        duration: options?.duration || 1.2,
      })
    }
  }

  stop() {
    if (this.lenis) {
      this.lenis.stop()
    }
  }

  start() {
    if (this.lenis) {
      this.lenis.start()
    }
  }

  destroy() {
    if (this.lenis) {
      this.lenis.destroy()
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
    }
  }

  on(event: "scroll", callback: (e: unknown) => void): void
  on(event: "virtual-scroll", callback: (e: unknown) => void): void
  on(event: "scroll" | "virtual-scroll", callback: (e: unknown) => void) {
    if (this.lenis) {
      if (event === "scroll") {
        this.lenis.on(event, callback)
      } else {
        this.lenis.on(event, callback)
      }
    }
  }

  off(event: "scroll", callback: (e: unknown) => void): void
  off(event: "virtual-scroll", callback: (e: unknown) => void): void
  off(event: "scroll" | "virtual-scroll", callback: (e: unknown) => void) {
    if (this.lenis) {
      if (event === "scroll") {
        this.lenis.off(event, callback)
      } else {
        this.lenis.off(event, callback)
      }
    }
  }
}

// Global instance
export const smoothScroll = new SmoothScroll()

// Hook for using smooth scroll in components
export function useSmoothScroll() {
  return smoothScroll
} 