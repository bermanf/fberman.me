import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { startMotion, motionDirectives } from './motion.js'
import './scrollDepth.js'

startMotion()

console.log(
  '%c❯ fedor@fberman.me',
  'color:#7F77DD;font-family:JetBrains Mono,monospace;font-size:13px',
  '— reading the console? say hi: fyodorberman@gmail.com',
)

const app = createApp(App)
motionDirectives(app)
app.mount('#app')
