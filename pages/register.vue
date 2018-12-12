<template>
  <div class="container">
    <page-title title="Sign up" />


    <div class="columns">
      <div class="column is-12">
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
          label="Username"
          custom-class="has-text-left">
          <b-input v-model="credentials.username"/>
        </b-field>

        <b-field
          :type="passwordsNotSame ? 'is-danger' : ''"
          label="Password"
          custom-class="has-text-left">
          <b-input
            v-model="credentials.password"
            type="password" />
        </b-field>

        <b-field
          :type="passwordsNotSame ? 'is-danger' : ''"
          :message="[ passwordsNotSame ? 'Passwords are not same' : null ]"
          label="Repeat password"
          custom-class="has-text-left"
          @blur="passwordRepeatDirty = true"
        >
          <b-input
            v-model="credentials.passwordRepeat"
            type="password" />
        </b-field>

        <b-field
          label="Email"
          custom-class="has-text-left"
        >
          <b-input v-model="credentials.email"/>
        </b-field>

        <button
          type="submit"
          class="button is-success is-large"
          @click="submitForm"
        >
          Utwórz konto
        </button>
      </div>
    </div>
  </div>
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
        passwordRepeatDirty: false,
        email: 'pwaew@wpp.pl'
      }
    }
  },
  computed: {
    passwordsNotSame: function() {
      return (
        !this.passwordRepeatDirty &&
        this.credentials.password !== this.credentials.passwordRepeat
      )
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
