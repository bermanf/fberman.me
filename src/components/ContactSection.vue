<script setup>
import SectionHeader from './SectionHeader.vue'

const links = [
  { label: 'telegram', href: 'https://t.me/TeoBy' },
  { label: 'github', href: 'https://github.com/bermanf' },
  { label: 'linkedin', href: 'https://linkedin.com/in/fyodorberman' },
]
</script>

<template>
  <section id="contact" class="section container">
    <SectionHeader v-reveal cmd="ping fedor" title="Get in touch" />
    <p v-reveal="{ delay: 0.1 }" class="pitch">
      Open to interesting backend work — contracts and full-time.
      Reply time is usually under 24h.
    </p>
    <a v-reveal="{ delay: 0.2 }" class="btn-mail" href="mailto:fyodorberman@gmail.com">fyodorberman@gmail.com</a>
    <div v-reveal="{ delay: 0.3 }" class="links">
      <a v-for="l in links" :key="l.label" :href="l.href" target="_blank" rel="noopener">
        {{ l.label }} ↗
      </a>
    </div>
  </section>
</template>

<style scoped>
.pitch {
  margin: 0 0 28px;
  max-width: 52ch;
}

.btn-mail {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 16px;
  padding: 14px 26px;
  border-radius: 6px;
  background: var(--accent);
  color: var(--bg-deep);
  font-weight: 500;
  box-shadow: 0 0 24px rgba(127, 119, 221, 0.35);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.15s ease, translate 0.15s ease;
  transition-delay: var(--rd, 0s), var(--rd, 0s), 0s, 0s;
}

.btn-mail:hover {
  box-shadow: 0 0 36px rgba(127, 119, 221, 0.55);
  translate: 0 -1px;
}

.links {
  display: flex;
  gap: 24px;
  margin-top: 28px;
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
</style>
