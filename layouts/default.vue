<template>
  <div>
    <nav
      class="navbar header is-primary"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link
          :to="{ name: 'index' }"
          class="navbar-item"
        >
          <img
            src="~/assets/burger.svg"
            alt="Burger logo"
            style="width: 28px; height: 28px; margin-right: 8px"
          >
          <b>Food</b>
        </nuxt-link>

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
              class="button is-danger"
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
                class="button is-info"
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

.AppContent
  overflow-x: hidden

  .horizontal-mobile-padding
    @include mobile
      padding-left: $container-gap-horizontal * 2
      padding-right: $container-gap-horizontal * 2

.page-enter-active, .page-leave-active
  transition: opacity .25s

.page-enter, .page-leave-to
  opacity: 0


</style>
