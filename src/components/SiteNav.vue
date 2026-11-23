<script setup>
import { ref } from 'vue'

const open = ref(false)
const theme = ref(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <header class="nav">
    <div class="container nav-inner">
      <a href="/" class="logo">fberman.me</a>
      <div class="right">
        <nav class="links" :class="{ open }" @click="open = false">
          <a href="/#whoami">about</a>
          <a href="/#work">work</a>
          <a href="/#experience">experience</a>
          <a href="/#projects">projects</a>
          <a href="/#stack">stack</a>
          <a href="/#contact">contact</a>
        </nav>
        <button
          type="button"
          class="theme-btn"
          :aria-label="theme === 'dark' ? 'switch to light theme' : 'switch to dark theme'"
          @click="toggleTheme"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">
            <circle cx="8" cy="8" r="3.2" />
            <path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M12.6 3.4l-1.3 1.3M4.7 11.3l-1.3 1.3" />
          </svg>
          <svg v-else viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7z" />
          </svg>
        </button>
        <button
          type="button"
          class="burger"
          :aria-expanded="open"
          aria-label="menu"
          @click="open = !open"
        >{{ open ? '✕' : '≡' }}</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--nav-bg);
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

.right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.theme-btn {
  display: inline-flex;
  align-items: center;
  color: var(--text-dim);
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  transition: color 0.15s;
}

.theme-btn:hover {
  color: var(--text-hi);
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
    background: var(--menu-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }

  .links.open a {
    font-size: 15px;
  }
}
</style>
