<template>
  <section>
    <b-message
      v-if="errors.length"
      type="is-danger">
      <span
        v-for="(error, index) in errors"
        :key="index +'error'"
        class="has-text-red">
        {{ error.message }}
      </span>
    </b-message>

    <b-field
      horizontal
      label="Nazwa użytkownika">
      <b-input v-model="credentials.username"/>
    </b-field>

    <b-field
      horizontal
      label="Hasło">
      <b-input
        v-model="credentials.password"
        type="password"/>
    </b-field>

    <b-field
      horizontal
      label="Powtórz hasło">
      <b-input v-model="credentials.passwordRepeat"/>
    </b-field>

    <b-field
      horizontal
      label="Email">
      <b-input v-model="credentials.email"/>
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
const registerUserGql = require('../graphql/UserRegister.gql')

export default {
  name: 'Signup',
  data() {
    return {
      errors: [],
      credentials: {
        username: 'test',
        password: 'has',
        passwordRepeat: 'sa',
        email: 'pwaew@wpp.pl'
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        const res = await this.$apollo
          .mutate({
            mutation: registerUserGql,
            variables: this.credentials
          })
          .then(({ data }) => data.userRegister)

        await this.$toast.open({
          type: 'is-success',
          message: `Welcome ${this.credentials.username}!`
        })

        await this.$apollo
          .mutate({
            mutation: authenticateUserGql,
            variables: {
              username: this.credentials.username,
              password: this.credentials.password
            }
          })
          .then(({ data }) => data.userLogin)

        await this.$apolloHelpers.onLogin(res.token)
        await this.setUser(res.user)
        await this.setToken(res.token)
      } catch (e) {
        this.errors = e.graphQLErrors || []
      }
    }
  }
}
</script>

<style scoped>
</style>
