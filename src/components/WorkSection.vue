<script setup>
import SectionHeader from './SectionHeader.vue'

const projects = [
  {
    title: 'Card service for a self-custodial crypto wallet',
    text: 'Append-only ledger balances in Postgres, external card transaction authorization under a 500ms SLA, a state machine for transaction statuses.',
    tags: 'go · postgres · solana · visa',
  },
  {
    title: 'Passwordless Postgres access',
    text: 'A proxy combining a Tailscale network with AWS RDS IAM authentication — database access with no passwords and no open ports.',
    tags: 'go · tsnet · aws',
  },
  {
    title: 'Fiat onramp integration audit',
    text: 'USD → USDC over Lightning Network: API gap analysis and mapping of compliance constraints before the build.',
    tags: 'lightning · usdc · compliance',
  },
  {
    title: 'API clients codegen & CI tooling',
    text: 'OpenAPI client generation with Kiota, Grafana MCP wired into the CI pipeline.',
    tags: 'openapi · c# · ci',
  },
]
</script>

<template>
  <section id="work" class="section container">
    <SectionHeader v-reveal cmd="ls ./work" title="Selected work" />
    <div class="cards">
      <article v-for="(p, i) in projects" :key="i" v-reveal="{ delay: 0.1 + i * 0.1 }" class="card">
        <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3>{{ p.title }}</h3>
        <p>{{ p.text }}</p>
        <span class="tags">{{ p.tags }}</span>
      </article>
    </div>
  </section>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 26px 26px 22px;
  border: 1px solid var(--border);
  border-radius: 10px;
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.2s ease, translate 0.2s ease, filter 0.2s ease;
  transition-delay: var(--rd, 0s), var(--rd, 0s), 0s, 0s, 0s;
}

.cards:hover .card:not(:hover) {
  filter: brightness(0.72);
}

.card:hover {
  border-color: var(--border-hi);
  translate: 0 -3px;
}

.num {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent-dim);
  margin-bottom: 14px;
}

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
}

p {
  margin: 0 0 18px;
  font-size: 15px;
  flex: 1;
}

.tags {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--accent);
}

@media (max-width: 720px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
