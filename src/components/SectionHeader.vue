<script setup>
defineProps({
  cmd: { type: String, required: true },
  title: { type: String, required: true },
})
</script>

<template>
  <div class="sec-head">
    <p class="cmd">$ {{ cmd }}</p>
    <h2>{{ title }}</h2>
  </div>
</template>

<style scoped>
.sec-head {
  margin-bottom: 40px;
}

.cmd {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--accent);
  margin: 0 0 8px;
}

h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.01em;
}
</style>
