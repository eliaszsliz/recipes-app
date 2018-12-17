<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/">
          <img
            src="~/assets/burger.svg"
            alt="Burger logo"
            style="width: 28px; height: 28px; margin-right: 8px"
          >
          <b>Food</b>
        </a>

        <div
          :class="{
            'navbar-burger': true,
            'is-active' : isOpen
          }"
          @click="toggleMenu"
        >
          <span/>
          <span/>
          <span/>
        </div>
      </div>

      <div :class="{ 'navbar-menu': true, }">
        <div class="navbar-end">
          <div
            v-if="isAuthenticated"
            class="navbar-item">
            <button
              class="button is-warning"
              @click="logout"
            >Log out</button>
          </div>

          <template v-else>
            <div
              class="navbar-item">
              <nuxt-link
                :to="{ name: 'register' }"
                style="margin-right: 8px"
                class="button is-primary"
              >Register</nuxt-link>

              <nuxt-link
                :to="{ name: 'login' }"
                class="button is-white is-outlined"
              >Log in</nuxt-link>
            </div>
          </template>
        </div>
      </div>
    </nav>

    <section class="main-content columns is-gapless">
      <keep-alive>
        <no-ssr>
          <sidebar-menu />
        </no-ssr>
      </keep-alive>

      <div class="column is-12 is-9-desktop AppContent">
        <nuxt />
      </div>

    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SidebarMenu from '../components/SidebarMenu'
const UserInfo = require('../graphql/UserInfo.gql')

export default {
  components: { SidebarMenu },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('menu', ['isOpen'])
  },
  watch: {
    $route(to, from) {
      this.closeMenu()
    }
  },
  mounted() {
    const token = this.$apolloHelpers.getToken()
    if (token) {
      try {
        this.$apollo
          .query({
            query: UserInfo
          })
          .then(res => res.data.userInfo)
          .then(user => {
            this.setUser(user)
            this.setToken(token)
          })
      } catch (e) {
        console.log(e)
      }
    }
  },
  methods: {
    logout() {
      this.$apolloHelpers.onLogout()
      this.clearUser()
      this.$router.push({ name: 'index' })
    },

    ...mapMutations({
      openMenu: 'menu/openMenu',
      closeMenu: 'menu/closeMenu',
      toggleMenu: 'menu/toggleMenu',
      clearUser: 'auth/clearUser',
      setUser: 'auth/setUser',
      setToken: 'auth/setToken'
    })
  }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all.sass"
@import "../sass/variables"

.cursor-pointer
  cursor: pointer

.AppContent
  padding-left: $container-gap-horizontal !important
  padding-right: $container-gap-horizontal !important

  //@include from(desktop)
    margin-left: 25% !important

.page-enter-active, .page-leave-active
  transition: opacity .25s

.page-enter, .page-leave-to
  opacity: 0

</style>
