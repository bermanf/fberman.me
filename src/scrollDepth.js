const thresholds = [25, 50, 75, 100]
const fired = new Set()

window.addEventListener(
  'scroll',
  () => {
    const depth =
      ((window.scrollY + window.innerHeight + 2) / document.body.offsetHeight) *
      100
    for (const t of thresholds) {
      if (depth >= t && !fired.has(t)) {
        fired.add(t)
        window.goatcounter?.count({
          path: `scroll-${t}`,
          title: `Scrolled ${t}%`,
          event: true,
        })
      }
    }
  },
  { passive: true }
)
