<template>
  <v-responsive
    ref="responsive"
    v-resize="setWidth"
    :aspect-ratio="computedAspectRatio"
    :height="height"
    width="100%"
  >
    <iframe
      :src="src"
      width="100%"
      height="100%"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </v-responsive>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    aspectRatio: {
      type: [Number, String],
      default: 16 / 9
    }
  },
  data() {
    return {
      isMounted: false,
      width: 0
    }
  },
  computed: {
    height() {
      return (1 / this.computedAspectRatio) * this.width
    },
    computedAspectRatio() {
      return Number(this.aspectRatio)
    }
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    setWidth() {
      this.$nextTick(() => {
        this.width = this.$refs.responsive.$el.clientWidth
      })
    }
  }
}
</script>
