<template>
  <BaseForm
    v-bind="$attrs"
    title="Nos fale um pouco sobre você"
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
          v-model="formData.firstName"
          :rules="[rules.required]"
          label="Primeiro nome"
          required
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.lastName"
          :rules="[rules.required]"
          label="Sobrenome"
          required
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="formData.gender"
          :items="genderOptions"
          :rules="[rules.required]"
          label="Gênero"
          required
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-menu
          ref="birthdayMenu"
          v-model="birthdayMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :rules="[rules.required]"
              :value="formattedBirthday"
              label="Data de nascimento"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            ref="birthdayPicker"
            v-model="formData.birthday"
            :rules="[rules.required]"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            locale="pt-br"
            @change="saveBirthday"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.email"
          :rules="[rules.required, rules.email]"
          label="Email"
          hint="Usaremos esse email para contato, então acesse ele com frequência!"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.confirmEmail"
          :rules="[rules.required, rules.confirmEmail]"
          label="Confirmar email"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.phone"
          v-mask="['(##) ####-####', '(##) #####-####']"
          :rules="[rules.required, rules.phone]"
          label="Telefone para contato"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.cep"
          v-mask="'#####-###'"
          :rules="[rules.required, rules.cep]"
          label="Seu CEP"
        />
      </v-col>
    </v-row>
  </BaseForm>
</template>

<script>
import BaseForm from './BaseForm'
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
      birthdayMenu: false,
      genderOptions: [
        { text: 'Masculino', value: 'M' },
        { text: 'Feminino', value: 'F' },
        { text: 'Outro', value: 'O' },
        { text: 'Prefiro não dizer', value: 'NA' }
      ],
      rules: {
        required: value => !!value || 'Obrigatório!',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email inválido'
        },
        confirmEmail: value =>
          value === this.formData.email || 'Emails diferentes',
        phone: v =>
          /^\(?0?\d{2}\)?\s?\d{4,5}-?\s?\d{4}$/.test(v) || 'Telefone inválido',
        cep: v => /\d{5}-?\d{3}$/.test(v) || 'CEP inválido'
      }
    }
  },
  computed: {
    formattedBirthday() {
      return this.formData.birthday
        ? this.$moment(this.formData.birthday).format('LL')
        : ''
    }
  },
  watch: {
    birthdayMenu(val) {
      val &&
        this.$nextTick(() => (this.$refs.birthdayPicker.activePicker = 'YEAR'))
    }
  },
  methods: {
    saveBirthday(date) {
      this.$refs.birthdayMenu.save(date)
    }
  }
}
</script>

<style></style>
