<script setup>
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import { jobs, logoFor } from './jobs.js'
</script>

<template>
  <SiteNav />
  <main>
    <section class="section container">
      <div class="page-head" v-reveal>
        <p class="cmd">$ git log --author=fedor --all</p>
        <h1>Experience</h1>
        <p class="lede">
          5+ years, six teams — from a product studio to the largest Russian
          social network to a crypto wallet startup. Full detail below;
          the short version is on the <a href="/">main page</a>.
        </p>
      </div>

      <div class="log">
        <article v-for="(job, i) in jobs" :key="job.slug" :id="job.slug" class="entry" v-reveal>
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
          <div class="body">
            <p class="meta">
              <span class="hash">{{ job.hash }}</span>
              <span v-if="i === 0" class="ref">HEAD → now</span>
              <span>{{ job.dates }}</span>
              <span v-if="job.location">{{ job.location }}</span>
            </p>
            <h2>{{ job.role }} · <span class="co">{{ job.company }}</span></h2>
            <p class="about">{{ job.about }}</p>
            <ul>
              <li v-for="(b, bi) in job.bullets" :key="bi">{{ b }}</li>
            </ul>
            <p class="tags">{{ job.tags }}</p>
          </div>
        </article>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>

<style scoped>
.page-head {
  margin-bottom: 56px;
}

.cmd {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--accent);
  margin: 0 0 8px;
}

h1 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.lede {
  margin: 16px 0 0;
  max-width: 56ch;
}

.log {
  display: flex;
  flex-direction: column;
}

.entry {
  position: relative;
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 24px;
  padding: 36px 0;
  scroll-margin-top: 72px;
}

.entry:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 24px;
  top: 92px;
  bottom: -36px;
  width: 1px;
  background: var(--border);
}

.avatar {
  position: relative;
  z-index: 1;
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

.hash {
  color: var(--accent-dim);
}

.ref {
  color: var(--accent);
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.co {
  color: var(--accent);
}

.about {
  margin: 8px 0 14px;
  font-size: 15px;
}

ul {
  margin: 0 0 16px;
  padding: 0 0 0 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

li {
  font-size: 15px;
}

li::marker {
  color: var(--accent-dim);
}

.tags {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--accent);
  margin: 0;
}

@media (max-width: 600px) {
  .entry {
    grid-template-columns: 40px 1fr;
    gap: 16px;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }

  .entry:not(:last-child)::before {
    left: 20px;
  }
}
</style>
