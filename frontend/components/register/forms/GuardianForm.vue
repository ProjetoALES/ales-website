<template>
  <BaseForm
    v-bind="$attrs"
    :title="
      `Como você ainda é nov${genderSuffix}, vamos precisar de um(a) responsável`
    "
    v-on="$listeners"
  >
    <v-row
      justify="center"
      align="center"
      align-content="center"
      class="text-center"
    >
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.guardian.firstName"
          :rules="[rules.required]"
          label="Primeiro nome do responsável"
          required
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.guardian.lastName"
          :rules="[rules.required]"
          label="Sobrenome do responsável"
          required
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.guardian.email"
          :rules="[rules.required, rules.email]"
          label="Email do responsável"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.guardian.confirmEmail"
          :rules="[rules.required, rules.confirmEmail]"
          label="Confirmar email"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.guardian.phone"
          v-mask="['(##) ####-####', '(##) #####-####']"
          :rules="[rules.required, rules.phone]"
          label="Telefone do responsável"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.guardian.cpf"
          v-mask="'###.###.###-##'"
          :rules="[rules.required, rules.cpf]"
          label="CPF do responsável"
        />
      </v-col>
    </v-row>
  </BaseForm>
</template>

<script>
import BaseForm from './BaseForm'
import estados from './estados'

export default {
  components: { BaseForm },
  props: {
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      rgDateMenu: false,
      rules: {
        required: value => !!value || 'Obrigatório!',
        cpf: v => this.validateCPF(v) || 'CPF inválido',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email inválido'
        },
        confirmEmail: value =>
          value === this.formData.guardian.email || 'Emails diferentes',
        phone: v =>
          /^\(?0?\d{2}\)?\s?\d{4,5}-?\s?\d{4}$/.test(v) || 'Telefone inválido'
      },
      estados
    }
  },
  computed: {
    formattedRgDate() {
      if (this.formData.documentation) {
        return this.$moment(this.formData.documentation.rgIssueDate).format(
          'LL'
        )
      }
      return ''
    },
    genderSuffix() {
      switch (this.formData.gender) {
        case 'M':
          return 'o'
        case 'F':
          return 'a'
        default:
          return 'x'
      }
    }
  },
  watch: {
    rgDateMenu(val) {
      val &&
        this.$nextTick(() => (this.$refs.rgDatePicker.activePicker = 'YEAR'))
    }
  },
  methods: {
    saveRgDate(date) {
      this.$refs.rgDateMenu.save(date)
    },
    validateCPF(cpf) {
      cpf = [
        ...(cpf || '')
          .split('.')
          .join('')
          .split('-')
          .join('')
      ]
      let firstSum = 0
      let secondSum = 0
      cpf.forEach((number, i) => {
        if (i < 9) {
          firstSum += parseInt(number) * (10 - i)
        }
        if (i < 10) {
          secondSum += parseInt(number) * (11 - i)
        }
      })
      firstSum = ((firstSum * 10) % 11) % 10
      secondSum = ((secondSum * 10) % 11) % 10
      return firstSum === parseInt(cpf[9]) && secondSum === parseInt(cpf[10])
    }
  }
}
</script>

<style></style>
