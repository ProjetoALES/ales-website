<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col>
            <template v-if="error.statusCode === 404">
              <v-row style="height: 400px;">
                <v-img
                  :aspect-ratio="1"
                  height="100%"
                  contain
                  src="/img/alessauro/alessauro-detetive.svg"
                />
              </v-row>
              <v-row align="center" justify="center" class="my-3">
                <h2>
                  <span class="error--text">404</span> Essa página não existe!
                </h2>
              </v-row>
            </template>
            <template v-else>
              <v-row style="height: 400px;">
                <v-img
                  :aspect-ratio="1"
                  height="100%"
                  contain
                  src="/img/alessauro/alessauro-engenheiro.svg"
                />
              </v-row>
              <v-row align="center" justify="center" class="mt-3">
                <h2>
                  <span class="error--text">{{ error.statusCode }}</span> Eita! Algo de errado aconteceu!
                </h2>
              </v-row>
              <v-row align="center" justify="center" class="mb-3">
                <p>
                  Tente novamente mais tarde
                </p>
              </v-row>
            </template>
            <v-row align="center" justify="center">
              <NuxtLink to="/">Voltar para a página inicial</NuxtLink>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: this.error.statusCode
    }
  }
}
</script>
