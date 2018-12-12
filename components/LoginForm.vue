<template>
  <div>
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
      class="has-text-left">
      <b-input
        id="login"
        v-model="credentials.username"/>
    </b-field>

    <b-field
      label="Password"
      class="has-text-left">
      <b-input
        v-model="credentials.password"
        type="password"/>
    </b-field>

    <button
      :class="['button is-success is-medium is-block', loading ? 'is-loading' : '' ]"
      type="button"
      @click="submitForm"
    >
      Log in
    </button>
  </div>
</template>

<script>
const authenticateUserGql = require('../graphql/UserLogin.gql')
import { mapMutations } from 'vuex'

export default {
  name: 'LoginForm',
  data() {
    return {
      errors: [],
      credentials: {
        username: 'admin',
        password: 'korynt123'
      },
      loading: false
    }
  },
  methods: {
    async submitForm() {
      const credentials = this.credentials
      this.loading = true
      try {
        const res = await this.$apollo
          .mutate({
            mutation: authenticateUserGql,
            variables: credentials
          })
          .then(({ data }) => data.userLogin)

        await this.$apolloHelpers.onLogin(res.token)
        await this.setUser(res.user)
        await this.setToken(res.token)
        this.loading = false
        await this.$toast.open(`Hello ${this.$store.state.auth.username}!`)
      } catch (e) {
        this.loading = false
        this.errors = e.graphQLErrors || []
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser',
      setToken: 'auth/setToken',
      add: 'increment'
    })
  }
}
</script>

<style scoped>
</style>
