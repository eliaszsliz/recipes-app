<template>
  <section>
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

    <b-field
      horizontal
      label="Powtórz hasło">
      <b-input :value="password_confirmation"/>
    </b-field>

    <b-field
      horizontal
      label="Email">
      <b-input :value="email"/>
    </b-field>

    <button
      type="submit"
      class="button is-success is-large"
      @click="submitForm"
    >
      Utwórz konto
    </button>

  </section>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      username: 'test',
      password: 'has',
      password_confirmation: 'sa',
      email: 'pwaew@wpp.pl'
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
