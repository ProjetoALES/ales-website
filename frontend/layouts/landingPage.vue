<template>
  <v-app>
    <NavigationDrawer />
    <AppBar />
    <v-content>
      <nuxt />
    </v-content>
    <Footer app />
  </v-app>
</template>

<script>
import NavigationDrawer from '~/components/layouts/NavigationDrawer'
import AppBar from '~/components/layouts/AppBar/LandingAppBar'
import Footer from '~/components/layouts/Footer.vue'
export default {
  components: {
    NavigationDrawer,
    AppBar,
    Footer
  }
}
</script>
