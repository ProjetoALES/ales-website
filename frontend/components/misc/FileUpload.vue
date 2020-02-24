<template>
  <v-row justify="center" class="text-center">
    <v-col cols="12">
      <transition
        enter-active-class="animated fadeInUp faster"
        leave-active-class="animated fadeOutUp faster"
        mode="out-in"
      >
        <v-file-input
          v-if="(value || '').length === 0"
          ref="file"
          v-model="file"
          :label="label"
          :loading="uploading"
          :hint="uploading ? 'Fazendo upload...' : ''"
          v-bind="$attrs"
          v-on="$listeners"
        />
        <div v-else>
          <span class="title font-weight-light">
            <b>{{ label }}</b> foi
            <a :href="value" target="_blank">enviado</a>
          </span>
          <v-btn
            class="d-block center-button"
            text
            size="small"
            color="primary"
            @click="clear"
          >Enviar outro</v-btn
          >
        </div>
      </transition>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      default: '',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    uploadUrl: {
      default: '',
      type: String
    },
    paramName: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      file: null,
      uploading: false
    }
  },
  watch: {
    file(file) {
      if (file && this.$refs.file.validate(true)) {
        this.upload(file)
      }
    }
  },
  methods: {
    clear() {
      this.$emit('input', '')
      this.file = null
    },
    upload(file) {
      this.uploading = true
      const formData = new FormData()
      formData.append(this.paramName, file)
      return this.$auth
        .request({
          method: 'post',
          url: `${this.uploadUrl}`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({ url }) => {
          this.$emit('input', url)
        })
        .catch(error => {
          this.$toast.error(this.errorMessage)
          this.$consola.error(error)
          this.file = null
        })
        .then(() => {
          this.uploading = false
        })
    }
  }
}
</script>
<style scoped>
.center-button {
  margin: auto;
}
</style>
