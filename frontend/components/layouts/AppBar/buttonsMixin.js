/** @type {Array<{
 *  text: string;
 *  color?: string;
 *  altColor?: string;
 *  textColor?: string;
 *  altTextColor?: string;
 *  link: string;
 *  external?: boolean;
 *  fill?: boolean;
 * }>} */
const defaultButtons = [
  {
    text: 'O que é',
    color: 'primary',
    altColor: 'white',
    link: '/#sobre'
  },
  {
    text: 'Matérias',
    color: 'primary',
    altColor: 'white',
    link: '/materias'
  },
  {
    text: 'Contato',
    color: 'primary',
    altColor: 'white',
    link: '/#contato'
  }
]

const getDefault = () => [...defaultButtons]

export default {
  computed: {
    /**
     * @returns {boolean}
     */
    loggedIn() {
      return this.$auth.loggedIn
    },
    buttons() {
      const buttons = getDefault()
      // If logged and registered
      if (this.loggedIn && this.$auth.alesUser) {
        buttons.push(
          ...[
            {
              text: 'Sua conta',
              color: 'primary',
              altColor: 'secondary',
              altTextColor: 'primary',
              link: '/account',
              fill: true
            },
            {
              text: 'Sair',
              color: 'error',
              altColor: 'error',
              link: '/logout',
              fill: true
            }
          ]
        )
        // Logged but not registered
      } else if (this.$auth.loggedIn && !this.$auth.alesUser) {
        buttons.push(
          ...[
            {
              text: 'Completar cadastro',
              color: 'primary',
              altColor: 'secondary',
              altTextColor: 'primary',
              link: '/register',
              fill: true
            },
            {
              text: 'Sair',
              color: 'error',
              altColor: 'error',
              link: '/logout',
              fill: true
            }
          ]
        )
      } else {
        buttons.push(
          ...[
            {
              text: 'Entrar',
              color: 'secondary',
              altColor: 'secondary',
              altTextColor: 'primary',
              textColor: 'primary',
              link: '/login',
              fill: true
            }
          ]
        )
      }
      return buttons
    }
  }
}
