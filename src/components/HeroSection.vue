<script setup>
import TerminalWindow from './TerminalWindow.vue'
</script>

<template>
  <section class="hero container">
    <div class="hero-text">
      <p v-reveal class="eyebrow">Fedor Berman · senior backend engineer</p>
      <h1 v-reveal="{ delay: 0.08 }">I build fintech &amp; crypto infrastructure in Go</h1>
      <p v-reveal="{ delay: 0.16 }" class="sub">
        5+ years shipping card issuing, payments and high-load distributed
        systems — from schema design to production on-call. Currently building
        Visa cards for a self-custodial crypto wallet.
      </p>
      <div v-reveal="{ delay: 0.24 }" class="cta-row">
        <a class="btn btn-primary" href="mailto:fyodorberman@gmail.com">get in touch</a>
        <a class="btn btn-ghost" href="#work">view work →</a>
      </div>
      <p v-reveal="{ delay: 0.32 }" class="avail"><span class="dot-pulse" />open to contract &amp; full-time work</p>
    </div>
    <div v-reveal="{ style: 'right', delay: 0.2 }">
      <TerminalWindow v-parallax="0.1" class="hero-term" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 56px;
  min-height: calc(100vh - 60px);
  padding-top: 48px;
  padding-bottom: 64px;
}

.hero::before {
  content: '';
  position: absolute;
  inset: -20% -10%;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(ellipse 60% 50% at 72% 35%, rgba(127, 119, 221, 0.09), transparent 65%);
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
}

.avail {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 22px 0 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--text-dim);
}

.dot-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px rgba(127, 119, 221, 0.8);
  animation: pulse 2.4s ease-in-out infinite;
}

@keyframes pulse {
  50% {
    opacity: 0.3;
  }
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent);
  margin: 0 0 16px;
}

h1 {
  font-size: clamp(2.1rem, 4.6vw, 3.2rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.02em;
}

.sub {
  margin: 20px 0 32px;
  max-width: 46ch;
}

.cta-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn {
  font-family: var(--font-mono);
  font-size: 14px;
  padding: 12px 22px;
  border-radius: 6px;
  transition: all 0.15s;
}

.btn-primary {
  background: var(--accent);
  color: var(--bg-deep);
  font-weight: 500;
  box-shadow: 0 0 24px rgba(127, 119, 221, 0.35);
}

.btn-primary:hover {
  box-shadow: 0 0 36px rgba(127, 119, 221, 0.55);
  transform: translateY(-1px);
}

.btn-ghost {
  border: 1px solid var(--border-hi);
  color: var(--text-hi);
}

.btn-ghost:hover {
  border-color: var(--accent);
}

@media (max-width: 880px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 40px;
    min-height: 0;
    padding-top: 56px;
  }

  .hero-term {
    max-width: 560px;
  }
}
</style>
