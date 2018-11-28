<template>
  <div>
    <b-field
      horizontal
      label="Nazwa użytkownika">
      <b-input :value="username"/>
    </b-field>

    <b-field
      horizontal
      label="Hasło">
      <b-input
        :value="password"
        type="password"/>
    </b-field>

    <button
      type="button"
      class="button is-success is-large"
      @click="submitForm"
    >
      Zaloguj
    </button>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: 'test',
      password: 'has'
    }
  },
  methods: {
    submitForm() {
      this.$toast.open('submitForm')
    }
  }
}
</script>

<style scoped>
</style>
