export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

let observer

function io() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          observer.unobserve(e.target)
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
  )
  return observer
}

const parallaxed = new Map()

function applyParallax() {
  const vh = window.innerHeight
  for (const [el, state] of parallaxed) {
    const rect = el.getBoundingClientRect()
    const center = rect.top - state.y + rect.height / 2
    const y = (vh / 2 - center) * state.speed
    if (Math.abs(y - state.y) > 0.1) {
      state.y = y
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
    }
  }
}

export function startMotion() {
  if (reduced) return

  requestAnimationFrame(function raf() {
    applyParallax()
    requestAnimationFrame(raf)
  })
}

export function motionDirectives(app) {
  app.directive('reveal', {
    mounted(el, binding) {
      if (reduced) return
      const opts = binding.value || {}
      el.classList.add('reveal', `reveal-${opts.style || 'up'}`)
      if (opts.delay) el.style.setProperty('--rd', `${opts.delay}s`)
      io().observe(el)
    },
  })

  app.directive('parallax', {
    mounted(el, binding) {
      if (reduced) return
      parallaxed.set(el, { speed: binding.value ?? 0.08, y: 0 })
    },
    unmounted(el) {
      parallaxed.delete(el)
    },
  })
}
