<template>
  <v-form ref="form" v-model="valid" class="contact-form">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="name" :rules="nameRules" dark label="Nome" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="email" :rules="emailRules" dark label="Email" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="subject" :rules="subjectRules" dark label="Assunto" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea v-model="message" :rules="messageRules" dark label="Mensagem" required></v-textarea>
        </v-col>
      </v-row>
      <div id="help" class="help" />
      <v-row justify="center" align="center" align-content="center" class="text-center my-4">
        <vue-recaptcha
          ref="captcha"
          :sitekey="captchaKey"
          :load-recaptcha-script="true"
          class="catcha-container"
          @verify="captchaValid = true"
        />
      </v-row>
      <v-btn
        id="submit"
        :disabled="!valid || !captchaValid"
        :loading="loading"
        color="secondary"
        class="mr-4 primary--text"
        @click="send"
      >
        <v-icon left>fas fa-paper-plane</v-icon>Enviar mensagem
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'

export default {
  components: { VueRecaptcha },
  data() {
    return {
      name: '',
      nameRules: [v => !!v || 'Seu nome é obrigatório'],
      email: '',
      emailRules: [
        v => !!v || 'Email é obrigatório',
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'Email inválido'
      ],
      subject: '',
      subjectRules: [v => !!v || 'O assunto é obrigatório'],
      message: '',
      messageRules: [v => !!v || 'A mensagem é obrigatória'],
      valid: true,
      loading: false,
      captchaKey: process.env.RECAPTCHA_PUBLIC_KEY,
      captchaValid: false
    }
  },
  methods: {
    send() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.toast()
        this.reset()
        this.$refs.captcha.reset()
      }, 1000)
    },
    reset() {
      this.$refs.form.reset()
    },
    toast() {
      this.$toast.success('Email enviado!')
    }
  }
}
</script>

<style scoped>
.catcha-container > div {
  margin: auto;
}
</style>
