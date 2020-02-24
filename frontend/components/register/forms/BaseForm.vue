<template>
  <v-card-text>
    <v-form v-model="formValid">
      <v-row
        justify="center"
        align="center"
        align-content="center"
        class="text-center"
      >
        <v-col cols="12">
          <h1 class="headline font-weight-light">{{ title }}</h1>
        </v-col>
        <slot />
      </v-row>
    </v-form>
  </v-card-text>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    value: Boolean
  },
  data() {
    return {
      internalValue: false
    }
  },
  computed: {
    formValid: {
      get() {
        return this.internalValue
      },
      set(val) {
        this.internalValue = val
        this.$emit('input', val)
      }
    }
  },
  watch: {
    value(val) {
      // If value differs from internalvalue, force it to be equal
      if (val !== this.internalValue) {
        this.$emit('input', this.internalValue)
      }
    }
  }
}
</script>

<style></style>
