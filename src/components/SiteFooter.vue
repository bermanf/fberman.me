<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const time = ref('--:--')
const size = ref('')
const pct = ref(0)
const detached = ref(false)
let timer
let prefixTimer
let prefix = false

function onKey(e) {
  if (detached.value) {
    e.preventDefault()
    detached.value = false
    return
  }
  if (e.ctrlKey && e.key === 'b') {
    e.preventDefault()
    prefix = true
    clearTimeout(prefixTimer)
    prefixTimer = setTimeout(() => (prefix = false), 1500)
    return
  }
  if (prefix && e.key === 'd') {
    e.preventDefault()
    prefix = false
    detached.value = true
  }
}

function tick() {
  time.value = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Belgrade',
  }).format(new Date())
}

function measure() {
  size.value = `${Math.floor(window.innerWidth / 8)}×${Math.floor(window.innerHeight / 19)}`
}

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  pct.value = max > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100))) : 0
}

onMounted(() => {
  tick()
  measure()
  onScroll()
  timer = setInterval(tick, 30000)
  window.addEventListener('resize', measure)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  window.removeEventListener('resize', measure)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <footer class="footer">
    <div class="container status">
      <span class="seg host">[fberman.me]</span>
      <span class="seg">uptime: 5y+ in prod</span>
      <span class="seg">status: <span class="ok">open to interesting work</span></span>
      <span class="seg">loc: Belgrade</span>
      <span class="right">
        <span class="seg dim">ctrl+b d to detach</span>
        <span class="seg">[{{ pct }}%]</span>
        <span class="seg">{{ size }}</span>
        <span class="seg">{{ time }}</span>
      </span>
    </div>
    <div v-if="detached" class="detach" @click="detached = false">
      <p>[detached (from session fberman.me)]</p>
      <p class="hint">press any key to attach</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--bg-deep);
}

.status {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  padding-top: 14px;
  padding-bottom: 14px;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 12px;
  color: var(--text-dim);
}

.host {
  color: var(--accent);
}

.ok {
  color: var(--text-hi);
}

.right {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-left: auto;
}

.dim {
  opacity: 0.6;
}

.detach {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--bg-deep);
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text);
  cursor: pointer;
}

.detach .hint {
  font-size: 12px;
  color: var(--text-dim);
  margin: 0;
}

.detach p {
  margin: 0;
}

@media (max-width: 720px) {
  .right {
    margin-left: 0;
  }
}
</style>
