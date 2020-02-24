<template>
  <v-footer dark padless>
    <v-container class="footer-container">
      <v-row justify="start" align="center" no-gutters>
        <v-col cols="12" md="6">
          <v-img
            :aspect-ratio="1"
            height="100%"
            max-height="50px"
            contain
            src="/logo/simple.svg"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-btn
            v-for="link in links"
            :key="link.text"
            :nuxt="!link.external"
            :to="link.external ? undefined : link.link"
            :href="link.external ? link.link : undefined"
            color="secondary"
            text
            rounded
            active-class="hide-active"
            class="my-2"
          >{{ link.text }}</v-btn
          >
        </v-col>
      </v-row>
      <v-row justify="space-between" class="copyright" no-gutters>
        <v-col
          order="2"
          order-lg="1"
          class="py-4 text-center secondary--text"
          cols="12"
          md="6"
        >
          ©{{ new Date().getFullYear() }} —
          <strong>Projeto ALES</strong>
        </v-col>
        <v-col order="1" order-lg="2" cols="12" md="6" class="text-center">
          <v-btn
            v-for="network in social"
            :key="network.icon"
            :href="network.link"
            class="mx-4"
            color="secondary"
            icon
          >
            <v-icon size="24px">{{ network.icon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { text: 'Início', link: '/', external: false },
      { text: 'Sobre o ales', link: '/#sobre', external: false },
      { text: 'Nossa equipe', link: '/voluntarios', external: false },
      {
        text: 'Blog',
        link: 'https://medium.com/projeto-ales',
        external: true
      },
      { text: 'Fale conosco', link: '/#contato', external: false }
    ],
    social: [
      {
        icon: 'fab fa-facebook',
        link: 'https://fb.com/projetoales'
      },
      {
        icon: 'fab fa-linkedin',
        link: 'https://linkedin.com/company/projetoales'
      },
      {
        icon: 'fab fa-instagram',
        link: 'https://www.instagram.com/projetoales/'
      },
      {
        icon: 'fab fa-youtube',
        link: 'https://www.youtube.com/channel/UCCA__gOJ59PoROyN6Lcf3gw'
      }
    ]
  })
}
</script>

<style scoped>
.hide-active.theme--dark.v-btn--active:hover::before,
.hide-active.theme--dark.v-btn--active::before {
  opacity: 0;
}
.footer-container {
  padding-top: 50px;
  padding-bottom: 50px;
}
.copyright {
  padding-top: 50px;
}
</style>
