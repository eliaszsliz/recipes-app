<template>
  <div class="container">
    <page-title title="Log in"/>
    <login-form/>
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
