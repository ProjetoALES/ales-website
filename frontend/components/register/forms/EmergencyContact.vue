<template>
  <BaseForm
    v-bind="$attrs"
    title="Esperamos nunca usar, mas nos diga um contato de emergência"
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
          v-model="formData.emergencyContact.name"
          :rules="[rules.required]"
          label="Nome do contato"
          required
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.emergencyContact.phone"
          v-mask="['(##) ####-####', '(##) #####-####']"
          :rules="[rules.required, rules.phone]"
          label="Telefone do contato"
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
      rules: {
        required: value => !!value || 'Obrigatório!',
        phone: v =>
          /^\(?0?\d{2}\)?\s?\d{4,5}-?\s?\d{4}$/.test(v) || 'Telefone inválido'
      }
    }
  }
}
</script>
