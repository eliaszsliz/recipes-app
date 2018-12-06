<template>
  <div class="columns">
    <div class="column is-8 is-offset-2 has-text-centered">
      <h1 class="title is-2">Logowanie</h1>

      <login-form/>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  name: 'Login',
  components: { LoginForm }
}
</script>

<style scoped>
</style>
