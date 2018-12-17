<template>
  <div>
    Log out
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Logout',
  middleware: ['authenticated'],
  mounted() {
    this.$nextTick(() => {
      this.$apolloHelpers.onLogout()
      this.clearUser()
      this.$router.push({ name: 'index' })
    })
  },
  methods: {
    ...mapMutations({
      clearUser: 'auth/clearUser'
    })
  }
}
</script>

<style scoped>
</style>
