<template>
  <v-row no-gutters align="center" class="text-center text-md-left primary white--text">
    <v-col order="2" cols="12" md="4">
      <v-container>
        <h1 class="display-3 mb-5">Tecnologia + Aulas = ❤️</h1>
        <span class="subtitle-1">
          Giz e quadro são apenas uma das nossas ferramentas. Tecnologia é
          nossa maior aliada para facilitar o aprendizado e trazer o mundo às
          pontas dos dedos de todos
        </span>
      </v-container>
    </v-col>
    <v-col order="1" cols="12" md="7">
      <v-card elevation="10" tile>
        <v-img
          :aspect-ratio="18 / 9"
          src="/img/landing/photos/text-2.jpg"
          lazy-src="/img/landing/photos/text-2-lazy.jpg"
          class="grey lighten-2"
        >
          <v-row slot="placeholder" class="fill-height" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5" />
          </v-row>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {}
</script>

<style scoped>
@media (max-width: 1264px) {
  .display-3 {
    font-size: 40px !important;
  }
}
</style>