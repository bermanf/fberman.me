<script setup>
import SectionHeader from './SectionHeader.vue'

const projects = [
  {
    name: 'dockerpool',
    href: 'https://github.com/bermanf/dockerpool',
    tags: 'go · mit',
    text: 'Open-source Go library for pooling reusable Docker containers, built for sandboxed execution of user-supplied code. Background worker keeps idle containers warm, graceful shutdown drains in-use ones, concurrency caps protect the Docker daemon, pool state is recovered from container labels after a restart. Per-exec timeouts, output limits, streamed stdout and stderr, CPU and memory caps.',
  },
]
</script>

<template>
  <section id="projects" class="section container">
    <SectionHeader v-reveal cmd="ls ./projects" title="Open source" />
    <div class="cards">
      <a
        v-for="(p, i) in projects"
        :key="p.name"
        v-reveal="{ delay: 0.1 + i * 0.1 }"
        class="card"
        :href="p.href"
        target="_blank"
        rel="noopener"
      >
        <h3>{{ p.name }} ↗</h3>
        <p>{{ p.text }}</p>
        <span class="tags">{{ p.tags }}</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 26px 26px 22px;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: inherit;
  transition: border-color 0.2s ease, translate 0.2s ease;
}

.card:hover {
  border-color: var(--border-hi);
  translate: 0 -3px;
}

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-hi);
}

p {
  margin: 0 0 18px;
  font-size: 15px;
}

.tags {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--accent);
}
</style>
