<template>
  <div>
    <MobileAppBar app fixed class="d-block d-lg-none" />
    <DesktopAppBar
      :buttons="buttons"
      elevate-on-scroll
      app
      fixed
      class="d-none d-lg-block desktop-app-bar"
    />
  </div>
</template>

<script>
import MobileAppBar from './MobileAppBar'
import DesktopAppBar from './DesktopAppBar'
import buttonsMixin from './buttonsMixin'
export default {
  components: {
    MobileAppBar,
    DesktopAppBar
  },
  mixins: [buttonsMixin]
}
</script>

<style>
.desktop-app-bar.v-app-bar {
  background-color: transparent;
}
.desktop-app-bar.v-app-bar.v-app-bar--is-scrolled {
  background-color: white;
}

.theme--light.v-app-bar.v-toolbar.v-sheet {
    background-color: white;
}
</style>
