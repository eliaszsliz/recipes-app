<template>
  <aside
    :class="{
      'column is-3 section' : true,
      'is-mobile-open': isOpen
    }"
  >

    <transition name="fade">
      <div
        v-show="isAuthenticated"
        class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png">
          </p>
        </figure>

        <div
          :style="{ alignSelf: 'stretch', alignItems: 'center' }"
          class="media-content is-flex">
          <span class="is-4 strong">
            {{ authenticatedUser.username }}
          </span>
        </div>
      </div>
    </transition>

    <div class="Sidebar-ListWrapper">
      <p class="menu-label">General</p>
      <ul
        class="menu-list">
        <li
          v-for="(item, key) of items"
          :key="key">
          <nuxt-link
            :to="item.to"
            class="Sidebar-ListWrapperElement"
            exact-active-class="is-active">
            <b-icon :icon="item.icon"/>
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>

  </aside>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
// const process = require('process')

const BULMA_MOBILE_WIDTH_MAX = 768
const MIN_WIDTH_FOR_DESKTOP_MENU = 1088

export default {
  name: 'SidebarMenu',
  data() {
    return {
      items: [
        { title: 'Home', icon: 'home', to: { name: 'index' } },
        {
          title: 'Recipes',
          icon: 'format-list-bulleted',
          to: { name: 'recipes' }
        },
        { title: 'Categories', icon: 'tag-multiple', to: { name: 'tags' } },
        { title: 'Favourites', icon: 'heart', to: { name: 'favourites' } }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      isOpen: 'menu/isOpen',
      authenticatedUser: 'auth/authenticatedUser'
    })
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted: function() {
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.closeMenu()
    },
    logout() {
      this.$apolloHelpers.onLogout()
      this.clearUser()
    },
    ...mapMutations({
      openMenu: 'menu/openMenu',
      closeMenu: 'menu/closeMenu',
      toggleMenu: 'menu/toggleMenu'
    })
  }
}
</script>

<style scoped lang="sass">
@import "~bulma/sass/utilities/_all.sass"
@import "../sass/variables.sass"

.menu-list
  width: 100%

aside
  @include until($desktop)
    display: none
    z-index: 31
    background-color: rgba(255, 255, 255, .95)
    position: fixed
    width: 100%
    height: 100%

    &.is-mobile-open
      display: block

  .media
    padding: $container-gap-horizontal

.Sidebar-ListWrapper
  padding: $container-gap-horizontal

  &Element
    display: flex
    align-items: center

    span
      margin-right: 5px


.fade-enter-active
  transition: opacity .5s

.fade-enter
  opacity: 0


</style>
