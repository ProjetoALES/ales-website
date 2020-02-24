<template>
  <div>
    <a id="contato" class="anchor" />
    <v-card flat class="primary white--text" tile>
      <v-card-title>
        <v-row no-gutters class="text-center mb-3 pt-5">
          <v-col>
            <h1 class="display-2 contact-header font-weight-thin">Alguma pergunta?</h1>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row justify="center">
          <v-col cols="12" lg="5" xl="4" class="text-center">
            <h1
              class="headline font-weight-light white--text"
            >Dê uma olhada nas perguntas frequentes</h1>
            <f-a-q />
          </v-col>
          <v-col cols="12" lg="5" xl="4" class="text-center">
            <h1 class="headline font-weight-light white--text">Ou mande uma mensagem pra a gente</h1>
            <contact-form />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import FAQ from './FAQ.vue'
import ContactForm from './ContactForm.vue'

export default {
  components: { FAQ, ContactForm }
}
</script>

<style>
</style>