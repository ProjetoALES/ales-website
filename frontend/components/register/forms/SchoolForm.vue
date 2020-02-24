<template>
  <BaseForm
    v-bind="$attrs"
    title="Agora nos fale da sua escola"
    v-on="$listeners"
  >
    <v-row
      justify="center"
      align="center"
      align-content="center"
      class="text-center"
    >
      <v-col cols="12" sm="6">
        <APIAutocomplete
          v-model="formData.student.school"
          item-text="name"
          label="Sua escola"
          url="/api/school-search"
          param-name="name"
          error-message="Erro pesquisando escolas"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title
              >Digite para pesquisar escolas</v-list-item-title
              >
            </v-list-item>
          </template>
        </APIAutocomplete>
      </v-col>
      <v-col cols="12" sm="6">
        <v-autocomplete
          v-model="formData.student.year"
          :items="series"
          :rules="[rules.required]"
          label="Sua série"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6">
        <FileUpload
          v-model="formData.student.studentProofURL"
          :upload-url="`/student-proof/${$auth.user.user_id}/upload/`"
          :rules="[rules.required, ...rules.file]"
          placeholder="Selecione uma imagem ou PDF"
          label="Atestado de matrícula"
          param-name="file"
          error-message="Erro fazendo upload do documento"
          accept="image/png,image/jpeg,image/jpg,application/pdf"
        />
      </v-col>
    </v-row>
  </BaseForm>
</template>

<script>
import merge from 'lodash/merge'
import APIAutocomplete from '../../misc/APIAutocomplete'
import FileUpload from '../../misc/FileUpload'
import BaseForm from './BaseForm'
import series from './series'

export default {
  components: { BaseForm, APIAutocomplete, FileUpload },
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
        file: [
          value =>
            (value || {}).size < 5 * 1000 * 1000 ||
            'Arquivo deve ter menos que 5mb',
          value =>
            ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].reduce(
              (agg, v) => {
                return agg || (value || {}).type === v
              },
              false
            ) || 'Arquivo deve ser um PDF ou uma imagem'
        ]
      },
      schoolProofFile: null,
      uploadingSchoolProof: false
    }
  },
  computed: {
    hasSchoolProof() {
      return Boolean(
        this.formData.student && this.formData.student.studentProofURL
      )
    },
    series() {
      return series
    }
  },
  watch: {
    schoolProofFile(file) {
      if (file && this.$refs.schoolProofFile.validate(true)) {
        this.uploadSchoolProof(file)
      }
    }
  },
  methods: {
    uploadSchoolProof(file) {
      this.uploadingSchoolProof = true
      const formData = new FormData()
      formData.append('file', file)
      return this.$auth
        .request({
          method: 'post',
          url: `/api/student-proof/${this.$auth.user.user_id}/`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({ url }) => {
          this.formData.student = merge({}, this.formData.student, {
            studentProofURL: url
          })
        })
        .catch(error => {
          this.$toast.error('Erro fazendo upload do documento')
          this.$consola.error(error)
        })
        .then(() => {
          this.uploadingSchoolProof = false
        })
    }
  }
}
</script>
