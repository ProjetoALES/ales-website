<template>
  <v-app-bar tile color="white" fixed>
    <nuxt-link class="logo-wrapper" to="/">
      <img src="/logo/side-text.svg" class="logo" />
    </nuxt-link>
    <v-spacer />
    <v-app-bar-nav-icon @click.stop="toggleNav"></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations({
      toggleNav: 'navDrawer/toggle'
    })
  }
}
</script>

<style scoped>
.logo {
  max-height: 50%;
  min-height: 38px;
  margin: auto 0px;
}
.logo-wrapper {
  display: flex;
  height: 100%;
}
</style>
