<template>
  <v-container class="main-container">
    <template v-if="!wantsToBeStudent && !wantsToBeVolunteer">
      <v-row
        justify="center"
        align="center"
        align-content="center"
        class="text-center"
      >
        <v-col>
          <h1 class="display-2 font-weight-thin mb-5">
            Agradecemos pelo interesse no ALES!
          </h1>
          <h4 class="headline font-weight-light">
            Como você pretende participar?
          </h4>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" class="mt-5">
        <v-col xl="4" xs="6" class="text-center text-sm-right">
          <v-btn
            class="primary--text"
            x-large
            color="secondary"
            @click="setStudent"
          >Quero ser aluno</v-btn
          >
        </v-col>
        <v-col xl="4" xs="6" class="text-center text-sm-left">
          <v-btn
            class="secondary--text"
            x-large
            color="primary"
            @click="setVolunteer"
          >Quero ser voluntário</v-btn
          >
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row
        justify="center"
        align="center"
        align-content="center"
        class="text-center"
      >
        <v-col>
          <h4 class="display-1 font-weight-thin">
            Complete seu pré-cadastro para ser
            {{ wantsToBeStudent ? 'aluno' : 'voluntário' }}
          </h4>
        </v-col>
      </v-row>
      <RegistrationForm :is-student="wantsToBeStudent" />
    </template>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RegistrationForm from '~/components/register/RegistrationForm'

export default {
  alesAuth: false,
  components: {
    RegistrationForm
  },
  computed: {
    ...mapGetters({
      wantsToBeVolunteer: 'registration/wantsToBeVolunteer',
      wantsToBeStudent: 'registration/wantsToBeStudent'
    })
  },
  mounted() {
    if (
      !this.wantsToBeStudent &&
      !this.wantsToBeVolunteer &&
      this.$auth.loggedIn
    ) {
      this.$store.dispatch('registration/setWantsToBeFromAuth0')
    }
  },
  methods: {
    ...mapActions({
      setStudent: 'registration/setStudent',
      setVolunteer: 'registration/setVolunteer'
    })
  },
  head() {
    return {
      title: "Pré-cadastro"
    }
  }
}
</script>

<style scoped>
.main-container {
  margin-top: 5%;
}
</style>
