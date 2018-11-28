<template>
  <section>
    <div>Logowanie</div>

    <login-form/>
  </section>
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
