<template>
  <!-- Wrapper for the entire page -->
  <div>
    <!-- Hero section -->
    <hero />
    <div class="vertical-separator" />
    <!-- About Section -->
    <about />
    <div class="vertical-separator" />
    <!-- About teachers section -->
    <about-teachers />
    <div class="vertical-separator" />
    <!-- About tech section -->
    <about-tech />
    <div class="vertical-separator" />
    <!-- About lectures section -->
    <about-lectures />
    <div class="vertical-separator" />
    <!-- Directions section -->
    <directions />
    <div class="vertical-separator" />
    <!-- FAQ and Contact section -->
    <questions />
  </div>
</template>

<script>
import Hero from '~/components/LandingPage/Hero.vue'
import About from '~/components/LandingPage/About.vue'
import AboutTeachers from '~/components/LandingPage/AboutTeachers.vue'
import AboutTech from '~/components/LandingPage/AboutTech.vue'
import AboutLectures from '~/components/LandingPage/AboutLectures.vue'
import Directions from '~/components/LandingPage/Directions.vue'
import Questions from '~/components/LandingPage/Questions/index.vue'
export default {
  components: {
    Hero,
    Directions,
    Questions,
    AboutTeachers,
    AboutTech,
    AboutLectures,
    About
  },
  layout: 'landingPage',
  head() {
    return {
      title: ''
    }
  }
}
</script>
<style scoped>
.contact-header {
  word-break: initial;
}
a.anchor {
  display: block;
  position: relative;
  top: -50px;
  visibility: hidden;
}
.vertical-separator {
  margin-top: 20vh;
}
@media (max-width: 960px) {
  .col-12.col-md-4 {
    margin-top: 24px !important;
    margin-bottom: 24px !important;
  }
}
</style>

<style scoped>
@media (max-width: 1264px) {
  .display-3 {
    font-size: 40px !important;
  }
}
</style>
