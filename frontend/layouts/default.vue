<template>
  <v-app>
    <NavigationDrawer />
    <AppBar />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from '~/components/layouts/NavigationDrawer'
import AppBar from '~/components/layouts/AppBar/AppBar'
export default {
  components: {
    NavigationDrawer,
    AppBar
  }
}
</script>
