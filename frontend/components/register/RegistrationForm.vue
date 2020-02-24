<template>
  <v-col cols="12">
    <v-row justify="space-around">
      <v-col cols="12" md="9" xl="6">
        <v-divider />
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="12" md="9" xl="6">
        <v-stepper v-model="step" class="no-shadow-stepper">
          <v-stepper-items>
            <v-row justify="center">
              <v-col cols="12" class="text-center">
                <span class="overline">Salvo {{ lastSaveRelative }}</span>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <div class="d-inline" v-on="$nuxt.isOffline ? on : null">
                      <v-btn
                        :disabled="$nuxt.isOffline"
                        small
                        color="primary"
                        text
                        @click="saveForm"
                      >Salvar</v-btn
                      >
                    </div>
                  </template>
                  <span>Você está offline!</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-stepper-content
              v-for="(form, i) in computedForms"
              :key="i"
              :step="i"
            >
              <component
                :is="form.component"
                v-model="form.isValid"
                :form-data="formData"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <v-card-actions>
          <v-btn :disabled="firstStep" text @click="prevForm">
            <v-icon left>fas fa-arrow-left</v-icon>Voltar
          </v-btn>
          <div class="flex-grow-1"></div>
          <v-btn
            v-if="!lastStep"
            :disabled="!stepFormValid"
            color="primary"
            @click="nextForm"
          >
            Próximo
            <v-icon right>fas fa-arrow-right</v-icon>
          </v-btn>
          <v-btn
            v-else
            :disabled="!allFormsValid"
            color="success"
            @click="submit"
          >
            Enviar pré-cadastro
            <v-icon right>fas fa-paper-plane</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import { mapGetters } from 'vuex'
import FormIntroduction from './forms/FormIntroduction'
import BasicInfoForm from './forms/BasicInfoForm'
import DocumentationForm from './forms/DocumentationForm'
import GuardianForm from './forms/GuardianForm'
import SchoolForm from './forms/SchoolForm'
import EmergencyContact from './forms/EmergencyContact'
import CaptchaForm from './forms/CaptchaForm'

export default {
  components: {
    FormIntroduction,
    BasicInfoForm,
    DocumentationForm,
    GuardianForm,
    SchoolForm,
    EmergencyContact,
    CaptchaForm
  },
  props: {
    isStudent: Boolean
  },
  data() {
    return {
      formData: {
        documentation: {},
        guardian: {},
        student: {},
        emergencyContact: {}
      },
      step: 0,
      forms: [],
      lastSave: null,
      lastSaveRelative: 'Nunca',
      lastSaveInterval: null
    }
  },
  computed: {
    ...mapGetters({
      wantsToBeVolunteer: 'registration/wantsToBeVolunteer',
      wantsToBeStudent: 'registration/wantsToBeStudent'
    }),
    allFormsValid() {
      return this.forms.every(form => form.isValid)
    },
    stepFormValid() {
      return this.forms.map(f => f.isValid)[this.step]
    },
    firstStep() {
      return this.step === 0
    },
    lastStep() {
      return this.step === this.forms.length - 1
    },
    requiresGuardian() {
      if (this.wantsToBeVolunteer || !this.formData.birthday) {
        return false
      }
      return (
        this.$moment
          .duration(this.$moment().diff(this.formData.birthday))
          .asYears() < 18
      )
    },
    computedForms() {
      // Missing
      /**
       * Financial info
       * Classes
       */
      const forms = [
        {
          component: FormIntroduction,
          isValid: false
        },
        {
          component: BasicInfoForm,
          isValid: false
        }
      ]
      if (this.requiresGuardian) {
        forms.push({
          component: GuardianForm,
          isValid: false
        })
      } else {
        forms.push({
          component: DocumentationForm,
          isValid: false
        })
      }
      if (this.wantsToBeStudent) {
        forms.push({
          component: EmergencyContact,
          isValid: false
        })
        forms.push({
          component: SchoolForm,
          isValid: false
        })
      }
      forms.push({
        component: CaptchaForm,
        isValid: false
      })
      return this.setForms(forms)
    }
  },
  watch: {
    formData: {
      handler(newVal) {
        // Keep the internal store always up to date
        this.$store.dispatch('registration/updateFormData', {
          formData: cloneDeep(newVal),
          setUpdateTime: this.updateLastSave
        })
      },
      deep: true
    }
  },
  beforeMount() {
    // Register reset hook
    this.resetOnLogout()

    // Try to guess some initial values
    const tmpForm = {}
    if (this.$auth.user) {
      if (this.$auth.user.email) {
        tmpForm.email = this.$auth.user.email
      }
      if (this.$auth.user.given_name) {
        tmpForm.firstName = this.$auth.user.given_name
      }
      if (this.$auth.user.family_name) {
        tmpForm.lastName = this.$auth.user.family_name
      }
      if (this.$auth.user.phone_number) {
        tmpForm.phone = this.$auth.user.phone_number
      }
    }

    // Extract all fields from the $store that are not empty
    const unEmptyFields = Object.entries(
      this.$store.state.registration.formData
    ).reduce(
      (acc, [key, val]) => (val !== undefined ? { ...acc, [key]: val } : acc),
      {}
    )

    // Retrieve `user_metadata.registrationForm` from auth0
    const auth0Metadata =
      this.$auth.user &&
      this.$auth.user.user_metadata &&
      this.$auth.user.user_metadata.registrationForm

    // Build the current form data from all of those sources
    this.formData = merge(
      {},
      this.formData,
      tmpForm,
      unEmptyFields,
      auth0Metadata || {}
    )
  },
  mounted() {
    // Go to the last incomplete form
    this.forms.forEach((form) => this.$nextTick(() => this.nextForm()))

    // Update the "last save" text every 10 seconds
    this.lastSaveInterval = setInterval(() => {
      this.updateLastSaveRelative()
    }, 10 * 1000)
  },
  beforeDestroy() {
    clearInterval(this.lastSaveInterval)
  },
  methods: {
    setForms(forms) {
      this.forms = forms
      return this.forms
    },
    submit() {
      this.$store.commit('registration/setForm', {})
    },
    resetOnLogout() {
      this.$auth.$storage.watchState('loggedIn', loggedIn => {
        if (!loggedIn) {
          this.$store.dispatch('registration/reset')
        }
      })
    },
    updateLastSave(lastSave) {
      if (this.$moment.isMoment(lastSave)) {
        this.lastSave = lastSave
      }
    },
    updateLastSaveRelative() {
      if (this.$moment.isMoment(this.lastSave)) {
        this.lastSaveRelative = this.lastSave.fromNow()
      }
    },
    saveForm() {
      this.$store
        .dispatch('registration/updateFormAuth0Metadata', this.updateLastSave)
        .then(() => this.updateLastSaveRelative())
    },
    nextForm() {
      if (this.stepFormValid) {
        this.step += 1
      }
    },
    prevForm() {
      this.step -= 1
    }
  }
}
</script>

<style>
.no-shadow-stepper.v-stepper.theme--light {
  box-shadow: none;
  background: none;
}
@media (max-width: 960px) {
  .v-stepper__content {
    padding: unset;
  }
}
</style>
