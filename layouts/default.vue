<template>
  <div>
    <nav
      class="navbar header has-shadow is-light"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/">
          <img
            src="~assets/buefy.png"
            alt="Buefy"
            height="28">
        </a>

        <div class="navbar-burger">
          <span/>
          <span/>
          <span/>
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div
            v-if="isAuthenticated"
            class="navbar-item">
            <button
              class="button is-warning"
              @click="onLogout"
            >Wyloguj</button>
          </div>

          <template v-else>
            <div
              class="navbar-item">
              <nuxt-link
                :to="{ name: 'register' }"
                style="margin-right: 8px"
                class="button is-primary is-outlined"
              >Rejestracja</nuxt-link>

              <nuxt-link
                :to="{ name: 'login' }"
                class="button is-primary"
              >Logowanie</nuxt-link>
            </div>
          </template>
        </div>
      </div>
    </nav>

    <section class="main-content columns">

      <aside class="column is-3 section">
        <div
          v-if="isAuthenticated"
          class="media">

          <figure class="media-left">
            <p class="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </p>
          </figure>
          <div class="media-content">
            <span class="is-4 strong">
              {{ isAuthenticated }}
              {{ $store.state.auth.username }} : {{ $store.state.auth.id }}
            </span>
          </div>
        </div>

        <p class="menu-label is-hidden-touch">General</p>
        <ul class="menu-list">
          <li
            v-for="(item, key) of items"
            :key="key">
            <nuxt-link
              :to="item.to"
              exact-active-class="is-active">
              <b-icon :icon="item.icon"/> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-9">
        <nuxt />
      </div>

    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      items: [
        { title: 'Home', icon: 'home', to: { name: 'index' } },
        { title: 'Inspire', icon: 'lightbulb', to: { name: 'inspire' } },
        { title: 'Register', icon: 'lightbulb', to: { name: 'register' } },
        { title: 'Log in', icon: 'lightbulb', to: { name: 'login' } },
        { title: 'Recipes', icon: 'lightbulb', to: { name: 'recipes' } },
        { title: 'Categories', icon: 'lightbulb', to: { name: 'tags' } }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout()
      await this.$store.commit('auth/clearUser')
    }
  }
}
</script>

<style lang="sass">
.cursor-pointer
  cursor: pointer
</style>
