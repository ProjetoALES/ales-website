<template>
  <BaseForm
    v-bind="$attrs"
    title="Leia as instruções a seguir"
    v-on="$listeners"
  >
    <v-col cols="12">
      <v-row
        justify="center"
        align="center"
        align-content="center"
        class="text-center"
      >
        <v-col cols="12" md="8">
          <span
            class="body-1"
          >Esse é apenas o pré-cadastro. Você ainda terá que
            {{
              wantsToBeStudent
                ? 'completar sua inscrição presencialmente'
                : 'participar do processo seletivo'
            }}
            para participar do projeto</span
          >
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row class="text-left" justify="space-around">
        <v-col cols="12" md="8">
          <span
            class="body-1"
          >Algumas coisas importantes sobre o formulário</span
          >
          <ul>
            <li>
              Sabemos que ele é grande e, por isso, salvamos o seu progresso
              para que você possa continuar depois de onde parou
            </li>
            <li>Todos os campos são obrigatórios</li>
            <li>
              Vamos confirmar esses dados com você presencialmente, então não se
              preocupe se alguma das informações aqui mudar até lá
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row justify="space-around" align="center">
        <v-col cols="12" md="4" align-self="center">
          <v-checkbox
            v-model="formData.readInstructions"
            :rules="[required]"
            required
            color="primary"
            label="Li e entendi as instruções"
          />
        </v-col>
      </v-row>
    </v-col>
  </BaseForm>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseForm from './BaseForm'

export default {
  components: { BaseForm },
  props: {
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      required: value => !!value || 'Obrigatório!'
    }
  },
  computed: {
    ...mapGetters({
      wantsToBeVolunteer: 'registration/wantsToBeVolunteer',
      wantsToBeStudent: 'registration/wantsToBeStudent'
    })
  }
}
</script>
