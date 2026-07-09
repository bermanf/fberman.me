<script setup>
import SectionHeader from './SectionHeader.vue'
import photo from '../assets/me.jpg'
</script>

<template>
  <section id="whoami" class="section container">
    <SectionHeader v-reveal cmd="whoami" title="About" />
    <div class="about-grid">
      <div v-reveal="{ style: 'left', delay: 0.1 }" class="photo-frame">
        <div class="photo-bar">
          <span class="dot" /><span class="dot" /><span class="dot" />
          <span class="photo-tab">me.jpg</span>
        </div>
        <img :src="photo" alt="Fedor Berman" width="640" height="640" />
      </div>
      <div v-reveal="{ delay: 0.2 }" class="about-text">
        <p>
          Backend engineer based in Belgrade. 5+ years of building backends
          in Go — fintech, high-load distributed systems, and now crypto:
          Visa card issuing, a Bitcoin DEX integration, fiat on/off-ramps.
          Earlier — infrastructure for a mail service sustaining 10k+ RPS.
        </p>
        <p>
          I like owning things end-to-end: API and schema design, load tests,
          Terraform, on-call. Small diffs, boring tech, measurable results.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 48px;
  align-items: start;
}

.photo-frame {
  background: var(--bg-deep);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.photo-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border-hi);
}

.photo-tab {
  margin-left: 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-dim);
}

img {
  display: block;
  width: 100%;
  height: auto;
}

.about-text p {
  margin: 0 0 16px;
  max-width: 58ch;
}

@media (max-width: 720px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .photo-frame {
    max-width: 320px;
  }
}
</style>
