<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const kw = (t) => ({ t, c: 'kw' })
const fn = (t) => ({ t, c: 'fn' })
const ty = (t) => ({ t, c: 'ty' })
const cm = (t) => ({ t, c: 'cm' })
const pr = (t) => ({ t, c: 'pr' })
const hi = (t) => ({ t, c: 'hi' })
const ok = (t) => ({ t, c: 'ok' })
const tx = (t) => ({ t, c: '' })

const scenarios = [
  {
    tab: 'main.go',
    lines: [
      [kw('func '), fn('AuthorizeTx'), tx('(ctx '), ty('context.Context'), tx(', tx '), ty('CardTx'), tx(') '), ty('error'), tx(' {')],
      [tx('  hold, err := ledger.'), fn('Hold'), tx('(ctx, tx.Wallet, tx.Amount)')],
      [kw('  if '), tx('err != '), kw('nil'), tx(' {')],
      [kw('    return '), tx('visa.'), fn('Decline'), tx('(ctx, tx, err)')],
      [tx('  }')],
      [kw('  return '), tx('visa.'), fn('Approve'), tx('(ctx, tx, hold)')],
      [tx('}')],
      [cm('// p99 41ms · SLA 500ms ✓')],
    ],
  },
  {
    tab: 'deploy.sh',
    lines: [
      [pr('$ '), hi('go test ./internal/...')],
      [ok('ok'), tx('  internal/ledger  0.41s')],
      [ok('ok'), tx('  internal/cards   0.87s')],
      [pr('$ '), hi('terraform apply')],
      [tx('Apply complete! Resources: 3 added.')],
      [pr('$ '), hi('kubectl rollout status deploy/cards')],
      [tx('deployment "cards" successfully rolled out')],
    ],
  },
  {
    tab: 'psql',
    lines: [
      [pr('psql> '), hi('select status, count(*)')],
      [pr('    > '), hi('from card_tx group by 1;')],
      [tx(' approved | '), ok('128 410')],
      [tx(' declined | '), tx('  1 042')],
      [cm('(2 rows, 12ms)')],
    ],
  },
]

const PROMPT = 'fedor@fberman.me:~$ '

const shellFiles = {
  'stack.txt': 'go · postgresql · clickhouse · kafka · aws · k8s · terraform',
  'resume.txt': '5+ years of fintech & crypto backends — full history at /experience/',
  'contact.txt': 'fyodorberman@gmail.com · t.me/TeoBy · github.com/bermanf',
}

const tab = ref(scenarios[0].tab)
const lines = ref([])
const reduced = ref(false)
const mode = ref('auto')
const input = ref('')
const bodyEl = ref(null)
const inputEl = ref(null)
const doom = ref(false)
const doomEl = ref(null)
let dosProps = null
let session = 0
let playIndex = 0
let cancelled = false

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function charDelay(ch) {
  if (Math.random() < 0.02) return 260 + Math.random() * 260
  if (ch === ' ') return 55 + Math.random() * 90
  if ('{}();.'.includes(ch)) return 45 + Math.random() * 80
  return 20 + Math.random() * 55
}

function pushStatic(line) {
  lines.value.push(line.map((span) => ({ ...span })))
}

function showFull(scenario) {
  tab.value = scenario.tab
  lines.value = scenario.lines.map((line) => line.map((span) => ({ ...span })))
}

async function play() {
  const s = ++session
  while (!cancelled && s === session) {
    const scenario = scenarios[playIndex++ % scenarios.length]
    tab.value = scenario.tab
    lines.value = []
    let prevTyped = false
    for (const line of scenario.lines) {
      if (cancelled || s !== session) return
      const typed = scenario.tab.endsWith('.go') || line[0]?.c === 'pr'
      if (typed) {
        lines.value.push([])
        const row = lines.value[lines.value.length - 1]
        for (const span of line) {
          row.push({ t: '', c: span.c })
          const cur = row[row.length - 1]
          for (const ch of span.t) {
            if (cancelled || s !== session) return
            cur.t += ch
            await sleep(charDelay(ch))
          }
        }
        await sleep(120 + Math.random() * 220)
      } else {
        await sleep(prevTyped ? 170 + Math.random() * 160 : 25)
        pushStatic(line)
      }
      prevTyped = typed
    }
    await sleep(4200)
  }
}

function focusInput() {
  nextTick(() => inputEl.value?.focus({ preventScroll: true }))
}

function enterShell() {
  if (mode.value === 'shell') return
  session++
  mode.value = 'shell'
  tab.value = 'zsh'
  lines.value = [[{ t: 'interactive shell — try `help`, `exit` returns the demo', c: 'cm' }]]
  focusInput()
}

function exitShell() {
  mode.value = 'auto'
  input.value = ''
  if (reduced.value) showFull(scenarios[0])
  else play()
}

function scrollBottom() {
  nextTick(() => {
    if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight
  })
}

function loadScriptOnce(src, css) {
  if (window.Dos) return Promise.resolve()
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = css
  document.head.append(link)
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.onload = resolve
    s.onerror = () => reject(new Error('js-dos load failed'))
    document.head.append(s)
  })
}

