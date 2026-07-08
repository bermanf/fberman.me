<script setup>
import SectionHeader from './SectionHeader.vue'

const groups = [
  {
    name: 'languages',
    items: ['go', 'sql', 'lua', 'bash'],
  },
  {
    name: 'databases',
    items: ['postgresql', 'clickhouse', 'starrocks', 'mysql', 'tarantool', 'mongodb', 'redis/valkey'],
  },
  {
    name: 'messaging & apis',
    items: ['kafka', 'nsq', 'rabbitmq', 'grpc', 'rest/json', 'oauth 2.0', 'webhooks', 'stripe'],
  },
  {
    name: 'infra',
    items: ['aws', 'kubernetes', 'terraform', 'docker', 'gitlab ci/cd', 'puppet', 'ansible', 'grafana', 'elk/loki'],
  },
  {
    name: 'blockchain',
    items: ['solana', 'bitcoin/spark', 'lightning network', 'xmtp'],
  },
  {
    name: 'domains',
    items: ['card issuing', 'payments', 'on/off-ramps', 'dex & bitcoin', 'high-load systems'],
  },
]
</script>

<template>
  <section id="stack" class="section container">
    <SectionHeader v-reveal cmd="cat stack.txt" title="Stack" />
    <div class="groups">
      <div v-for="(g, gi) in groups" :key="g.name" v-reveal="{ delay: 0.1 + gi * 0.08 }" class="group">
        <span class="gname"># {{ g.name }}</span>
        <ul>
          <li v-for="item in g.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.groups {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.group {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 16px;
  align-items: baseline;
}

.gname {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent-dim);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

li {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text);
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
}

@media (max-width: 720px) {
  .group {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
