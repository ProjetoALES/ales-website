<template>
  <div>
    <!-- AppBar used when not scrolled -->
    <DesktopAppBar
      v-scroll="handleScroll"
      :buttons="buttons"
      flat
      absolute
      prominent
      color="transparent"
      class="d-none d-lg-block"
      img="/logo/simple.svg"
      alt-buttons
    />
    <!-- AppBar used when scrolled -->
    <DesktopAppBar
      v-if="enableScrolledBar"
      :scroll-threshold="scrollThreshold"
      :buttons="buttons"
      app
      inverted-scroll
      class="d-none d-lg-block"
    />
    <!-- Mobile AppBar -->
    <MobileAppBar fixed class="d-block d-lg-none" />
  </div>
</template>

<script>
import MobileAppBar from './MobileAppBar'
import DesktopAppBar from './DesktopAppBar'
import buttonsMixin from './buttonsMixin'
export default {
  components: { MobileAppBar, DesktopAppBar },
  mixins: [buttonsMixin],
  data() {
    return {
      scroll: false,
      scrollThreshold: 128
    }
  },
  computed: {
    enableScrolledBar() {
      return this.scroll > this.scrollThreshold / 2
    }
  },
  methods: {
    handleScroll(e) {
      this.scroll = e.target.scrollingElement.scrollTop
    }
  }
}
</script>

<style scoped>
.logo {
  max-height: 50%;
  min-height: 38px;
  margin: auto 0px;
}
.desktop-buttons {
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: flex-end;
}
</style>
