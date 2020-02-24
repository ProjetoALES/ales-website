<template>
  <div>
    <a id="sobre" class="anchor" />
    <v-container d-flex xs12>
      <v-row align="start" align-sm="center" align-lg="end" justify="center">
        <v-col order-lg="1" order="2" cols="6" lg="3" xl="2" class="text-center text-md-right">
          <v-img
            :aspect-ratio="1"
            height="100%"
            max-height="300px"
            contain
            src="/img/alessauro/alessauro-professor.svg"
          />
        </v-col>
        <v-col order-lg="2" order="1" cols="12" sm="10" md="8" lg="6" xl="4" class="text-center">
          <h3 class="display-1 font-weight-thin mb-7">Descubra o ALES em 1 minuto</h3>
          <v-card elevation="3" tile>
            <ResponsiveiFrame src="https://www.youtube-nocookie.com/embed/K6yyK8wRsto" />
          </v-card>
        </v-col>
        <v-col order-lg="3" order="3" cols="6" lg="3" xl="2" class="text-center">
          <v-img
            :aspect-ratio="1"
            :max-height="$vuetify.breakpoint.smAndDown ? '20vw' : '150px'"
            height="100%"
            contain
            src="/img/unicamp/logo-unicamp.svg"
          />
          <h3 class="title font-weight-thin mb-7">Um projeto de extensão da Unicamp</h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ResponsiveiFrame from '~/components/misc/ResponsiveiFrame.vue'

export default {
  components: { ResponsiveiFrame }
}
</script>

<style>
a.anchor {
  display: block;
  position: relative;
  top: -50px;
  visibility: hidden;
}
</style>