<template>
  <div @keyup.enter="submitForm">
    <page-title
      centered
      title="Sign up"
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

      <div class="column is-offset-3 is-6 RegisterForm">
        <b-message
          v-if="submitStatus === 'ERROR'"
          type="is-danger">
          Server error
        </b-message>

        <b-field
          :type="{ 'is-danger' : $v.username.$error}"
          :message="{
            'Username field is required' : !$v.username.required && $v.username.$error,
            'Username must be at least 6 characters' : !$v.username.minLength && $v.username.$error
          }"
          label="Username"
          custom-class="has-text-left">
          <b-input
            v-model.trim="username"
            placeholder="Username"
          />
        </b-field>

        <b-field
          :type="{ 'is-danger' : $v.password.$error}"
          :message="{
            'Password field is required' : !$v.password.required && $v.password.$error,
            'Password must be at least 6 characters' : !$v.password.minLength && $v.password.$error
          }"
          label="Password"
          custom-class="has-text-left">
          <b-input
            v-model="password"
            placeholder="Password"
            type="password" />
        </b-field>

        <b-field
          :type="{ 'is-danger' : $v.passwordRepeat.$error}"
          :message="{
            'Repeat your password, please' :
              (!$v.passwordRepeat.required || $v.passwordRepeat.minLength) && $v.passwordRepeat.$error,
            'Passwords must be identical' : !$v.passwordRepeat.sameAsPassword && $v.passwordRepeat.$error
          }"
          label="Repeat password"
          custom-class="has-text-left"
        >
          <b-input
            v-model="passwordRepeat"
            placeholder="Repeat password"
            type="password" />
        </b-field>

        <b-field
          :type="{ 'is-danger' : $v.email.$error}"
          :message="{
            'Enter your email' : !$v.email.required && $v.email.$error,
            'Enter valid email adress' : !$v.email.email && $v.email.$error
          }"
          label="Email"
          custom-class="has-text-left"
        >
          <b-input
            v-model.trim="email"
            placeholder="Email"
          />
        </b-field>

        <button
          type="submit"
          class="button is-success is-medium is-pulled-right"
          @click="submitForm"
        >
          Utwórz konto
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'

const registerUserGql = require('../graphql/UserRegister.gql')
const authenticateUserGql = require('../graphql/UserLogin.gql')

export default {
  name: 'Signup',
  mixins: [validationMixin],
  data() {
    return {
      username: '',
      password: '',
      passwordRepeat: '',
      email: '',
      submitStatus: null
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(6)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    passwordRepeat: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async submitForm() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        // this.submitStatus = 'ERROR'
      } else {
        try {
          this.submitStatus = 'PENDING'

          await this.$apollo
            .mutate({
              mutation: registerUserGql,
              variables: {
                username: this.username,
                password: this.password,
                passwordRepeat: this.passwordRepeat,
                email: this.email
              }
            })
            .then(({ data }) => data.userRegister)

          this.$toast.open({
            type: 'is-success',
            message: `Welcome ${this.username}!`
          })

          await this.$apollo
            .mutate({
              mutation: authenticateUserGql,
              variables: {
                username: this.username,
                password: this.password
              }
            })
            .then(res => res.data.userLogin)
            .then(({ user, token }) => {
              this.$apolloHelpers.onLogin(token)
              this.setUser(user)
              this.setToken(token)
              this.submitStatus = 'OK'
              this.$router.push({ name: 'index' })
            })
        } catch (e) {
          this.errors = e.graphQLErrors || []
        }
      }
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

  .RegisterForm
    box-shadow: $box-shadow
    margin: auto
    padding: 2rem
    background-color: white
    position: relative
    top: -6rem

</style>
