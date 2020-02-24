<template>
  <div>
    <v-row no-gutters class="text-center mb-3">
      <v-col>
        <h1 class="display-2 font-weight-thin">Como chegar</h1>
        <span class="subtitle-1">
          Algumas de nossas aulas acontecem em lugares diferentes, mas todas
          são bem próximas umas das outras
        </span>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      align="center"
      align-content="center"
      justify="center"
      class="text-center mb-3"
    >
      <v-col class="mt-5 mb-10" cols="10" sm="8" md="6" lg="3" xl="2" offset-xl="1" order="1">
        <v-card elevation="10">
          <v-tabs v-model="tab" grow vertical class="directions-tabs">
            <v-tabs-slider color="secondary" class="tabs-slider"></v-tabs-slider>
            <v-tab
              v-for="item in tabs"
              :key="item.text"
              class="secondary--text"
              @click="disableAutoScroll"
            >{{ item.text }}</v-tab>
          </v-tabs>
        </v-card>
      </v-col>
      <v-col v-resize="onResize" cols="12" lg="2" order="3" order-lg="2">
        <v-img
          :aspect-ratio="1"
          height="100%"
          max-height="300px"
          contain
          src="/img/alessauro/alessauro-aventureiro.svg"
        />
      </v-col>
      <v-col cols="12" lg="7" order="2" order-lg="3">
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(item, index) in tabs" :key="tabItemKeys[index]">
            <v-card elevation="3" tile>
              <v-card-text class="pa-0">
                <ResponsiveiFrame :src="item.src" />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ResponsiveiFrame from '../misc/ResponsiveiFrame'
export default {
  components: {
    ResponsiveiFrame
  },
  data() {
    return {
      tab: null,
      autoScrollActive: true,
      autoScrollInterval: null,
      tabs: [
        {
          text: 'Aulas gerais',
          src:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.402150106994!2d-47.08388428503578!3d-22.82460648505369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c6cbeb5da1ab%3A0x5bd30fe91c0b65f9!2sEscola%20Estadual%20Bar%C3%A3o%20Geraldo%20de%20Rezende!5e0!3m2!1spt-BR!2sbr!4v1569785218276!5m2!1spt-BR!2sbr'
        },
        {
          text: 'Programação e robótica',
          src:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.66611695724!2d-47.06695948431333!3d-22.814832440333713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c15349b5368d%3A0xd2718275096f3d70!2sInstituto%20de%20Computa%C3%A7%C3%A3o%20Unicamp!5e0!3m2!1spt-BR!2sbr!4v1569785366939!5m2!1spt-BR!2sbr'
        },
        {
          text: 'Aulas de olimpíadas',
          src:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.66611695724!2d-47.06695948431333!3d-22.814832440333713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c15349b5368d%3A0xd2718275096f3d70!2sInstituto%20de%20Computa%C3%A7%C3%A3o%20Unicamp!5e0!3m2!1spt-BR!2sbr!4v1569785366939!5m2!1spt-BR!2sbr'
        }
      ],
      tabSeed: Math.random()
    }
  },
  computed: {
    tabItemKeys() {
      return [...Array(this.tabs.length).keys()].map((_, i) => i + this.tabSeed)
    }
  },
  mounted() {
    if (this.autoScrollActive) {
      this.quickLoad()
      this.autoScrollInterval = setInterval(this.autoScroll, 5000)
    }
  },
  methods: {
    nextTab() {
      this.tab = (this.tab + 1) % this.tabs.length
    },
    prevTab() {
      this.tab = (this.tab - 1) % this.tabs.length
    },
    autoScroll() {
      if (this.autoScrollActive) {
        this.nextTab()
      } else {
        clearInterval(this.autoScrollInterval)
      }
    },
    disableAutoScroll() {
      this.autoScrollActive = false
    },
    onResize() {
      this.tabSeed = Math.random()
      this.quickLoad()
    },
    quickLoad() {
      return [...Array(this.tabs.length).keys()].map(i =>
        setTimeout(this.nextTab, 50 * i)
      )
    }
  }
}
</script>

<style scoped>
.tabs-slider {
  width: 200%;
}
</style>

<style>
.directions-tabs {
  height: 17em;
}
.directions-tabs .v-item-group {
  width: 100%;
  background-color: var(--v-primary-base) !important;
}
@media (max-width: 960px) {
  .directions-tabs {
    height: 11em;
  }
}
</style
>>
