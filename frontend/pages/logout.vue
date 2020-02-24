<script>
export default {
  alesAuth: false,
  middleware({ app, redirect }) {
    return app.$auth.logout().then(() => redirect('/'))
  }
}
</script>