async function startDoom() {
  doom.value = true
  await nextTick()
  try {
    await loadScriptOnce('https://v8.js-dos.com/latest/js-dos.js', 'https://v8.js-dos.com/latest/js-dos.css')
    dosProps = window.Dos(doomEl.value, { url: '/doom.jsdos', autoStart: true, kiosk: true })
  } catch {
    closeDoom()
    pushStatic([{ t: 'doom: failed to load js-dos engine (offline?)', c: '' }])
    scrollBottom()
  }
}

function closeDoom() {
  try {
    dosProps?.stop()
  } catch {}
  dosProps = null
  doom.value = false
  focusInput()
}

function execute() {
  const raw = input.value
  input.value = ''
  lines.value.push([{ t: PROMPT, c: 'pr' }, { t: raw, c: 'hi' }])
  const parts = raw.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return scrollBottom()
  const [cmd, ...rest] = parts
  const arg = rest.join(' ')
  let out = []
  switch (cmd) {
    case 'help':
      out = [[tx('commands: whoami · ls · cat <file> · doom · sudo hire-me · clear · exit')]]
      break
    case 'doom':
      out = [[cm('loading DOOM.EXE — shareware episode 1…')]]
      startDoom()
      break
    case 'whoami':
      out = [[tx('Fedor Berman — senior backend engineer · go · fintech & crypto')]]
      break
    case 'ls':
      out = [[tx('stack.txt   resume.txt   contact.txt')]]
      break
    case 'cat':
      out = shellFiles[arg]
        ? [[tx(shellFiles[arg])]]
        : [[tx(`cat: ${arg}: No such file or directory`)]]
      break
    case 'sudo':
      out =
        arg === 'hire-me'
          ? [
              [cm('[sudo] password for visitor: ******')],
              [ok('access granted'), tx(' → '), hi('fyodorberman@gmail.com')],
            ]
          : [[tx(`sudo: ${arg}: command not found`)]]
      break
    case 'clear':
      lines.value = []
      return
    case 'exit':
      exitShell()
      return
    default:
      out = [[tx(`zsh: command not found: ${cmd}`)]]
  }
  for (const line of out) pushStatic(line)
  scrollBottom()
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced.value) showFull(scenarios[0])
  else play()
})

onBeforeUnmount(() => {
  cancelled = true
  session++
  if (dosProps) closeDoom()
})
</script>

<template>
  <div
    class="term"
    :aria-hidden="mode === 'auto' ? 'true' : undefined"
    @click="mode === 'auto' ? enterShell() : focusInput()"
  >
    <div class="term-bar">
      <span class="dot" /><span class="dot" /><span class="dot" />
      <span class="term-tab">{{ tab }}</span>
      <span class="bar-hint">{{ mode === 'auto' ? 'click to type' : '`exit` to resume' }}</span>
    </div>
    <pre class="term-body" ref="bodyEl"><div
      v-for="(line, li) in lines"
      :key="li"
      class="term-line"
    ><span
        v-for="(span, si) in line"
        :key="si"
        :class="span.c"
      >{{ span.t }}</span><span
        v-if="mode === 'auto' && li === lines.length - 1 && !reduced"
        class="cursor"
      /></div><div v-if="mode === 'shell'" class="term-line"><span class="pr">{{ PROMPT }}</span><span class="hi">{{ input }}</span><span class="cursor" /></div></pre>
    <input
      v-if="mode === 'shell'"
      ref="inputEl"
      v-model="input"
      class="ghost-input"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
      aria-label="terminal input"
      @keydown.enter="execute"
    />
    <Teleport to="body">
      <div v-if="doom" class="doom-overlay">
        <div class="doom-bar">
          <span>doom.exe — shareware</span>
          <button type="button" @click="closeDoom">✕ quit</button>
        </div>
        <div ref="doomEl" class="doom-screen" />
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.term {
  position: relative;
  background: var(--bg-deep);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 0 60px rgba(127, 119, 221, 0.12);
  overflow: hidden;
  cursor: text;
}

.term-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 14px;
  border-bottom: 1px solid var(--border);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border-hi);
}

.term-tab {
  margin-left: 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-dim);
}

.bar-hint {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-dim);
  opacity: 0.65;
}

.term-body {
  margin: 0;
  padding: 18px 20px;
  min-height: 260px;
  max-height: 340px;
  overflow-y: auto;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.65;
  color: var(--text);
}

.term-line {
  min-height: 1.65em;
  white-space: pre;
}

.kw {
  color: var(--accent);
}

.fn,
.hi {
  color: var(--text-hi);
}

.ty {
  color: var(--accent-dim);
}

.cm {
  color: var(--text-dim);
  font-style: italic;
}

.pr,
.ok {
  color: var(--accent);
}

.cursor {
  display: inline-block;
  width: 0.55em;
  height: 1.05em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: var(--accent);
  animation: blink 1.06s step-end infinite;
}

.ghost-input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  border: 0;
  padding: 0;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.doom-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  background: #000;
}

.doom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text);
  background: var(--bg-deep);
  border-bottom: 1px solid var(--border);
}

.doom-bar button {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-hi);
  background: none;
  border: 1px solid var(--border-hi);
  border-radius: 6px;
  padding: 4px 12px;
  cursor: pointer;
}

.doom-bar button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.doom-screen {
  flex: 1;
  min-height: 0;
}
</style>
