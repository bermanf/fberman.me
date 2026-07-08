<script setup>
import { computed, ref } from 'vue'
import SectionHeader from './SectionHeader.vue'
import { jobs, logoFor } from '../jobs.js'

const i = ref(0)
const n = jobs.length
const job = computed(() => jobs[i.value])

function next() {
  i.value = (i.value + 1) % n
}

function prev() {
  i.value = (i.value + n - 1) % n
}
</script>

<template>
  <section id="experience" class="section container">
    <SectionHeader v-reveal cmd="less ./experience.log" title="Where I've worked" />
    <div v-reveal="{ delay: 0.15 }" class="pager">
      <Transition name="slide" mode="out-in">
        <a :key="i" class="slide" :href="`/experience/#${job.slug}`">
          <div class="avatar">
            <img
              v-if="logoFor(job.slug)"
              :src="logoFor(job.slug)"
              :alt="`${job.company} logo`"
              width="48"
              height="48"
            />
            <span v-else class="monogram">{{ job.company[0] }}</span>
          </div>
          <div class="slide-body">
            <p class="meta">
              <span>{{ job.dates }}</span>
              <span v-if="job.location">{{ job.location }}</span>
            </p>
            <h3>{{ job.role }} · <span class="co">{{ job.company }}</span></h3>
            <p class="summary">{{ job.summary }}</p>
            <p class="tags">{{ job.tags }}</p>
            <p class="more">read full entry →</p>
          </div>
        </a>
      </Transition>
      <div class="pager-bar">
        <button type="button" @click="prev" aria-label="previous company">←</button>
        <span class="count">{{ i + 1 }}/{{ n }}</span>
        <button type="button" @click="next" aria-label="next company">→</button>
        <a class="full" href="/experience/">full log →</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pager {
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.slide {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 24px;
  padding: 28px;
  min-height: 210px;
  color: inherit;
  transition: background 0.15s;
}

.slide:hover {
  background: rgba(127, 119, 221, 0.05);
}

.more {
  margin: 12px 0 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--text-dim);
  transition: color 0.15s;
}

.slide:hover .more {
  color: var(--accent);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg-deep);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 6px;
}

.monogram {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--accent);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 12.5px;
  color: var(--text-dim);
  margin: 0 0 6px;
}

h3 {
  font-size: 1.15rem;
  font-weight: 600;
}

.co {
  color: var(--accent);
}

.summary {
  margin: 10px 0 14px;
  font-size: 15px;
  max-width: 64ch;
}

.tags {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--accent);
  margin: 0;
}

.pager-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 28px;
  border-top: 1px solid var(--border);
  background: var(--bg-deep);
  font-family: var(--font-mono);
}

.pager-bar button {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-hi);
  background: none;
  border: 1px solid var(--border-hi);
  border-radius: 6px;
  padding: 5px 14px;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.pager-bar button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.count {
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  color: var(--text-dim);
}

.full {
  margin-left: auto;
  font-size: 12.5px;
  color: var(--text-hi);
  border: 1px solid var(--border-hi);
  border-radius: 6px;
  padding: 5px 14px;
  transition: border-color 0.15s, color 0.15s;
}

.full:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(16px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

@media (max-width: 600px) {
  .slide {
    grid-template-columns: 40px 1fr;
    gap: 16px;
    padding: 20px;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }

  .pager-bar {
    padding: 12px 20px;
  }
}
</style>
