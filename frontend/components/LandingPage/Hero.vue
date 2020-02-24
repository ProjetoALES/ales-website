<template>
  <div>
    <div class="logo-bg d-none d-lg-block" />
    <div class="logo-bg-transition d-none d-lg-block" />
    <TopImg />
    <!-- Masthead below topbar with ALES text, logo and the kid's arms -->
    <v-row class="masthead" align="center" justify="space-around" no-gutters>
      <!-- Spacer to push contents right -->
      <v-spacer class="d-none d-lg-block" />
      <!-- Text column with ALES text and registration buttons -->
      <v-col>
        <v-container fluid>
          <!-- ALES text -->
          <v-row>
            <v-col>
              <div class="display-3 text-center white--text">Projeto ALES</div>
              <div class="display-1 text-center white--text">
                Além da Escola
              </div>
            </v-col>
          </v-row>
          <!-- Registration buttons -->
          <v-row justify="center" align="center" class="mt-5">
            <v-col xl="4" xs="6" class="text-center text-sm-right">
              <v-btn
                class="primary--text"
                x-large
                color="secondary"
                @click="registerStudent"
              >Inscreva-se</v-btn
              >
            </v-col>
            <v-col xl="4" xs="6" class="text-center text-sm-left">
              <v-btn
                class="secondary--text"
                x-large
                outlined
                color="primary"
                @click="registerVolunteer"
              >Seja voluntário</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <!-- Kid's arms. Only on desktop -->
      <v-col class="d-none d-lg-block">
        <SideImg />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TopImg from './TopImg'
import SideImg from './SideImg'
export default {
  components: { TopImg, SideImg },
  methods: {
    registerStudent() {
      this.$store.dispatch('registration/setStudent').then(() => {
        this.$router.push({
          path: '/register'
        })
      })
    },
    registerVolunteer() {
      this.$store.dispatch('registration/setVolunteer').then(() => {
        this.$router.push({
          path: '/register'
        })
      })
    }
  }
}
</script>

<style scoped>
.logo-bg {
  position: absolute;
  height: 128px;
  width: 60px;
  background-color: white;
}
.logo-bg-transition {
  height: 128px;
  width: 200px;
  background: linear-gradient(
    to right,
    var(--v-primary-base) 0%,
    var(--v-primary-base) 50%,
    white 50%,
    white 100%
  );
  left: 60px;
  position: absolute;
}
.logo-bg-transition:before {
  background: white;
  height: 100%;
  width: 50%;
  border-radius: 0% 0% 331% 0% / 0% 0% 158% 0%;
  display: inline-block;
  content: '';
}
.logo-bg-transition:after {
  background: var(--v-primary-base);
  height: 100%;
  width: 50%;
  border-radius: 231% 0% 0% 0% / 136% 0% 0% 0%;
  display: inline-block;
  content: '';
}
</style>

<style scoped>
.masthead {
  height: calc(70vh + 128px);
  min-height: 625px;
  background-color: var(--v-primary-base);
}
.masthead .display-3,
.masthead .display-1 {
  font-family: 'Caviar Dreams', 'Lato', 'Helvetica', 'Arial' !important;
}
</style>
