<template>
  <v-navigation-drawer
    v-model="drawer"
    disable-resize-watcher
    disable-route-watcher
    app
    class="d-block d-md-none"
  >
    <v-img :aspect-ratio="16 / 9" src="/logo/simple.svg">
      <v-row align="end" class="lightbox white--text pa-2 fill-height">
        <v-col>
          <div class="subheading">Jonathan Lee</div>
          <div class="body-1">heyfromjonathan@gmail.com</div>
        </v-col>
      </v-row>
    </v-img>
    <v-list nav dense>
      <template v-for="item in items">
        <v-list-group
          v-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item v-for="(child, i) in item.children" :key="i">
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="item.text">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="`divider-${item.text}`" />
      </template>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn :color="$auth.loggedIn ? 'error' : 'primary'" block>
          <v-icon
            left
          >fa fa-{{ $auth.loggedIn ? 'sign-out-alt' : 'sign-in-alt' }}</v-icon
          >
          {{ $auth.loggedIn ? 'Sair' : 'Entrar' }}
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      commonItems: [
        {
          text: 'Como chegar',
          icon: 'fa fa-map-signs'
        },
        {
          text: 'Contato',
          icon: 'fa fa-envelope'
        },
        {
          text: 'Quem somos',
          icon: 'fa fa-users'
        }
      ]
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.navDrawer.active
      },
      set(val) {
        this.$store.commit('navDrawer/set', val)
      }
    },
    items() {
      const items = []
      if (!this.$auth.loggedIn) {
        items.push(
          ...[
            {
              text: 'O que é',
              icon: 'fa fa-question'
            },
            {
              text: 'Matérias',
              icon: 'fa fa-book'
            }
          ]
        )
      } else {
      }
      items.push(...this.commonItems)
      return items
    }
  }
}
</script>
<style scoped>
.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}
</style>
