<template>
  <div>
    <page-title title="Log in"/>

    <b-message
      v-if="redirectTo"
      type="is-danger"
    >
      <p>U must be logged in to perform this action.</p>
      <p>Dont have account?
        <nuxt-link :to="{ name: 'register' }">
          Sign up here
        </nuxt-link>
      </p>
    </b-message>

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
import { mapGetters, mapMutations } from 'vuex'

const authenticateUserGql = require('../graphql/UserLogin.gql')

export default {
  name: 'Login',
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
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    redirectTo: function() {
      if (this.$route.query && this.$route.query.next) {
        return this.$route.query.next
      }
      return false
    }
  },
  methods: {
    submitForm() {
      const credentials = this.credentials
      this.loading = true
      try {
        const x = this.$apollo
          .mutate({
            mutation: authenticateUserGql,
            variables: credentials
          })
          .then(res => {
            if (res.data.userLogin) {
              this.login(res.data.userLogin)
            }
            this.loading = false
          })
          .catch(rej => {
            this.errors = rej.graphQLErrors || []
            this.loading = false
          })
      } catch (e) {
        this.loading = false
        this.errors = e.graphQLErrors || []
      }
    },
    login({ user, token }) {
      this.$apolloHelpers.onLogin(token)
      this.setUser(user)
      this.setToken(token)
      this.$toast.open(`Hello ${user.username}!`)

      this.$router.push(
        this.redirectTo ? { path: this.redirectTo } : { name: 'index' }
      )
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
