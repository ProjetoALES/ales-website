<template>
  <v-layout>
    <v-flex class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      {{ wantsToBe }}
      <v-btn @click="login">Login</v-btn>
      <v-btn @click="logout">Logout</v-btn>
      <v-btn
        @click="link('facebook')"
      >{{ $auth.hasAccount('facebook') && 'des' }}vincular facebook</v-btn
      >
      <v-btn
        @click="link('github')"
      >{{ $auth.hasAccount('github') && 'des' }}vincular Github</v-btn
      >
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  alesAuth: false,
  computed: {
    wantsToBe() {
      return this.$store.state.registration.wantsToBe
    }
  },
  methods: {
    login() {
      this.$auth.loginWith('auth0')
    },
    logout() {
      this.$auth.logout()
    },
    link(provider) {
      if (this.$auth.hasAccount(provider)) {
        this.$auth.unlinkAccount(provider)
      } else {
        this.$auth.linkAccount(provider)
      }
    }
  }
}
</script>
