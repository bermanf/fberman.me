import { createApp } from 'vue'
import './style.css'
import ExperiencePage from './ExperiencePage.vue'
import { startMotion, motionDirectives } from './motion.js'
import './scrollDepth.js'

startMotion()

const app = createApp(ExperiencePage)
motionDirectives(app)
app.mount('#app')
