<template>
  <v-card-text>
    <v-row justify="center" align="center" align-content="center" class="text-center">
      <v-col cols="12">
        <v-row justify="center" align="center" align-content="center" class="text-center">
          <v-col cols="12">
            <h1 class="headline font-weight-light mb-5">Por último, um testezinho</h1>
          </v-col>
          <vue-recaptcha
            :sitekey="captchaKey"
            :load-recaptcha-script="true"
            class="catcha-container"
            @verify="$emit('input', true)"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'

export default {
  components: { VueRecaptcha },
  data() {
    return {
      captchaKey: process.env.RECAPTCHA_PUBLIC_KEY
    }
  }
}
</script>
<style scoped>
.catcha-container > div {
  margin: auto;
}
</style>
