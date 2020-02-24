<template>
  <v-app-bar v-bind="$attrs" v-on="$listeners">
    <nuxt-link class="logo-wrapper" to="/">
      <img :src="img" class="logo" />
    </nuxt-link>
    <v-spacer />
    <div class="buttons">
      <v-btn
        v-for="b in buttons"
        :key="b.text"
        :outlined="!b.fill"
        :color="altButtons ? b.altColor : b.color"
        :nuxt="!b.external"
        :to="b.external ? undefined : b.link"
        :href="b.external ? b.link : undefined"
        :text="!b.fill"
        :class="getButtonTextColor(b)"
      >{{ b.text }}</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttons: {
      type: Array,
      default: () => []
    },
    altButtons: Boolean,
    img: {
      type: String,
      default: '/logo/side-text.svg'
    }
  },
  methods: {
    getButtonTextColor(button) {
      const classes = ['ma-3']
      if (button.textColor && !this.altButtons) {
        classes.push(`${button.textColor}--text`)
      }
      if (button.altTextColor && this.altButtons) {
        classes.push(`${button.altTextColor}--text`)
      }
      return classes
    }
  }
}
</script>

<style scoped>
.logo {
  max-height: 50%;
  min-height: 38px;
  margin: auto 0px;
}
.logo-wrapper {
  display: flex;
  height: 100%;
}
.buttons {
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: flex-end;
}
</style>
