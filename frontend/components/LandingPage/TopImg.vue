<template>
  <div class="img-container">
    <v-img
      :aspect-ratio="805 / 270"
      class="top-img variable-max-width"
      src="/img/landing/top.png"
      lazy-src="/img/landing/top_alt.png"
    />
  </div>
</template>
<style scoped>
.img-container {
  width: 100%;
  background-color: transparent;
}
.top-img {
  margin: auto;
}
/* If desktop */
@media (min-width: 1264px) {
  .top-img {
    position: absolute;
    left: 230px;
  }
}
/* if mobile */
@media (max-width: 1264px) {
  .img-container {
    position: absolute;
    top: 54px;
  }
}
</style>
<style lang="scss" scoped>
@media (max-width: 400px) {
  .variable-max-width {
    max-width: 100vw;
  }
}
@media (min-width: 400px) and (max-width: 1264px) {
  .variable-max-width {
    max-width: 400px;
  }
}
@media (min-width: 1264px) and (max-width: 1500px) {
  .variable-max-width {
    max-width: 30vw;
  }
}
@media (min-width: 1500px) {
  .variable-max-width {
    max-width: 500px;
  }
}
</style>
