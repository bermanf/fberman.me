<template>
  <header class="nav">
    <div class="container nav-inner">
      <a href="/" class="logo">fberman.me</a>
      <nav class="links">
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

@media (max-width: 520px) {
  .links {
    gap: 16px;
  }
}
</style>
