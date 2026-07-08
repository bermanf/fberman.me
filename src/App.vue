<script setup>
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import WorkSection from './components/WorkSection.vue'
import ExperienceCarousel from './components/ExperienceCarousel.vue'
import StackSection from './components/StackSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <SiteNav />
  <main>
    <HeroSection />
    <AboutSection />
    <WorkSection />
    <ExperienceCarousel />
    <StackSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
