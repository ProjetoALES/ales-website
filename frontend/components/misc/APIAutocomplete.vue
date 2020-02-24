<template>
  <div>
    <v-autocomplete
      v-model="selectedEntry"
      :search-input.sync="query"
      :item-text="itemText"
      :items="items"
      :loading="loading"
      v-bind="$attrs"
      auto-select-first
      no-filter
      return-object
      v-on="$listeners"
    >
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]>
        <slot :name="slot" />
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    processEntries: {
      type: Function,
      default: entries => entries
    },
    itemText: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
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
      query: '',
      entries: [],
      loading: false
    }
  },
  computed: {
    items() {
      const items = this.processEntries(this.entries)
      if (items.length === 0 && this.value[this.itemText]) {
        items.push(this.value)
      }
      return items
    },
    selectedEntry: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    query(val) {
      if (val && val !== this.value[this.itemText]) {
        this.loading = true
        this.debouncedSearch(val)
      }
    }
  },
  methods: {
    search(name) {
      const url = `${location.protocol}//${location.host}${this.url}`
      this.$auth
        .request({
          method: 'get',
          url,
          params: {
            [this.paramName]: name
          }
        })
        .then(results => {
          this.entries = results
        })
        .catch(() => {
          if (this.errorMessage.length) {
            this.$toast.error(this.errorMessage)
          }
        })
        .then(() => {
          this.loading = false
        })
    },
    debouncedSearch: debounce(function(name) {
      this.search(name)
    }, 300)
  }
}
</script>
