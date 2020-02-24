import Vue from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.use(Toast)

export default function(ctx, inject) {
  inject('toast', Vue.$toast)
}
