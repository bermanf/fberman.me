<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <header class="nav">
    <div class="container nav-inner">
      <a href="/" class="logo">fberman.me</a>
      <button
        type="button"
        class="burger"
        :aria-expanded="open"
        aria-label="menu"
        @click="open = !open"
      >{{ open ? '✕' : '≡' }}</button>
      <nav class="links" :class="{ open }" @click="open = false">
        <a href="/#whoami">about</a>
        <a href="/#work">work</a>
        <a href="/#stack">stack</a>
        <a href="/#experience">experience</a>
        <a href="/#contact">contact</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(20, 16, 31, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo {
  font-family: var(--font-mono);
  font-size: 15px;
  color: var(--text-hi);
}

.logo::before {
  content: '~/';
  color: var(--accent);
}

.burger {
  display: none;
  font-family: var(--font-mono);
  font-size: 22px;
  line-height: 1;
  color: var(--text-hi);
  background: none;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
}

.links {
  display: flex;
  gap: 28px;
}

.links a {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-dim);
  transition: color 0.15s;
}

.links a:hover {
  color: var(--text-hi);
}

@media (max-width: 680px) {
  .burger {
    display: block;
  }

  .links {
    display: none;
  }

  .links.open {
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    padding: 18px 24px 22px;
    background: rgba(13, 10, 22, 0.96);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }

  .links.open a {
    font-size: 15px;
  }
}
</style>
