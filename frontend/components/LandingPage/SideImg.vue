<template>
  <v-img
    :aspect-ratio="1920 / 2880"
    contain
    class="side-img"
    src="/img/landing/side.png"
    lazy-src="/img/landing/side_alt.png"
  />
</template>

<style scoped>
.side-img {
  width: calc(1920 / 2880 * 70vh);
  min-width: calc(1920 / 2880 * 50vh);
  margin-left: auto;
}
</style>
