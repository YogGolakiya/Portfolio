import { useEffect, useRef } from 'react'

export function useReveal(className = 'visible', threshold = 0.1, ...deps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    const targets = document.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right'
    )
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [className, threshold, ...deps])
}

export function useRevealRef(className = 'visible', threshold = 0.1) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(className)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [className, threshold])
  return ref
}
