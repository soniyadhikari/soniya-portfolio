import { useEffect, useRef, useState } from 'react'
import { motion as Motion, useReducedMotion } from 'motion/react'

export default function Reveal({ children, className, delay = 0 }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(reduceMotion)

  useEffect(() => {
    if (reduceMotion) {
      setIsVisible(true)
      return undefined
    }

    const element = ref.current
    if (!element) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.18 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <Motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.div>
  )
}
