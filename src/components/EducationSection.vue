<script setup>
import SectionHeader from './SectionHeader.vue'

const schools = [
  {
    name: 'Chuvash State University (I. N. Ulyanov)',
    dates: '2024 — 2026',
    text: 'Graduate coursework in Computer Science, Software Engineering. Cheboksary, Russia.',
  },
  {
    name: 'Chuvash State Pedagogical University (I. Y. Yakovlev)',
    dates: '2021 — 2024',
    text: "Bachelor's Degree, History. Cheboksary, Russia.",
  },
]
</script>

<template>
  <section id="education" class="section container">
    <SectionHeader v-reveal cmd="cat education.txt" title="Education" />
    <div class="list">
      <div v-for="(s, i) in schools" :key="s.name" v-reveal="{ delay: 0.1 + i * 0.1 }" class="entry">
        <p class="meta">{{ s.dates }}</p>
        <h3>{{ s.name }}</h3>
        <p class="text">{{ s.text }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.entry {
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}

.entry:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.meta {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 12.5px;
  color: var(--text-dim);
  margin: 0 0 6px;
}

h3 {
  font-size: 1.05rem;
  font-weight: 600;
}

.text {
  margin: 8px 0 0;
  font-size: 15px;
}
</style>
