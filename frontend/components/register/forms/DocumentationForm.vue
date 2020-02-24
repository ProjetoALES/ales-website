<template>
  <BaseForm
    v-bind="$attrs"
    title="Precisamos de alguns documentos"
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
          v-model="formData.documentation.rg"
          :rules="[rules.required]"
          label="Número do seu RG"
          required
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-menu
          ref="rgDateMenu"
          v-model="rgDateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :rules="[rules.required]"
              :value="formattedRgDate"
              label="Data de emissão"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            ref="rgDatePicker"
            v-model="formData.documentation.rgIssueDate"
            :rules="[rules.required]"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            locale="pt-br"
            @change="saveRgDate"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.documentation.rgIssuer"
          :rules="[rules.required]"
          label="Orgão emissor"
          required
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-autocomplete
          v-model="formData.documentation.rgState"
          :items="estados"
          :rules="[rules.required]"
          label="Estado de emissão"
        ></v-autocomplete>
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
        required: value => !!value || 'Obrigatório!'
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
    }
  }
}
</script>

<style></style>
