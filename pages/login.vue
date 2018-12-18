<template>
  <div @keyup.enter="submitForm">
    <page-title
      centered
      title="Log in"
    />

    <div
      :style="{ position: 'relative' }"
      class="columns">
      <b-loading
        :is-full-page="false"
        :active="submitStatus === 'PENDING'"
        :can-cancel="false"
        :style="{ zIndex: 300 }"
      />
      <div class="column is-7 LoginForm">
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

        <b-field
          :type="{ 'is-danger' : $v.username.$error || errors.length }"
          :message="{
            'Username field is required' : !$v.username.required && $v.username.$error,
            'Username or password is incorrect': errors.length
          }"
          label="Username"
          class="has-text-left">
          <b-input
            id="login"
            v-model="username"/>
        </b-field>

        <b-field
          :type="{ 'is-danger' : $v.password.$error || errors.length }"
          :message="{
            'Password field is required' : !$v.password.required && $v.password.$error,
            'Username or password is incorrect': errors.length
          }"
          label="Password"
          class="has-text-left">
          <b-input
            v-model="password"
            type="password"/>
        </b-field>

        <button
          class="button is-success is-medium is-pulled-right"
          type="button"
          @click="submitForm"
        >
          Log in
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

const authenticateUserGql = require('../graphql/UserLogin.gql')

export default {
  name: 'Login',
  mixins: [validationMixin],
  data() {
    return {
      username: 'admin',
      password: 'korynt123',
      submitStatus: null,
      errors: []
    }
  },
  validations: {
    username: {
      required
    },
    password: {
      required
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
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.submitStatus = 'PENDING'

        try {
          this.$apollo
            .mutate({
              mutation: authenticateUserGql,
              variables: {
                username: this.username,
                password: this.password
              }
            })
            .then(res => {
              if (res.data.userLogin) {
                this.login(res.data.userLogin)
              }
              this.submitStatus = 'OK'
            })
            .catch(rej => {
              this.errors = rej.graphQLErrors || []
              this.submitStatus = 'OK'
            })
        } catch (e) {
          this.submitStatus = 'OK'
          this.errors = e.graphQLErrors || []
        }
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
      setToken: 'auth/setToken'
    })
  }
}
</script>

<style scoped lang="sass">
@import "~bulma/sass/utilities/_all.sass"
@import "../sass/variables"

.LoginForm
  box-shadow: $box-shadow
  margin: auto
  padding: 2rem
  background-color: white
  position: relative
  top: -6rem

</style>
