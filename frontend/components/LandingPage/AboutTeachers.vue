<template>
  <v-row no-gutters align="center" class="text-center text-md-left">
    <v-col order="2" order-md="1" cols="12" offset-md="1" md="4">
      <v-container>
        <h1 class="display-3 mb-5">Professores que querem dar aula</h1>
        <span class="subtitle-1">
          Nossos voluntários são alunos e professores da USP e Unicamp que
          compartilham de um sonho: Democratizar a educação de qualidade em
          todo o país
        </span>
        <div class="text-left mt-5">
          <v-btn color="success" block x-large>Conheça nossos voluntários</v-btn>
        </div>
      </v-container>
    </v-col>
    <v-col order="1" order-md="2" cols="12" md="7">
      <v-card elevation="10" tile>
        <v-img
          :aspect-ratio="18 / 9"
          src="/img/landing/photos/text-1.jpg"
          lazy-src="/img/landing/photos/text-1-lazy.jpg"
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